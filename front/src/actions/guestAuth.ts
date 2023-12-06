import {
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  LOGOUT,
  USER_LOADED,
  USER_LOAD_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  ALERT_TYPE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_UPDATED,
  TOKEN_KEY,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../utils/consts'

import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'
import { loadProfile } from './profile'
import axios from 'axios'
import { Dispatch } from 'react'
import { ROUTES } from '../utils/routing/routes'

interface Action {
  type?: string
  payload?: any
}

export const sendOTP = (phone: object) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.post(
      '/api/auth/guest/login',
      { ...phone },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = Object.fromEntries(
      Object.entries(res.data).filter(([key]) => ['user'].includes(key))
    )
    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: { ...data, ...phone, wrongOTP: false },
    })
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const verifyOTP =
  (otpData: object, navigate: Function) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await axios.post(
        `/api/auth/guest/verifyOTP`,
        { ...otpData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = Object.fromEntries(
        Object.entries(res.data).filter(([key]) => ['token'].includes(key))
      )
      const { token } = res.data

      if (token && typeof token === 'string') {
     
        localStorage.setItem(TOKEN_KEY, token)
        // console.log(
        //   '🚀 ~ file: guestAuth.ts:85 ~ isAuthenticatedNow ~ token:',
        //   localStorage.getItem(TOKEN_KEY)
        // )
      }
      //   if (data) {
      // 	setAuthToken(localStorage.getItem(TOKEN_KEY));
      // 	}
      dispatch({
        type: VERIFY_OTP_SUCCESS,
        payload: data,
      })
      await dispatch(loadUser({}))
      await dispatch(loadProfile())
      const checkPath = sessionStorage.getItem('pathName') ? true : false;
      navigate && navigate( checkPath ? sessionStorage.getItem('pathName') : '/explore')
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.data.errors.message === 'Invalid OTP') {
          dispatch({
            type: VERIFY_OTP_FAIL,
            payload: { wrongOTP: true },
          })
        }
        if (err.response.status === 404) {
          navigate(ROUTES.GUEST_REGISTRATION)
        }
        //TODO: handle 404: "Please Sign Up" by redirecting the user to registration
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadUser =
  ({
    redirectToRegister,
    redirectToInvited,
  }: {
    redirectToRegister?: Function
    redirectToInvited?: Function
  }) =>
  async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const res = await axios.get('/api/auth/user/')
      if (!res.data.user.registered) {
        if (res.data.userData.bookingsInvitedTo.length === 0) {
          redirectToRegister && redirectToRegister()
        } else {
          redirectToInvited &&
            redirectToInvited(res.data.userData.bookingsInvitedTo[0])
        }
      }
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    } catch (err: any) {
      dispatch({
        type: USER_LOAD_FAIL,
      })
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        if (err.response.status === 401) return
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const updateUser =
  (updateData: object) => async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const res = await axios.patch(
        '/api/auth/user/update',
        { ...updateData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = Object.fromEntries(
        Object.entries(res.data).filter(([key]) => ['user'].includes(key))
      )
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      })
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const logout = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: LOGOUT, payload: null })
}
