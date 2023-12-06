import Booking from '../../models/Booking'
import { Types } from 'mongoose'

async function getBookingsByWeek(
  month: number,
  year: number,
  propertyId: string | Types.ObjectId
) {
  let startOfMonth = new Date(year, month - 1, 1)
  let endOfMonth = new Date(year, month, 0)

  const bookingGroups = await Booking.aggregate([
    {
      $match: {
        property: new Types.ObjectId(propertyId),
        bookingTo: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
        bookingStatus: {
          $in: ['confirmed', 'cancelled'],
        },
      },
    },
    {
      $addFields: {
        bookingToIST: {
          $subtract: [
            '$bookingTo',
            {
              $multiply: [
                {
                  $subtract: [
                    {
                      $hour: '$bookingTo',
                    },
                    {
                      $hour: {
                        $add: ['$bookingTo', 5.5 * 60 * 60 * 1000],
                      },
                    },
                  ],
                },
                60 * 60 * 1000,
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$bookingToIST',
          },
          month: {
            $month: '$bookingToIST',
          },
          week: {
            $week: '$bookingToIST',
          },
        },
        bookings: {
          $addToSet: '$$ROOT',
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.week': 1,
      },
    },
  ])
  return bookingGroups
}

export default getBookingsByWeek
