import {
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
  REVIEWS_LOAD_SUCCESS,
  REVIEWS_LOAD_FAIL,
  FRIENDS_LOAD_SUCCESS,
  FRIENDS_LOAD_FAIL,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPLOAD_UPDATED,
  ALERT_TYPE,
  PROFILE_PENDING,
  TOKEN_KEY,
} from '../utils/consts'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'
import { uploadImage } from './commons'
import axios from 'axios'
import { Dispatch } from 'react'

interface Action {
  type?: string
  payload?: any
}

export const loadProfile = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: PROFILE_LOAD_SUCCESS,
      payload: { userData: res.data },
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

export const updateProfile =
  (updateData: any, navigate?: Function) => async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const {
        profileCroppedImageFile,
        frontCroppedImageFile,
        backCroppedImageFile,
        userId,
      } = updateData
    
    
      const profileImage = profileCroppedImageFile
        ? await uploadImage(
            profileCroppedImageFile,
            'thinnai/guest/profileImage',
            `profileImage${userId}.jpg`,
            dispatch,
            UPLOAD_UPDATED
          )
        : updateData.profileImage
      const idProofFront = frontCroppedImageFile
        ? await uploadImage(
            frontCroppedImageFile,
            'thinnai/guest/idProof',
            `idProofFront${userId}.jpg`,
            dispatch,
            UPLOAD_UPDATED
          )
        : updateData.idProofFront

      const idProofBack = backCroppedImageFile
        ? await uploadImage(
            backCroppedImageFile,
            'thinnai/guest/idProof',
            `idProofBack${userId}.jpg`,
            dispatch,
            UPLOAD_UPDATED
          )
        : updateData.idProofBack
      const res = await axios.patch(
        '/api/profile/updateUserData',
        { ...updateData, profileImage, idProofFront, idProofBack },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = Object.fromEntries(
        Object.entries(res.data).filter(([key]) => ['userData'].includes(key))
      )
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      if (navigate) navigate()
    } catch (err: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
      })
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

export const loadReviews = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const res = await axios.get('/api/auth/profile/reviews', {
      params: {
        userId: localStorage.getItem(TOKEN_KEY),
      },
    })
    dispatch({
      type: REVIEWS_LOAD_SUCCESS,
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

export const loadFriends = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    const res = await axios.get(`/api/profile/friends/`)
    dispatch({
      type: FRIENDS_LOAD_SUCCESS,
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

export const removeFriend =
  (friendId: string) => async (dispatch: Dispatch<any>) => {
    if (localStorage.getItem(TOKEN_KEY)) {
      setAuthToken(localStorage.getItem(TOKEN_KEY))
    }
    try {
      const res = await axios.post(
        '/api/profile/removeFriend',
        { friendId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch({
        type: REMOVE_FRIEND_SUCCESS,
        payload: { friends: res.data.friends },
      })
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }
