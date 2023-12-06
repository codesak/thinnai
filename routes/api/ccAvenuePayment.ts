import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import Booking from '../../models/Booking'
import BookingRequest from '../../models/BookingRequest'
import Cart from '../../models/Cart'
import Inquiry, { IInquiry } from '../../models/Inquiry'
import Order, { IORDER } from '../../models/Order'
import User from '../../models/User'
import getInquiriesFromCart from '../../services/cart/getInquiriesFromCart'
import createOrder from '../../services/order/createOrder'
import ccavenue from '../../services/payment/ccAvenue'
import { savePaymentDetails } from '../../services/payment/savePaymentDetails'
import getPriceDiff from '../../services/pricing/getPriceDiff'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import axios from 'axios'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Types } from 'mongoose'

require('dotenv').config()

const config = require('config')
const redirectURL = config.get('redirectURL')
const cancelURL = config.get('cancelURL')
const frontendRedirectURL = config.get('frontendRedirectURL')
const repaymentRedirectURL = config.get('repaymentRedirectURL')
const router: Router = Router()
//Put in the 32-Bit key shared by CCAvenues.

const CCAVENUE_API_ACCESS_CODE = process.env.CCAVENUE_API_ACCESS_CODE
const CCAVENUE_API_WORKING_KEY = process.env.CCAVENUE_API_WORKING_KEY

const CCAVENUE_ACCESS_CODE = process.env.CCAVENUE_ACCESS_CODE
const CCAVENUE_MERCHANT_ID = process.env.CCAVENUE_MERCHANT_ID
const CCAVENUE_WORKING_KEY = process.env.CCAVENUE_WORKING_KEY
const CCAVENUE_API_URL =
  process.env.CCAVENUE_API_URL ?? `https://apitest.ccavenue.com`
export const CCAVENUE_REQUEST_URL = `${process.env.CCAVENUE_REQUEST_BASE_URL}/transaction/transaction.do?command=initiateTransaction&merchant_id=${CCAVENUE_MERCHANT_ID}&encRequest=:encRequest&access_code=${CCAVENUE_ACCESS_CODE}`
export const CCAVENUE_REDIRECT_URL = redirectURL
export const CCAVENUE_REPAYMENT_REDIRECT_URL =
  process.env.CCAVENUE_REPAYMENT_REDIRECT_URL ?? repaymentRedirectURL
export const CCAVENUE_CANCEL_URL = cancelURL

export const CCAVENUE_FRONTEND_REDIRECT_URL = frontendRedirectURL

const ccav = new ccavenue.Configure({
  merchantId: CCAVENUE_MERCHANT_ID || '',
  workingKey: CCAVENUE_WORKING_KEY || '',
})

router.post(
  '/encrypt',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('orderId', 'Order Id is required').not().isEmpty(),
    check('payableAmount', 'Payable Amount is required').optional().isNumeric(),
    check('merchant_param1', 'Merchant Param1 is required').not().isEmpty(),
    check('merchant_param2', 'Merchant Param2 is required').not().isEmpty(),
    check('merchant_param3', 'Merchant Param3 is required').not().isEmpty(),
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

      const {
        orderId,
        payableAmount,
        merchant_param1,
        merchant_param2,
        merchant_param3,
      } = req.body

      const existingOrder = await Order.findOne({ uniqueId: orderId })
      if (existingOrder) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Order already exists'))
      }

      const tempData = {
        name: 'test',
        address: 'Hyderabad',
        city: 'Hyderabad',
        state: 'TG',
        pincode: 500001,
        phoneNumber: '1234567890',
        email: 'test@email.com',
      }

      const order = {
        order_id: orderId,
        currency: 'INR',
        amount: payableAmount,
        billing_address: tempData.address,
        billing_name: tempData.name,
        billing_city: tempData.city,
        billing_state: tempData.state,
        billing_zip: tempData.pincode,
        billing_country: 'India',
        billing_tel: tempData.phoneNumber,
        billing_email: tempData.email,
        redirect_url: encodeURIComponent(CCAVENUE_REDIRECT_URL),
        cancel_url: encodeURIComponent(CCAVENUE_REDIRECT_URL),
        language: 'EN',
        integration_type: 'iframe_normal',
        merchant_param1: merchant_param1,
        merchant_param2: merchant_param2,
        merchant_param3: merchant_param3,
        merchant_param4: 'testmerchatparam4',
      }
      // console.log(
      //   '🚀 ~ file: ccAvenuePayment.ts:122 ~ router.post ~ order:',
      //   order
      // )

      // get all the inquiries from the user's cart
      const inquiries = await getInquiriesFromCart(req.userData.id)

      if (inquiries.length > 1) {
        throw new Error('Cart cannot have more than one Inquiry')
      }

      const inquiry = await Inquiry.findById<IInquiry>(inquiries[0])

      if (!inquiry) {
        throw new Error('Inquiry not found')
      }
      let isRetry = false
      if (inquiry.paymentStatus === 'pending') {
        isRetry = true
      }

      const { serviceCharge, gstAmount, totalPrice } = inquiry.priceBreakdown

      // if (+payableAmount !== totalPrice + serviceCharge + gstAmount) {
      //   throw new Error('Payable amount does not match')
      // }
      //TODO: check if the property is available for this booking period

      //create an order with paymentStatus = pending
      const orderObj: Partial<IORDER> = {
        uniqueId: orderId,
        paymentStatus: 'pending',
        guest: new Types.ObjectId(req.userData.id),
        enquiries: inquiries,
        amount: payableAmount,
        paymentBreakdown: {
          ...inquiry.priceBreakdown,
          serviceCharge: serviceCharge,
          gstAmount: gstAmount,
          totalPrice: totalPrice,
        },
      }

      const newOrder = await createOrder(orderObj)

      const updatePaymentStatusOfInquiry = async (
        inquiries: any,
        status: string
      ) => {
        // const inquiryIds = inquiries.map((inquiry: { _id: any }) => inquiry._id)
        await Inquiry.updateMany(
          { _id: { $in: inquiries } },
          { paymentStatus: status, order: newOrder._id }
        )
      }

      await updatePaymentStatusOfInquiry(inquiries, 'pending')

      //handle case of instant/direct booking
      if (inquiries.length === 1) {
        const inquiryId = inquiries[0]
        // create a Booking with bookingStatus "confirmed"
        const inquiry = await Inquiry.findById(inquiryId)

        if (!inquiry) {
          throw new Error('Inquiry not found')
        }
        let newBooking
        if (isRetry) {
          newBooking = await Booking.findOne({
            inquiry: inquiry._id,
            bookingStatus: 'pending',
          })
          if (!newBooking) {
            throw new Error('Booking not found')
          }
          newBooking.order = newOrder._id
          newBooking.bookingStatus = 'pending'
          newBooking.paymentRetries.push(newOrder._id)
        } else {
          newBooking = new Booking({
            property: inquiry.property,
            host: inquiry.host,
            guest: inquiry.guest,
            inquiry: inquiry._id,
            bookingFrom: inquiry.bookingFrom,
            bookingTo: inquiry.bookingTo,
            bookingStatus: 'pending',
            bookingConfirmedAt: new Date(),
            order: newOrder._id,
            requestData: {
              bookingFrom: inquiry.bookingFrom,
              bookingTo: inquiry.bookingTo,
              guestCount: inquiry.guestCount,
              servicesRequested: inquiry.servicesRequested,
              addOnServicesRequested: inquiry.addOnServicesRequested,
              cleaningCharges: inquiry.cleaningCharges,
              plateGlassCutlery: inquiry.plateGlassCutlery,
            },
            paymentRetries: [],
          })
        }

        // const notificationType = 'BOOKING_CONFIRMED'

        // createNotification(notificationType, inquiry.guest)

        // createNotification(notificationType, inquiry.host)

        await newBooking.save()
      }
      const encRequest = ccav.getEncryptedOrder(order)
      console.log('🚀 ~ file: ccAvenuePayment.ts:193 ~ encRequest:', encRequest)
      const encryptedRequestUrl = CCAVENUE_REQUEST_URL.replace(
        ':encRequest',
        encRequest
      )
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:198 ~ encryptedRequestUrl:',
        encryptedRequestUrl
      )

      res.json(encryptedRequestUrl)
    } catch (error: any) {
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:565 ~ error.message:',
        error.message
      )
      if (error.message.includes('ALREADY_ATTEMPTED_PAYMENT')) {
        res
          .status(ErrorCode.HTTP_SERVER_ERROR)
          .json(
            errorWrapper('Please go to my bookings page and pay the inquiries')
          )
      } else {
        res
          .status(ErrorCode.HTTP_SERVER_ERROR)
          .json(errorWrapper('Server Error'))
      }
    }
  }
)

router.post(
  '/repayment/encrypt',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('orderId', 'Order Id is required').not().isEmpty(),
    check('bookingId', 'Booking Id is required').not().isEmpty(),
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

      const { orderId, bookingId } = req.body
      // get booking from bookingId
      const booking = await Booking.findById(bookingId)

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking not found'))
      }
      const inquiry = await Inquiry.findById(booking.inquiry)
      if (!inquiry) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(
            errorWrapper('Could not find sn Inquiry related to the booking')
          )
      }
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:298 ~ inquiry.bookingRequestData:',
        inquiry.bookingRequestData
      )

      const bookingRequest = await BookingRequest.findById(
        new Types.ObjectId(inquiry.bookingRequestData)
      )
      // check if bookingRequest is not empty
      if (!bookingRequest) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Booking Request not found'))
      }

      const bookingRequestData = bookingRequest
      // call getPriceDiff and pass the return value object's finalPayablePrice to the below order object's amount field
      const priceDiffData = await getPriceDiff(booking, bookingRequestData)
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:308 ~ priceDiffData:',
        priceDiffData
      )
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:308 ~  inquiry.bookingRequestPriceDifference:',
        inquiry.bookingRequestPriceDifference
      )
      const finalPayablePrice = priceDiffData.finalPayablePrice

      // get the guest details from User model
      const guest = await User.findById(req.userData.id)

      const guestData = {
        name: guest?.firstName + ' ' + guest?.lastName,
        phoneNumber: guest?.phone,
        email: guest?.email,
      }

      const order = {
        order_id: orderId,
        currency: 'INR',
        amount: finalPayablePrice,
        billing_name: guestData.name,
        billing_country: 'India',
        billing_tel: guestData.phoneNumber,
        billing_email: guestData.email,
        redirect_url: encodeURIComponent(CCAVENUE_REPAYMENT_REDIRECT_URL),
        cancel_url: encodeURIComponent(CCAVENUE_REPAYMENT_REDIRECT_URL),
        language: 'EN',
        integration_type: 'iframe_normal',
        merchant_param1: req.userData.id,
      }

      const encRequest = ccav.getEncryptedOrder(order)
      const encryptedRequestUrl = CCAVENUE_REQUEST_URL.replace(
        ':encRequest',
        encRequest
      )
      console.log(
        '🚀 ~ file: ccavenueApis.ts:64 ~ router.post ~ encryptedRequestUrl:',
        encryptedRequestUrl
      )
      //create an order with paymentStatus = pending
      const orderObj: Partial<IORDER> = {
        uniqueId: orderId,
        paymentStatus: 'pending',
        guest: new Types.ObjectId(req.userData.id),
        enquiries: [booking.inquiry],
        amount: order.amount,
        bookingRequestData: bookingRequestData._id,
        bookingId: booking._id,
        paymentBreakdown: {
          ...priceDiffData,
          serviceCharge: priceDiffData.serviceCharge,
          gstAmount: priceDiffData.gstAmount,
          totalPrice: priceDiffData.totalPrice,
        },
      }

      await createOrder(orderObj)

      booking.changesRequested = true
      booking.save()

      res.json(encryptedRequestUrl)
    } catch (error: any) {
      console.log('ccavenue enc error ', error)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

router.post('/repayment/redirect-url', async (req, res) => {
  try {
    console.log(
      '🚀 ~ file: ccAvenuePayment.ts:104 ~ router.get ~ req.body:',
      req.body
    )

    const { encResp } = req.body
    const decryptedJsonResponse = ccav.convertResponseToJSON(encResp)
    console.log(
      '=====> 🚀 ~ file: ccAvenuePayment.ts:109 ~ router.post ~ decryptedJsonResponse:',
      decryptedJsonResponse
    )
    const {
      order_id,
      tracking_id,
      order_status,
      payment_mode,
      status_code,
      status_message,
      trans_date,
      response_code,
      amount,
    } = decryptedJsonResponse
    // find order and update it's paymentStatus
    const bookingRequest = await BookingRequest.findOne({
      orderId: new Types.ObjectId(order_id),
    })

    if (!bookingRequest) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('Booking Request not found'))
    }

    const orderPaymentStatus =
      order_status === 'Success' ? 'confirmed' : 'cancelled'

    const order = await Order.findOneAndUpdate(
      { uniqueId: order_id },
      {
        paymentStatus: orderPaymentStatus,
        trackingId: tracking_id,
        amount: amount,
        ccAvenueResponse: {
          orderStatus: order_status,
          paymentMode: payment_mode,
          statusCode: status_code,
          statusMessage: status_message,
          responseCode: response_code,
          transactionDate: trans_date,
          amountPaid: amount,
        },
        bookingRequestData: bookingRequest._id,
      },
      { new: true }
    )

    if (!order) throw new Error('Order not found')

    if (order_status === 'Success') {
      // find and update booking request
      let setOps = {
        changesRequested: false,
        requestData: {
          bookingFrom: bookingRequest.bookingFrom,
          bookingTo: bookingRequest.bookingTo,
          ...(bookingRequest.plateGlassCutlery === true && {
            plateGlassCutlery: true,
          }),
        },
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        order.bookingId,
        {
          $set: setOps,
          $push: {
            changeOrders: order._id,
            changeData: bookingRequest._id,
          },
          $inc: {
            'requestData.guestCount': bookingRequest.guestCount,
            'totalPayment.totalAmount': amount,
          },
          $addToSet: {
            'requestData.servicesRequested': {
              $each: bookingRequest.servicesRequested,
            },
            'requestData.addOnServicesRequested': {
              $each: bookingRequest.addOnServicesRequested,
            },
            'requestData.cleaningCharges': {
              $each: bookingRequest.cleaningCharges,
            },
          },
        },
        { new: true } // This option returns the updated document
      )
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:408 ~ router.post ~ updatedBooking:',
        updatedBooking
      )
    } else {
      const updatedBooking = await Booking.findByIdAndUpdate(
        order.bookingId,
        {
          $set: {
            changesRequested: false,
          },
          $push: {
            changeOrders: order._id,
            changeData: bookingRequest._id,
          },
        },
        { new: true } // This option returns the updated document
      )
      console.log(
        '🚀 ~ file: ccAvenuePayment.ts:451 ~ router.post ~ updatedBooking:',
        updatedBooking
      )
    }

    await Cart.findOneAndDelete({ guest: order.guest })

    res.redirect(
      `${CCAVENUE_FRONTEND_REDIRECT_URL}?order_status=${decryptedJsonResponse.order_status.toLowerCase()}&tracking_id=${
        decryptedJsonResponse.tracking_id
      }`
    )
  } catch (error) {
    console.log('Error in /redirect-url :', error)
    console.log('***************** May need to refund the amount !!!!')
    res.redirect(`${CCAVENUE_FRONTEND_REDIRECT_URL}?server_error=true`)
  }
})

router.post('/redirect-url', async (req, res) => {
  try {
    console.log(
      '🚀 ~ file: ccAvenuePayment.ts:104 ~ router.get ~ req.body:',
      req.body
    )

    const { encResp } = req.body
    const decryptedJsonResponse = ccav.convertResponseToJSON(encResp)
    console.log(
      '=====> 🚀 ~ file: ccAvenuePayment.ts:109 ~ router.post ~ decryptedJsonResponse:',
      decryptedJsonResponse
    )
    await savePaymentDetails(decryptedJsonResponse)
    res.redirect(
      `${CCAVENUE_FRONTEND_REDIRECT_URL}?order_status=${decryptedJsonResponse.order_status.toLowerCase()}&tracking_id=${
        decryptedJsonResponse.tracking_id
      }`
    )
  } catch (error) {
    console.log('Error in /redirect-url :', error)
    res.redirect(`${CCAVENUE_FRONTEND_REDIRECT_URL}?server_error=true`)
  }
})

router.post(
  '/booking/checkStatus',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [check('bookingId', 'BookingId is required').not().isEmpty()],
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
      const { bookingId } = req.body

      const booking = await Booking.findById(bookingId).populate<{
        order: IORDER
      }>({
        path: 'order',
        select: 'amount paymentStatus trackingId ccAvenueResponse',
      })

      if (!booking) {
        throw new Error('Booking not found')
      }

      const statusDto = {
        order_no: booking.order.trackingId,
      }
      console.log('🚀 ~ file: cancelBooking.ts:211 ~ statusDto:', statusDto)

      const genericParams = {
        access_code: CCAVENUE_API_ACCESS_CODE ?? '',
        workingKey: CCAVENUE_API_WORKING_KEY ?? '',
        command: 'orderStatusTracker',
        request_type: 'JSON',
        response_type: 'JSON',
        version: '1.1',
        dataToBeEnCrypted: statusDto,
      }
      console.log(
        '🚀 ~ file: cancelBooking.ts:222 ~ genericParams:',
        genericParams
      )
      const encRequest = ccavenue.Configure.getEncryptedParams(genericParams)
      console.log('🚀 ~ file: cancelBooking.ts:224 ~ encRequest:', encRequest)

      // call ccavenue refund api
      const status = await axios.post<string>(
        `${CCAVENUE_API_URL}/apis/servlet/DoWebTrans?${encRequest}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log('🚀 ~ file: ccAvenuePayment.ts:331 ~ refund:', status)

      const result = status.data
      const information = result.split('&')
      const status1 = information[0].split('=')
      const status2 = information[1].split('=')
      let status3: any = []
      if (information[2]) {
        status3 = information[2].split('=')
      }
      const encResposneData = status2[1].slice(0, -2)
      let returnData
      if (status1[1] === '1') {
        const recordData = status2[1]
        const error = `${recordData} Error Code:${status3[1]}`
        console.log('🚀 ~ file: ccAvenuePayment.ts:343 ~ error:', error)
        throw new Error(error)
      } else {
        const response = ccavenue.Configure.decryptAndConvertToJSON(
          encResposneData,
          genericParams.workingKey
        )
        console.log(
          '🚀 ~ file: cancelBooking.ts:257 ~ decrypted whole response:',
          response
        )
        returnData = ccavenue.Configure.decryption(
          status2[1],
          genericParams.workingKey
        )
        console.log(
          '🚀 ~ file: ccAvenuePayment.ts:353 ~ decrypted data:',
          returnData
        )
      }

      return res.json({ returnData })
    } catch (error: any) {
      console.log('ccavenue enc error ', error)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

export default router