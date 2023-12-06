import { loadBooking } from '../../../../actions/booking'
import { S3_BASE_URL, fourColorPalette } from '../../../../utils/consts'
import { BOOKING_VIEW_TYPE, ROUTES } from '../../../../utils/routing/routes'
import { Box, Button, Color, Typography } from '@mui/material'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from '../../../styles/BookingTracking/cards/confirmedCard.module.css'
interface IConfirmedCardProps {
  item: any
  color: any
  index: number
  isInvitedBooking?: boolean
}

const UnpaidCard = ({
  item,
  color,
  index,
  isInvitedBooking = false,
}: IConfirmedCardProps) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()

  const onClickDetails = () => {
      dispatch(
        loadBooking(item._id, () =>
          navigate(`${ROUTES.UNPAID}/${BOOKING_VIEW_TYPE.DETAILS}`)
        )
      )
    
  }
  const handlePay = async(id:any,propertyBookingType:any) => {
    let cartBody = {
      enquiries: [id],
      bookingType: propertyBookingType || "instant"
  }
  try {
    const cartResp = await axios.post(
      `/api/cart/addToCart/`,
      cartBody)
      navigate(ROUTES.ENQUIRY_SUMMARY)
  } catch (error) {
    console.log(error)
  }
    
  }

  return (
    <Box
      key={index}
      bgcolor={fourColorPalette[index % 4].extraLight}
      marginBottom='2rem'
      borderRadius="1rem"
      display="flex"
      gap={{
        xl: '2rem',
        md: '2rem',
        sm: '2rem',
        xs: '1.5rem',
      }}
      flexDirection={{
        xl: 'row',
        md: 'row',
        sm: 'column',
        xs: 'column',
      }}
    >
      <Box width={{ md: '40%', sm: '100%' }}>
        <img
          style={{
            width: '100%',
            maxHeight: '316px',
            objectFit: 'fill',
          }}
          className={style.unpaidImg}
          src={`${S3_BASE_URL}${item.property.propertyPictures[0]}`}
          alt=""
        />
        
      </Box>
      <Box
        paddingRight={{
          xl: '2rem',
          md: '2rem',
          xs: '1rem',
        }}
        paddingLeft={{
          xl: '2rem',
          md: '2rem',
          xs: '1rem',
        }}
        width={{
          xl: '61.50%',
          md: '61.50%',
          sm: '90%',
          xs: '100%',
        }}
        margin="auto"
      >
        <Box
          marginBottom={{
            md: '1rem',
          }}
        >
          <Box
            fontSize={{ md: '1.5rem', sm: '1.9rem', xs: '1.4rem' }}
            className="aboutPlace__header"
            sx={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '1.5em',
              color: '#000000',
            }}
          >
            {item.property.propertyName}
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Box textAlign="left">
            <Typography
              fontSize={{
                xl: '1.125rem',
                md: '1.125rem',
                sm: '1rem',
                xs: '0.8rem',
              }}
              marginBottom="0.5rem"
              fontWeight="300"
              color="#383838"
            >
              No. of guests :{' '}
              <span style={{ color: fourColorPalette[index % 4].medium }}>
                {item?.requestData.guestCount}
              </span>
            </Typography>
            <Typography
              fontSize={{
                xl: '1.125rem',
                md: '1.125rem',
                sm: '1rem',
                xs: '0.8rem',
              }}
              fontWeight="300"
              color="#383838"
              textTransform='capitalize'
            >
              Guest type :{' '}
              <span style={{ color: fourColorPalette[index % 4].medium }}>
                {item?.inquiry.groupType.replaceAll('_',' ')}
              </span>
            </Typography>
          </Box>
          <Box textAlign="left">
            <Typography
              fontSize={{
                xl: '1.125rem',
                md: '1.125rem',
                sm: '1rem',
                xs: '0.8rem',
              }}
              fontWeight="300"
              marginBottom="0.5rem"
              color="#383838"
            >
              Time :{' '}
              <span style={{ color: fourColorPalette[index % 4].medium }}>
                {new Date(item.requestData.bookingFrom).toLocaleTimeString('default', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}{' '}
                -{' '}
                {new Date(item.requestData.bookingTo).toLocaleTimeString('default', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </span>
            </Typography>
            <Typography
              fontSize={{
                xl: '1.125rem',
                md: '1.125rem',
                sm: '1rem',
                xs: '0.8rem',
              }}
              fontWeight="300"
              color="#383838"
            >
              Date :{' '}
              <span style={{ color: fourColorPalette[index % 4].medium }}>
                {new Date(item.requestData.bookingFrom)
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
        <Box
          display="flex"
          gap="0.625rem"
          justifyContent="flex-end"
          marginTop="1.5rem"
          marginBottom="1.5rem"
        >
          <Button
            sx={{
              border: '0',
              background: fourColorPalette[index % 4].light,
              outline: 'none',
              borderRadius: '6px',
              paddingX: '4vw',
              textTransform: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              color: fourColorPalette[index % 4].dark,
              fontWeight: '600',
              width: '33.3%',
              fontFamily: 'Open Sans',
              height: '40px',
              '@media (max-width: 430px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 342px)': {
                fontSize: '0.5rem',
              },
            }}
            onClick={onClickDetails}
          >
            Details
          </Button>
          
            {/* <Button
              onClick={() => handlePay(item.inquiry._id,'instant')}
              sx={{
                border: '0.4px solid #000000',
                background: '#1A191E',
                outline: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                paddingX: '4vw',
                cursor: 'pointer',
                color: 'white',
                height: '40px',
                width: '33.3%',
                textTransform: 'none',
                '@media (max-width: 430px)': {
                  fontSize: '0.75rem',
                },
                '@media (max-width: 342px)': {
                  fontSize: '0.5rem',
                },
              }}
            >
              Pay
            </Button> */}
        </Box>
      </Box>
    </Box>
  )
}

export default UnpaidCard
