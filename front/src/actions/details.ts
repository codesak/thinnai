import axios from 'axios'
import { Dispatch } from 'react'
import {
  PROPERTY_LOAD_SUCCESS,
  PROPERTY_LOAD_FAIL,
  ALERT_TYPE,
  LOADING_DETAILS,
  TOKEN_KEY,
} from '../utils/consts'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

export const loadProperty =
  (propertyId: string, navigate?: Function) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      dispatch({ type: LOADING_DETAILS })
      navigate && navigate()
      const res = await axios.get(`/api/property/${propertyId}`)
      dispatch({
        type: PROPERTY_LOAD_SUCCESS,
        payload: res.data,
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

export const loadPropertyWithSlug =
  (propertySlug: string, navigate?: Function) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      dispatch({ type: LOADING_DETAILS })
      const res = await axios.get(`/api/property/slug/${propertySlug}`)
      dispatch({
        type: PROPERTY_LOAD_SUCCESS,
        payload: res.data,
      })
    } catch (err: any) {
      navigate && navigate()
    }
  }
