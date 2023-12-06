import Booking from '../../models/Booking'
import { Types } from 'mongoose'

async function setBookingToCompleted(bookingId: Types.ObjectId) {
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: 'completed' },
      { new: true }
    )

    if (!booking) {
      console.log(`Booking with ID: ${bookingId} not found`)
      return
    }

    console.log(`Booking with ID: ${bookingId} has been set to completed`)
  } catch (error) {
    console.error(`Error updating booking with ID: ${bookingId}:`, error)
  }
}

export default setBookingToCompleted
