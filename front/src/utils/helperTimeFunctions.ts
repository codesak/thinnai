import { timeArray } from "./consts";
export const InputTime = (inputTime: string) => {
  let hour = parseInt(inputTime?.split(/[- :]/)[0])
  const minutes = parseInt(inputTime?.split(/[- :]/)[1])
  const ampm = inputTime?.split(/[- :]/)[2].toUpperCase()
  if (ampm === 'PM' && hour !== 12) {
    hour += 12
  } else if (ampm === 'AM' && hour === 12) {
    hour = 0
  }
  return { hour, minutes }
}

export const generateTimeSlots = (startTime: string, numSlots: number) => {
  const slots = [startTime]
  const date = new Date(`01/01/2021 ${startTime}`)
  for (let i = 1; i < numSlots; i++) {
    date.setMinutes(date.getMinutes() + 30)
    let hours = date.getHours()
    let minutes = date.getMinutes().toString()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours %= 12
    hours = hours || 12
    minutes = +minutes < 10 ? `0${minutes}` : minutes
    const timeString = `${
      hours.toString().length > 1 ? `${hours}` : `0${hours}`
    }:${minutes} ${ampm}`
    slots.push(timeString)
  }
  return slots
}

// Converting time in 12hrs format and then finding it's index in Time Array
export const hrs12Convert = (now:Date) => {

  let date = now.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  if (date.slice(0, 2) === '00') {
    date = '12' + date.slice(2);
  }

  date = date.toUpperCase()
  const indexOfCurrentTime = timeArray?.findIndex(
    (timeElement) => timeElement?.time === date
  )
  if (indexOfCurrentTime <= timeArray.length - 1) {
    const { time } = timeArray[indexOfCurrentTime]
    return { indexOfCurrentTime, time }
  } else {
    throw new Error('Time is out of range')
  }
}
// Choose PresentTime + 45 Min after Slot
export const calculate_future_time = () => {
  let now = new Date()
  now.setMinutes(now.getMinutes() + 45)
  let minutes = now.getMinutes()
  if (minutes <= 30) {
    now.setMinutes(30)
  } else {
    now.setMinutes(0)
    now.setHours(now.getHours() + 1)
  }
  return now
}

export const indexFinder = () => {
  let now = calculate_future_time()
  const { indexOfCurrentTime } = hrs12Convert(now)
  return indexOfCurrentTime
}

export const timeFetch = () => {
  let now = calculate_future_time()
  const { time } = hrs12Convert(now)
  return time
}


