import Cart from '../../models/Cart'
import Inquiry, { IInquiry } from '../../models/Inquiry'
import checkAvailability from '../booking/checkAvailability'

const getInquiriesFromCart = async (guestId: string) => {
  try {
    const cart = await Cart.findOne({ guest: guestId })
    if (!cart) {
      throw new Error('Cart not found')
    }
    const cartEnquiries = cart.enquiries.map((e: any) => e.toString())

    // check if the enquiry ids from req.body have the payment status of 'pending' in the database
    const pendingEnquiries = await Inquiry.find({
      _id: { $in: cartEnquiries },
      paymentStatus: { $in: ['unpaid', 'pending'] },
    })

    // if (pendingEnquiries.length !== cartEnquiries.length) {
    //   throw new Error('ALREADY_ATTEMPTED_PAYMENT')
    // }

    // for each pendingEnquiry check the availability using checkAvailability
    let isAvailable = true
    pendingEnquiries.forEach(async (enquiry: IInquiry) => {
      const isInquiryAvailable = await checkAvailability({
        propertyId: enquiry.property,
        bookingTo: enquiry.bookingTo,
        bookingFrom: enquiry.bookingFrom,
      })
      if (!isInquiryAvailable) {
        isAvailable = false
      }
    })

    if (isAvailable) {
      return cartEnquiries
    } else {
      // throw an error
      throw new Error('Some of the inquiries are not available')
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default getInquiriesFromCart
