import axios from 'axios'
import React from 'react'
import { ALERT_TYPE, DONE_LOADING_USER, EMAIL_KEY, GOOGLE_DATA, LOADING_USER, TOKEN_KEY, VERIFY_OTP_FAIL, VERIFY_OTP_SUCCESS } from '../../../utils/consts'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routing/routes'
import { loadUser } from '../../../actions/guestAuth'
import { loadProfile } from '../../../actions/profile'
import { startLoading, stopLoading } from '../../../actions/root'
import '../../styles/googleSuccess.scss'

const GoogleVerification = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const url = window.location.href
     const encodedData = url?.split("?")[1]?.split("=")[1]
     const decodedData = decodeURIComponent(encodedData);
     const jsonData = JSON?.parse(decodedData);
     const mail = jsonData.emails[0].value

    const handleClick = async ()=>{
        dispatch({type:GOOGLE_DATA, payload:jsonData?._json})
        dispatch(startLoading(LOADING_USER))
        try{
          const res =  await axios.post('/api/auth/guest/googleverification',{mail})
          const data = Object.fromEntries(
            Object.entries(res.data).filter(([key]) => ['token'].includes(key))
          )
          
          const { token } = res.data
    
          if (token && typeof token === 'string') {
            localStorage.setItem(TOKEN_KEY, token)
          }
          dispatch({
            type: VERIFY_OTP_SUCCESS,
            payload: data,
          })
          await dispatch(loadUser({}))
          await dispatch(loadProfile())
          const checkPath = sessionStorage.getItem('pathName') ? true : false;
          navigate && navigate( checkPath ? sessionStorage.getItem('pathName')as any : '/explore')
        }
        catch (err: any) {
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
        await dispatch(stopLoading(DONE_LOADING_USER))  
    }

  return (
    <div className='googleSuccess__main__container'>
        <div className='googleSuccess__box'>
          <div className="googleSuccess__img__container">
            <img src="/assets/images/thinnaiGoogle.svg" alt="img" />
          </div>
          <p>Successfully Verified</p>
          <button className="googleSuccess__button" onClick={()=>handleClick()}>Click here to Continue</button>
        </div>
    </div>
  )
}

export default GoogleVerification