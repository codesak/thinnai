import createOrder from '../../services/order/createOrder'
import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
// import Booking from '../../models/Booking'
import GuestUserData from '../../models/GuestUserData'
import Inquiry from '../../models/Inquiry'
import Property from '../../models/Property'
// import checkAvailability from '../../services/booking/checkAvailability'
import determineBookingType from '../../services/pricing/determineBookingType'
import getPricingBreakdown from '../../services/pricing/getPricingBreakdown'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import { createCronJob, stopCronJob } from '../../utils/cronJobs'
import {
  ADDONSERVICES_REQUESTED,
  CLEANING_CHARGES,
  SERVICE_REQUESTED,
} from '../../utils/requestNames'
//import { createNotification } from '../../utils/notification'
import { Request, Response, Router } from 'express'
import { check, query, validationResult } from 'express-validator'
import { Types } from 'mongoose'
import Booking from "../../models/Booking"
import Order, { IORDER } from '../../models/Order'

const router = Router()

router.patch(
  '/update/bookStatus/:inquiryId',

  async(req:Request,res:Response)=>{
    const inquiryId=req.params.inquiryId

    try{
      const bookings=await Booking.findOneAndUpdate(
        {inquiry:inquiryId},
        {bookingStatus:'confirmed'}
      )
      if (!bookings) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Bookings Not Found'))
      }
      const order=await Order.findByIdAndUpdate(
        {_id:bookings?.order  },
        {paymentStatus:'confirmed'}
      )
      if (!order) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Order Not Found'))
      }
      console.log(inquiryId)
      res.status(200).send("Booking status confirmed...")
    }catch(e){

    }
  }
)


router.patch(
  '/update/isConfirmed/:inquiryId',
  userAuth,
  checkAccess('guest'),
  
  async(req:Request,res:Response)=>{
    const inquiryId=req.params.inquiryId
    try{
    
      await Inquiry.findOneAndUpdate(
        {_id:inquiryId},
        {isConfirmed:true}
      )
      const inquiry=await Inquiry.findOne({_id:inquiryId})
      
      await Property.findOneAndUpdate(
        {
          _id: inquiry?.property._id,
        },
        { $inc: { happyCustomers: inquiry?.guestCount } },
        { new: true, upsert: true }
      )
     // const { serviceCharge, gstAmount, totalPrice } = inquiry?.priceBreakdown
      const orderObj: Partial<IORDER> = {
        uniqueId: inquiry?.id,
        paymentStatus: 'pending',
        guest: inquiry?.guestUserData,
        enquiries: [inquiry?.id],
        amount: inquiry?.amount,
        paymentBreakdown: inquiry?.priceBreakdown
      }
  
      const newOrder = await createOrder(orderObj)
  
      const newBooking = new Booking({
        property: inquiry?.property,
        host: inquiry?.host,
        guest: inquiry?.guest,
        inquiry: inquiry?._id,
        bookingFrom: inquiry?.bookingFrom,
        bookingTo: inquiry?.bookingTo,
        bookingStatus: 'pending',
        bookingConfirmedAt: new Date(),
        order: newOrder._id,
        requestData: {
          bookingFrom: inquiry?.bookingFrom,
          bookingTo: inquiry?.bookingTo,
          guestCount: inquiry?.guestCount,
          servicesRequested: inquiry?.servicesRequested,
          addOnServicesRequested: inquiry?.addOnServicesRequested,
          cleaningCharges: inquiry?.cleaningCharges,
          plateGlassCutlery: inquiry?.plateGlassCutlery,
        },
        paymentRetries: [],
      })
      await newBooking.save()

      res.status(200).send("Data updated successfully")
    }catch(e){
      res.send(ErrorCode.HTTP_SERVER_ERROR)
    }

    
  }
)

// @route       POST api/inquiry/addInquiry
// @desc        Create/Add New Inquiry
// @access      Public
router.post(
  '/addInquiry/:propertyId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('amount', 'Amount is required')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Amount must be numeric'),
    check('originalAmount', 'Original Amount is required')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Amount must be numeric'),
    check('guestCount', 'Guest Count is required')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Guest Count must be numeric'),
    check('bookingFrom', 'Booking From is required')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('bookingTo', 'Booking To is required')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('Booking To is not a valid date'),
    check('groupType', 'Group Type is required').not().isEmpty().trim(),
    check('servicesRequested')
      .optional({ nullable: true })
      .isArray()
      .withMessage('addOnServicesRequested must be an array')
      .custom((array) =>
        array.every((service: string) => SERVICE_REQUESTED.includes(service))
      )
      .withMessage(
        `addOnServicesRequested elements must be one of the following: ${[
          'alcohol',
          'hookah',
        ].join(', ')}`
      ),
    check('addOnServicesRequested')
      .optional({ nullable: true })
      .isArray()
      .withMessage('addOnServicesRequested must be an array')
      .custom((array) =>
        array.every((service: string) =>
          ADDONSERVICES_REQUESTED.includes(service)
        )
      )
      .withMessage(
        `addOnServicesRequested elements must be one of the following: ${[
          'candleLightDinner',
          'movieScreening',
          'decorations',
        ].join(', ')}`
      ),
    check('cleaningCharges')
      .optional({ nullable: true })
      .isArray()
      .withMessage('cleaning charges must be an array')
      .custom((array) =>
        array.every((service: string) => CLEANING_CHARGES.includes(service))
      )
      .withMessage(
        `addOnServicesRequested elements must be one of the following: ${[
          'cake',
          'tableDecorations',
          'floorDecorations',
        ].join(', ')}`
      ),
    check('plateGlassCutlery').isBoolean(),
    check('additionalNotes').optional().trim(),
    check('propertyBookingType')
      .not()
      .isEmpty()
      .trim()
      .isIn(['instant', 'request']),
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
      const {
        amount,
        guestCount,
        bookingFrom,
        bookingTo,
        groupType,
        servicesRequested,
        paidServicesRequested,
        addOnServicesRequested,
        plateGlassCutlery,
        cleaningCharges,
        additionalNotes,
        multipleInquiriesMade,
        originalAmount,
        propertyBookingType,
      } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const property = await Property.findOne({ _id: propertyId })

      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      const guestUserData = await GuestUserData.findOne({
        user: req.userData.id,
      })

      if (!guestUserData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Guest Profile Not Found'))
      }

      // const requestedBookingFrom = bookingFrom
      // const requestedBookingTo = bookingTo
      // async function findConflictingInquiry(
      //   propertyId: string,
      //   requestedBookingFrom: Date,
      //   requestedBookingTo: Date
      // ) {
      //   const inquiry = await Inquiry.findOne({
      //     property: propertyId,
      //     $or: [
      //       {
      //         $and: [
      //           { bookingFrom: { $gte: requestedBookingFrom } },
      //           { bookingFrom: { $lt: requestedBookingTo } },
      //         ],
      //       },
      //       {
      //         $and: [
      //           { bookingTo: { $gt: requestedBookingFrom } },
      //           { bookingTo: { $lte: requestedBookingTo } },
      //         ],
      //       },
      //     ],
      //     inquiryStatus: { $ne: 'cancelled' },
      //     paymentStatus: 'paid',
      //   })
      //   console.log('====> findConflictingInquiry = ', inquiry)
      //   return inquiry
      // }

      // const inquiry = await findConflictingInquiry(
      //   propertyId,
      //   requestedBookingFrom,
      //   requestedBookingTo
      // )

      // const isAvailable = await checkAvailability({
      //   bookingFrom,
      //   bookingTo,
      //   propertyId: new Types.ObjectId(propertyId),
      // })

      // if (!isAvailable) {
      //   return res
      //     .status(ErrorCode.HTTP_BAD_REQ)
      //     .json(errorWrapper('Inquiry conflicts with an existing inquiry'))
      // }

      if (propertyBookingType === 'request' && property.directBooking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property is not available for request booking'))
      }
      // TODO: populate pricingHourType and priceBreakdown
      const pricingHourType = determineBookingType(
        new Date(bookingFrom),
        new Date(bookingTo)
      )
      console.log('====> pricingHourType = ', pricingHourType)
      if (pricingHourType === 'invalid') {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking is not valid'))
      }

      const {
        nominalPrice,
        cleaningPrice,
        addOnServicePrice,
        cutleryDiscount,
        totalPrice,
        serviceCharge,
        gstAmount,
        finalPayablePrice,
      } = getPricingBreakdown({
        property,
        bookingFrom: new Date(bookingFrom),
        bookingTo: new Date(bookingTo),
        guestCount,
        servicesRequested,
        cleaningCharges,
        addOnServicesRequested,
        plateGlassCutlery,
      })

      const priceBreakdown = {
        nominalPrice, // property.pricing based on Joy/Gala, guest count, duration, no of guest
        cleaningPrice, // isolate cleaning calculation for pricing service
        addOnServicePrice, // get for each item property.addOnServices.addOnPrice
        cutleryDiscount, // 5% discount on the nominal price if the guest doesn't choose
        totalPrice, // It is just the sum of all the prices nominalPrice + cleaningPrice + addOnServicePrice + cutleryDiscount
        serviceCharge, // 9.5% (nominalPrice + cleaningPrice + addOnServicePrice + cutleryDiscount(-Ve))
        gstAmount, // 18% of serviceCharge
      }

      console.log('====> amount = ', amount)
      // if (amount !== finalPayablePrice) {
      //   return res
      //     .status(ErrorCode.HTTP_BAD_REQ)
      //     .json(errorWrapper('Amount is not valid'))
      // }

      const newInquiry = new Inquiry({
        property: propertyId,
        host: property.user,
        guest: new Types.ObjectId(req.userData.id),
        guestUserData: guestUserData._id,
        createdAt: new Date(),
        amount: finalPayablePrice,
        originalAmount,
        guestCount,
        bookingFrom,
        bookingTo,
        groupType,
        servicesRequested,
        paidServicesRequested,
        addOnServicesRequested,
        plateGlassCutlery,
        cleaningCharges,
        additionalNotes,
        multipleInquiriesMade,
        pricingHourType: pricingHourType.toLowerCase(),
        priceBreakdown,
        propertyBookingType: property.directBooking ? 'instant' : 'request',
      })

      await newInquiry.save()
      newInquiry.populate({
        path: 'guest guestUserData property',
        select: 'firstName avatar profileImage ratings propertyName',
      })

      createCronJob(
        newInquiry._id,
        true,
        process.env.CRON_JOB_TIME as string,
        'ENQUIRY_EXPIRED'
      )

      if (
        new Date(bookingFrom).getDate() === new Date().getDate() &&
        new Date(bookingFrom).getMonth() === new Date().getMonth() &&
        new Date(bookingFrom).getFullYear() === new Date().getFullYear()
      ) {
        //createNotification('SAME_DAY_INQUIRY', newInquiry.guest)
      }

      // if direct booking approve inquiry /addBooking/:inquiryId
      if (property.directBooking) {
        const inquiry = newInquiry

        inquiry.inquiryStatus = 'confirmed'
        inquiry.hostRescheduleRequests = []
        await inquiry.save()

        const otherInquiries = await Inquiry.find({
          guest: inquiry.guest,
          bookingFrom: inquiry.bookingFrom,
          bookingTo: inquiry.bookingTo,
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

        // const newBooking: any = new Booking({
        //   property: inquiry.property._id,
        //   host: inquiry.host,
        //   guest: inquiry.guest,
        //   inquiry: inquiry._id,
        //   bookingFrom: inquiry.bookingFrom,
        //   bookingTo: inquiry.bookingTo,
        //   bookingConfirmedAt: new Date(),
        // })

        // const createdBooking = await newBooking.save()

        // newBooking.populate({
        //   path: 'inquiry',
        //   populate: {
        //     path: 'guest property guestUserData',
        //     select: 'name avatar propertyName phone profileImage ratings',
        //   },
        // })

        // let notificationType: string = ''

        // notificationType = 'BOOKING_CONFIRMED'

        // if (notificationType !== 'ACCEPTED_RESCHEDULED_INQUIRY') {
        //   //createNotification(notificationType, newBooking.guest)
        // }
        //createNotification(notificationType, newBooking.inquiry.host)
        const updateHappyCustomer=await Property.findOneAndUpdate(
          {
            _id: property._id,
          },
          {happyCustomers:property.happyCustomers+guestCount},
          { new: true, upsert: true }
        )

        res.json({
          message: 'Booking Created Successfully & Inquiry Added Successfully',
          inquiry: newInquiry,
          happyCustomers:updateHappyCustomer
        })
      } else {
        const updateHappyCustomer=await Property.findOneAndUpdate(
          {
            _id: property._id,
          },
          {happyCustomers:property.happyCustomers+guestCount},
          { new: true, upsert: true }
        )
        res.json({
          message: 'Inquiry Added Successfully',
          inquiry: newInquiry,
          happyCustomers:updateHappyCustomer
        })
      }
  
    } catch (err) {
      console.error(`Err addInquiry:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/inquiry/host/inquiries
// @desc        Get all Inquiries for a Property
// @access      Public
router.get(
  '/host/inquiries/:propertyId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    query('inquiriesFrom', 'Inquiries From is required')
      .not()
      .isEmpty()
      .isISO8601(),
    query('inquiriesTo', 'Inquiries To is required')
      .not()
      .isEmpty()
      .isISO8601(),
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
      const { inquiriesFrom, inquiriesTo } = req.query
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const property = await Property.findOne({ _id: propertyId })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      } else if (
        typeof inquiriesFrom !== 'string' ||
        typeof inquiriesTo !== 'string'
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Dates'))
      }

      const inquiries = await Inquiry.find({
        property: propertyId,
        inquiryStatus: 'pending',
        bookingFrom: {
          $gte: new Date(inquiriesFrom),
        },
        bookingTo: {
          $lte: new Date(inquiriesTo),
        },
      })
        .populate('guest', 'firstName avatar profileImage')
        .select(
          '_id guest guestCount hostRescheduleRequests amount bookingFrom bookingTo groupType createdAt multipleInquiriesMade addOnServicesRequested'
        )
      res.json(inquiries)
    } catch (err) {
      console.error(`Err loadInquiry`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/inquiry/guest/inquiries
// @desc        Get all Inquiries for a Guest
// @access      Public
router.get(
  '/guest/inquiries',
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

      const inquiries = await Inquiry.aggregate([
        {
          $match: {
            guest: new Types.ObjectId(req.userData.id),
            $or: [{ inquiryStatus: 'pending' }, { inquiryStatus: 'cancelled' }],
            bookingFrom: {
              $gte: new Date(),
            },
          },
        },
        {
          $lookup: {
            from: 'properties',
            localField: 'property',
            foreignField: '_id',
            as: 'property',
          },
        },
        {
          $group: {
            _id: {
              bookingFrom: '$bookingFrom',
              bookingTo: '$bookingTo',
              inquiryStatus: '$inquiryStatus',
            },
            inquiries: {
              $push: {
                _id: '$_id',
                property: { $arrayElemAt: ['$property', 0] },
                guestCount: '$guestCount',
                groupType: '$groupType',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            bookingFrom: '$_id.bookingFrom',
            bookingTo: '$_id.bookingTo',
            inquiryStatus: '$_id.inquiryStatus',
            inquiries: {
              _id: 1,
              property: {
                _id: 1,
                propertyName: 1,
                propertyPictures: 1,
                propertyThumbnails: 1,
              },
              guestCount: 1,
              groupType: 1,
              statusUpdateReason: 1,
              cancelledBy: 1,
            },
          },
        },
        { $sort: { bookingFrom: -1 } },
      ])

      if (!inquiries) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Inquiries Found'))
      }

      res.json(inquiries)
    } catch (err) {
      console.error(`Err loadInquiries`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/inquiry/guest/inquiries/pending
// @desc        Get all Inquiries for a Guest
// @access      Public
router.get(
  '/guest/inquiries/pending',
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

      // const inquiries = await Inquiry.aggregate([
      //   {
      //     $match: {
      //       guest: new Types.ObjectId(req.userData.id),
      //       inquiryStatus: 'pending',
      //       bookingFrom: {
      //         $gte: new Date(),
      //       },
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'properties',
      //       localField: 'property',
      //       foreignField: '_id',
      //       as: 'property',
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: {
      //         bookingFrom: '$bookingFrom',
      //         bookingTo: '$bookingTo',
      //         inquiryStatus: '$inquiryStatus',
      //       },
      //       inquiries: {
      //         $push: {
      //           _id: '$_id',
      //           property: { $arrayElemAt: ['$property', 0] },
      //           guestCount: '$guestCount',
      //           groupType: '$groupType',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       bookingFrom: '$_id.bookingFrom',
      //       bookingTo: '$_id.bookingTo',
      //       inquiryStatus: '$_id.inquiryStatus',
      //       inquiries: {
      //         _id: 1,
      //         property: {
      //           _id: 1,
      //           propertyName: 1,
      //           propertyPictures: 1,
      //           propertyThumbnails: 1,
      //         },
      //         guestCount: 1,
      //         groupType: 1,
      //         statusUpdateReason: 1,
      //         cancelledBy: 1,
      //       },
      //     },
      //   },
      //   { $sort: { bookingFrom: -1 } },
      // ])

      const inquiries = await Inquiry.find({
        guest: new Types.ObjectId(req.userData.id),
        paymentStatus: 'pending',
        // bookingFrom: {
        //   $gte: new Date(),
        // },
      }).sort({ bookingFrom: -1 })

      // const inquiries = await Inquiry.aggregate([
      //   {
      //     $match: {
      //       guest: new Types.ObjectId(req.userData.id),
      //       inquiryStatus: 'pending',
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'properties',
      //       localField: 'property',
      //       foreignField: '_id',
      //       as: 'property',
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'orders',
      //       let: { inquiryId: '$_id' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [
      //                 { $eq: ['$inquiry', '$$inquiryId'] },
      //                 { $eq: ['$paymentStatus', 'pending'] },
      //               ],
      //             },
      //           },
      //         },
      //       ],
      //       as: 'order',
      //     },
      //   },
      //   {
      //     $match: {
      //       order: { $ne: [] },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: {
      //         bookingFrom: '$bookingFrom',
      //         bookingTo: '$bookingTo',
      //         inquiryStatus: '$inquiryStatus',
      //       },
      //       inquiries: {
      //         $push: {
      //           _id: '$_id',
      //           property: { $arrayElemAt: ['$property', 0] },
      //           guestCount: '$guestCount',
      //           groupType: '$groupType',
      //         },
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       bookingFrom: '$_id.bookingFrom',
      //       bookingTo: '$_id.bookingTo',
      //       inquiryStatus: '$_id.inquiryStatus',
      //       inquiries: {
      //         _id: 1,
      //         property: {
      //           _id: 1,
      //           propertyName: 1,
      //           propertyPictures: 1,
      //           propertyThumbnails: 1,
      //         },
      //         guestCount: 1,
      //         groupType: 1,
      //         statusUpdateReason: 1,
      //         cancelledBy: 1,
      //       },
      //     },
      //   },
      //   { $sort: { bookingFrom: -1 } },
      // ])

      if (!inquiries.length) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Inquiries Found'))
      }

      res.json(inquiries)
    } catch (err) {
      console.error(`Err loadInquiries`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/inquiry
// @desc        Get One Inquiry
// @access      Public
router.get(
  '/:inquiryId',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { inquiryId } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const inquiry = await Inquiry.findOne({ _id: inquiryId })
        .populate('guest', 'firstName avatar profileImage')
        .populate('property', 'propertyName')
        .populate('guestUserData', 'ratings')
        .select(
          '_id guestCount hostRescheduleRequests amount bookingFrom bookingTo groupType servicesRequested plateGlassCutlery paidServicesRequested addOnServicesRequested additionalNotes'
        )

      if (!inquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      res.json(inquiry)
    } catch (err) {
      console.error(`Err loadOneInquiry`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/inquiryStatus
// @desc        Get Inquiry Status
// @access      Public
router.post(
  '/inquiryStatus',
  userAuth,
  checkAccess('guest'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { bookingFrom, bookingTo, getRescheduled } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      let inquiry: any

      if (getRescheduled) {
        inquiry = await Inquiry.find({
          guest: new Types.ObjectId(req.userData.id),
          hostRescheduleRequests: { $exists: true, $not: { $size: 0 } },
        })
          .populate({
            path: 'property',
            select: 'propertyName propertyPictures city state',
          })
          .select(
            '_id property hostRescheduleRequests bookingFrom bookingTo guestCount groupType'
          )
      } else {
        inquiry = await Inquiry.find({
          guest: new Types.ObjectId(req.userData.id),
          bookingFrom,
          bookingTo,
        })
          .populate({
            path: 'property',
            select:
              'propertyName propertyPictures propertyThumbnails city state maxGuestCount',
          })
          .select(
            '_id property inquiryStatus hostRescheduleRequests statusUpdateReason createdAt amount bookingFrom bookingTo guestCount groupType addOnServicesRequested'
          )
      }

      if (!inquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiries Not Found'))
      }

      res.json(inquiry)
    } catch (err) {
      console.error(`Err inquiryStatus`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/inquiry/reschedule
// @desc        Reschedule an Inquiry
// @access      Public
router.post(
  '/reschedule/:inquiryId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('rescheduleRequests', 'Reschedule is required').not().isEmpty(),
    check('rescheduleRequests.*.bookingFrom', 'Booking From is required')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('rescheduleRequests.*.bookingTo', 'Booking To is required')
      .not()
      .isEmpty()
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
      const { inquiryId } = req.params
      const { rescheduleRequests } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const rescheduledInquiry = await Inquiry.findOneAndUpdate(
        { _id: inquiryId },
        {
          $set: {
            hostRescheduleRequests: rescheduleRequests,
          },
        },
        { new: true }
      )
        .populate('guest', 'firstName avatar profileImage')
        .populate('property', 'propertyName')
        .populate('guestUserData', 'ratings')
        .select(
          '_id guestCount hostRescheduleRequests amount bookingFrom bookingTo groupType servicesRequested plateGlassCutlery paidServicesRequested addOnServicesRequested'
        )

      if (!rescheduledInquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      //createNotification('RESCHEDULE_INQUIRY', rescheduledInquiry.guest)

      res.json({
        message: 'Inquiry Rescheduled Successfully',
        inquiry: rescheduledInquiry,
      })
    } catch (err) {
      console.error(`Err reschedule:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/inquiry/cancelInquiry
// @desc        Cancel Inquiry
// @access      Public
router.post(
  '/cancelInquiry/:inquiryId',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('statusUpdateReason').optional().trim(),
    check('cancelledBy.host')
      .optional()
      .isBoolean()
      .withMessage('Cancelled By Host should be a boolean'),
    check('cancelledBy.guest')
      .optional()
      .isBoolean()
      .withMessage('Cancelled By Guest should be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { inquiryId } = req.params
      const { statusUpdateReason, cancelledBy } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      interface IUpdateBlock {
        statusUpdateReason?: string
        statusUpdatedAt?: Date
        inquiryStatus: string
        cancelledBy?: Array<{
          host: boolean
          guest: boolean
        }>
      }
      const updateBlock: IUpdateBlock = {
        cancelledBy,
        statusUpdateReason,
        inquiryStatus: 'cancelled',
        statusUpdatedAt: new Date(),
      }

      const updatedInquiry = await Inquiry.findOneAndUpdate(
        { _id: inquiryId },
        {
          $set: updateBlock,
        },
        { new: true }
      )
        .populate('guest', 'firstName avatar profileImage')
        .populate('property', 'propertyName')
        .populate('guestUserData', 'ratings')

      if (!updatedInquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      const otherInquiries = await Inquiry.find({
        guest: updatedInquiry.guest,
        bookingFrom: updatedInquiry.bookingFrom,
        bookingTo: updatedInquiry.bookingTo,
        inquiryStatus: 'pending',
        multipleInquiriesMade: true,
      })

      let notificationType: string = ''

      if (otherInquiries.length == 2) {
        notificationType = 'DECLINED_BY_ONE_INQUIRY'
      } else if (otherInquiries.length === 1) {
        notificationType = 'DECLINED_BY_TWO_INQUIRY'
      } else {
        notificationType = 'DECLINED_BY_ALL_INQUIRY'
      }
      console.log(notificationType)
      //createNotification(notificationType, updatedInquiry.guest)

      if (updatedInquiry.hostRescheduleRequests.length > 0) {
        //createNotification('DECLINED_RESCHEDULED_INQUIRY', updatedInquiry.host)
      }

      res.json({
        message: 'Inquiry Cancelled Successfully',
        inquiry: updatedInquiry,
      })
    } catch (err) {
      console.error(`Err setInquiryStatus:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/inquiry/deleteInquiry
// @desc        Cancel Inquiry by Guest
// @access      Public
router.delete(
  '/guest/:inquiryId',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('statusUpdateReason').optional().trim(),
    check('cancelledBy.host')
      .optional()
      .isBoolean()
      .withMessage('Cancelled By Host should be a boolean'),
    check('cancelledBy.guest')
      .optional()
      .isBoolean()
      .withMessage('Cancelled By Guest should be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { inquiryId } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      // delete inquiry
      const deletedInquiry = await Inquiry.findOneAndDelete({
        guest: req.userData.id,
        _id: inquiryId,
      })

      if (!deletedInquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      res.json({
        message: 'Inquiry Deleted Successfully',
        inquiry: deletedInquiry,
      })
    } catch (err) {
      console.error(`Err setInquiryStatus:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       PATCH api/inquiry/updateInquiry
// @desc        Update an Inquiry
// @access      Public
router.patch(
  '/updateInquiry/:inquiryId',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('amount')
      .optional()
      .isNumeric()
      .withMessage('Amount should be numeric'),
    check('guestCount')
      .optional()
      .isNumeric()
      .withMessage('Guest Count should be numeric'),
    check('groupType').optional().trim(),
    check('servicesRequested').optional().trim().isIn(SERVICE_REQUESTED),
    check('addOnServicesRequested')
      .optional()
      .trim()
      .isIn(ADDONSERVICES_REQUESTED),
    check('cleaningCharges').optional().trim().isIn(CLEANING_CHARGES),
    check('plateGlassCutlery').optional().isBoolean(),
    check('bookingFrom', 'Booking From is required')
      .optional()
      .isISO8601()
      .withMessage('Booking From is not a valid date'),
    check('bookingTo', 'Booking To is required')
      .optional()
      .isISO8601()
      .withMessage('Booking To is not a valid date'),
    check('invitedGuests.*.name').trim(),
    check('invitedGuests.*.dateOfBirth')
      .isISO8601()
      .withMessage('Date of Birth is not a valid date'),
    check('invitedGuests.*.idProof').trim(),
    check('additionalNotes').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { inquiryId } = req.params
      const updateData = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const updatedInquiry = await Inquiry.findOneAndUpdate(
        { _id: inquiryId },
        updateData,
        {
          new: true,
        }
      )
        .populate('guest', 'name avatar profileImage')
        .populate('property', 'propertyName')
        .populate('guestUserData', 'ratings')

      if (!updatedInquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Inquiry Not Found'))
      }

      res.json({
        message: 'Inquiry Updated Successfully',
        inquiry: updatedInquiry,
      })
    } catch (err) {
      console.error(`Err updateInquiry:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

export default router
