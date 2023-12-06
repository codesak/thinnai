import Booking from '../../models/Booking'
import Inquiry from '../../models/Inquiry'
import { IORDER } from '../../models/Order'

// import { createNotification } from '../../utils/notification'

const updatePaymentStatusOfInquiryAndBooking = async (
  order: IORDER,
  paymentStatus: string
) => {
  try {
    // for each inquiry in the order, update the paymentStatus
    for (const inquiryId of order.enquiries) {
      // update the inquiry's paymentStatus
      const inquiry = await Inquiry.findById(inquiryId)

      if (!inquiry) {
        throw new Error('Inquiry not found')
      }
      // if any of the properties in enquiry is type direct booking then create confirmed bookings
      if (inquiry?.propertyBookingType === 'instant') {
        if (paymentStatus === 'confirmed') {
          await Inquiry.updateOne(
            { _id: inquiryId },
            { paymentStatus: 'paid', inquiryStatus: 'confirmed' }
          )
          const updatedBooking = await Booking.findOneAndUpdate(
            { inquiry: inquiryId },
            {
              $set: { bookingStatus: 'confirmed', order: order._id },
              $inc: {
                'totalPayment.totalAmount': order.ccAvenueResponse?.amountPaid,
              },
            },

            { new: true } // This option returns the updated document
          )
          console.log(
            '🚀 ~ file: updatePaymentStatusOfInquiryAndBooking.ts:32 ~ updatedBooking:',
            updatedBooking
          )
        } else {
          await Inquiry.updateOne(
            { _id: inquiryId },
            { paymentStatus: 'cancelled' }
          )
          // TODO: set booking status to "cancelled" ???
        }
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
export default updatePaymentStatusOfInquiryAndBooking

// Optimized version (untested)

// const updatePaymentStatusOfInquiryAndBooking = async (
//   order: IORDER,
//   paymentStatus: string
// ) => {
//   try {
//     const enquiriesToUpdate = order.enquiries.map(async (inquiryId) => {
//       // update the inquiry's paymentStatus
//       let updateFields: UpdateFields = { paymentStatus } // default fields to update

//       const inquiry = await Inquiry.findById(inquiryId)
//       if (!inquiry) {
//         throw new Error('Inquiry not found')
//       }

//       if (inquiry?.propertyBookingType === 'instant') {
//         if (paymentStatus === 'confirmed') {
//           updateFields = {
//             paymentStatus: 'paid',
//             inquiryStatus: 'confirmed',
//           }

//           const updatedBooking = await Booking.findOneAndUpdate(
//             { inquiry: inquiryId },
//             { $set: { bookingStatus: 'confirmed', order: order._id } },
//             { new: true } // This option returns the updated document
//           )

//           console.log(
//             '🚀 ~ file: updatePaymentStatusOfInquiryAndBooking.ts:32 ~ updatedBooking:',
//             updatedBooking
//           )
//         } else {
//           updateFields = { paymentStatus: 'cancelled' }
//         }
//       } else if (inquiry?.propertyBookingType !== 'request') {
//         throw new Error('Invalid property booking type')
//       }

//       // now, perform the update
//       return Inquiry.updateOne({ _id: inquiryId }, updateFields)
//     })

//     // wait for all enquiries to be updated
//     await Promise.all(enquiriesToUpdate)
//   } catch (error: any) {
//     console.error(error)
//     throw new Error(error?.message)
//   }
// }

// export default updatePaymentStatusOfInquiryAndBooking
