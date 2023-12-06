import { NavigationBar } from '../elements/Common/NavigationBar'
import { RootState } from '../../store'
import { SHOW_ONLY_DESKTOP, SHOW_ONLY_PHONE } from '../../utils/consts'
import { ROUTES } from '../../utils/routing/routes'
import Number from '../elements/GuestAuth/subElements/Number'
import OtpInput from '../elements/GuestAuth/subElements/OtpInput'
import RegistrationNavbar from '../elements/GuestAuth/subElements/RegistrationNavbar'
import '../styles/OtpAuth/otp.scss'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import nav from '../styles/GuestLogin/navbar.module.css'
import { Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import isAuthenticatedNow from '../../utils/isAuthenticatedNow'
import destroyToken from '../../utils/destroyToken'
import axios from 'axios'

const GuestLogin = () => {
  const navigate = useNavigate()
  // const isAuthenticated = useSelector<RootState, boolean>(
  //   (state) => state.guestAuth.isAuthenticated
  // )
  const isAuthenticated = isAuthenticatedNow()

  const authLoading = useSelector<RootState, boolean>(
    (state) => state.guestAuth.loading
  )
  const registered = useSelector<RootState, boolean>(
    (state) => state.guestAuth.user.registered
  )
  const otp = useSelector<RootState, number>(
    (state) => state.guestAuth.user.otp
  )

  const { bookingId } = useParams<{ bookingId: string }>()

  const [lastTwo, setLastTwo] = useState<string>('')
  //For Last Digit of Mobile Number
  const setNumber = (lastTwoNumbers: string) => {
    setLastTwo(lastTwoNumbers)
  }

  const [otpSent, setOtpSent] = useState(false)

  // useEffect(() => {
  //   destroyToken()
  // }, [])
  useEffect(() => {
    if (isAuthenticatedNow()) {
      navigate(ROUTES.EXPLORE)
    }
  }, [])
  useEffect(() => {
    if (lastTwo?.length === 2) setOtpSent(true)
  }, [lastTwo?.length === 2])

  useEffect(() => {
    if (!authLoading && isAuthenticated && registered && !bookingId) {
      navigate(ROUTES.EXPLORE)
    } else if (!authLoading && isAuthenticated && bookingId) {
      navigate(`${ROUTES.CONFIRM_INVITATION}/${bookingId}`)
    }
  }, [isAuthenticated, authLoading])

  const navigateOnLoginSuccess = () => {
    let path = registered
      ? bookingId
        ? `${ROUTES.CONFIRM_INVITATION}/${bookingId}`
        : ROUTES.EXPLORE
      : `${ROUTES.GUEST_REGISTRATION}`
    navigate(path)
  }
  function handleGoogleCallback() {
    window.open('/api/auth/register/google/guest', '_self')
  }

  return (
    <div>
      <NavigationBar />
      <Grid className={`otp ${nav.mainContainer}`}>
        {/* <RegistrationNavbar /> */}
        <CssBaseline />
        <div className={nav.imgContainer}>
          <img
            src={process.env.PUBLIC_URL + '/assets/images/bgNewDesktop.svg'}
            alt=""
          />
        </div>
        <div className={nav.switch}>
          <div className={nav.infoWrapper}>
            <Box className={nav.container}>
              {!otpSent || otp === undefined ? (
                <Box>
                  <img
                    src={process.env.PUBLIC_URL + '/assets/images/logo.svg'}
                    alt="logo"
                  />
                  <h2>Hello there!</h2>
                </Box>
              ) : (
                <Box className={nav.otpContainer}>
                  <ArrowBackIosIcon className={nav.backBtn} />
                  <h2>OTP Verification</h2>
                </Box>
              )}
              <p>Login to begin your Thinnai experiences :)</p>
            </Box>

            <Grid item md={4} xs={4}>
              <Box>
                <Box
                  display={{ md: 'block', sm: 'none', xs: 'none' }}
                  fontFamily="Montserrat"
                  fontStyle="normal"
                  color="#272F3D"
                  fontWeight="700"
                  fontSize="2.2rem"
                  lineHeight="1.4em"
                  textAlign="center"
                  zIndex="2"
                >
                  {!otpSent || otp === undefined ? (
                    <div className={nav.desktopInfoWrapper}>
                      <h2 className={nav.desktopHeading}>Hello there!</h2>
                      <p className={nav.desktopTagLine}>
                        Login to begin your Thinnai experiences: )
                      </p>
                    </div>
                  ) : (
                    'Let’s get started with your Thinnai journey'
                  )}
                </Box>
                <Box className={nav.imgMobile}>
                  <img
                    src={
                      process.env.PUBLIC_URL + '/assets/images/bgNewMobile.svg'
                    }
                    alt="img"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={4}>
              {otpSent === false ? (
                // <Number setNumber={setNumber} />
                <div
                  className="google-btn"
                  onClick={() => handleGoogleCallback()}
                >
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="img"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </div>
              ) : (
                <OtpInput
                  bookingId={bookingId}
                  lastDigits={lastTwo}
                  navigateOnSuccess={navigateOnLoginSuccess}
                />
              )}
            </Grid>
            {/* <Box
									className='otp__or'
									position='relative'
									margin='auto'
									textAlign='center'
									marginTop={{
										sm: '1.5rem',
										md: '2rem',
									}}
									width='60%'
									color='#929292'
								>
									OR
								</Box>
								<Box height={6} />
								<Box
									margin='auto'
									width={{
										sm: '80%',
										md: '50%',
									}}
								>
									<Button
										variant='outlined'
										sx={{
											margin: 'auto',
											borderRadius: '20px',
											border: '1px solid #888888',
											color: '#747474',
											width: '100%',
											marginTop: '1rem',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											gap: '0.625rem',
											'@media (max-width: 370px)': {
												fontSize: '0.625rem',
											},
											'@media (max-width: 480px)': {
												marginTop: '-0.5rem',
											},
										}}
									>
										<Box
											sx={{
												width: '20px',
												'@media (max-width: 370px)': {
													width: '13px',
												},
											}}
											display='flex'
											justifyContent='center'
											alignItems='center'
										>
											<img width='100%' src='/assets/images/otp/google.svg' alt='' />
										</Box>
										<Box>Continue with Google</Box>
									</Button>
								</Box> 
								<Box height={10} />.*/}
          </div>
        </div>
      </Grid>
    </div>
  )
}

export default GuestLogin
