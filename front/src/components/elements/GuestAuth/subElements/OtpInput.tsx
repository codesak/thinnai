import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import React, { Dispatch, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { sendOTP, verifyOTP } from '../../../../actions/guestAuth'
import { startLoading, stopLoading } from '../../../../actions/root'
import { RootState } from '../../../../store'
import { DONE_LOADING_USER, LOADING_USER } from '../../../../utils/consts'
import * as yup from 'yup'

interface inputProps {
  lastDigits: string
  navigateOnSuccess: Function
  bookingId?: string
}

const OtpInput = ({ lastDigits, navigateOnSuccess, bookingId }: inputProps) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const [otpAuthLoading, setOtpAuthLoading] = useState(false)

  // Countdown
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(1)
  useEffect(() => {
    var timer = setInterval(() => {
      setSecond(second - 1)
      if (second === 0 && minute !== 0) return setMinute(0), setSecond(59)
      if (minute === 0 && second === 0) return setMinute(0), setSecond(0)
    }, 1000)
    return () => clearInterval(timer)
  })

  // Button Style
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-contained': {
              background: 'black',
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey',
              color: 'white',
            },
          },
        },
      },
    },
  })

  const focusNext = (e: React.FormEvent<HTMLInputElement>, last: number) => {
    if ((e.target as HTMLInputElement).value.length) {
      ;(
        (e.target as HTMLInputElement).nextElementSibling as HTMLElement
      )?.focus()
    } else {
      ;(
        (e.target as HTMLInputElement).previousElementSibling as HTMLElement
      )?.focus()
    }
  }
  const onKeyDown = (e: any) => {
    if (e.keyCode === 8 && !e.target.value.length) {
      e.target.previousElementSibling?.focus()
    }
  }

  const wrongOtpStore = useSelector<RootState, boolean>(
    (state) => state.guestAuth.wrongOTP
  )
  const [wrongOtp, setWrongOtp] = useState(false)
  useEffect(() => {
    setWrongOtp(wrongOtpStore)
  }, [wrongOtpStore])

  const fieldName = ['first', 'second', 'third', 'forth']

  const [otpArray, setOtpArray] = useState({
    first: '',
    second: '',
    third: '',
    forth: '',
    otp: '',
    loading: false,
  })
  const onlyNumbers = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  const phone = useSelector<RootState, string>((state) => state.guestAuth.phone)
  const otp = useSelector<RootState, number>(
    (state) => state.guestAuth.user.otp
  )

  const onClick = () => {
    dispatch(sendOTP({ phone }))
    setWrongOtp(false)
    setSecond(0)
    setMinute(1)
    setResendbtn(true)
    timer()
  }

  const [resendbtn, setResendbtn] = useState(true)

  const timer = useCallback(
    () =>
      setTimeout(() => {
        setResendbtn(false)
      }, 62000),
    []
  )

  useEffect(() => {
    setTimeout(() => {
      setResendbtn(false)
    }, 61000)
  }, [])

  const handleProcess = async()=>{
    dispatch(startLoading(LOADING_USER))
    await dispatch(verifyOTP({ phone, otpString:otp, bookingId }, navigate))
    //formikHelpers.resetForm()
    await dispatch(stopLoading(DONE_LOADING_USER))
    setOtpAuthLoading(false)
  }

  return (
    <Formik
      initialValues={otpArray}
      validationSchema={object({
        first: yup.string().max(1).required('Required'),
        second: yup.string().max(1).required('Required'),
        third: yup.string().max(1).required('Required'),
        forth: yup.string().max(1).required('Required'),
      })}
      onSubmit={async (values, formikHelpers) => {
        setOtpAuthLoading(true)
        const otpDigits = [
          values.first,
          values.second,
          values.third,
          values.forth,
        ]
        const otpString = otpDigits.join('')
        setOtpArray({ ...values, loading: true, otp: otpString })
        dispatch(startLoading(LOADING_USER))
        await dispatch(verifyOTP({ phone, otpString, bookingId }, navigate))
        formikHelpers.resetForm()
        await dispatch(stopLoading(DONE_LOADING_USER))
        setOtpAuthLoading(false)
      }}
    >
      {({ errors, isValid, touched, dirty, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit} id='form'>
          <Box className="center">
            {/* <Box
              className="openSans"
              sx={{
                fontSize: '1.2rem',
                lineHeight: '19px',
                color: 'black',
              }}
            >
              Enter the OTP {otp}
            </Box> */}
          </Box>
          <Box height={10} />
          {/* <Box className="center">
            <Box
              className="openSans"
              width={{ xs: '60%', sm: '100%', md: '100%' }}
              fontSize={{ xs: '0.763rem', md: '0.875rem', sm: '0.825rem' }}
              sx={{
                lineHeight: '14px',
                color: '#8F8F8F',
              }}
            >
              {'OTP is sent to the number ending with xxxxxxxx' + lastDigits}
            </Box>
          </Box> */}
          {/* <Box height={30} /> */}
          {/* <Box className="center" sx={{ gap: '0.625rem' }}>
            {fieldName.map((name, index) => (
              <>
                <Field
                  style={{
                    textAlign: 'center',
                    width: '50px',
                    height: '43px',
                    borderRadius: '6px',
                    border: wrongOtp
                      ? '0.5px solid #EE6262'
                      : '0.5px solid #1A191E',
                    outline: 'none',
                    transition: '0.3s',
                  }}
                  maxLength='1'
                  key={index}
                  inputProps={{ type: 'tel', maxLength: 1,pattern: '[0-9]*'}}
                  type='tel'
                  pattern='[0-9]*'
                  onKeyDown={onKeyDown}
                  name={fieldName[index]}
                  onInput={(e: React.FormEvent<HTMLInputElement> | any) => {
                    onlyNumbers(e)
                    focusNext(e, index)
                  }}
                  className="otp-input"
                />
              </>
            ))}
          </Box> */}
          {/* <Box height={8} /> */}
          {/* <Box
            className="center"
            width={wrongOtp ? '55%' : '50%'}
            justifyContent={{ xs: 'center', md: 'center' }}
            margin="auto"
            display="block"
          > */}
            {/* {wrongOtp && (
              <Box
                className="openSans"
                color="#FF5252"
                justifyContent="center"
                fontSize="12px"
                display="flex"
                gap={0.5}
              >
                <Box fontWeight="300">Wrong OTP entered.</Box>
                <Box fontWeight="800">Try Again</Box>
              </Box>
            )} */}
            {/* {!wrongOtp && ( */}
            {/* <Box
              className="openSans"
              color="#8F8F8F"
              fontSize={{ md: '1rem', sm: '1rem', xs: '1rem' }}
            >
              {minute < 10 ? '0' + minute : minute} :{' '}
              {second < 10 ? '0' + second : second}
            </Box> */}
            {/* )} */}
          {/* </Box> */}
          {/* <Box
            height={30}
            display="flex"
            justifyContent="center"
            gap={0.6}
            sx={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontSize: '0.9rem',
              lineHeight: '14px',
              display: 'flex',
              marginTop: '1.3rem',
              alignItems: 'center',
              color: '#000000',
            }}
          >
            <Box fontWeight="300">Didn’t receive an OTP ?</Box>
            <Button
              variant="text"
              //component='span'
              disabled={resendbtn}
              style={{
                cursor: 'pointer',
                fontWeight: '800',
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontSize: '0.9rem',
                lineHeight: '14px',
                color: resendbtn === true ? '#616161' : '#000000',
                textTransform: 'none',
              }}
              onClick={() => {
                onClick();
                resetForm()
              }}
            >
              Resend Again
            </Button>
          </Box> */}
          {/* <Box height={12} /> */}
          <Box
          display={{ md: 'none', sm: 'block', xs: 'block' }}
          fontFamily="Montserrat"
          fontStyle="normal"
          color="#272F3D"
          fontWeight="700"
          fontSize="1.6rem"
          lineHeight="1.4em"
          textAlign="center"
          zIndex="2">
          Let’s get started with your Thinnai journey
          </Box>
          <Box height={20}/>
          <Box className="center">
            <Box width={{ md: '50%', sm: '65%', xs: '85%' }} height="46px">
              <ThemeProvider theme={theme}>
                <Button
                  //disabled={minute === 0 && second === 0 ? false : !isValid || !dirty}
                  fullWidth
                  //type="submit"
                  variant="contained"
                  style={{
                    textTransform: 'none',
                    fontSize: '20px',
                    marginBottom: '2rem',
                  }}
                  onClick={() => {
                    if (minute === 0 && second === 0) {
                      onClick();
                    }  
                    handleProcess()
                  }}
                >
                  {otpAuthLoading ? 'Loading...' : minute === 0 && second === 0 ? 'Continue' : 'Continue'}
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
          <Box
            height={{
              md: 15,
              sm: 15,
            }}
          />
          {/* <Box className='center'>
                <Box 
                    className='openSans' 
                    color='#8F8F8F'
                    fontSize={{md:'11px',sm:'11px',xs:'9px'}}
                >
                    {minute<10? "0"+minute : minute} : {second<10? "0"+second : second}
                </Box>
            </Box> */}
        </Form>
      )}
    </Formik>
  )
}
export default OtpInput
