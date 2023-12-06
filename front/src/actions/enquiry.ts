import axios from 'axios'
import { Dispatch } from 'react'
import {
  ADD_ENQUIRY,
  UPDATE_ENQUIRY,
  DELETE_ENQUIRY,
  SET_ENQUIRY_INDEX,
  SET_LOAD_ENQUIRY_DATA,
  SET_ADD_MORE_ENQUIRY,
  ENQUIRY_PLACES_LOAD_SUCCESS,
  SEND_ENQUIRY_SUCCESS,
  SEND_ENQUIRY_FAIL,
  ALERT_TYPE,
  TOKEN_KEY,
} from '../utils/consts'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import store from '../store'
import { resetStore } from './root'
import { clearCart } from './cart'

export const addEnquiry =
  (enquiry: any, navigate: Function) => async (dispatch: Dispatch<any>) => {
    const { propertyId } = enquiry

    let enquiries = store.getState().enquiry.enquiries
    let multipleInquiriesMade = enquiries.length > 1

    const convenienceFee = Number((enquiry.amount * 0.09).toFixed(2))
    const gst = Number(
      (convenienceFee * 0.18 + enquiry.amount * 0.085).toFixed(2)
    )
    const totalAmount = enquiry.amount + convenienceFee + gst
    const details = {
      originalAmount: enquiry.amount,
      totalAmount: totalAmount,
      amount: totalAmount,
      guestCount: enquiry.guestCount,
      bookingFrom: enquiry.startTime,
      bookingTo: enquiry.endTime,
      groupType: enquiry.groupType,
      // decorPermits: enquiry.additions2,
      additionalNotes: enquiry.hostMsg ? enquiry.hostMsg : '',
      multipleInquiriesMade: multipleInquiriesMade,
      propertyBookingType: enquiry.propertyBookingType,
      // servicesRequested: enquiry.additions1, // "Alcohol", "Hookah"
      // addOnServicesRequested: enquiry.addOnServicesRequested, // "Candle Light Dinner", "Movie Screening", "Decorations"
      // plateGlassCutlery: enquiry.cutlery,
      plateGlassCutlery: enquiry.cutlery,
      addOnServicesRequested:
        enquiry.addOnServicesRequested.length === 0
          ? []
          : enquiry.addOnServicesRequested,
      servicesRequested:
        enquiry.additions1.length === 0 ? [] : enquiry.additions1,
      cleaningCharges:
        enquiry.additions2.length === 0 ? [] : enquiry.additions2,
    }
   
    
    try {
      dispatch(clearCart())
      const res = await axios.post(
        `/api/inquiry/addInquiry/${propertyId}`,
        details
        )
        enquiry.id=res.data.inquiry._id
        let cartBody = {
          enquiries: [enquiry.id],
          bookingType: res.data.inquiry.propertyBookingType
      }
        const cartResp = await axios.post(
          `/api/cart/addToCart/`,
          cartBody)
          enquiries = enquiries.concat(enquiry)
      
      
    // if (enquiries.length > 3) {
    //   enquiries.pop()
    // }
    // dispatch({
    //   type: ADD_ENQUIRY,
    //   payload: { enquiries },
    // })
    navigate && navigate()
    } catch (error:any) {
      console.log(error)
      // dispatch(setAlert('Hello',ALERT_TYPE.DANGER))
      if(error.response.data.message === 'Inquiry Already Exists'){
        dispatch(setAlert(error.response.data.errors.message,ALERT_TYPE.DANGER))
      }
      if(error.response.data.errors.message === "Maximum 3 enquiries allowed"){
        dispatch(setAlert(error.response.data.errors.message,ALERT_TYPE.DANGER))
      }
    }
    

      // const getCart = await axios.get('/api/cart/getCart');
  }

export const updateEnquiry =
  (enquiryId: number, updatedEnquiry: any, navigate: Function) =>
  async (dispatch: Dispatch<any>) => {
    let multipleInquiriesMade = store.getState().enquiry.enquiries.length > 1
    const convenienceFee = Number((updatedEnquiry.amount * 0.09).toFixed(2))
    const gst = Number(
      (convenienceFee * 0.18 + updatedEnquiry.amount * 0.085).toFixed(2)
    )
    const totalAmount = updatedEnquiry.amount + convenienceFee + gst
    const updated = {
      originalAmount: updatedEnquiry.amount,
      totalAmount: totalAmount,
      amount: totalAmount,
      guestCount: updatedEnquiry.guestCount,
      bookingFrom: updatedEnquiry.startTime,
      bookingTo: updatedEnquiry.endTime,
      groupType: updatedEnquiry.groupType,
      servicesRequested: updatedEnquiry.additions1,
      addOnServicesRequested: updatedEnquiry.addOnServicesRequested,
      plateGlassCutlery: updatedEnquiry.cutlery,
      // decorPermits: updatedEnquiry.additions2,
      additionalNotes: updatedEnquiry.hostMsg,
      multipleInquiriesMade: multipleInquiriesMade,
      propertyBookingType: updatedEnquiry.propertyBookingType,
    }
    const res = await axios.patch(
      `/api/inquiry/updateInquiry/${enquiryId}`,
      updated
    )
   
    let oldEnquiries = store.getState().enquiry.enquiries
    const enquiries = oldEnquiries.map((enquiry: any) => {
      if (enquiry.id === enquiryId) {
        return { ...updatedEnquiry }
      }
      return enquiry
    })
    dispatch({
      type: UPDATE_ENQUIRY,
      payload: { enquiries },
    })
    navigate && navigate()
  }

// export const deleteEnquiry =
//   (enquiryId:number) => async (dispatch: Dispatch<any>) => {
//     console.log(enquiryId)
//     const res = await axios.delete(`/api/cart/removeEnquiry/${enquiryId}`)
//     console.log('delete',res)
//     // dispatch({
//     //   type: DELETE_ENQUIRY,
//     //   payload: enquiries,
//     // })
//   }

export const setEnquiryIndex =
  (enquiryId: object) => async (dispatch: Dispatch<any>) => {
    dispatch({
      type: SET_ENQUIRY_INDEX,
      payload: enquiryId,
    })
  }

export const setLoadEnquiryData =
  (loadEnquiryData: object) => async (dispatch: Dispatch<any>) => {
    dispatch({
      type: SET_LOAD_ENQUIRY_DATA,
      payload: loadEnquiryData,
    })
  }

export const setAddMoreEnquiry =
  (addMoreEnquiry: object) => async (dispatch: Dispatch<any>) => {
    dispatch({
      type: SET_ADD_MORE_ENQUIRY,
      payload: addMoreEnquiry,
    })
  }

export const loadEnquiryPlaces = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const searchParams = { directBooking: true }
    const res = await axios.post(
      `/api/property/guest/properties`,
      { ...searchParams },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    dispatch({
      type: ENQUIRY_PLACES_LOAD_SUCCESS,
      payload: { properties: res.data },
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

export const sendEnquiries =
  (navigate: Function) => async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const enquiries = store.getState().enquiry.enquiries
      let enquiry: any
      let multipleInquiriesMade = enquiries.length > 1
      // TODO: Remove this loop and send all enquiries at once
      for (enquiry of enquiries) {
        const convenienceFee = Number((enquiry.amount * 0.09).toFixed(2))
        const gst = Number(
          (convenienceFee * 0.18 + enquiry.amount * 0.085).toFixed(2)
        )
        const totalAmount = enquiry.amount + convenienceFee + gst
        const details = {
          originalAmount: enquiry.amount,
          totalAmount: totalAmount,
          amount: totalAmount,
          guestCount: enquiry.guestCount,
          bookingFrom: enquiry.startTime,
          bookingTo: enquiry.endTime,
          groupType: enquiry.groupType,
          servicesRequested: enquiry.additions1,
          addOnServicesRequested: enquiry.addOnServicesRequested,
          plateGlassCutlery: enquiry.cutlery,
          decorPermits: enquiry.additions2,
          additionalNotes: enquiry.hostMsg,
          multipleInquiriesMade: multipleInquiriesMade,
        }
        navigate && navigate()
        dispatch(resetStore('RESET_ENQUIRY'))
        const { data } = await axios.post(
          `/api/inquiry/addInquiry/${enquiry.propertyId}`,
          { ...details },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }

      dispatch({
        type: SEND_ENQUIRY_SUCCESS,
        payload: {},
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
