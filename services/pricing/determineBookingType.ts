const holidays: string[] = ['YYYY-MM-DD', 'YYYY-MM-DD']

function isHoliday(date: Date): boolean {
  const dateString = date.toISOString().split('T')[0]
  return holidays.includes(dateString)
}

function isWeekendOrHoliday(date: Date): boolean {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6 || isHoliday(date)
}

function isDurationInGalaHours(from: Date, to: Date): boolean {
  const isWeekendHoliday = isWeekendOrHoliday(from)

  const fromHour = from.getHours()
  const toHour = to.getHours()

  const joyEnd = isWeekendHoliday ? 12 : 16
  const joyStart = 6

  // const fromMinutes = from.getMinutes()
  // const toMinutes = to.getMinutes()

  // Check for Gala hours overlap
 // for (let h = fromHour; h < toHour; h++) {
    if
    (toHour < joyEnd && fromHour >= joyStart && fromHour < joyEnd) 
    {
      return false
    }
    return true
}
export default function determineBookingType(
  bookingFrom: Date,
  bookingTo: Date
): string {
  function isValidDate(date: any) {
    return (
      date &&
      Object.prototype.toString.call(date) === '[object Date]' &&
      !isNaN(date)
    )
  }

  console.log(
    '🚀 ~ file: determineBookingType.ts:42 ~ bookingTo:',
    isValidDate(bookingTo),
    bookingTo
  )
  console.log(
    '🚀 ~ file: determineBookingType.ts:42 ~ bookingFrom:',
    isValidDate(bookingFrom),
    bookingFrom
  )
  // Convert the date objects to IST timezone.
  const offset = 5.5 * 60
  const bookingFromIST = new Date(bookingFrom.getTime() + offset * 60000)
  const bookingToIST = new Date(bookingTo.getTime() + offset * 60000)

  if (isDurationInGalaHours(bookingFromIST, bookingToIST)) {
    return 'Gala'
  } else {
    return 'Joy'
  }
}
