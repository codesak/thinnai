import { TrackBooking } from '../elements/Payment/TrackBooking'
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RootState } from '../../store'
import { ROUTES } from '../../utils/routing/routes'
import NavBar from '../elements/Explore/NavBar'
import SingleBooking from '../elements/Payment/SingleBooking'
import style from '../styles/Payment/paymentStatus.module.css'
import Whatsapp from '../elements/Common/Whatsapp'

const Congratulations = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  //To Open Search Options
  const [searchState, setSearchState] = useState(false)
  const breakPoint = useMediaQuery('max-width(900px)')
  const [isBookingSuccess, setIsBookingSuccess] = useState<any>(true)
  const [isTransactionFailed, setIsTransactionFailed] = useState<any>(false)

  // useEffect(() => {
  //   const orderStatus = searchParams.get('order_status')
  //   if (orderStatus === 'success') {
  //     setIsBookingSuccess(true)
  //     setIsTransactionFailed(false)
  //   } else {
  //     setIsBookingSuccess(false)
  //     setIsTransactionFailed(true)
  //   }
  // }, [searchParams])

  const openSearch = () => {
    setSearchState(true)
  }

  //To change SearchBar to Searched Details
  const [stateSearched, setStateSearched] = useState(false)
  const searched = () => {
    setSearchState(false)
    setStateSearched(true)
  }

  //Responsive Booking Menu FullScreen
  const [viewBook, setViewBook] = useState(false)

  const onClickHome = () => {
    navigate(ROUTES.EXPLORE)
  }

  const onClickTrack = () => {
    navigate(ROUTES.ENQUIRY)
  }

  const directBooking = useSelector<RootState, any>(
    (state) => state.details.property.directBooking
  )
  return (
    <Box className={style.mainContainer}>
      {/* <Whatsapp/> */}
      <Box
        position="relative"
        display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}
      >
        {!viewBook && (
          <NavBar
            stateSearched={stateSearched}
            setStateSearched={setStateSearched}
            searchTabOpen={openSearch}
            state={searchState}
            searchTabClose={() => setSearchState(false)}
            searched={searched}
          />
        )}
      </Box>
      <Box
        marginX={{
          xl: '3.75rem',
          md: '3.75rem',
          sm: '1.875rem',
          xs: '1.875rem',
        }}
        display="flex"
        justifyContent={{
          xl: 'space-evenly',
        }}
        flexDirection={{
          xl: 'row',
          md: 'row',
          sm: 'column',
          xs: 'column',
        }}
        
        alignItems="center"
      >
        <Box
          width={{
            xl: '50%',
            md: '50%',
            sm: '100%',
            xs: '100%',
          }}
        >
          {isTransactionFailed ? (
            <Box>
              <Typography
                color="#B63232"
                fontSize="2.25rem"
                marginBottom="1.286rem"
                textAlign="center"
                fontWeight={600}
                lineHeight="1.4em"
                fontFamily="Montserrat"
              >
                Transaction Failed : {searchParams.get('order_status')}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  style={{
                    display: 'block',
                    maxWidth: '500px',
                    width: '100%',
                    height: '100%',
                  }}
                  src="/assets/images/congratulations/failed.svg"
                  alt=""
                />
              </Box>
              <Box
                display={{
                  xl: 'none',
                  md: 'none',
                  sm: 'block',
                  xs: 'block',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.286rem',
                    marginTop: '4.375rem',
                  }}
                  flexDirection={{
                    xl: 'row',
                    md: 'row',
                    sm: 'row',
                    xs: 'column',
                  }}
                >
                  <Button
                    style={{
                      background: 'transparent',
                      borderRadius: '6px',
                      textTransform: 'capitalize',
                      fontSize: breakPoint ? '0.875rem' : '1.125rem',
                      color: 'black',
                      border: '1px solid #000000',
                      boxShadow: 'none',
                      width: breakPoint ? '155px' : '211px',
                      height: breakPoint ? '42px' : '60px',
                    }}
                    variant="contained"
                    onClick={onClickHome}
                  >
                    Back to Home
                  </Button>
                  <Button
                    onClick={() => setIsBookingSuccess(false)}
                    style={{
                      background: '#272F3D',
                      borderRadius: '6px',
                      textTransform: 'capitalize',
                      fontSize: breakPoint ? '0.875rem' : '1.125rem',
                      boxShadow: 'none',
                    }}
                    sx={{
                      width: breakPoint ? '155px' : '211px',
                      height: breakPoint ? '42px' : '60px',
                    }}
                    variant="contained"
                  >
                    Try a Again
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography
                display={{
                  xl: 'block',
                  md: 'block',
                  sm: 'none',
                  xs: 'none',
                }}
                color={directBooking ? '#8F7EF3' : '#24BA0E'}
                fontSize="1.5rem"
                marginBottom="3.125rem"
                textAlign="center"
              >
                {!directBooking
                  ? 'Payment Successful !'
                  : 'Booking Successful !'}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop='2rem'>
                <img
                  style={{
                    display: 'block',
                    maxWidth: '500px',
                    width: '100%',
                    height: '100%',
                  }}
                  src="/assets/images/congratulations/success.svg"
                  alt=""
                />
              </Box>
              <Box
                display={{
                  xl: 'none',
                  md: 'none',
                  sm: 'block',
                  xs: 'block',
                }}
              >
                <Box marginY="1.375rem">
                  <Divider />
                </Box>
                {directBooking ? (
                  <>
                    <Typography
                      color={directBooking ? '#8F7EF3' : '#24BA0E'}
                      fontSize="1.25rem"
                      textAlign="center"
                      fontFamily="Montserrat"
                      lineHeight="1.4em"
                    >
                      Booking Successful !
                    </Typography>
                    <Typography
                      color="#383838"
                      fontSize="0.875rem"
                      textAlign="center"
                      fontWeight="400"
                      lineHeight="1.4em"
                      marginTop="1rem"
                    >
                      Your booking at Urban Patio has been confirmed
                    </Typography>
                    <Typography
                      color="#383838"
                      fontSize="0.875rem"
                      textAlign="center"
                      fontWeight="600"
                      marginBottom="1.375rem"
                      lineHeight="1.4em"
                    >
                      We wish you a fulfilling experience!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      color="#8F7EF3"
                      fontSize="1.25rem"
                      textAlign="center"
                      fontFamily="Montserrat"
                      lineHeight="1.4em"
                    >
                      Payment Successful !
                    </Typography>
                    <Typography
                      color="#383838"
                      fontSize="0.875rem"
                      textAlign="center"
                      fontWeight={400}
                      marginTop="0.625rem"
                      marginBottom="1.375rem"
                      lineHeight="1.4em"
                    >
                      Our hosts will get back to you within 24 hours or 1 hour
                      prior to check-in time, whichever is earlier
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>
        {directBooking ? (
          <SingleBooking
            breakPoint={breakPoint}
            setIsBookingSuccess={setIsBookingSuccess}
            onClickHome={onClickHome}
          />
        ) : (
          <TrackBooking
            isTransactionFailed={isTransactionFailed}
            breakPoint={breakPoint}
            onClickHome={onClickHome}
            isBookingSuccess={isBookingSuccess}
            setIsBookingSuccess={setIsBookingSuccess}
            onClickTrack={onClickTrack}
          />
        )}
      </Box>
    </Box>
  )
}

export default Congratulations
