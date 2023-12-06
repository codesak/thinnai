// testFinalAmount.ts
import determineBookingType from './determineBookingType'
import getPricingBreakdown from './getPricingBreakdown'

function istToUtc(date: Date): Date {
  const utcOffset = -date.getTimezoneOffset() // Get the offset in minutes from UTC
  const istOffset = 330 // IST is UTC+5:30, so the offset in minutes is 5*60 + 30
  const offset = utcOffset - istOffset
  const convertedDate = new Date(date.getTime() + offset * 60000)
  return convertedDate
}

function createDateInIst(
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number
): Date {
  const date = new Date(year, month - 1, day, hours, minutes)
  const istOffset = 330 // IST is UTC+5:30, so the offset in minutes is 5*60 + 30
  const utcDate = new Date(date.getTime() - istOffset * 60000)
  return utcDate
}

interface IInquiryData {
  property: any // This should match your IProperties interface
  bookingFrom: Date //must be in UTC
  bookingTo: Date // Must be in UTC
  guestCount: number
  servicesRequested: string[] // "Alcohol", "Hookah"
  cleaningCharges: string[] //"Cake","Table Decorations", "Floor Decorations"
  addOnServicesRequested: string[]
  plateGlassCutlery: boolean
}

interface IPricingBreakdown {
  nominalPrice: number
  cleaningPrice: number
  addOnServicePrice: number
  cutleryDiscount: number
  serviceCharge: number
  gstAmount: number
  finalPayablePrice: number
}

const istFrom = createDateInIst(2023, 5, 20, 5, 0)
const istTo = createDateInIst(2023, 5, 20, 7, 0)

const utcFrom = istToUtc(istFrom)
const utcTo = istToUtc(istTo)

const result = determineBookingType(utcFrom, utcTo)
console.log(`Test: determine Booking Hour Type  =>  ${result}`)

const testInquiryData: IInquiryData = {
  property: {
    pricing: {
      galaHour: [
        {
          hightGuestCount: 2,
          lowGuestCount: 1,
          withAlcohol: {
            oneHour: 250,
            oneAndHalfHour: 300,
            twoAndHalfHour: 350,
            threeAndHalfHour: 400,
            four: 450,
          },
          withoutAlcohol: {
            oneHour: 200,
            oneAndHalfHour: 250,
            twoAndHalfHour: 300,
            threeAndHalfHour: 350,
            four: 400,
          },
        },
        {
          hightGuestCount: 4,
          lowGuestCount: 3,
          withAlcohol: {
            oneHour: 300,
            oneAndHalfHour: 350,
            twoAndHalfHour: 400,
            threeAndHalfHour: 450,
            four: 500,
          },
          withoutAlcohol: {
            oneHour: 250,
            oneAndHalfHour: 300,
            twoAndHalfHour: 350,
            threeAndHalfHour: 400,
            four: 450,
          },
        },
        {
          hightGuestCount: 6,
          lowGuestCount: 5,
          withAlcohol: {
            oneHour: 350,
            oneAndHalfHour: 400,
            twoAndHalfHour: 450,
            threeAndHalfHour: 500,
            four: 550,
          },
          withoutAlcohol: {
            oneHour: 300,
            oneAndHalfHour: 350,
            twoAndHalfHour: 400,
            threeAndHalfHour: 450,
            four: 500,
          },
        },
      ],
      joyHour: [
        {
          lowGuestCount: 1,
          hightGuestCount: 2,
          withAlcohol: {
            oneAndHalfHour: 250,
            oneHour: 200,
            threeAndHalfHour: 350,
            twoAndHalfHour: 300,
            four: 400,
          },
          withoutAlcohol: {
            oneAndHalfHour: 200,
            oneHour: 150,
            threeAndHalfHour: 300,
            twoAndHalfHour: 250,
            four: 350,
          },
        },
        {
          lowGuestCount: 3,
          hightGuestCount: 4,
          withAlcohol: {
            oneHour: 250,
            oneAndHalfHour: 300,
            twoAndHalfHour: 350,
            threeAndHalfHour: 400,
            four: 450,
          },
          withoutAlcohol: {
            oneHour: 200,
            oneAndHalfHour: 250,
            twoAndHalfHour: 300,
            threeAndHalfHour: 350,
            four: 400,
          },
        },
        {
          lowGuestCount: 5,
          hightGuestCount: 6,
          withAlcohol: {
            oneHour: 300,
            oneAndHalfHour: 350,
            twoAndHalfHour: 400,
            threeAndHalfHour: 450,
            four: 500,
          },
          withoutAlcohol: {
            oneHour: 350,
            oneAndHalfHour: 400,
            twoAndHalfHour: 450,
            threeAndHalfHour: 500,
            four: 550,
          },
        },
      ],
    },
    addOnServices: [],
  },
  bookingFrom: utcFrom, // don't change this line, set the value to istFrom
  bookingTo: utcTo, // don't change this line, set the value to istTo
  guestCount: 4,
  servicesRequested: ['Alcohol', 'Hookah'],
  cleaningCharges: ['Cake', 'Table Decorations', 'Floor Decorations'],
  addOnServicesRequested: [],
  plateGlassCutlery: true,
}

const expectedPricingBreakdown: IPricingBreakdown = {
  nominalPrice: 400, // the expected nominalPrice
  cleaningPrice: 50, // the expected cleaningPrice
  addOnServicePrice: 20, // the expected addOnServicePrice
  cutleryDiscount: 5, // the expected cutleryDiscount
  serviceCharge: 15, // the expected serviceCharge
  gstAmount: 10, // the expected gstAmount
  finalPayablePrice: 190, // the expected finalPayablePrice
}

const testGetPricingBreakdown = () => {
  const result = getPricingBreakdown(testInquiryData)

  if (JSON.stringify(result) === JSON.stringify(expectedPricingBreakdown)) {
    console.log('Test Passed')
  } else {
    console.log('Test Failed')
    console.log('Expected: ', expectedPricingBreakdown)
    console.log('Received: ', result)
  }
}

testGetPricingBreakdown()
