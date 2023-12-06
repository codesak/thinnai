import determineBookingType from './determineBookingType'

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

// Test cases
const testCases = [
  {
    istFrom: createDateInIst(2023, 5, 14, 10, 0),
    istTo: createDateInIst(2023, 5, 14, 11, 0),
    expected: 'Joy',
  },
  {
    istFrom: createDateInIst(2023, 5, 14, 10, 0),
    istTo: createDateInIst(2023, 5, 14, 12, 0),
    expected: 'Joy',
  },
  {
    istFrom: createDateInIst(2023, 5, 14, 10, 0),
    istTo: createDateInIst(2023, 5, 14, 13, 0),
    expected: 'Gala',
  },
  {
    istFrom: createDateInIst(2023, 5, 20, 5, 0),
    istTo: createDateInIst(2023, 5, 20, 6, 0),
    expected: 'Gala',
  },
  {
    istFrom: createDateInIst(2023, 5, 20, 5, 0),
    istTo: createDateInIst(2023, 5, 20, 7, 0),
    expected: 'Gala',
  },
]

// Run test cases
testCases.forEach(({ istFrom, istTo, expected }, index) => {
  const utcFrom = istToUtc(istFrom)
  const utcTo = istToUtc(istTo)
  const result = determineBookingType(utcFrom, utcTo)
  console.log(
    `Test case ${index + 1}: ${result === expected ? 'PASS' : 'FAIL'}`
  )
})
