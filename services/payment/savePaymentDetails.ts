import Cart from '../../models/Cart'
import Order from '../../models/Order'
import updatePaymentStatusOfInquiryAndBooking from '../order/updatePaymentStatusOfInquiryAndBooking'
import { IResponse } from './ccAvenue'

export async function savePaymentDetails(ccAvenueResponse: IResponse) {
  try {
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
    } = ccAvenueResponse

    const orderPaymentStatus =
      order_status === 'Success' ? 'confirmed' : 'cancelled'
    // update the Order's paymentStatus: 'confirmed', 'cancelled'
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
      },
      { new: true }
    )

    if (!order) throw new Error('Order not found')
    // update paymentStatus to "paid" or "cancelled" on all of the inquiries in the order and booking linked this order is liked to
    await updatePaymentStatusOfInquiryAndBooking(order, orderPaymentStatus)
    // delete the cart associated with the order's guest
    await Cart.findOneAndDelete({ guest: order.guest })
  } catch (error: any) {
    throw new Error(error.message)
  }
}
