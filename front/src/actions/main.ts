import axios from 'axios'
import { Dispatch } from 'react'
import {
  PLACES_LOAD_SUCCESS,
  PLACES_LOAD_FAIL,
  LOCATIONS_LOAD_SUCCESS,
  LOCATIONS_LOAD_FAIL,
  ALERT_TYPE,
  TOKEN_KEY,
} from '../utils/consts'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import store from '../store'

export const loadPlaces = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const searchParams = store.getState().search
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
      type: PLACES_LOAD_SUCCESS,
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

export const loadLocations = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const res = await axios.get(`/api/locations/`)
    dispatch({
      type: LOCATIONS_LOAD_SUCCESS,
      payload: { locations: res.data },
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
