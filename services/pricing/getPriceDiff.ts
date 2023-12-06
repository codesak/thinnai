import { IBooking } from '../../models/Booking'
import { IRequestData } from '../../models/BookingRequestSchema'
import Property from '../../models/Property'
import getPricingBreakdown from './getPricingBreakdown'

async function getPriceDiff(booking: IBooking, newRequestData: IRequestData) {
  console.log(
    '🚀 ~ file: getPriceDiff.ts:7 ~ getPriceDiff ~ newRequestData:',
    newRequestData
  )
  console.log(
    '🚀 ~ file: getPriceDiff.ts:7 ~ getPriceDiff ~ booking.requestData:',
    booking.requestData
  )
  // Get the current booking and related inquiry and property from the database
  //   const currentBooking = await Booking.findById(bookingId).populate('inquiry')
  //   if (!currentBooking) {
  //     throw new Error('Booking not found')
  //   }

  const property = await Property.findById(booking.property)
  if (!property) {
    throw new Error('Property not found')
  }

  // Get pricing breakdown for the current requestData
  const currentPricingBreakdown = getPricingBreakdown({
    property: property,
    bookingFrom: booking.requestData.bookingFrom,
    bookingTo: booking.requestData.bookingTo,
    guestCount: booking.requestData.guestCount,
    servicesRequested: booking.requestData.servicesRequested,
    cleaningCharges: booking.requestData.cleaningCharges,
    addOnServicesRequested: booking.requestData.addOnServicesRequested,
    plateGlassCutlery: booking.requestData.plateGlassCutlery,
  })

  // Get pricing breakdown for the new requestData
  const newPricingBreakdown = getPricingBreakdown({
    property: property,
    bookingFrom: newRequestData.bookingFrom,
    bookingTo: newRequestData.bookingTo,
    guestCount: booking.requestData.guestCount + newRequestData.guestCount,
    servicesRequested: {
      ...booking.requestData.servicesRequested,
      ...newRequestData.servicesRequested,
    },
    cleaningCharges: {
      ...booking.requestData.cleaningCharges,
      ...newRequestData.cleaningCharges,
    },
    addOnServicesRequested: {
      ...booking.requestData.addOnServicesRequested,
      ...newRequestData.addOnServicesRequested,
    },
    plateGlassCutlery: newRequestData.plateGlassCutlery,
  })

  // Calculate the price difference
  const priceDiff = {
    nominalPrice: Math.max(
      0,
      newPricingBreakdown.nominalPrice - currentPricingBreakdown.nominalPrice
    ),
    cleaningPrice: Math.max(
      0,
      newPricingBreakdown.cleaningPrice - currentPricingBreakdown.cleaningPrice
    ),
    addOnServicePrice: Math.max(
      0,
      newPricingBreakdown.addOnServicePrice -
        currentPricingBreakdown.addOnServicePrice
    ),
    cutleryDiscount: Math.max(
      0,
      newPricingBreakdown.cutleryDiscount -
        currentPricingBreakdown.cutleryDiscount
    ),
    totalPrice: Math.max(
      0,
      newPricingBreakdown.totalPrice - currentPricingBreakdown.totalPrice
    ),
    serviceCharge: Math.max(
      0,
      newPricingBreakdown.serviceCharge - currentPricingBreakdown.serviceCharge
    ),
    gstAmount: Math.max(
      0,
      newPricingBreakdown.gstAmount - currentPricingBreakdown.gstAmount
    ),
    finalPayablePrice: Math.max(
      0,
      newPricingBreakdown.finalPayablePrice -
        currentPricingBreakdown.finalPayablePrice
    ),
  }

  return priceDiff
}

export default getPriceDiff
