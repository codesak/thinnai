import React from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import BookingDetails from '../Payment/BookingDetails'
import Note from '../Payment/Note'
import { S3_BASE_URL } from '../../../utils/consts'
interface TrackBooking {
  isTransactionFailed: boolean
  breakPoint: boolean
  onClickHome: any
  isBookingSuccess: boolean
  setIsBookingSuccess: any
  onClickTrack: any
}

export function TrackBooking({
  isTransactionFailed,
  breakPoint,
  onClickHome,
  isBookingSuccess,
  setIsBookingSuccess,
  onClickTrack,
}: TrackBooking) {
  const enquiries = useSelector<RootState, any>(
    (state) => state.enquiry.enquiries
  )

  return (
    <Box
      width={{
        xl: '50%',
        md: '50%',
        sm: '100%',
        xs: '100%',
      }}
    >
      {!isTransactionFailed && (
        <Box
          mb="2.625rem"
          display={{
            xl: 'block',
            md: 'block',
            sm: 'none',
            xs: 'none',
          }}
        >
          <Note />
        </Box>
      )}
      <Box
        display={{
          xl: 'block',
          md: 'block',
          sm: isTransactionFailed ? 'none' : 'block',
          xs: isTransactionFailed ? 'none' : 'block',
        }}
        padding="1rem"
        border={{
          xl: '1px solid #000000',
          md: '1px solid #000000',
          sm: '0.5px solid #C4C4C4',
          xs: '0.5px solid #C4C4C4',
        }}
        borderRadius="10px"
      >
        <Box display="flex" justifyContent="space-between" gap={2}>
          {enquiries.map((enquiry: any, index: number) => (
            <Box
              width={{
                xl: '181.23px',
                md: '181.23px',
                sm: '100px',
                xs: '100px',
              }}
              height={{
                xl: '175px',
                md: '175px',
                sm: '103px',
                xs: '103px',
              }}
              overflow="hidden"
              borderRadius="10px"
              key={index}
            >
              <img
                width="100%"
                src={`${S3_BASE_URL}${enquiry.propertyPictures[0]}`}
                alt=""
              />
            </Box>
          ))}
        </Box>
        
          <BookingDetails />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.286rem',
            marginTop: '2.063rem',
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
          {isTransactionFailed ? (
            <Button
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
              Try Again
            </Button>
          ) : (
            <Button
              onClick={() => {
                onClickTrack()
                setIsBookingSuccess(true)
              }}
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
              Track Inquiry
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
