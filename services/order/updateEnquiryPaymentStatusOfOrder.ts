import Booking from '../../models/Booking'
import Inquiry from '../../models/Inquiry'
import { IORDER } from '../../models/Order'
import { createNotification } from '../../utils/notification'
import { scheduleBookingCompletionCron } from '../../utils/scheduleBookingCompletionCron'

const updateEnquiryPaymentStatusOfOrder = async (
  order: IORDER,
  paymentStatus: string
) => {
  try {
    // for each inquiry in the order, update the paymentStatus
    for (const inquiryId of order.enquiries) {
      // update the inquiry's paymentStatus
      const inquiry = await Inquiry.findByIdAndUpdate(inquiryId)

      if (!inquiry) {
        throw new Error('Inquiry not found')
      }

      const paymentStatus = 'paid'
      // if any of the properties in enquiry is type direct booking then create confirmed bookings
      if (inquiry?.propertyBookingType === 'instant') {
        await Inquiry.updateOne(
          { _id: inquiryId },
          { paymentStatus, inquiryStatus: 'confirmed' }
        )
        // create a Booking with bookingStatus "confirmed"
        const newBooking = new Booking({
          property: inquiry.property,
          host: inquiry.host,
          guest: inquiry.guest,
          inquiry: inquiry._id,
          bookingFrom: inquiry.bookingFrom,
          bookingTo: inquiry.bookingTo,
          bookingStatus: 'confirmed',
          bookingConfirmedAt: new Date(),
          order: order._id,
          requestData: {
            bookingFrom: inquiry.bookingFrom,
            bookingTo: inquiry.bookingTo,
            guestCount: inquiry.guestCount,
            servicesRequested: inquiry.servicesRequested,
            addOnServicesRequested: inquiry.addOnServicesRequested,
            cleaningCharges: inquiry.cleaningCharges,
            plateGlassCutlery: inquiry.plateGlassCutlery,
          },
        })
        const notificationType = 'BOOKING_CONFIRMED'

        createNotification(notificationType, inquiry.guest)

        createNotification(notificationType, inquiry.host)

        const createdBooking = await newBooking.save()
        scheduleBookingCompletionCron(
          createdBooking._id,
          createdBooking.requestData.bookingTo
        )
      } else if (inquiry?.propertyBookingType === 'request') {
        await Inquiry.updateOne({ _id: inquiryId }, { paymentStatus })
      } else {
        throw new Error('Invalid property booking type')
      }
    }
  } catch (error: any) {
    console.error(error)
    throw new Error(error?.message)
  }
}
export default updateEnquiryPaymentStatusOfOrder
