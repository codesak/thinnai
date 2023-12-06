import Booking from '../../models/Booking'
import Property from '../../models/Property'
import { Types } from 'mongoose'

interface ICheckAvilability {
  bookingFrom: string | Date
  bookingTo: string | Date
  propertyId: Types.ObjectId
}
const checkAvailability = async ({
  bookingFrom,
  bookingTo,
  propertyId,
}: ICheckAvilability) => {
  const startDate = new Date(bookingFrom)
  const endDate = new Date(bookingTo)

  // check if the bookingFrom and bookingTo don't overlap with property.hostSchedule unavailableFrom and unavailableTo
  const property = await Property.findById(propertyId)
  if (
    property &&
    property.hostSchedule.length > 0 &&
    property.hostSchedule !== null &&
    property.hostSchedule !== undefined
  ) {
    // check if startdate and enddate is within the hostSchedule
    if (!isDateRangeAvailable(startDate, endDate, property.hostSchedule)) {
      return false
    }
  }

  const bookings = await Booking.find({
    property: propertyId,
    bookingStatus: { $in: ['confirmed', 'checkedin'] },
    $or: [
      {
        'requestData.bookingFrom': {
          $lt: new Date(endDate.getTime() + 30 * 60 * 1000), // Add 30 minutes to endDate
        },
        'requestData.bookingTo': {
          $gt: new Date(startDate.getTime() - 30 * 60 * 1000), // Subtract 30 minutes from startDate
        },
      },
      {
        'requestData.bookingFrom': {
          $lt: new Date(endDate.getTime() + 30 * 60 * 1000), // Add 30 minutes to endDate
        },
        'requestData.bookingTo': {
          $gt: endDate,
        },
      },
    ],
  }).select('requestData.bookingFrom requestData.bookingTo _id')

  // TODO: for request based inquiry also check if there are existing paid inquiries

  if (bookings.length > 0) {
    console.log(
      `🚀 ~ For property ${propertyId} conflicted bookings are ===>  ${bookings}`
    )
    return false
  } else {
    return true
  }
}

export default checkAvailability

type DateRange = {
  unavailableFrom: Date
  unavailableTo: Date
}

function isDateRangeAvailable(
  startDate: Date,
  endDate: Date,
  unavailableRanges: DateRange[]
): boolean {
  for (const range of unavailableRanges) {
    // If the startDate is within an unavailable range or
    // the endDate is within an unavailable range, return false
    if (
      (startDate >= range.unavailableFrom &&
        startDate <= range.unavailableTo) ||
      (endDate >= range.unavailableFrom && endDate <= range.unavailableTo)
    ) {
      return false
    }

    // If the given date range encloses an unavailable range, return false
    if (startDate <= range.unavailableFrom && endDate >= range.unavailableTo) {
      return false
    }
  }

  return true // The given date range does not overlap with any unavailable ranges
}
