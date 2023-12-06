import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import Booking from '../../models/Booking'
import Inquiry from '../../models/Inquiry'
import Property from '../../models/Property'
import checkAvailability from '../../services/booking/checkAvailability'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Types } from 'mongoose'
import { RRule, Weekday } from 'rrule'
import { CalendarEvent } from 'rrule-duration'

const router = Router()

// @route       POST api/inquiry/addSchedule
// @desc        Create/Add New Schedule
// @access      Public
router.post(
  '/addSchedule/:propertyId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('unavailableFrom', 'Unavailable From is required')
      .not()
      .isEmpty()
      .isISO8601(),
    check('unavailableTo', 'Unavailable To is required')
      .not()
      .isEmpty()
      .isISO8601(),
    check('scheduleType', 'Schedule Type To is required')
      .not()
      .isEmpty()
      .trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { unavailableFrom, unavailableTo, scheduleType } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      let unavailableDates: Array<{
        unavailableFrom: Date
        unavailableTo: Date
      }> = []
      if (scheduleType !== 'singleDay') {
        let weekdays: Array<Weekday> = []
        if (scheduleType === 'allDays') {
          weekdays = [
            RRule.MO,
            RRule.TU,
            RRule.WE,
            RRule.TH,
            RRule.FR,
            RRule.SA,
            RRule.SU,
          ]
        } else if (scheduleType === 'weekdays') {
          weekdays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
        }

        const event = new CalendarEvent({
          start: {
            hour: 0,
            minute: 0,
          },
          end: {
            hour: 23,
            minute: 59,
          },
          recurrences: [
            new RRule({
              freq: RRule.WEEKLY,
              dtstart: new Date(unavailableFrom),
              until: new Date(unavailableTo),
              byweekday: weekdays,
            }),
          ],
        })

        const events = event.occurences({
          between: [new Date(unavailableFrom), new Date(unavailableTo)],
        })

        unavailableDates = events.map((event) => {
          return {
            unavailableFrom: event[0],
            unavailableTo: event[1],
          }
        })
      } else {
        unavailableDates = [{ unavailableFrom, unavailableTo }]
      }

      const newSchedule = await Property.findOneAndUpdate(
        {
          _id: propertyId,
        },
        {
          $push: {
            hostSchedule: { $each: unavailableDates },
          },
        },
        {
          new: true,
          $sort: {
            'hostSchedule.unavailableFrom': 1,
          },
        }
      )

      if (!newSchedule) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      res.json({
        message: 'Schedule Added Successfully',
        schedule: newSchedule,
      })
    } catch (err) {
      console.error(`Err addSchedule:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/schedule/getSchedule
// @desc        Get all Schedules for a Property
// @access      Public
router.get(
  '/getSchedule/:propertyId',
  userAuth,
  //**********************************Validations**********************************/
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { from, to } = req.query

      if (propertyId === undefined || propertyId === null) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Property Id'))
      }

      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      if (typeof from !== 'string' || typeof to !== 'string') {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Dates'))
      }

      const property = await Property.findOne({
        _id: new Types.ObjectId(propertyId),
      })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      // TODO: add 30 mins of cleaning time
      const inquiries = await Inquiry.find({
        property: new Types.ObjectId(propertyId),
        inquiryStatus: 'pending',
        bookingFrom: { $gte: new Date(from) },
        bookingTo: { $lte: new Date(to) },
      })
        .sort({ bookingFrom: 1 })
        .populate('guest', 'firstName lastName avatar profileImage')
        .populate('property', 'propertyName')
        .select('name avatar profileImage bookingFrom bookingTo propertyName')

      // TODO: add 30 mins of cleaning time
      const bookings = await Booking.find({
        property: new Types.ObjectId(propertyId),
        bookingStatus: { $in: ['confirmed', 'checkedin'] },
        bookingFrom: { $gte: new Date(from) },
        bookingTo: { $lte: new Date(to) },
      })
        .sort({ bookingFrom: 1 })
        .populate({
          path: 'inquiry',
          select: 'guest property',
          populate: {
            path: 'guest property guestUserData',
            select: 'name avatar profileImage propertyName phone',
          },
        })
        .select('inquiry bookingFrom bookingTo')

        let UtcFrom =new Date(from) 
        let UtcTo=new Date(to)
        const hoursFrom = UtcFrom.getUTCHours();
        const minutesFrom = UtcFrom.getUTCMinutes();
        const secondsFrom = UtcFrom.getUTCSeconds();
        const millisecondsFrom = UtcFrom.getUTCMilliseconds();
  
        const istMinutesFrom = minutesFrom + 60; 
        const istHoursFrom = hoursFrom + 10;
  
        const istDateObjFrom = new Date(UtcFrom.getUTCFullYear(), UtcFrom.getUTCMonth(), UtcFrom.getUTCDate(), istHoursFrom, istMinutesFrom, secondsFrom, millisecondsFrom);
     
  
        const hoursTo = UtcTo.getUTCHours();
        const minutesTo = UtcTo.getUTCMinutes();
        const secondsTo = UtcTo.getUTCSeconds();
        const millisecondsTo = UtcTo.getUTCMilliseconds();
  
        const istMinutesTo = minutesTo + 60; 
        const istHoursTo = hoursTo + 10;
  
        const istDateObjTo = new Date(UtcTo.getUTCFullYear(), UtcTo.getUTCMonth(), UtcTo.getUTCDate(), istHoursTo, istMinutesTo, secondsTo, millisecondsTo);
        
        
  
      
      const personal = await Property.aggregate([
        { $match: { _id: new Types.ObjectId(propertyId) } },
        { $unwind: '$hostSchedule' },
        {
          $match: {
            'hostSchedule.unavailableFrom': { $gte: istDateObjFrom },
            'hostSchedule.unavailableTo': { $lte: istDateObjTo },
          },
        },
        { $group: { _id: '$_id', hostSchedule: { $push: '$hostSchedule' } } },
        { $project: { _id: 0, hostSchedule: 1 } },
        { $sort: { 'hostSchedule.unavailableFrom': 1 } },
      ])

      res.json({ inquiries, bookings, personal })
    } catch (err) {
      console.error(`Err loadSchedule`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       DELETE api/inquiry/deleteSchedule
// @desc        Delete a Schedule
// @access      Public
router.delete(
  '/deleteSchedule/:propertyId/:bookingFrom',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { propertyId, bookingFrom } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const deletedSchedule = await Property.findOneAndUpdate(
        {
          _id: propertyId,
        },
        {
          $pull: {
            hostSchedule: { unavailableFrom: new Date(bookingFrom) },
          },
        },
        { new: true }
      )

      if (!deletedSchedule) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Schedule Not Found'))
      }

      res.json({
        message: 'Schedule Deleted Successfully',
        schedule: deletedSchedule,
      })
    } catch (err) {
      console.error(`Err deleteSchedule:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/schedule/:propertyId
// @desc        get time slots
// @access      Public

router.get(
  '/:propertyId',
  userAuth,
  //**********************************Validations**********************************/
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { from, to } = req.query
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }
      if (typeof from !== 'string' || typeof to !== 'string') {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Dates'))
      }
      const property = await Property.findOne({ _id: propertyId })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }
      const bookings = await Booking.find({
        property: propertyId,
        bookingStatus: 'confirmed',
        bookingFrom: { $gte: new Date(from) },
        bookingTo: { $lte: new Date(to) },
      })
        .sort({ bookingFrom: 1 })
        .select('bookingFrom bookingTo')

      const times = bookings.flatMap(
        ({ requestData: { bookingFrom, bookingTo } }) => {
          const startTime = new Date(bookingFrom)
          const endTime = new Date(bookingTo)
          const halfHourSlots = []
          while (startTime < endTime) {
            const slotStart = startTime.toLocaleTimeString([], {
              hour12: false,
            })
            startTime.setMinutes(startTime.getMinutes() + 30)
            const slotEnd = startTime.toLocaleTimeString([], { hour12: false })
            halfHourSlots.push({ from: slotStart, to: slotEnd })
          }
          return halfHourSlots
        }
      )
      
      /* let UtcFrom =new Date(from) 
      let UtcTo=new Date(to)
      const hoursFrom = UtcFrom.getUTCHours();
      const minutesFrom = UtcFrom.getUTCMinutes();
      const secondsFrom = UtcFrom.getUTCSeconds();
      const millisecondsFrom = UtcFrom.getUTCMilliseconds();

      const istMinutesFrom = minutesFrom + 60; 
      const istHoursFrom = hoursFrom + 10;

      const istDateObjFrom = new Date(UtcFrom.getUTCFullYear(), UtcFrom.getUTCMonth(), UtcFrom.getUTCDate(), istHoursFrom, istMinutesFrom, secondsFrom, millisecondsFrom);
   

      const hoursTo = UtcTo.getUTCHours();
      const minutesTo = UtcTo.getUTCMinutes();
      const secondsTo = UtcTo.getUTCSeconds();
      const millisecondsTo = UtcTo.getUTCMilliseconds();

      const istMinutesTo = minutesTo + 60; 
      const istHoursTo = hoursTo + 10;

      const istDateObjTo = new Date(UtcTo.getUTCFullYear(), UtcTo.getUTCMonth(), UtcTo.getUTCDate(), istHoursTo, istMinutesTo, secondsTo, millisecondsTo);
       */
      

      const personal = await Property.aggregate([
        { $match: { _id: new Types.ObjectId(propertyId) } },
        { $unwind: '$hostSchedule' },
        {
          $match: {
            'hostSchedule.unavailableFrom': { $gte: new Date(from) },
            'hostSchedule.unavailableTo': { $lte: new Date(to) },
          },
        },
        {
          $project: {
            _id: 0,
            hostSchedule: {
              $map: {
                input: {
                  $range: [
                    {
                      $toLong: {
                        $divide: [
                          {
                            $subtract: [
                              '$hostSchedule.unavailableFrom',
                              new Date('1970-01-01'),
                            ],
                          },
                          1000 * 60,
                        ],
                      },
                    },
                    {
                      $toLong: {
                        $divide: [
                          {
                            $subtract: [
                              '$hostSchedule.unavailableTo',
                              new Date('1970-01-01'),
                            ],
                          },
                          1000 * 60,
                        ],
                      },
                    },
                    30 * 60 * 1000, // interval in milliseconds
                  ],
                },
                as: 'minutes',
                in: {
                  from: {
                    $dateToString: {
                      format: '%H:%M:%S',
                      date: {
                        $toDate: { $multiply: ['$$minutes', 60 * 1000] },
                      },
                    },
                  },
                  to: {
                    $dateToString: {
                      format: '%H:%M:%S',
                      date: {
                        $toDate: {
                          $multiply: [{ $add: ['$$minutes', 30] }, 60 * 1000],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { $unwind: '$hostSchedule' },
        { $replaceRoot: { newRoot: '$hostSchedule' } },
        { $sort: { from: 1 } },
      ])

      function convertTime(timeString: string) {
        const time = new Date(`2022-01-01T${timeString}Z`)
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const amPm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12
        const formattedHoursStr = formattedHours.toString().padStart(2, '0')
        const formattedMinutes = minutes.toString().padStart(2, '0')
        return `${formattedHoursStr}:${formattedMinutes} ${amPm}`
      }

      const merged = [...times, ...personal].map((item) => {
        return {
          from: convertTime(item.from),
          to: convertTime(item.to),
        }
      })

      const uniqueTimes = Array.from(
        new Set([
          ...merged.map((item) => item.from),
          ...merged.map((item) => item.to),
        ])
      )

      res.status(200).send(uniqueTimes)
    } catch (err) {
      console.error(`Err loadSchedule`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)
// @route       GET api/schedule/getSchedule
// @desc        Get all Schedules for a Property
// @access      Public
router.post(
  '/checkAvailability/:propertyId',
  userAuth,
  //**********************************Validations**********************************/
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    // TODOS:
    // 1. host availability check for bookings
    // 2. existing paid enquiries check
    // 3. existing bookings check
    // 4. 30  min cleaning slot check

    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { from, to } = req.body

      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      // if (typeof from !== 'string' || typeof to !== 'string') {
      //   return res
      //     .status(ErrorCode.HTTP_BAD_REQ)
      //     .json(errorWrapper('Invalid Dates'))
      // }

      const property = await Property.findOne({ _id: propertyId })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      //   const inquiries = await Inquiry.find({
      //     property: propertyId,
      //     inquiryStatus: { $in: ['pending', 'confirmed'] },
      //     paymentStatus: { $in: ['paid'] },
      //     bookingFrom: { $gte: new Date(from) },
      //     bookingTo: { $lte: new Date(to) },
      //   })

      const startDate = new Date(from)
      const endDate = new Date(to)
      const propertyIdValue = new Types.ObjectId(propertyId)
      const isDateRangeAvailable = await checkAvailability({
        bookingFrom: startDate,
        bookingTo: endDate,
        propertyId: propertyIdValue,
      })

      const inquiries = Inquiry.find({
        property: propertyId,
        paymentStatus: { $in: ['paid'] },
        bookingStatus: { $in: ['pending', 'confirmed'] },
        $or: [
          // Case 1: Requested enquiry starts within an existing enquiry
          {
            bookingFrom: { $lte: startDate },
            bookingTo: { $gte: startDate },
          },
          // Case 2: Requested enquiry ends within an existing enquiry
          {
            bookingFrom: { $lte: endDate },
            bookingTo: { $gte: endDate },
          },
          // Case 3: Requested enquiry fully overlaps an existing enquiry
          {
            bookingFrom: { $gte: startDate },
            bookingTo: { $lte: endDate },
          },
        ],
      })

      const bookings = Booking.find({
        property: propertyId,
        bookingStatus: { $in: ['confirmed', 'checkedin'] },
        $or: [
          // Case 1: Requested booking starts within an existing booking
          {
            bookingFrom: { $lte: startDate },
            bookingTo: { $gte: startDate },
          },
          // Case 2: Requested booking ends within an existing booking
          {
            bookingFrom: { $lte: endDate },
            bookingTo: { $gte: endDate },
          },
          // Case 3: Requested booking fully overlaps an existing booking
          {
            bookingFrom: { $gte: startDate },
            bookingTo: { $lte: endDate },
          },
        ],
      })

      const [duplicateInquiries, duplicateBookings] = await Promise.all([
        inquiries,
        bookings,
      ])

      if (
        duplicateInquiries.length > 0 ||
        duplicateBookings.length > 0 ||
        !isDateRangeAvailable
      ) {
        return res
          .status(ErrorCode.HTTP_CONFLICT)
          .json(errorWrapper('Property Not Available'))
      } else {
        return res.status(200).json(errorWrapper('Property Available'))
      }
    } catch (err) {
      console.error(`Err loadSchedule`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

export default router
