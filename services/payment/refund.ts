import Booking from '../../models/Booking'
import Order, { IORDER } from '../../models/Order'
import { CCAVENUE_REQUEST_URL } from '../../routes/api/ccAvenuePayment'
import ccAvenue from './ccAvenue'
import axios from 'axios'
import { randomUUID } from 'crypto'
import { Request } from 'express'

require('dotenv').config()

const CCAVENUE_ACCESS_CODE = process.env.CCAVENUE_ACCESS_CODE

const CCAVENUE_WORKING_KEY = process.env.CCAVENUE_WORKING_KEY

const refund = async (req: Request) => {
  const { bookingId } = req.params
  const { amount } = req.body

  const booking = await Booking.findById(bookingId).populate<{ order: IORDER }>(
    {
      path: 'order',
      select: 'amount paymentStatus',
    }
  )
  if (!booking) {
    throw new Error('Booking not found')
  }

  const refundAmount = amount

  const orderAmount = booking.order.amount
  // check if refund amount is less than or equal to booking amount
  if (refundAmount > orderAmount) {
    throw new Error('Refund amount cannot be greater than booking amount')
  }

  // check if booking is already refunded
  if (booking.refundStatus === 'refunded') {
    throw new Error('Booking is already refunded')
  }

  const refundDto = {
    reference_no: '1236547',
    refund_amount: +amount,
    refund_ref_no: `${randomUUID()}`,
  }

  const genericParams = {
    access_code: CCAVENUE_ACCESS_CODE ?? '',
    workingKey: CCAVENUE_WORKING_KEY ?? '',
    command: 'refund',
    request_type: 'JSON',
    response_type: 'JSON',
    version: '1.1',
    dataToBeEnCrypted: refundDto,
  }
  const encRequest = ccAvenue.Configure.getEncryptedParams(genericParams)

  // call ccavenue refund api
  const refund = await axios.post(
    `${CCAVENUE_REQUEST_URL}/apis/servlet/DoWebTrans?${encRequest}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  // update refund status of Booking
  booking.refundStatus = 'refunded'
  booking.bookingStatus = 'cancelled'
  await booking.save()

  // update payment status of Order
  const order = await Order.findById(booking.order)
  if (!order) {
    throw new Error('Order not found')
  }
  order.paymentStatus = 'refunded'
  await order.save()

  return refund
}

export default refund
