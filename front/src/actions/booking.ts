import store from '../store'
import {
  LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS,
  LOAD_BOOKING_SUCCESS,
  LOAD_BOOKING_FAIL,
  LOAD_BOOKING_ONGOING_SUCCESS,
  LOAD_BOOKING_ONGOING_FAIL,
  LOAD_BOOKING_ENQUIRY_SUCCESS,
  LOAD_BOOKING_ENQUIRY_FAIL,
  LOAD_BOOKING_CONFIRMED_SUCCESS,
  LOAD_BOOKING_CONFIRMED_FAIL,
  LOAD_BOOKING_CANCELLED_SUCCESS,
  LOAD_BOOKING_CANCELLED_FAIL,
  CANCEL_ENQUIRY_SUCCESS,
  CANCEL_ENQUIRY_FAIL,
  RESCHEDULE_BOOKING_SUCCESS,
  RESCHEDULE_BOOKING_FAIL,
  ALERT_TYPE,
  LOADING_BOOKING,
  LOAD_BOOKING_RESCHEDULED_FAIL,
  LOAD_BOOKING_RESCHEDULED_SUCCESS,
  LOAD_BOOKING_INVITED_SUCCESS,
  LOAD_BOOKING_INVITED_FAIL,
  REMOVE_INVITED_GUEST_SUCCESS,
  REMOVE_INVITED_GUEST_FAIL,
  RESCHEDULE_BOOKING_REQUEST_SUCCESS,
  RESCHEDULE_BOOKING_REQUEST_FAIL,
  ACCEPT_RESCHEDULE_BOOKING_REQUEST_SUCCESS,
  ACCEPT_RESCHEDULE_BOOKING_REQUEST_FAIL,
  TOKEN_KEY,
} from '../utils/consts'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'
import axios from 'axios'
import { Dispatch } from 'react'

export const loadEnquiryStatus =
  (statusData: object, navigate?: Function) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      dispatch({ type: LOADING_BOOKING })
      const res = await axios.post(
        `/api/inquiry/inquiryStatus`,
        { ...statusData },
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch({
        type: LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS,
        payload: { enquiryStatus: res.data },
      })
      navigate && navigate()
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadBooking =
  (bookingId: string, navigate?: Function) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      dispatch({ type: LOADING_BOOKING })
      const res = await axios.get(`/api/booking/${bookingId}`)
      dispatch({
        type: LOAD_BOOKING_SUCCESS,
        payload: { booking: res.data },
      })
      navigate && navigate()
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadEnquiredBookings = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    dispatch({ type: LOADING_BOOKING })
    const res = await axios.get(`/api/inquiry/guest/inquiries`)
    dispatch({
      type: LOAD_BOOKING_ENQUIRY_SUCCESS,
      payload: { enquiry: res.data },
    })
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const loadRequestedBookingsAndInquiries =
  () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: LOADING_BOOKING })
      const resOne = await axios.get(
        `/api/booking/guest/bookings/rescheduleRequested`
      )
      const resTwo = await axios.post(
        `/api/inquiry/inquiryStatus`,
        { getReschedule: true },
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch({
        type: LOAD_BOOKING_RESCHEDULED_SUCCESS,
        payload: { reschedules: { ...resOne.data, ...resTwo.data } },
      })
    } catch (err: any) {
      dispatch({ type: LOAD_BOOKING_RESCHEDULED_FAIL })
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadConfirmedBookings = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    dispatch({ type: LOADING_BOOKING })
    const res = await axios.get(`/api/booking/guest/bookings/confirmed`)
    dispatch({
      type: LOAD_BOOKING_CONFIRMED_SUCCESS,
      payload: { confirmed: res.data },
    })
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const loadUnpaidBookings = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    dispatch({ type: LOADING_BOOKING })
    const res = await axios.get(`/api/booking/guest/unpaidbookings`)
    dispatch({
      type: LOAD_BOOKING_CONFIRMED_SUCCESS,
      payload: { unpaid: res.data },
    })
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const loadOngoingBooking = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    dispatch({ type: LOADING_BOOKING })
    const res = await axios.get(`/api/booking/guest/bookings/confirmed`)
    let confirmedBookings = res.data
    const ongoingIndex = confirmedBookings.findIndex(
      (confirmedBooking: any) =>
        Math.abs(
          (new Date(confirmedBooking.bookingFrom).valueOf() - Date.now()) / 36e5
        ) < 2
    )
    if (ongoingIndex === -1) {
      dispatch({ type: LOAD_BOOKING_ONGOING_FAIL })
      return
    } else {
      dispatch(loadBooking(confirmedBookings[ongoingIndex]._id))
    }
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const rescheduleBooking =
  (rescheduleDetails: object, bookingId: string) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const res = await axios.post(
        `/api/booking/reschedule/${bookingId}`,
        { reschedule: { ...rescheduleDetails } },
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch({
        type: RESCHEDULE_BOOKING_SUCCESS,
        payload: { booking: res.data.booking },
      })
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadCancelledBookings = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const res = await axios.get(`/api/booking/guest/bookings/cancelled`)
    dispatch({
      type: LOAD_BOOKING_CANCELLED_SUCCESS,
      payload: { confirmed: res.data },
    })
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const loadInvitedBookings = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: LOADING_BOOKING })
    const res = await axios.get(`/api/booking/guest/bookings/invitedToBookings`)
    dispatch({
      type: LOAD_BOOKING_INVITED_SUCCESS,
      payload: { invitedTo: res.data },
    })
  } catch (err: any) {
    dispatch({ type: LOAD_BOOKING_INVITED_FAIL })
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      if (err.response.status === 401) return
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const addMeToBooking =
  ({ bookingId, navigate }: { bookingId: string; navigate?: Function }) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      await axios.post(`/api/booking/addMeToBooking`, {
        bookingId,
      })
      dispatch(setAlert('Added to the booking', ALERT_TYPE.SUCCESS))
      navigate && navigate()
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const removeInvitedGuest =
  ({
    bookingId,
    invitedGuestId,
  }: {
    bookingId: string
    invitedGuestId: string
  }) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const res = await axios.post(`/api/booking/removeGuest/${bookingId}`, {
        invitedGuestId,
      })
      dispatch(setAlert('Removed Guest from the booking', ALERT_TYPE.SUCCESS))
      dispatch({
        type: REMOVE_INVITED_GUEST_SUCCESS,
        payload: { booking: res.data.booking },
      })
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const cancelEnquiry =
  (enquiryId: string, enquiryGroupIndex: number, enquiryIndex: number) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    dispatch({ type: LOADING_BOOKING })
    try {
      const details = {
        inquiryStatus: 'Cancelled',
        statusUpdateReason: 'cancelled by guest',
        cancelledBy: {
          guest: true,
        },
      }
      await axios.post(
        `/api/inquiry/cancelInquiry/${enquiryId}`,
        { ...details },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch(loadEnquiredBookings())
      dispatch({
        type: CANCEL_ENQUIRY_SUCCESS,
        payload: { enquiryGroupIndex, enquiryIndex },
      })
      dispatch(setAlert('Enquiry Cancelled Successfully', ALERT_TYPE.DANGER))
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const setRescheduledBookingStatus =
  (
    bookingId: string,
    bookingStatus: string,
    rescheduleFrom?: Date,
    rescheduleTo?: Date
  ) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      let details: any = { bookingStatus: bookingStatus.toLowerCase() }
      if (bookingStatus === 'Confirmed') {
        details.bookingFrom = rescheduleFrom
        details.bookingTo = rescheduleTo
      } else {
        details.cancelledBy = {
          guest: true,
        }
      }
      await axios.post(
        `/api/booking/setBookingStatus/${bookingId}`,
        { ...details },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch(loadRequestedBookingsAndInquiries())
      dispatch(
        setAlert(
          `Rescheduled Booking ${bookingStatus} Successfully`,
          ALERT_TYPE.DANGER
        )
      )
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const setRescheduledInquiryStatus =
  (
    inquiryId: string,
    inquiryStatus: string,
    rescheduleFrom?: Date,
    rescheduleTo?: Date
  ) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      if (inquiryStatus === 'Confirmed') {
        const details: any = {}
        if (rescheduleFrom && rescheduleTo) {
          details.time = {
            bookingFrom: rescheduleFrom,
            bookingTo: rescheduleTo,
          }
        }
        await axios.post(
          `/api/booking/addBooking/${inquiryId}`,
          { ...details },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      } else {
        const details = {
          statusUpdateReason: 'Reschedule declined by guest',
          cancelledBy: { guest: true },
        }
        await axios.post(
          `/api/inquiry/cancelInquiry/${inquiryId}`,
          { ...details },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }
      dispatch(loadRequestedBookingsAndInquiries())
      dispatch(
        setAlert(
          `Rescheduled Inquiry ${inquiryStatus} Successfully`,
          ALERT_TYPE.DANGER
        )
      )
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

  export const cancelBooking =
  (bookingId: string, reason:string | undefined) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const details = {
        bookingStatus: 'Cancelled',
        statusUpdateReason: 'cancelled by guest',
        cancellationReason:reason,
        cancelledBy: {
          guest: true,
        },
      }
      await axios.post(
        `/api/booking/cancel/byguest/${bookingId}`,
        { ...details },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch(setAlert('Booking Cancelled Successfully', ALERT_TYPE.DANGER))
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }
