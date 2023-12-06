import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import Booking from '../../models/Booking'
import GuestUserData, { IGuestUserData } from '../../models/GuestUserData'
import HostUserData from '../../models/HostUserData'
import Inquiry from '../../models/Inquiry'
import Property from '../../models/Property'
import getRequestDataDiff from '../../services/booking/getRequestDataDiff'
import createBookingRequest from '../../services/bookingRequest/createBookingRequest'
import getPriceDiff from '../../services/pricing/getPriceDiff'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import { createCronJob, stopCronJob } from '../../utils/cronJobs'
import {
  ADDONSERVICES_REQUESTED,
  CLEANING_CHARGES,
  SERVICE_REQUESTED,
} from '../../utils/requestNames'
// import { scheduleBookingCompletionCron } from '../../utils/scheduleBookingCompletionCron'
import { scheduleBookingCompletionCron } from '../../utils/scheduleBookingCompletionCron'
//import { createNotification } from '../../utils/notification'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Types } from 'mongoose'

const router = Router()

// TODO: only show paid inquiries to host

router.get('/getbookings', async (req: Request, res: Response) => {
  const totData = await Booking.find({})
    .populate({
      path: 'property',
      select:
        'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges nearbyMetro nearbyBusStop foodJoints',
      populate: {
        path: 'userData',
        select: 'user guestsHosted',
        populate: {
          path: 'user',
          select: 'firstName profileImage avatar',
        },
      },
    })
    .populate({
      path: 'inquiry',
      select: 'groupType createdAt',
    })
    .select('requestData')

  res.status(200).send(totData)
})

// @route       POST api/booking/addBooking
// @desc        Create/Add New Booking
// @access      Public
//Notes: Time sent by guest only after selecting relevant reschedule request, for host, accept uses current time
router.post(
  '/addBooking/:inquiryId',
  userAuth,
  [
    check('time.bookingFrom')
      .optional()
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('time.bookingTo')
      .optional()
      .isISO8601()
      .withMessage('Booking To is not a valid date'),
  ],
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { inquiryId } = req.params
      const { time } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }
      let guestUserData: IGuestUserData | null = null

      const inquiry = await Inquiry.findOne({ _id: inquiryId })
      if (!inquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      const month = new Date().toLocaleString('default', { month: 'short' })
      const year = new Date().getFullYear()
      const userData = await HostUserData.findOne({ user: req.userData.id })
      if (userData) {
        userData.addBalance(month, year, Number(inquiry.amount))
      }

      if (time) {
        if (inquiry.hostRescheduleRequests.length === 0) {
          return res
            .status(ErrorCode.HTTP_FORBIDDEN)
            .json(errorWrapper('Reschedules not allowed'))
        } //Todo: Add check for time matching at least one of the reschedules!

        guestUserData = await GuestUserData.findOne({
          user: req.userData.id,
        })
        if (!guestUserData) {
          return res
            .status(ErrorCode.HTTP_BAD_REQ)
            .json(errorWrapper('Guest Profile Not Found'))
        } else if (
          inquiry.guestUserData.toString() !== guestUserData._id.toString()
        ) {
          return res
            .status(ErrorCode.HTTP_FORBIDDEN)
            .json(errorWrapper('Guest mismatch'))
        }

        const { bookingFrom, bookingTo } = time
        inquiry.bookingFrom = bookingFrom
        inquiry.bookingTo = bookingTo
        inquiry.hostRescheduleRequests = []
      }
      inquiry.inquiryStatus = 'confirmed'
      inquiry.hostRescheduleRequests = []
      await inquiry.save()

      // TODO: find other inquiries for this guest from an order or cart and cancel them for now and schedule a cron job to delete them after 24 hours
      const otherInquiries = await Inquiry.find({
        guest: inquiry.guest,
        order: new Types.ObjectId(inquiry.order),
        paymentStatus: 'paid',
        inquiryStatus: 'pending',
      })
      for (let inquiryDetail of otherInquiries) {
        inquiryDetail.inquiryStatus = 'cancelled'
        inquiryDetail.cancelledBy = { host: false, guest: true }
        inquiryDetail.statusUpdateReason =
          'Another inquiry has been confirmed for this time slot'
        inquiryDetail.statusUpdatedAt = new Date()
        await inquiryDetail.save()
        stopCronJob(inquiryDetail._id.toString())
      }

      createCronJob(
        inquiry._id,
        false,
        new Date(new Date(inquiry.bookingFrom).setHours(8, 0, 0, 0)),
        'LOCATION_DETAILS_AVAILABLE'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(new Date(inquiry.bookingFrom).setHours(8, 0, 0, 0)),
        'BOOKING_REMINDER_AT_8AM'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setHours(
            inquiry.bookingFrom.getHours() - 3
          )
        ),
        'BOOKING_REMINDER_BEFORE_3HRS'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setHours(
            inquiry.bookingFrom.getHours() - 1
          )
        ),
        'CHECK_IN_REMINDER'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setHours(
            inquiry.bookingFrom.getHours() - 12
          )
        ),
        'CHECK_IN_REMINDER_HOST_12HRS',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setHours(
            inquiry.bookingFrom.getHours() - 4
          )
        ),
        'CHECK_IN_REMINDER_HOST_4HRS',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setMinutes(
            inquiry.bookingFrom.getMinutes() + 5
          )
        ),
        'CHECK_IN_REMINDER_GUEST_HOST',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(inquiry.bookingFrom),
        'ONGOING_BOOKING_REMINDER'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingFrom).setMinutes(
            inquiry.bookingFrom.getMinutes() + 20
          )
        ),
        'ORDER_FOOD_REMINDER_GUEST'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingTo).setMinutes(
            inquiry.bookingTo.getMinutes() - 5
          )
        ),
        'CHECK_OUT_REMINDER_HOST_5MINS',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingTo).setMinutes(
            inquiry.bookingTo.getMinutes() - 5
          )
        ),
        'CHECK_OUT_REMINDER_GUEST_5MINS'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(inquiry.bookingTo),
        'CHECK_OUT_REMINDER_HOST',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(
          new Date(inquiry.bookingTo).setMinutes(
            inquiry.bookingTo.getMinutes() + 20
          )
        ),
        'RATE_GUEST_REMINDER_HOST',
        'host'
      )
      createCronJob(
        inquiry._id,
        false,
        new Date(inquiry.bookingTo),
        'REVIEW_SPACE_REMINDER'
      )
      stopCronJob(inquiry._id.toString())

      const property = await Property.findOne({ _id: inquiry.property._id })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      const newBooking: any = new Booking({
        property: inquiry.property._id,
        host: inquiry.host,
        guest: inquiry.guest,
        inquiry: inquiryId,
        bookingFrom: inquiry.bookingFrom,
        bookingTo: inquiry.bookingTo,
        bookingConfirmedAt: new Date(),
        requestData: {
          bookingFrom: inquiry.bookingFrom,
          bookingTo: inquiry.bookingTo,
          guestCount: inquiry.guestCount,
          servicesRequested: inquiry.servicesRequested,
          addOnServicesRequested: inquiry.addOnServicesRequested,
          cleaningCharges: inquiry.cleaningCharges,
          plateGlassCutlery: inquiry.plateGlassCutlery,
        },
        priceBreakdown:{
          nominalPrice: inquiry.priceBreakdown.nominalPrice,
          cleaningPrice: inquiry.priceBreakdown.cleaningPrice,
          addOnServicePrice: inquiry.priceBreakdown.addOnServicePrice,
          cutleryDiscount: inquiry.priceBreakdown.cutleryDiscount,
          totalPrice: inquiry.priceBreakdown.totalPrice,
          serviceCharge: inquiry.priceBreakdown.serviceCharge,
          gstAmount:inquiry.priceBreakdown.gstAmount,
        },
      })

      const createdBooking = await newBooking.save()

      scheduleBookingCompletionCron(
        createdBooking._id,
        createdBooking.requestData.bookingTo
      )
      newBooking.populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage ratings',
        },
      })

      let notificationType: string = ''

      if (time) {
        notificationType = 'ACCEPTED_RESCHEDULED_INQUIRY'
      } else {
        notificationType = 'BOOKING_CONFIRMED'
      }

      if (notificationType !== 'ACCEPTED_RESCHEDULED_INQUIRY') {
        //createNotification(notificationType, newBooking.guest)
      }
      //createNotification(notificationType, newBooking.inquiry.host)

      return res.json({
        message: 'Booking Created Successfully',
        booking: createdBooking,
      })
    } catch (err) {
      console.error(`Err addBooking:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addMeToBooking
// @desc        Add Guest to a booking as an invited guest
// @access      Private
router.post(
  '/addMeToBooking',
  userAuth,
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const booking = await Booking.findOne({ _id: bookingId })
      const userData = await GuestUserData.findOne({ user: req.userData.id })
      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      } else if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('User Not Found'))
      }

      const invitedGuest = booking.invitedGuests.find(
        (guest) => guest.guest.toString() === userData._id.toString()
      )

      if (!invitedGuest) {
        booking.invitedGuests.push({
          guest: userData._id,
          idProofStatus: userData.idProofNumber
            ? 'verificationRequested'
            : 'pending',
        })
        userData.bookingsInvitedTo.push(bookingId)
        await userData.save()
        await booking.save()
      }

      return res.json({
        message: 'Added to Booking Successfully',
        booking: booking,
      })
    } catch (err) {
      console.error(`Err addBooking:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addMessageForGuest
// @desc        Add A message for the guest
// @access      Private
router.post(
  '/addMessageForGuest/:bookingId',
  checkAccess('host'),
  userAuth,
  [
    check('time.bookingFrom')
      .optional()
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('time.bookingTo')
      .optional()
      .isISO8601()
      .withMessage('Booking To is not a valid date'),
  ],
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { messageFromHost } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }
      Booking.updateOne(
        { _id: bookingId },
        {
          $set: { messageFromHost },
        }
      )
      return res.json({
        message: 'Message Added for Guest Successfully',
        messageFromHost: messageFromHost,
      })
    } catch (err) {
      console.error(`Err addBooking:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/booking/host/bookings
// @desc        Get Bookings for a Property
// @access      Public
router.get(
  '/host/bookings/:bookingStatus/:propertyId',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { bookingStatus, propertyId } = req.params

      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      // Calculate dateTodayMidnight (UTC)
      // Two Variables added for time frame between 1 month earlier and 1 month Later so Bookings
      // in that range can be fetched
      const today = new Date()
      const dateOneMonthEarlier = new Date(
        today.getTime() - 30 * 24 * 60 * 60 * 1000
      )
      const dateOneMonthLater = new Date(
        today.getTime() + 30 * 24 * 60 * 60 * 1000
      )

      const dateOneMonthEarlierMidnight = new Date(
        Date.UTC(
          dateOneMonthEarlier.getUTCFullYear(),
          dateOneMonthEarlier.getUTCMonth(),
          dateOneMonthEarlier.getUTCDate(),
          0,
          0,
          0
        )
      )

      const dateOneMonthLaterMidnight = new Date(
        Date.UTC(
          dateOneMonthLater.getUTCFullYear(),
          dateOneMonthLater.getUTCMonth(),
          dateOneMonthLater.getUTCDate(),
          0,
          0,
          0
        )
      )

      const bookings = await Booking.find({
        property: new Types.ObjectId(propertyId),
        bookingStatus: bookingStatus,
        'requestData.bookingFrom': {
          $gte: dateOneMonthEarlierMidnight,
        },
        'requestData.bookingTo': {
          $lte: dateOneMonthLaterMidnight,
        },
      }).select('-changesRequested -changeData -order -changeOrders -paymentRetries -invitedGuests -reschedule')

        .populate({
          path: 'inquiry',
          select: 'amount groupType additionalNotes',
          populate: {
            path: 'guest property guestUserData',
            select:
              'firstName lastName avatar propertyName phone profileImage idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
          },
        })
        .populate({
          path: 'invitedGuests.guest',
          select:
            'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
          populate: {
            path: 'user',
            select: 'firstName lastName avatar profileImage',
          },
        })

      if (!bookings.length) {
        return res.status(200).json([])
      }

      return res.json(bookings)
    } catch (err) {
      console.error(`Err loadBookings`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/booking/guest/bookings/invitedToBookings
// @desc        Get Bookings that the guest is invited to only!
// @access      Public
router.get(
  '/guest/bookings/invitedToBookings',
  userAuth,
  checkAccess('guest'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const guestUserData = await GuestUserData.findOne({
        user: req.userData.id,
      })
      if (!guestUserData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('User Not Found'))
      }

      const bookings = await Booking.find({
        'invitedGuests.guest': guestUserData._id,
      })
        .sort({ 'requestData.bookingFrom': -1 })
        .populate({
          path: 'inquiry property',
          select:
            'groupType amount propertyName city state propertyPictures propertyThumbnails',
        })
        .select(
          'requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery cancelledBy cancellationReason bookingCancellationDate refundStatus'
        )

      if (!bookings) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Bookings Found'))
      }

      return res.json(bookings)
    } catch (err) {
      console.error(`Err loadBookings`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/booking/guest/bookings
// @desc        Get Bookings
// @access      Public
router.get(
  '/guest/bookings/:bookingStatus',
  userAuth,
  checkAccess('guest'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {

      
      const { bookingStatus } = req.params


      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      let bookings;
      if(bookingStatus === 'confirmed') {
        
        bookings = await Booking.find({
          bookingStatus: 'confirmed',
          guest: new Types.ObjectId(req.userData.id),
        })
          .sort({ 'requestData.bookingFrom': -1 })
          .populate({
            path: 'inquiry property',
            select:
              'groupType amount propertyName city state propertyPictures propertyThumbnails maxGuestCount addOnServices',
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .select(
            'bookingStatus bookingCancellationDate refundStatus invitedGuests checkIn checkOut reschedule requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery priceBreakdown'
          )

      }

      else if (bookingStatus === 'cancelled') {
        
        bookings = await Booking.find({
          bookingStatus: 'cancelled',
          guest: new Types.ObjectId(req.userData.id),
        })
          .sort({ 'requestData.bookingFrom': -1 })
          .populate({
            path: 'inquiry property',
            select:
              'groupType amount propertyName city state propertyPictures propertyThumbnails maxGuestCount addOnServices',
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .select(
            'bookingCancellationDate refundStatus refundAmount cancellationCharge cancelledBy cancellationReason invitedGuests checkIn checkOut reschedule requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery priceBreakdown'
          )
      }
      
      else if (bookingStatus === 'rescheduleRequested') {
        const rescheduleRequestedInquiries = await Inquiry.find({
          guest: new Types.ObjectId(req.userData.id),
          'hostRescheduleRequests.0': { $exists: true },
        })
          // TODO: Inquiry: pull the data from requestData
          .select(
            'property hostRescheduleRequests bookingFrom bookingTo groupType guestCount'
          )
          .populate({
            path: 'property',
            select:
              'propertyName propertyDescription propertyPictures propertyThumbnails city state',
          })
        if (rescheduleRequestedInquiries.length > 0) {
          return res.json({ bookings, inquiries: rescheduleRequestedInquiries })
        }
      }

      if (!bookings || bookings===undefined || bookings===null ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Bookings Found'))
      }
      return res.json(bookings)
    } catch (err) {
      console.error(`Err loadBookings`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/booking/guest/bookings
// @desc        Get Bookings
// @access      Public
router.get(
  '/guest/unpaidbookings/',
  userAuth,
  checkAccess('guest'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const bookingStatus = 'pending'
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const inquiryPropertySelect =
        'groupType amount propertyName city state propertyPictures propertyThumbnails'
      const invitedGuestsSelect =
        'idProofFront idProofBack idProofType idProofNumber dateOfBirth user'
      const userSelect = 'firstName lastName avatar profileImage'
      const bookingSelect =
        'bookingStatus requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery inquiry property cancelledBy cancellationReason bookingCancellationDate refundStatus invitedGuests checkIn checkOut reschedule totalPayment.totalAmount priceBreakdown'

      // Break the query into smaller parts and chain them together
      const bookings = await Booking.find({
        bookingStatus: bookingStatus,
        guest: new Types.ObjectId(req.userData.id),
      })
        .sort({ 'requestData.bookingFrom': -1 })
        .populate({
          path: 'order',
          match: {
            $or: [{ paymentStatus: 'pending' }, { paymentStatus: 'cancelled' }],
          },
        })
        .populate({
          path: 'inquiry property',
          select: inquiryPropertySelect,
        })
        .populate({
          path: 'invitedGuests.guest',
          select: invitedGuestsSelect,
          populate: {
            path: 'user',
            select: userSelect,
          },
        })
        .select(bookingSelect)

      if (!bookings.length) {
        return res
          .status(200)
          .send([])
      }

      return res.json(bookings)
    } catch (err) {
      console.error(`Err loadBookings`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addGuests
// @desc        Add Invited Guests
// @access      Public
router.post(
  '/addGuests/:bookingId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('invitedGuests.*', 'Invited Guests should not be empty')
      .not()
      .isEmpty(),
    check('invitedGuests.*.name', 'Invited Guests Name is required')
      .not()
      .isEmpty()
      .trim(),
    check(
      'invitedGuests.*.dateOfBirth',
      'Invited Guests Date of Birth is required'
    )
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('Date of Birth is not a valid date'),
    check('invitedGuests.*.phone', 'Invited Guests Phone Number is required')
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
      const { bookingId } = req.params
      const { invitedGuestIds } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $push: { invitedGuests: { $each: invitedGuestIds } } },
        { new: true }
      )

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      return res.json({
        message: 'Guests Added Successfully',
        booking: booking,
      })
    } catch (err) {
      console.error(`Err addInvitedGuests:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/removeGuest
// @desc        Remove Invited Guest
// @access      Public
router.post(
  '/removeGuest/:bookingId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('invitedGuestId', 'Invited Guest Id should not be empty')
      .not()
      .isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { invitedGuestId } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $pull: { invitedGuests: { guest: invitedGuestId } } },
        { new: true }
      )

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      return res.json({
        message: 'Guest Removed Successfully',
        booking: booking,
      })
    } catch (err) {
      console.error(`Err addInvitedGuests:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/setMainGuestIdStatus/:bookingId
// @desc        Set Status for Booking Guest
// @access      Private
router.post(
  '/setMainGuestIdStatus/:bookingId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('idStatus', 'ID Status is required')
      .not()
      .isEmpty()
      .withMessage('ID Status is not a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { idStatus } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $set: { guestIdStatus: idStatus } },
        { new: true }
      )

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }
      return res.json({
        message: 'Guests ID Verification Status Updated Successfully',
        booking: booking,
      })
    } catch (err) {
      console.error(`Err checkID:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/setIdStatus/:bookingId
// @desc        Set Status for Invited Guest
// @access      Private
router.post(
  '/setIdStatus/:bookingId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('idStatus', 'ID Status is required')
      .not()
      .isEmpty()
      .withMessage('ID Status is not a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { idStatus, invitedGuestId } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId, 'invitedGuests.guest': invitedGuestId },
        { $set: { 'invitedGuests.$.idProofStatus': idStatus } },
        { new: true }
      )

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }
      return res.json({
        message: 'Guests ID Verification Status Updated Successfully',
        booking: booking,
      })

      // if (idStatus === 'reuploadRequested') {
      //   //createNotification('REUPLOAD_ID', booking.guest)
      // }
    } catch (err) {
      console.error(`Err checkID:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/reschedule/:bookingId
// @desc        Reschedule a Booking
// @access      Public
router.post(
  '/reschedule/:bookingId',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('reschedule', 'Reschedule is required').not().isEmpty(),
    check('reschedule.bookingFrom')
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('reschedule.bookingTo')
      .isISO8601()
      .withMessage('Booking To is not a valid date'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { reschedule } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null ||
        !req.roles
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const requestedBy = req.roles.includes('host') ? 'host' : 'guest'

      const setBlock: any = {
        bookingStatus: 'rescheduleRequested',
        rescheduleRequestedOn: new Date(),
      }

      if (requestedBy === 'guest') {
        setBlock.rescheduledByGuest = true
      }

      const rescheduledBooking: any = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $push: {
            reschedule: { ...reschedule, requestedBy },
          },
          $set: {
            ...setBlock,
          },
        },
        { new: true }
      )
        .populate({
          path: 'property',
          select:
            'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges',
          populate: {
            path: 'userData',
            select: 'user guestsHosted',
            populate: {
              path: 'user',
              select: 'firstName profileImage avatar',
            },
          },
        })
        .populate({
          path: 'invitedGuests.guest',
          select:
            'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
          populate: {
            path: 'user',
            select: 'firstName lastName avatar profileImage',
          },
        })
        .populate({
          path: 'inquiry',
          select: 'groupType createdAt',
        })
        .select(
          '_id property guest inquiry requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery bookingConfirmedAt'
        )

      if (!rescheduledBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      if (rescheduledBooking.guest === new Types.ObjectId(req.userData.id)) {
        //createNotification('RESCHEDULED_BOOKING_BY_GUEST', rescheduledBooking.property.userData._id)
      } else {
        //createNotification('RESCHEDULED_BOOKING_BY_HOST',rescheduledBooking.guest)
      }

      return res.json({
        message: 'Booking Rescheduled Successfully',
        booking: rescheduledBooking,
      })
    } catch (err) {
      console.error(`Err reschedule:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/checkInGuest/:bookingId
// @desc        Log Check In of guest
// @access      Public
router.post(
  '/checkInGuest/:bookingId',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('extend', 'Extend is required')
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage('Extend is not a valid boolean'),
    check('checkInAt')
      .optional()
      .isISO8601()
      .withMessage('Check In At is not a valid date'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { extend, checkInAt } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const extendedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            checkIn: {
              extend: extend,
              checkInAt: checkInAt,
            },
          },
        },
        { new: true }
      ).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage',
        },
      })

      if (!extendedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      //createNotification('CHECKED_IN_GUEST', extendedBooking.guest)

      return res.json({
        message: 'Booking Checked In Successfully',
        inquiry: extendedBooking,
      })
    } catch (err) {
      console.error(`Err checkInGuest:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/checkOutGuest/:bookingId
// @desc        Log Check Out of Guests
// @access      Public
router.post(
  '/checkOutGuest/:bookingId',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('extend', 'Extend is required')
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage('Extend is not a valid boolean'),
    check('checkOutAt')
      .optional()
      .isISO8601()
      .withMessage('Check Out At is not a valid date'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { extend, checkOutAt } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const extendedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            checkOut: {
              extend: extend,
              checkOutAt: checkOutAt,
            },
          },
        },
        { new: true }
      ).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage',
        },
      })

      if (!extendedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      if (
        extend === false &&
        new Date() < new Date(extendedBooking.requestData.bookingTo)
      ) {
        //createNotification('FORCE_CHECKED_OUT_GUEST', extendedBooking.guest)
      }

      return res.json({
        message: 'Booking Checked Out Successfully',
        inquiry: extendedBooking,
      })
    } catch (err) {
      console.error(`Err checkOutGuest:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       PATCH api/booking/requestChange
// @desc        Request Change on a Booking
// @access      Public
router.patch(
  '/requestChange/:bookingId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('orderId', 'Order Id is required').not().isEmpty(),
    check('newRequestData.property', 'Property is required').not().isEmpty(),
    check('newRequestData.bookingFrom', 'Booking From is required').isISO8601(),
    check('newRequestData.bookingTo', 'Booking To is required').isISO8601(),
    check('newRequestData.guestCount', 'Guest Count is required').isInt({
      min: 1,
    }),
    check(
      'newRequestData.servicesRequested',
      'Services Requested must be an array of allowed values'
    )
      .optional()
      .isArray()
      .notEmpty()
      .custom((value) => {
        const allowedServices = SERVICE_REQUESTED
        return value.every((item: string) => allowedServices.includes(item))
      }),
    check(
      'newRequestData.cleaningCharges',
      'Cleaning Charges must be an array of allowed values'
    )
      .optional()
      .isArray()
      .notEmpty()
      .custom((value) => {
        const allowedCleaningCharges = CLEANING_CHARGES
        return value.every((item: string) =>
          allowedCleaningCharges.includes(item)
        )
      }),
    check(
      'newRequestData.addOnServicesRequested',
      'Add-on Services Requested must be an array of allowed values'
    )
      .optional()
      .isArray()
      .notEmpty()
      .custom((value) => {
        const allowedAddOnServices = ADDONSERVICES_REQUESTED
        return value.every((item: string) =>
          allowedAddOnServices.includes(item)
        )
      }),
    check(
      'newRequestData.plateGlassCutlery',
      'Plate Glass Cutlery must be a boolean'
    )
      .optional()
      .isBoolean(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const bookingId = new Types.ObjectId(req.params.bookingId)
      const { newRequestData } = req.body
      let { orderId } = req.body
      orderId = new Types.ObjectId(orderId)

      // check if the booking exists
      // get booking from bookingId
      const booking = await Booking.findById(bookingId)

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking not found'))
      }

      // call getRequestDataDiff and save the returned value to the booking's requestData field
      const requestDataDiff = await getRequestDataDiff(booking, newRequestData)
      const bookingRequestData = await createBookingRequest({
        ...requestDataDiff,
        bookingId,
        inquiryId: booking.inquiry,
      })
      const priceDiffData = await getPriceDiff(booking, bookingRequestData)
      const { finalPayablePrice, ...bookingRequestPriceDifference } =
        priceDiffData
      // get inquiry using findById from mongoose.js using booking.inquiry
      const inquiry = await Inquiry.findById(booking.inquiry)
        .populate({
          path: 'property',
          model: 'property',
          select: {
            _id: 1,
            propertyName: 1,
            propertyPictures: 1,
            city: 1,
            state: 1,
            pricing: 1,
          },
        })
        .populate('bookingRequestData')

      if (!inquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry not found'))
      }

      inquiry.bookingRequestData = bookingRequestData._id
      inquiry.bookingRequestPriceDifference = bookingRequestPriceDifference
      await inquiry.save()
      await inquiry.populate('bookingRequestData')

      // add inquiry to cart
      const paymentResponse = inquiry

      return res.json(paymentResponse)

      // create notification
    } catch (err) {
      console.error(`Err requestChange:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addHostReview
// @desc        Add Host Review for a Completed Booking
// @access      Public
router.post(
  '/addHostReview/:bookingId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('rating', 'Rating is required').not().isEmpty().trim(),
    check('review').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { rating, review } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const reviewedBooking: any = await Booking.findOne({
        _id: bookingId,
      }).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'firstName avatar userData propertyName phone profileImage',
        },
      })

      if (!reviewedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      const reviewedHost = await HostUserData.findOneAndUpdate(
        { _id: reviewedBooking.inquiry.property.userData },
        {
          $set: {
            reviews: {
              showReview: true,
              reviewer: req.userData.id,
              rating: rating,
              review: review,
              reviewedOn: new Date(),
            },
          },
          $inc: {
            [`ratings.${rating}`]: 1,
          },
        },
        { new: true }
      )
      if (reviewedHost) {
        reviewedBooking.reviews.hostReview = reviewedHost.reviews[0]._id
        await reviewedBooking.save()
      }

      //createNotification('HOST_REVIEWED', reviewedBooking.inquiry.host)

      return res.json({
        message: 'Booking Reviewed Successfully',
        booking: reviewedBooking,
      })
    } catch (err) {
      console.error(`Err addHostReview:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addGuestReview
// @desc        Add Guest Review for a Completed Booking
// @access      Public
router.post(
  '/addGuestReview/:bookingId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('rating', 'Rating is required').not().isEmpty().trim(),
    check('review').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { rating, review } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const reviewedBooking: any = await Booking.findOne({
        _id: bookingId,
      }).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage',
        },
      })

      if (!reviewedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      const reviewedGuest = await GuestUserData.findOneAndUpdate(
        { _id: reviewedBooking.inquiry.guestUserData },
        {
          $set: {
            reviews: {
              showReview: true,
              reviewer: req.userData.id,
              rating: rating,
              review: review,
              reviewedOn: new Date(),
            },
          },
          $inc: {
            [`ratings.${rating}`]: 1,
          },
        },
        { new: true }
      )
      if (reviewedGuest) {
        reviewedBooking.reviews.guestReview = reviewedGuest.reviews[0]._id
        await reviewedBooking.save()
      }
      return res.json({
        message: 'Booking Reviewed Successfully',
        booking: reviewedBooking,
      })
    } catch (err) {
      console.error(`Err addGuestReview:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addGuestReview
// @desc        Add Guest Review for a Completed Booking
// @access      Public
router.post(
  '/addPropertyReview/:bookingId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('rating', 'Rating is required').not().isEmpty().trim(),
    check('cleanliness', 'cleanliness is required').not().isEmpty(),
    check('checkIn', 'Check-in is required').not().isEmpty(),
    check('review').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { rating, cleanliness, checkIn, review } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const reviewedBooking = await Booking.findOne({
        _id: bookingId,
      }).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage',
        },
      })

      if (!reviewedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      const reviewedProperty = await Property.findOneAndUpdate(
        { _id: reviewedBooking.property },
        {
          $push: {
            reviews: {
              reviewer: new Types.ObjectId(req.userData.id),
              rating: rating,
              cleanliness: cleanliness,
              checkIn: checkIn,
              review: review,
              reviewedOn: new Date(),
            },
          },
          $inc: {
            [`ratings.property.${rating}`]: 1,
            [`ratings.cleanliness.${cleanliness}`]: 1,
            [`ratings.checkIn.${checkIn}`]: 1,
          },
        },
        { new: true }
      )

      if (reviewedProperty) {
        reviewedBooking.reviews.propertyReview = reviewedProperty.reviews[0]._id
        await reviewedBooking.save()
      }

      return res.json({
        message: 'Booking Reviewed Successfully',
        booking: reviewedBooking,
      })
    } catch (err) {
      console.error(`Err addGuestReview:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/addGuestReviewReply
// @desc        Reply to Guest Review
// @access      Public
router.post(
  '/addGuestReviewReply/:bookingId',
  userAuth,
  //**********************************Validations**********************************/
  [check('reply', 'Reply is required').not().isEmpty().trim()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      const { reply } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const repliedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            reviews: {
              guestReview: {
                hostReply: { reply: reply, repliedAt: new Date() },
              },
            },
          },
        },
        { new: true }
      ).populate({
        path: 'inquiry',
        populate: {
          path: 'guest property guestUserData',
          select: 'name avatar propertyName phone profileImage',
        },
      })

      if (!repliedBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Not Found'))
      }

      return res.json({
        message: 'Replied Successfully',
        booking: repliedBooking,
      })
    } catch (err) {
      console.error(`Err addGuestReviewReply:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/booking/setBookingStatus
// @desc        Set Booking Status
// @access      Public
// router.post(
//   '/setBookingStatus/:bookingId',
//   userAuth,
//   //**********************************Validations**********************************/
//   [
//     check('bookingStatus', 'Booking Status is required').not().isEmpty().trim(),
//     check('cancellationReason').optional().trim(),
//     check('cancelledBy.host')
//       .optional()
//       .isBoolean()
//       .withMessage('Cancelled By Host must be boolean'),
//     check('cancelledBy.guest')
//       .optional()
//       .isBoolean()
//       .withMessage('Cancelled By Guest must be boolean'),
//     check('refundSource').optional(),
//     check('time.bookingFrom')
//       .optional()
//       .isISO8601()
//       .withMessage('Booking From is not a valid date'),
//     check('time.bookingTo')
//       .optional()
//       .isISO8601()
//       .withMessage('Booking To is not a valid date'),
//   ],
//   async (req: Request, res: Response) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       console.log(errors)
//       return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
//     }

//     //**********************************Handler Code**********************************/
//     try {
//       const { bookingId } = req.params
//       const {
//         bookingStatus,
//         cancelledBy,
//         cancellationReason,
//         refundSource,
//         time,
//       } = req.body
//       if (
//         !req.userData ||
//         req.userData.id === undefined ||
//         req.userData.id === null
//       ) {
//         return res
//           .status(ErrorCode.HTTP_BAD_REQ)
//           .json(errorWrapper('Invalid Token'))
//       }

//       interface IUpdateBlock {
//         bookingStatus: string
//         cancelledBy?: Object
//         bookingCancellationDate?: Date
//         cancellationReason?: string
//         reschedule?: Array<{
//           bookingFrom: Date
//           bookingTo: Date
//         }>
//         rescheduleAcceptedOn?: Date
//         bookingFrom?: Date
//         bookingTo?: Date
//       }
//       const updateBlock: IUpdateBlock = {
//         bookingStatus: bookingStatus,
//       }
//       if (bookingStatus === 'cancelled') {
//         updateBlock['cancelledBy'] = cancelledBy
//         updateBlock['bookingCancellationDate'] = new Date()
//         updateBlock['cancellationReason'] = cancellationReason
//       }
//       if (bookingStatus === 'confirmed' && time) {
//         updateBlock['reschedule'] = []
//         updateBlock['rescheduleAcceptedOn'] = new Date()
//         updateBlock['bookingFrom'] = time.from
//         updateBlock['bookingTo'] = time.to
//       }

//       const booking = await Booking.findOne({ _id: bookingId }).select(
//         'bookingStatus'
//       )

//       const updatedBooking: any = await Booking.findOneAndUpdate(
//         { _id: bookingId },
//         {
//           $set: updateBlock,
//         },
//         { new: true }
//       ).populate({
//         path: 'inquiry',
//         populate: {
//           path: 'guest property guestUserData',
//           select: 'name avatar propertyName phone profileImage',
//         },
//       })

//       if (!updatedBooking) {
//         return res
//           .status(ErrorCode.HTTP_BAD_REQ)
//           .json(errorWrapper('Booking Not Found'))
//       }

//       const payments = await Payment.findOne({ user: updatedBooking.guest })

//       if (bookingStatus === 'cancelled') {
//         const inquiry = await Inquiry.findOne({ _id: updatedBooking.inquiry })

//         let refundAmount = 0
//         let hostDeductBal = 0

//         if (inquiry) {
//           updatedBooking.refundStatus = 'pending'

//           const bookingFrom = new Date(updatedBooking.bookingFrom)
//           const bookingTo = new Date(updatedBooking.bookingTo)

//           const fourDaysPrior = new Date(bookingFrom)
//           fourDaysPrior.setDate(fourDaysPrior.getDate() - 4)
//           const fourDaysPriorTime = fourDaysPrior.getTime()
//           const fortyEightHoursPrior = new Date(bookingFrom)
//           fortyEightHoursPrior.setHours(fortyEightHoursPrior.getHours() - 48)
//           const fortyEightHoursPriorTime = fortyEightHoursPrior.getTime()
//           const thirtySixHoursPrior = new Date(bookingFrom)
//           thirtySixHoursPrior.setHours(thirtySixHoursPrior.getHours() - 24)
//           const thirtySixHoursPriorTime = thirtySixHoursPrior.getTime()
//           const twentyFourHoursPrior = new Date(bookingFrom)
//           twentyFourHoursPrior.setHours(twentyFourHoursPrior.getHours() - 24)
//           const twentyFourHoursPriorTime = twentyFourHoursPrior.getTime()
//           const currentTime = new Date().getTime()

//           const bookingDay = bookingFrom.getDay()

//           const bookingFromTime = bookingFrom.getTime()
//           const bookingToTime = bookingTo.getTime()

//           const weekendTimeFrame =
//             bookingFromTime >= 720 * 60 * 1000 &&
//             bookingFromTime <= 1439 * 60 * 1000
//           const weekDaysTimeFrame =
//             bookingToTime >= 0 && bookingToTime <= 719 * 60 * 1000

//           const isWeekend = bookingDay === 5 || bookingDay === 6

//           if (cancelledBy.guest) {
//             if (booking!.bookingStatus === 'cancelled') {
//               refundAmount = Number(inquiry.amount * 0.75)
//             } else if (isWeekend && weekendTimeFrame) {
//               if (
//                 currentTime > fourDaysPriorTime &&
//                 bookingFrom.getHours() < 11
//               ) {
//                 if (refundSource === 'Wallet') {
//                   refundAmount = Number(
//                     inquiry.amount - inquiry.originalAmount * 0.09
//                   )
//                   updatedBooking.refundStatus = 'refunded'
//                 } else {
//                   refundAmount = Number(
//                     inquiry.amount * 0.9 - inquiry.originalAmount * 0.09
//                   )
//                 }
//                 hostDeductBal = refundAmount
//               }

//               if (
//                 (currentTime < fourDaysPriorTime &&
//                   bookingFrom.getHours() > 11) ||
//                 (currentTime > fourDaysPriorTime &&
//                   currentTime < fortyEightHoursPriorTime)
//               ) {
//                 if (refundSource === 'Wallet') {
//                   refundAmount = Number(
//                     inquiry.amount * 0.75 - inquiry.originalAmount * 0.09
//                   )
//                   updatedBooking.refundStatus = 'refunded'
//                 } else {
//                   refundAmount = Number(
//                     inquiry.amount * 0.65 - inquiry.originalAmount * 0.09
//                   )
//                 }
//                 hostDeductBal = refundAmount
//               }

//               if (
//                 currentTime < fourDaysPriorTime &&
//                 currentTime > twentyFourHoursPriorTime
//               ) {
//                 if (refundSource === 'Wallet') {
//                   refundAmount = Number(
//                     inquiry.amount * 0.4 - inquiry.originalAmount * 0.09
//                   )
//                   updatedBooking.refundStatus = 'refunded'
//                 } else {
//                   refundAmount = Number(
//                     inquiry.amount * 0.3 - inquiry.originalAmount * 0.09
//                   )
//                 }
//                 hostDeductBal = Number(inquiry.amount * 0.5)
//               }

//               if (currentTime < twentyFourHoursPriorTime) {
//                 refundAmount = Number(
//                   inquiry.amount * 0.2 - inquiry.originalAmount * 0.09
//                 )
//                 hostDeductBal = Number(inquiry.amount * 0.7)
//                 updatedBooking.refundStatus = 'refunded'
//               }
//             } else if (!isWeekend && weekDaysTimeFrame) {
//               if (currentTime > fourDaysPriorTime) {
//                 if (refundSource === 'Wallet') {
//                   refundAmount = Number(
//                     inquiry.amount - inquiry.originalAmount * 0.09
//                   )
//                   updatedBooking.refundStatus = 'refunded'
//                 } else {
//                   refundAmount = Number(
//                     inquiry.amount * 0.9 - inquiry.originalAmount * 0.09
//                   )
//                 }
//                 hostDeductBal = refundAmount
//               }

//               if (
//                 currentTime < fourDaysPriorTime &&
//                 currentTime > twentyFourHoursPriorTime
//               ) {
//                 if (refundSource === 'Wallet') {
//                   refundAmount = Number(
//                     inquiry.amount * 0.85 - inquiry.originalAmount * 0.09
//                   )
//                   updatedBooking.refundStatus = 'refunded'
//                 } else {
//                   refundAmount = Number(
//                     inquiry.amount * 0.75 - inquiry.originalAmount * 0.09
//                   )
//                 }
//                 hostDeductBal = refundAmount
//               }

//               if (currentTime < twentyFourHoursPriorTime) {
//                 refundAmount = Number(
//                   inquiry.amount * 0.25 - inquiry.originalAmount * 0.09
//                 )
//                 hostDeductBal = Number(inquiry.amount - inquiry.amount * 0.65)
//                 updatedBooking.refundStatus = 'refunded'
//               }
//             }
//           } else if (cancelledBy.host) {
//             if (currentTime < thirtySixHoursPriorTime) {
//               refundAmount = inquiry.amount
//               hostDeductBal = refundAmount
//             }

//             if (currentTime < twentyFourHoursPriorTime) {
//               refundAmount = inquiry.amount + inquiry.originalAmount * 0.25
//               hostDeductBal = refundAmount + inquiry.originalAmount * 0.25
//             }
//           }

//           updatedBooking.refundAmount = refundAmount
//           await inquiry.save()

//           if (refundAmount > 0) {
//             payments!.payments.push({
//               host: inquiry.host,
//               paymentDate: new Date(),
//               paymentAmount: refundAmount,
//               paymentMode: refundSource,
//               paymentType: 'Credit',
//               paymentDescription: 'Refund for booking cancellation',
//             })
//             await payments!.save()

//             if (refundSource === 'Wallet') {
//               await GuestUserData.findByIdAndUpdate(
//                 updatedBooking.guest,
//                 {
//                   $inc: {
//                     wallet: refundAmount,
//                   },
//                 },
//                 {
//                   new: true,
//                 }
//               )
//             }
//           }

//           if (hostDeductBal > 0) {
//             const month = new Date(inquiry.createdAt.toString()).toLocaleString(
//               'default',
//               {
//                 month: 'short',
//               }
//             )
//             const year = new Date(inquiry.createdAt.toString()).getFullYear()
//             const userData = await HostUserData.findOne({
//               user: req.userData.id,
//             })
//             if (userData) {
//               userData.deductBalance(month, year, Number(hostDeductBal))
//             }
//           }
//         }
//       }

//       if (bookingStatus === 'confirmed') {
//         if (time) {
//           const { bookingFrom, bookingTo } = time
//           updatedBooking.bookingFrom = bookingFrom
//           updatedBooking.bookingTo = bookingTo
//           updatedBooking.reschedule = []
//           updatedBooking.save()
//         }
//       }

//       if (
//         bookingStatus === 'cancelled' &&
//         (cancelledBy.host || cancelledBy.guest)
//       ) {
//         if (cancelledBy.host) {
//           if (updatedBooking.reschedule.length > 0) {
//             //createNotification('BOOKING_RESCHEDULE_DECLINED_BY_HOST',updatedBooking.guest)
//           } else if (updatedBooking.changesRequested) {
//             //createNotification('BOOKING_CHANGES_DECLINED', updatedBooking.guest)
//           } else {
//             //createNotification('BOOKING_CANCELLED_BY_HOST',updatedBooking.guest)
//           }
//         } else if (cancelledBy.guest) {
//           if (updatedBooking.reschedule.length > 0) {
//             //createNotification('BOOKING_RESCHEDULE_DECLINED_BY_GUEST',updatedBooking.inquiry.host)
//           } else {
//             //createNotification('BOOKING_CANCELLED_BY_GUEST',updatedBooking.inquiry.host)
//           }
//         }
//       }

//       if (bookingStatus === 'confirmed') {
//         if (updatedBooking.changesRequested) {
//           //createNotification('BOOKING_CHANGES_ACCEPTED', updatedBooking.guest)
//         } else if (time) {
//           if (updatedBooking.reschedule.requestedBy === 'guest') {
//             //createNotification('BOOKING_RESCHEDULE_ACCEPTED_BY_HOST',updatedBooking.guest)
//           } else if (updatedBooking.reschedule.requestedBy === 'host') {
//             //createNotification('BOOKING_RESCHEDULE_ACCEPTED_BY_GUEST',updatedBooking.inquiry.host)
//           }
//         }
//       }

//       return res.json({
//         message: 'Booking Updated Successfully',
//         booking: updatedBooking,
//       })
//     } catch (err) {
//       console.error(`Err setBookingStatus:`, err)
//       res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
//     }
//   }
// )

// @route       GET api/booking/guest/confirmed/:bookingId
// @desc        Get One Booking for a Property
// @access      Public
router.get(
  'guest/confirmed/:bookingId',
  userAuth,
  checkAccess('guest'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { bookingId } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const bookingData = await Booking.findById(bookingId)

      if (!bookingData || bookingData.bookingStatus !== 'confirmed') {
        throw new Error('No Confirmed Booking Found')
      }

      // Assumption is server is running on the same timezone as the bookingFrom date
      const isBookingFromToday =
        bookingData.requestData.bookingFrom.setHours(0, 0, 0, 0) ===
        today.getTime()

      let booking
      if (!isBookingFromToday) {
        // if today is not the same as bookingFrom date (from midnight) then only populate below fields from the property
        /**
        Price Breakdown
        Total Paid Amount
        Payment Status with Timestamp
        FAQs
        servicesRequested
        addOnServicesRequested
        cleaningCharges
        groupType
        nearbyMetro.metroName
        nearbyMetro.distance   => Distance from Nearest Metro Station
        nearbyBusStop.busStopName  => Nearest Bus Station
        nearbyBusStop.distance    => Distance from Nearest Metro Station
       */
        booking = await Booking.findById(bookingId)
          .select(
            '_id property requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery invitedGuests guest bookingConfirmedAt invitedGuests checkIn checkOut bookingStatus'
          )
          .populate({
            path: 'property',
            select:
              'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges faqs nearbyMetro nearbyBusStop approximateLocationUrl',
            populate: {
              path: 'userData',
              select: 'user guestsHosted',
              populate: {
                path: 'user',
                select: 'firstName profileImage avatar',
              },
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .populate({
            path: 'inquiry',
            select:
              'groupType createdAt pricingHourType priceBreakdown paymentStatus',
          })
          .populate({
            path: 'order',
            select: 'amount paymentStatus',
            populate: {
              path: 'ccAvenueResponse',
            },
          })
      } else {
        // Populate all the below fields from the Property schema as well
        /** 
          houseNumber
          tower
          street
          locality
          landmark
          city
          state
          zipCode
          thinnaiLocationUrl
          directions (Steps to reach thinnai)
          Host Phone Number
          All the below fields too
        */
        booking = await Booking.findById(bookingId)
          .select(
            '_id property requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery invitedGuests guest bookingConfirmedAt checkIn checkOut bookingStatus tower street locality landmark city state area nearbyArea zipCode thinnaiLocationUrl'
          )
          .populate({
            path: 'property',
            select:
              'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges faqs nearbyMetro nearbyBusStop houseNumber',
            populate: {
              path: 'userData',
              select: 'user guestsHosted',
              populate: {
                path: 'user',
                select: 'firstName profileImage avatar',
              },
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .populate({
            path: 'inquiry',
            select: 'createdAt pricingHourType priceBreakdown paymentStatus',
          })
          .populate({
            path: 'order',
            select: 'amount paymentStatus',
            populate: {
              path: 'ccAvenueResponse',
            },
          })
      }

      return res.json(booking)
    } catch (err) {
      console.error(`Err loadBooking`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/booking/:bookingId
// @desc        Get One Booking for a Property
// @access      Public
router.get('/:bookingId', userAuth, async (req: Request, res: Response) => {
  //**********************************Handler Code**********************************/
  try {
    const { bookingId } = req.params
    if (
      !req.userData ||
      req.userData.id === undefined ||
      req.userData.id === null
    ) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('Invalid Token'))
    }

    let booking
    if (req.roles!.includes('host')) {
      const todayDate = new Date()
      // Replace this with the user-provided date
      const fromBooking = await Booking.findOne({ _id: bookingId })
      const bookingDate = fromBooking?.requestData.bookingFrom
      const twelveHoursAgo = new Date(todayDate.getTime() - 12 * 60 * 60 * 1000)
      // Compare userDate with the current date
      if (bookingDate && bookingDate > twelveHoursAgo) {
        booking = await Booking.findOne({
          _id: bookingId,
        })
          .populate({
            path: 'inquiry',
            populate: {
              path: 'guest property guestUserData',
              select:
                'name avatar propertyName phone profileImage ratings servicesRequested addOnServicesRequested cleaningCharges inquiryStatus paymentStatus priceBreakdown.totalPrice priceBreakdown.serviceCharge priceBreakdown.gstAmount priceBreakdown.nominalPrice priceBreakdown.cleaningPrice priceBreakdown.addOnServicePrice priceBreakdown.cutleryDiscount maxGuestCount addOnServices',
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage phone',
            },
          })
      } else {
        booking = await Booking.findOne({
          _id: bookingId,
        })
          .populate({
            path: 'inquiry',
            populate: {
              path: 'guest property guestUserData',
              select:
                'name avatar propertyName phone profileImage ratings paymentStatus servicesRequested addOnServicesRequested cleaningCharges inquiryStatus paymentStatus priceBreakdown.totalPrice priceBreakdown.serviceCharge priceBreakdown.gstAmount priceBreakdown.nominalPrice priceBreakdown.cleaningPrice priceBreakdown.addOnServicePrice priceBreakdown.cutleryDiscount maxGuestCount addOnServices',
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
      }
    } else {
      
      interface BookingDocument {
        _id: string;
        requestData: {
          bookingFrom: Date;
          // Other properties of requestData
        };
        inquiry: {
          paymentStatus: string;
          // Other properties of inquiry
        };
        // Other properties of the Booking document
      }
      const todayDate = new Date()
      const fromBooking:BookingDocument|null = await Booking.findOne({ _id: bookingId })
      const bookingDate = fromBooking?.requestData.bookingFrom
      const twelveHoursAgo = new Date(todayDate.getTime() - 12 * 60 * 60 * 1000)
      if (fromBooking?.inquiry?.paymentStatus==="pending" && bookingDate && bookingDate > twelveHoursAgo) {
        booking = await Booking.findOne({ _id: bookingId })
          .populate({
            path: 'property',
            select:
              'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges faqs houseNumber tower street locality landmark city state zipCode thinnaiLocationUrl directions nearbyMetro.metroName nearbyBusStop.busStopName maxGuestCount addOnServices',
            populate: {
              path: 'userData',
              select: 'user guestsHosted',
              populate: {
                path: 'user',
                select: 'firstName profileImage avatar phone',
              },
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .populate({
            path: 'inquiry',
            select:
              'groupType createdAt cleaningCharges servicesRequested addOnServicesRequested plateGlassCutlery pricingHourType priceBreakdown.totalPrice priceBreakdown.serviceCharge priceBreakdown.gstAmount priceBreakdown.nominalPrice priceBreakdown.cleaningPrice priceBreakdown.addOnServicePrice priceBreakdown.cutleryDiscount',
          })
          .populate({
            path: 'guest',
            select: 'firstName lastName',
          })
          // Fetching fields from requestData
          .select(
            '_id property inquiry invitedGuests guest requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery bookingConfirmedAt invitedGuests checkIn checkOut priceBreakdown totalPayment.totalAmount'
          )
      } else {
        booking = await Booking.findOne({ _id: bookingId })
          .populate({
            path: 'property',
            select:
              'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges approximateLocationUrl directions nearbyMetro.metroName nearbyBusStop.busStopName maxGuestCount addOnServices',
            populate: {
              path: 'userData',
              select: 'user guestsHosted',
              populate: {
                path: 'user',
                select: 'firstName profileImage avatar',
              },
            },
          })
          .populate({
            path: 'invitedGuests.guest',
            select:
              'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
            populate: {
              path: 'user',
              select: 'firstName lastName avatar profileImage',
            },
          })
          .populate({
            path: 'inquiry',
            select:
              'groupType createdAt cleaningCharges servicesRequested addOnServicesRequested plateGlassCutlery pricingHourType priceBreakdown.totalPrice priceBreakdown.serviceCharge priceBreakdown.gstAmount priceBreakdown.nominalPrice priceBreakdown.cleaningPrice priceBreakdown.addOnServicePrice priceBreakdown.cutleryDiscount',
          })
          .populate({
            path: 'guest',
            select: 'firstName lastName',
          })
          // Fetching fields from requestData
          .select(
            '_id property inquiry invitedGuests guest requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery bookingConfirmedAt invitedGuests checkIn checkOut priceBreakdown totalPayment.totalAmount'
          )
      }
    }

    if (!booking) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('No Booking Found'))
    }

    res.json(booking)
  } catch (err) {
    console.error(`Err loadBooking`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

router.get('/testapi/:bookingId', async (req, res) => {
  const { bookingId } = req.params
  const data = await Booking.findOne({ _id: bookingId })
    .populate({
      path: 'property',
      select:
        'userData propertyName propertyDescription propertyPictures propertyThumbnails directions amenities services houseRules directBooking additionalCharges approximateLocationUrl directions nearbyMetro.metroName nearbyBusStop.busStopName',
      populate: {
        path: 'userData',
        select: 'user guestsHosted',
        populate: {
          path: 'user',
          select: 'firstName profileImage avatar',
        },
      },
    })
    .populate({
      path: 'invitedGuests.guest',
      select:
        'idProofFront idProofBack idProofType idProofNumber dateOfBirth user',
      populate: {
        path: 'user',
        select: 'firstName lastName avatar profileImage',
      },
    })
    .populate({
      path: 'inquiry',
      select:
        'groupType createdAt cleaningCharges servicesRequested addOnServicesRequested plateGlassCutlery pricingHourType priceBreakdown.totalPrice priceBreakdown.serviceCharge priceBreakdown.gstAmount priceBreakdown.nominalPrice priceBreakdown.cleaningPrice priceBreakdown.addOnServicePrice priceBreakdown.cutleryDiscount',
    })
    .populate({
      path: 'guest',
      select: 'firstName lastName',
    })
    // Fetching fields from requestData
    .select(
      '_id property inquiry invitedGuests guest requestData.bookingFrom requestData.bookingTo requestData.guestCount requestData.servicesRequested requestData.addOnServicesRequested requestData.cleaningCharges requestData.plateGlassCutlery bookingConfirmedAt invitedGuests checkIn checkOut'
    )
  res.status(200).send(data)
})

router.post(
  '/hostPayout/:targetIds',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      //let bookingOrderPayment=0;
      let weekEarnings = 0
      let weekHostedHours = 0
      let weekDeductions = 0
      const hostCancellationCharge = 10

      const bookings: any = []
      const { payoutDateStart, payoutDateEnd } = req.body

      const { targetIds } = req.params
      const idsArray = targetIds.split(',')
      const bookingData = await Booking.find({
        property: { $in: idsArray },
        bookingFrom: { $gte: payoutDateStart },
        bookingTo: { $lte: payoutDateEnd },
      })
        .populate('host')
        .populate('inquiry', 'amount')
        .exec()
      console.log(bookingData)

      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }
      bookingData.map((booking: any) => {
        if (booking?.bookingStatus === 'confirmed') {
          weekEarnings += booking?.inquiry?.amount
          weekHostedHours +=
            Math.abs(
              booking.bookingTo?.getTime() - booking.bookingFrom?.getTime()
            ) /
            (1000 * 60 * 60)
        }

        if (booking?.bookingStatus === 'cancelled') {
          weekDeductions += hostCancellationCharge
        }
        const hostPayout = weekEarnings - weekDeductions
        const returnData = {
          weekEarn: weekEarnings,
          weekHosted: weekHostedHours,
          WeekDeduct: weekDeductions,
          hostPayout: hostPayout,
          payoutDateStart: payoutDateStart,
          payoutDateEnd: payoutDateEnd,
        }
        bookings.push(returnData)
      })

      return res.json({
        message: 'Success',
        data: bookings,
      })
    } catch (err) {
      console.error(`Err while Populating:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

export default router
