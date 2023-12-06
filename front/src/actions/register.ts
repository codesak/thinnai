//Not in use, will be used for host sign up if required!
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  USER_LOAD_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  ALERT_TYPE,
  UPLOAD_UPDATED,
  LOGIN,
  TOKEN_KEY,
} from '../utils/consts'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'
import axios from 'axios'
import { Dispatch } from 'react'
import { uploadImage } from './commons'
import { loadProfile } from './profile'
interface Action {
  type?: string
  payload?: any
}

// export const register = (registerData: object) => async (dispatch: Dispatch<any>) => {
// 	try {
// 		const res = await axios.post(
// 			'/api/auth/register',
// 			{ ...registerData },
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
// 		);
// 		dispatch({
// 			type: REGISTER_SUCCESS,
// 			payload: res.data,
// 		});
// 		dispatch(loadUser());
// 	} catch (err: any) {
// 		console.log(err);
// 		if (!err.response.data.errors) {
// 			dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER));
// 		} else {
// 			dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER));
// 		}
// 		dispatch({
// 			type: REGISTER_FAIL,
// 		});
// 	}
// };

export const register =
  (updateData: any,currentUrl?: string,navigate?: Function) => async (dispatch: Dispatch<any>) => {
    try {
      const {
        profileCroppedImageFile,
        frontCroppedImageFile,
        backCroppedImageFile,
        phone,
      } = updateData
      const profileImage = profileCroppedImageFile
      // profileCroppedImageFile
      //   ? await uploadImage(
      //       profileCroppedImageFile,
      //       'thinnai/guest/profileImage',
      //       `profileImage${phone}.jpg`,
      //       dispatch,
      //       UPLOAD_UPDATED
      //     )
      //   : updateData.profileImage
      const idProofFront = frontCroppedImageFile
        ? await uploadImage(
            frontCroppedImageFile,
            'thinnai/guest/idProof',
            `idProofFront${phone}.jpg`,
            dispatch,
            UPLOAD_UPDATED
          )
        : updateData.idProofFront

      const idProofBack = backCroppedImageFile
        ? await uploadImage(
            backCroppedImageFile,
            'thinnai/guest/idProof',
            `idProofBack${phone}.jpg`,
            dispatch,
            UPLOAD_UPDATED
          )
        : updateData.idProofBack

      const newUserRequestBody = {
        ...updateData,
        profileImage,
        idProofFront,
        idProofBack,
      }
  
      // TODO: remove test from URL
  
      let res:any = null;
   
      if(currentUrl === '/manage') {
        res = await axios.patch(
          '/api/profile/updateUserData',
          newUserRequestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if(navigate) {
          navigate()
        }
      }
      else {
        res = await axios.post(
          '/api/auth/user/register/guest',
          newUserRequestBody,
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
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
        dispatch({
          type: LOGIN,
        })
        await dispatch(loadUser())
        await dispatch(loadProfile())
  
        if (navigate) navigate()
      }
      
      
    } catch (err: any) {
      dispatch({
        type: REGISTER_FAIL,
      })
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
    }
  }

interface LoginProps {
  email: string
  password: string
}

export const login =
  ({ email, password }: LoginProps) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await axios.post(
        '/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
      dispatch(loadUser())
    } catch (err: any) {
      if (!err.response.data.errors) {
        dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
      } else {
        console.log(err.response.data.errors)
        dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
      }
      dispatch({
        type: LOGIN_FAIL,
      })
    }
  }

export const forgot = (email: string) => async (dispatch: Dispatch<any>) => {
  const params = { email }
  try {
    await axios.post('/api/auth/forgot', params, {
      headers: {
        'content-type': 'application/json',
      },
    })
    dispatch(setAlert('Check Email to verify!', ALERT_TYPE.SUCCESS))
  } catch (err: any) {
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const loadUser = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem(TOKEN_KEY)) {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }
  try {
    //TODO: wrong API path here
    const res = await axios.get('/api/auth/user/')
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err: any) {
    dispatch({
      type: USER_LOAD_FAIL,
    })
    if (err.response.status === 401) return
    if (!err.response.data.errors) {
      dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER))
    } else {
      dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER))
    }
  }
}

export const verify = (id: string) => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await axios.get(`/api/auth/confirm/${id}`)
    dispatch({
      type: VERIFICATION_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: VERIFICATION_FAIL,
      payload: null,
    })
  }
}

export const logout = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: LOGOUT, payload: null })
}
