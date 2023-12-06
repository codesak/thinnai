import { Box, Grid, Typography } from '@mui/material'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cancelEnquiry, loadEnquiryStatus } from '../../../../actions/booking'
import { S3_BASE_URL, fourColorPalette } from '../../../../utils/consts'
import { ROUTES } from '../../../../utils/routing/routes'

const EnquiryCard = ({
  enquiryDetails,
  enquiryGroupIndex,
  enquiryIndex,
  bookingFrom,
  bookingTo,
  isCancelled = false,
  cancelledBy,
  cancelationReason,
}: any) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()

  const onClickCancel = () => {
    dispatch(cancelEnquiry(enquiryDetails._id, enquiryGroupIndex, enquiryIndex))
  }

  const onClickStatus = () => {
    dispatch(
      loadEnquiryStatus({ bookingFrom, bookingTo }, () =>
        navigate(ROUTES.ENQUIRY_STATUS)
      )
    )
  }

  return (
    <Grid
      item
      // md={3.8}
      // xl={3}
      // xs={12}
      key={enquiryDetails._id}
      bgcolor={fourColorPalette[enquiryGroupIndex % 4].extraLight}
      padding="1.25rem"
      borderRadius="1rem"
      width={{ xs: '95vw', sm: '100%' }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20vh"
      >
        <img
          width="100%"
          height="100%"
          style={{ borderRadius: '1.1rem' }}
          src={`${S3_BASE_URL}${enquiryDetails?.property.propertyPictures[0]}`}
          alt=""
        />
      </Box>
      <Box paddingLeft={'0.5rem'} paddingRight={'0.5rem'}>
        <Typography
          marginTop="1.875rem"
          marginBottom="1rem"
          textAlign="left"
          fontSize={{ xl: '1.2rem', md: '1.3rem', sm: '1.9rem', xs: '1.4rem' }}
          fontWeight="600"
          color="#383838"
          fontFamily="Open Sans"
        >
          {enquiryDetails.property.propertyName}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              No. of guests
            </Typography>

            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              Guest type{' '}
            </Typography>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              Time{' '}
            </Typography>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              Date{' '}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              :{' '}
              <span
                style={{
                  color: fourColorPalette[enquiryGroupIndex % 4].medium,
                }}
              >
                {enquiryDetails?.guestCount}
              </span>
            </Typography>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              :{' '}
              <span
                style={{
                  color: fourColorPalette[enquiryGroupIndex % 4].medium,
                }}
              >
                {enquiryDetails?.groupType}
              </span>
            </Typography>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              :{' '}
              <span
                style={{
                  color: fourColorPalette[enquiryGroupIndex % 4].medium,
                }}
              >
                {new Date(bookingFrom).toLocaleTimeString('default', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}{' '}
                -{' '}
                {new Date(bookingTo).toLocaleTimeString('default', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </span>
            </Typography>
            <Typography fontSize="1rem" fontWeight="300" color="#383838">
              :{' '}
              <span
                style={{
                  color: fourColorPalette[enquiryGroupIndex % 4].medium,
                }}
              >
                {new Date(bookingFrom)
                  .toLocaleDateString('default', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
                  .split('/')
                  .join('.')}
              </span>
            </Typography>
          </Box>
        </Box>
        {!isCancelled && (
          <Box
            display="flex"
            gap="0.625rem"
            justifyContent={{
              xl: 'center',
              md: 'center',
              sm: 'flex-end',
              xs: 'flex-end',
            }}
            marginTop="2.875rem"
          >
            <button
              style={{
                border: '0.4px solid #000000',
                background: 'transparent',
                outline: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                color: '#303F52',
                width: '160px',
                height: '40px',
              }}
              onClick={onClickCancel}
            >
              Cancel
            </button>
            <button
              style={{
                border: '0.4px solid #000000',
                background: '#1A191E',
                outline: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                color: 'white',
                width: '160px',
                height: '40px',
              }}
              onClick={onClickStatus}
            >
              Status
            </button>
          </Box>
        )}
      </Box>
    </Grid>
  )
}

export default EnquiryCard
