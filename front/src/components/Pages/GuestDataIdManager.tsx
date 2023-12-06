import { RootState } from '../../store'
import TopCircles from '../elements/Common/TopCircles'
import GuestDataForm from '../elements/GuestAuth/GuestDataForm'
import RegistrationNavbar from '../elements/GuestAuth/subElements/RegistrationNavbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ROUTES } from '../../utils/routing/routes'
import { NavigationBar } from '../elements/Common/NavigationBar'
import nav from '../styles/GuestLogin/navbar.module.css'

const GuestDataIdManager = () => {
  const user = useSelector<RootState, any>((state) => state.guestAuth.user)
  const userData = useSelector<RootState, any>((state) => state.guestAuth.userData)
  const phone = useSelector<RootState, any>((state) => state.guestAuth.phone)
  const userProfileData = useSelector<RootState, any>(
    (state) => state.profile.userData
  )
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!phone) {
  //     navigate(ROUTES.LOGIN)
  //   }
  // }, [phone])

  return (
    <div>

      <NavigationBar/>
    <Grid component="main" className={nav.registerContainer}>
      {/* <RegistrationNavbar /> */}
      <CssBaseline />
      <div className={nav.imgContainer}>
          <img
            src={process.env.PUBLIC_URL + '/assets/images/bgNewDesktop.svg'}
            alt=""
          />
        </div>
      <div
        className={nav.right}
      >
        <Grid container>
          
          <Grid item xs={12} sm={12} md={11} position="relative">
            <Box height={{ xl: 120, sm: 0, md: 120, xs: 0 }} />
            <Box display="flex" alignItems='center'>
              <Box
                height={70}
                display={{ xs: 'flex', md:'none' }}
                justifyContent="center"
                >
                <Box
                  width="100%"
                  fontWeight="700"
                  fontSize="1.25rem"
                  display="flex"
                  alignItems="center"
                  >
                  <Button onClick={() => navigate('/profile')}>
										<img width='12px' src='/assets/images/detail/arrowBack.svg' alt='' />
									</Button>
                </Box>
              </Box>
              <Box
                paddingLeft={{ md: '0px', sm: '1.5rem', xs: '0.9rem' }}
                fontSize={{ sm: '2.5rem', md: '2.5rem', xs: '1.75rem' }}
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '34px',
                  color: '#1A191E',
                }}
                >
                General Details
                {/* <Box
									display='flex'
									justifyContent='flex-start'
									className='openSans'
									paddingTop={{ xs: '1.5px', sm: '0.375rem', md: '0.625rem' }}
									paddingLeft={{ md: '0px', sm: '0.2rem', xs: '0.2rem' }}
									// paddingLeft='0.563rem'
									fontSize={{ xs: '0.75rem', md: '1rem', sm: '1rem' }}
									style={{ lineHeight: '16px', color: '#A59A9A' }}
                  >
									Provide us with your basic details
								</Box> */}
              </Box>
            </Box>
            <TopCircles />
            <Box height={{ sm: '10', xs: '0' }} />
            <Box
              height={{ sm: '15', xs: '0' }}
              marginLeft="0.375rem"
              display={{ xs: 'none', sm: 'flex' }}
              alignItems="center"
              >
              {/* <Box height='0.5px' width='70%' sx={{ background: '#DDDDDD' }}></Box> */}
            </Box>
            <Box height={10} />
            <Box
              display="flex"
              paddingLeft={{ md: '0.375rem', sm: '0px', xs: '0px' }}
              justifyContent={{ md: 'flex-start', sm: 'center', xs: 'center' }}
              width={'100%'}
              >
              <GuestDataForm
                currentUserData={{ ...user, ...userProfileData,...userData }}
                />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Grid>
    </div>
  )
}

export default GuestDataIdManager
