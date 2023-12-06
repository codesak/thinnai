import Booking from '../../models/Booking'
import mongoose from 'mongoose'

require('dotenv').config({ path: '../../.env' })

const findOverlappingBookings = async (
  propertyId: string,
  startDate: Date,
  endDate: Date
) => {
  const bookings = await Booking.find({
    property: propertyId,
    bookingStatus: { $in: ['confirmed', 'checkedin'] },
    $or: [
      {
        bookingFrom: {
          $lt: new Date(endDate.getTime() + 30 * 60 * 1000), // Add 30 minutes to endDate
        },
        bookingTo: {
          $gt: new Date(startDate.getTime() - 30 * 60 * 1000), // Subtract 30 minutes from startDate
        },
      },
      {
        bookingFrom: {
          $lt: new Date(endDate.getTime() + 30 * 60 * 1000), // Add 30 minutes to endDate
        },
        bookingTo: {
          $gt: endDate,
        },
      },
    ],
  })
  return bookings
}

const runTest = async () => {
  const mongoURI = process.env.MONGO_URI || ''

  await mongoose.connect(mongoURI) // Replace with your MongoDB URI

  const testPropertyId = '6384727970c7d0de5ebdb7af'
  const START = '2023-05-07T05:30:00.000+00:00'
  const END = '2023-05-07T06:30:00.000+00:00'
  const testStartDate = new Date(START)
  const testEndDate = new Date(END)

  const bookings = await findOverlappingBookings(
    testPropertyId,
    testStartDate,
    testEndDate
  )

  console.log('Overlapping bookings:', bookings)

  await mongoose.connection.close()
}

runTest()
