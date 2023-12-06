import setBookingToCompleted from '../services/booking/setBookingToCompleted'
import { CronJob } from 'cron'
import { Types } from 'mongoose'

export function scheduleBookingCompletionCron(
  bookingId: Types.ObjectId,
  bookingTo: Date
) {
  const job = new CronJob(
    bookingTo,
    () => {
      setBookingToCompleted(bookingId)
      job.stop()
    },
    null,
    true,
    'Asia/Kolkata'
  )

  console.log(
    `Booking Completion Cron job scheduled for booking ID: ${bookingId} at ${bookingTo}`
  )
}
