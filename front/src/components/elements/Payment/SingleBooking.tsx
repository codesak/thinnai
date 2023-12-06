import react from 'react'
import { Box,Typography,Button,Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes'
interface SingleBooking {
  breakPoint: boolean;
  setIsBookingSuccess: any;
  onClickHome: any
}
const SingleBooking = (props: SingleBooking) => {
  const {breakPoint,setIsBookingSuccess,onClickHome} = props;
  const navigate = useNavigate();
  return (
    <Box
    marginX={{
      xl: '3.75rem',
      md: '3.75rem',
      sm: '1.875rem',
      xs: '1.875rem',
    }}
    width={{
      xl: '50%',
      md: '50%',
      sm: '100%',
      xs: '100%',
    }}
  >
    <Box bgcolor='#F2F0DF' paddingX='1.625rem' marginTop='1.313rem' borderRadius='10px'>
      <Typography
        textAlign='center'
        fontSize='0.75rem'
        fontWeight='300'
        color='#7E6001'
        paddingY='0.625rem'
      >
        Booking Id : <span style={{ fontWeight: '400' }}>1254678994</span>
      </Typography>
      <Box display='flex' justifyContent='center' paddingBottom='1.125rem'>
        <img width='100%' src='assets/images/ongoing_booking/mobile-booking.png' alt='' />
      </Box>
      <Stack direction='row' justifyContent='space-between' paddingBottom='0.938rem'>
        <Box>
          <Typography fontSize='0.75rem' fontWeight='300' color='#383838'>
            No. of guests : <span style={{ color: '#6053AE' }}>6</span>
          </Typography>
          <Typography fontSize='0.75rem' fontWeight='300' color='#383838'>
            Guest type : <span style={{ color: '#6053AE' }}>Family</span>
          </Typography>
        </Box>
        <Box>
          <Typography fontSize='0.75rem' fontWeight='300' color='#383838'>
            Time : <span style={{ color: '#6053AE' }}>3:00pm - 6:00pm</span>
          </Typography>
          <Typography fontSize='0.75rem' fontWeight='300' color='#383838'>
            Date : <span style={{ color: '#6053AE' }}>30.06.2022</span>
          </Typography>
        </Box>
      </Stack>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.286rem',
        marginTop: '2.5rem',
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
        variant='contained'
        onClick={onClickHome}
      >
        Back to Home
      </Button>
      <Button
        onClick={() => navigate(ROUTES.CONFIRMED)}
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
        variant='contained'
      >
        View Booking
      </Button>
    </Box>
  </Box> 
  )
}

export default SingleBooking;
  