import { Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP } from '../../../../actions/guestAuth'
import { startLoading } from '../../../../actions/root'
import { RootState } from '../../../../store'
import { AuthButtonTheme, SET_PHONE_NUMBER } from '../../../../utils/consts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { object, string } from 'yup'
//import 'yup-phone';
import '../../../styles/number.scss'
import numb from '../../../styles/GuestLogin/number.module.css'

interface numberProps {
  setNumber: (data: string) => void
}

const Number = ({ setNumber }: numberProps) => {
  // For Exporting Last Two Digits of Mobile Number
  const [exportedData, setExportedData] = useState<string>('')
  const [isFormSubmit,setIsFormSubmit] = useState(false);
  const initialRender = useRef(true)

  const otpAuthLoading = useSelector<RootState, boolean>(
    (state) => state.guestAuth.loading
  )

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      setNumber(exportedData)
    }
  }, [exportedData, setNumber])

  const dispatch: Dispatch<any> = useDispatch()

  // Select field
  const handleSelect = (code: string) => {
    setOtpData({ ...otpData, code })
  }

  // Formik initial values
  const [otpData, setOtpData] = useState({
    code: '+91',
    number: '',
    loading: false,
  })
  const phoneRegExp = /^[6-9]\d{9}$/;

  return (
    <Formik
      initialValues={otpData}
      validationSchema={object({
        number: string()
        .required().matches(phoneRegExp,'Phone number is not valid')
          .transform((value: number) => (isNaN(value) ? undefined : value)),
      })}
      onSubmit={(values, formikHelpers) => {
        setOtpData({ ...values, loading: true })
        const last = values.number.toString().slice(-2)
        setExportedData(last)
        dispatch({
          type: SET_PHONE_NUMBER,
          payload: values.code.toString() + values.number,
        })
        dispatch(startLoading('LOADING_USER'))
        dispatch(sendOTP({ phone: values.code.toString() + values.number }))
        formikHelpers.resetForm()
      }}
    >
      {({ errors, isValid, touched, dirty, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={numb.form}>
          <Box
            className="center"
            flexDirection="column"
            sx={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: '400',
            }}
          >
            <Box
              textAlign="center"
              fontSize={{ xs: '14px', md: '1.2rem', lg: '1.2rem' }}
              marginBottom="1.5rem"
            >
              Enter your mobile number
            </Box>
            <Box
              textAlign="center"
              width={{ md: '40%', sm: '40%', xs: '87%' }}
              sx={{
                fontSize: '0.781rem',
                lineHeight: '19px',
                color: '#8f8f8f',
              }}
            >
              {/* Enter your mobile number linked to your account to login */}
            </Box>
          </Box>
          <Box className={numb.mobile}>
            <Box
              id="country-selector"
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Field
                select
                defaultValue="+91"
                onChange={handleSelect}
                variant="standard"
                style={{
                  width: '5rem',
                  backgroundColor: 'white',
                  border: 'none',
                  display: 'flex',
                }}
                as={TextField}
                name="code"
                InputProps={{ disableUnderline: true }}
              >
                <MenuItem value={'+91'}>
                  <Box>+91</Box>
                  <Box>
                    <img src="/assets/images/otp/flag.svg" alt="" />
                  </Box>
                </MenuItem>
              </Field>
            </Box>
            <Box
              width={{ md: '50%', sm: '50%', xs: '70%' }}
              flexGrow="1"
              height="100%"
              display="flex"
              alignItems="center"
              id="number-input"
            >
              <Field
                as={TextField}
                fullWidth
                //maxLength='10'
                className={numb.input}
                variant="outlined"
                name="number"
                type="text"
                inputProps={{ maxLength: 10 }}
                onInput={(e: any) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                }}
                style={{
                  underline: {
                    '&&&:before': {
                      borderBottom: 'none',
                    },
                    '&&:after': {
                      borderBottom: 'none',
                    },
                  },
                }}
              />
            </Box>
          </Box>
            {errors.number && <div style={{textTransform:'capitalize',color:'red'}}>{errors.number}</div>}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={numb.sendBtn}
          >
            {otpAuthLoading ? 'Send OTP' : 'Send OTP'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Number
