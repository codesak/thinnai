// based on a given inquiry return the final amount
import { IInquiry } from '../../models/Inquiry'
import Property, { IProperties } from '../../models/Property'
import determineBookingType from './determineBookingType'

interface IInquiryData {
  property: IProperties
  bookingFrom: Date //must be in UTC
  bookingTo: Date // Must be in UTC
  guestCount: number
  servicesRequested: string[] // "Alcohol", "Hookah"
  cleaningCharges: string[] //"Cake","Table Decorations", "Floor Decorations"
  addOnServicesRequested: string[]
  plateGlassCutlery: boolean
}

export async function finalAmount(inquiry: IInquiry) {
  const property = await Property.findById(inquiry.property)
  if (!property) {
    throw new Error('Property not found')
  }

  const decorPermits = ['Cake', 'Table Decor', 'Floor Decor']
  const { finalPayablePrice } = getPricingBreakdown({
    property: property,
    bookingFrom: inquiry.bookingFrom,
    bookingTo: inquiry.bookingTo,
    guestCount: inquiry.guestCount,
    servicesRequested: inquiry.servicesRequested,
    cleaningCharges: decorPermits,
    addOnServicesRequested: inquiry.addOnServicesRequested,
    plateGlassCutlery: inquiry.plateGlassCutlery,
  })

  return finalPayablePrice
}

// Add this new interface for the return type of getPricingBreakdown
interface IPricingBreakdown {
  nominalPrice: number
  cleaningPrice: number
  addOnServicePrice: number
  cutleryDiscount: number
  totalPrice: number
  serviceCharge: number
  gstAmount: number
  finalPayablePrice: number
}

// Update the getPricingBreakdown function with the new return

const getPricingBreakdown = (inquiryData: IInquiryData): IPricingBreakdown => {
  const {
    property,
    bookingFrom,
    bookingTo,
    guestCount,
    servicesRequested,
    cleaningCharges,
    addOnServicesRequested,
    plateGlassCutlery,
  } = inquiryData

  const duration = (bookingTo.getTime() - bookingFrom.getTime()) / 60000

  const alcoholStatus =
    servicesRequested && servicesRequested.length > 0
      ? 'withAlcohol'
      : 'withoutAlcohol'

  let timeCategory:
    | 'oneHour'
    | 'oneAndHalfHour'
    | 'twoAndHalfHour'
    | 'threeAndHalfHour'
    | 'four' = 'oneHour'
  if (duration === 60) timeCategory = 'oneHour'
  else if (duration > 60 && duration <= 90) timeCategory = 'oneAndHalfHour'
  else if (duration > 90 && duration <= 150) timeCategory = 'twoAndHalfHour'
  else if (duration > 150 && duration <= 240) timeCategory = 'threeAndHalfHour'
  else if (duration > 240) timeCategory = 'threeAndHalfHour'

  let price = 0

  // bookingFrom, bookingTo => Must be in UTC
  const offerType = determineBookingType(bookingFrom, bookingTo)

  let guestCountCategory = Math.ceil(Number(guestCount) / 2) - 1

  if (offerType === 'Joy') {
    price =
      property.pricing.joyHour[guestCountCategory][alcoholStatus][timeCategory]
  } else if (offerType === 'Gala') {
    price =
      property.pricing?.galaHour[guestCountCategory][alcoholStatus][
        timeCategory
      ]
  }
  const nominalPrice = price

  let cleaningPrice = 0

  //Todo: Get from app Settings
  const cleaningChargeCake = 99
  const cleaningTableDecor = 99
  const cleaningFloorDecor = 99

  if (cleaningCharges && cleaningCharges.length > 0) {
    if (cleaningCharges.includes('cake')) cleaningPrice += cleaningChargeCake
    if (cleaningCharges.includes('tableDecorations'))
      cleaningPrice += cleaningTableDecor
    if (cleaningCharges.includes('floorDecorations'))
      cleaningPrice += cleaningFloorDecor
  }

  price += Math.max(cleaningPrice, 0)

  let addOnServicePrice = 0
  // for each item in addOnServicesRequested, find the price from property.addonServices and then add to price
  if (addOnServicesRequested && addOnServicesRequested.length > 0) {
    addOnServicesRequested.forEach((addonService) => {
      const addonServicePrice = property.addOnServices.find(
        (service) => service.addOnServiceId === addonService
      )
      if (addonServicePrice) addOnServicePrice += addonServicePrice.addOnPrice
    })
  }

  price += Math.max(addOnServicePrice, 0)

  let cutleryDiscount = 0

  if (!plateGlassCutlery) {
    cutleryDiscount -= nominalPrice * 0.05
  }
  price += cutleryDiscount

  let totalPrice = price
  const priceForTax = Math.max(price, 0)
  const serviceTaxRate = 9.5 // service tax rate in percentage
  const serviceCharge = Math.max((priceForTax * serviceTaxRate) / 100,90)
  const gstAmount = (serviceCharge * 18) / 100
  price = price + serviceCharge + gstAmount

  const priceForFinalPayable = Math.max(price, 0)
  const finalPayablePrice = Number(priceForFinalPayable.toFixed(2))

  return {
    nominalPrice,
    cleaningPrice,
    addOnServicePrice,
    cutleryDiscount,
    totalPrice,
    serviceCharge,
    gstAmount,
    finalPayablePrice,
  }
}

export default getPricingBreakdown
