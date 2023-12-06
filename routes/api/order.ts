import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import Cart from '../../models/Cart'
import Inquiry from '../../models/Inquiry'
import Order from '../../models/Order'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Types } from 'mongoose'

const router = Router()

router.post(
  '/',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('amount').not().isNumeric().withMessage('Amount must be numeric'),
    check('enquiries', 'Need at least one inquiry').not().isEmpty(),
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
      const { uniqueId, amount, enquiries } = req.body

      // check if the enquiry ids from req.body have the payment status of 'pending' in the database
      const pendingEnquiries = await Inquiry.find({
        _id: { $in: enquiries },
        paymentStatus: 'pending',
      })

      if (pendingEnquiries.length !== enquiries.length) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Enquiries have already been paid for'))
      }

      // check for an existing order
      const order = await Order.findOne({ uniqueId: uniqueId })
      if (order) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Order already exists'))
      }

      const guest = new Types.ObjectId(req.userData.id)
      const newOrder = new Order({
        uniqueId,
        guest,
        enquiries,
        amount,
        paymentStatus: 'pending',
        trackingId: null,
      })

      await newOrder.save()

      return res.json(newOrder)
    } catch (err: any) {
      console.error(err.message)
      return res.status(ErrorCode.HTTP_SERVER_ERROR).send('Server Error')
    }
  }
)

router.post(
  '/fromCart',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('amount')
      .optional()
      .isNumeric()
      .withMessage('Amount must be numeric'),
    check('uniqueId').not().isEmpty().withMessage('Unique Id is required'),
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
      // get all the inquires from the cart
      const cart = await Cart.findOne({ guest: req.userData.id })
      if (!cart) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Cart does not exist'))
      }

      const { uniqueId, amount } = req.body

      const cartEnquiries = cart.enquiries.map((e: any) => e.toString())

      // check if the enquiry ids from req.body have the payment status of 'pending' in the database
      const pendingEnquiries = await Inquiry.find({
        _id: { $in: cartEnquiries },
        paymentStatus: 'pending',
      })

      if (pendingEnquiries.length !== cartEnquiries.length) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Enquiries have already been paid for'))
      }

      // check for an existing order
      const order = await Order.findOne({ uniqueId: uniqueId })
      if (order) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Order already exists'))
      }

      if (amount) {
        if (cart.amount !== amount) {
          return res
            .status(ErrorCode.HTTP_BAD_REQ)
            .json(errorWrapper('Amount does not match with the cart'))
        }
      }

      const finalAmount = cart.amount
      const guest = new Types.ObjectId(req.userData.id)
      const newOrder = new Order({
        uniqueId,
        guest,
        enquiries: cartEnquiries,
        amount: finalAmount,
        paymentStatus: 'pending',
        trackingId: null,
      })

      await newOrder.save()

      return res.json(newOrder)
    } catch (err: any) {
      console.error(err.message)
      return res.status(ErrorCode.HTTP_SERVER_ERROR).send('Server Error')
    }
  }
)

router.get(
  '/:id',
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

      const guest = new Types.ObjectId(req.userData.id)
      const order = await Order.findOne({ guest, _id: req.params.id })
        .populate('enquiries')
        .exec()
      if (!order) {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json({ msg: 'Order not found' })
      }

      return res.json(order)
    } catch (err: any) {
      console.error(err.message)
      return res.status(ErrorCode.HTTP_SERVER_ERROR).send('Server Error')
    }
  }
)

// get all pending orders
router.get(
  '/:paymentStatus',
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

      const { paymentStatus } = req.params

      // check if the payment status is valid  enum: ['pending', 'confirmed', 'cancelled'],
      if (
        paymentStatus !== 'pending' &&
        paymentStatus !== 'confirmed' &&
        paymentStatus !== 'cancelled'
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid payment status requested'))
      }

      const guest = new Types.ObjectId(req.userData.id)
      const orders = await Order.find({ guest, paymentStatus })
        .populate('enquiries')
        .exec()
      if (!orders) {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json({ msg: 'Order not found' })
      }

      return res.json(orders)
    } catch (err: any) {
      console.error(err.message)
      return res.status(ErrorCode.HTTP_SERVER_ERROR).send('Server Error')
    }
  }
)

export default router
