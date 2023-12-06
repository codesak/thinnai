import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import GroupsIcon from '@mui/icons-material/Groups'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Divider, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import Toolbar from '@mui/material/Toolbar'
import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadUser, logout as otpStoreLogout } from '../../../actions/guestAuth'
import { logout as registerLogout } from '../../../actions/register'
import { setCity } from '../../../actions/search'
import { RootState } from '../../../store'
import { menuItems, S3_BASE } from '../../../utils/consts'
import { ROUTES } from '../../../utils/routing/routes'
import '../../styles/Book/Book.scss'
import isAuthenticatedNow from '../../../utils/isAuthenticatedNow'
import Search from './Search'

interface navProps {
  searchTabOpen: () => void
  searchTabClose: () => void
  state: boolean
  stateSearched?: boolean
  setStateSearched?: (value: boolean) => void
  searched:()=>void
}

const NavBar = ({
  searchTabOpen,
  searchTabClose,
  state,
  stateSearched,
  setStateSearched,
  searched,
}: navProps) => {
  const [width, setWidth] = useState(window.innerWidth);

  //FUNCTIONS
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  const navigate = useNavigate()
  const dispatch: Dispatch<any> = useDispatch()
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity({ city: event.target.value }))
  }

  const city = useSelector<RootState, string>((state) => state.search.city)
  const bookingDate = useSelector<RootState, string>(
    (state) => state.search.bookingDate
  )
  const guestCount = useSelector<RootState, number>(
    (state) => state.search.guestCount
  )
  const groupType = useSelector<RootState, string>(
    (state) => state.search.groupType
  )
  // const isAuthenticated = useSelector<RootState, boolean>(
  //   (state) => state.guestAuth.isAuthenticated
  // )
  const isAuthenticated = isAuthenticatedNow()

  const isAuthenticatedThroughRegistration = useSelector<RootState, boolean>(
    (state) => state.register.isAuthenticated
  )
  const user = useSelector<RootState, any>((state) => state.guestAuth.user)
  useEffect(()=>{
    dispatch(loadUser({}))
  },[])
  const awsS3ImgURL=user?.profileImage?.replace(/\+/g, "%2B")
  

  const onClickBack = () => {
    setStateSearched?.(false)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const logoutUser = () => {
    dispatch(registerLogout())
    dispatch(otpStoreLogout())
    navigate(ROUTES.EXPLORE)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const location = useLocation()

  const handleNavigate = () => {
    navigate(ROUTES.EXPLORE)
  }

  return (
    <Box
      padding={{
        xl: '0.75rem 0rem',
        md: '0.75rem 0rem',
        sm: '0',
        xs: '0',
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          background: 'white',
          boxShadow: 'none',
          zIndex: 5,
          marginTop: {
            xs: '.2rem',
            md: '0rem',
          },
        }}
      >
        <Container
          sx={{
            '@media (min-width: 2400px)': {
              maxWidth: '90%',
              margin: 'auto',
            },
            '@media (min-width: 2600px)': {
              maxWidth: '80%',
              margin: 'auto',
            },
          }}
        >
          <Toolbar disableGutters sx={{}}>
            <Box
              style={{ flexGrow: '1', cursor: 'pointer' }}
              display={{ sm: 'flex', xs: 'none' }}
              onClick={handleNavigate}
            >
              <Box width={{ md: 10, sm: 0 }} />
              <img src="/assets/images/logo.svg" alt="" width={40} />
            </Box>
            <Box
              display={
                location.pathname === ROUTES.CONGRATULATIONS ||
                location.pathname === ROUTES.PAYMENT ||
                location.pathname.includes(ROUTES.BOOKING_TRACKER)||
                location.pathname.includes(ROUTES.PROPERTY_DETAIL) ||
                location.pathname.includes(ROUTES.ENQUIRY_SUMMARY) ||
                location.pathname.includes('/success')
                  ? 'none'
                  : 'flex'
              }
              justifyContent="center"
              flexGrow={{ md: 0.2, xs: 1, lg: '0' }}
            >
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position:'relative',
                  width: '448px',
                  height: '2.8rem',
                  borderRadius: '6px',
                  border: '1px solid #F3F3F3',
                  boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)',
                  //'@media (max-width: 900px)': { width: '100%' },
                  '@media (width> 1300px)': {
                    width: '30rem',
                    marginLeft: '3.9rem',
                  },
                  '@media (width< 600px)': { width: '100%' },
                }}
              >
               {state && <Box
                  display={{ md: 'block', xs: 'none' }}
                  position="absolute"
                  width={{
                    // xl: '485px',
                    // md: '450px',
                    // sm: '485px',
                    xs: '100%',
                  }}
                  top="0%"
                  left={{
                    // xl: '47.6%',
                    // md: '44.9%',
                    // sm: '47.6%',
                    xs: '50%',
                  }}
                  sx={{ transform: 'translate(-50%, 0%)' }}
                  zIndex="5"
                >
                  <Search onClick={searched} />
                </Box>}
                {!stateSearched && (
                  <>
                    {!state && (
                      <Button
                        onClick={searchTabOpen}
                        style={{
                          flex: 1,
                          height: '100%',
                          color: '#A4A4A4',
                          textTransform: 'none',
                          fontWeight: '400',
                        }}
                      >
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-evenly"
                        >
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              {/* <LocationOnIcon
                                sx={{ fontSize: { xs: '4vw', sm: '1vw' } }}
                              /> */}
                              <GroupsIcon
                                sx={{ fontSize: { xs: '4.2vw', sm: '1.2vw' } }}
                              />
                            </Box>
                            <Typography
                            fontFamily='Open Sans'
                            whiteSpace='nowrap'
                            fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '3.5vw',
                              }}
                            >
                              No. of Guest
                            </Typography>
                          </Box>
                          <Box
                            width="0.05vw"
                            height="auto"
                            sx={{ background: '#A4A4A4' }}
                          />
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              <GroupsIcon
                                sx={{ fontSize: { xs: '4.2vw', sm: '1.2vw' } }}
                              />
                            </Box>
                            <Typography
                            fontFamily='Open Sans'
                            whiteSpace='nowrap'
                            fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '3.5vw',
                              }}
                            >
                              Group Type
                            </Typography>
                          </Box>
                          <Box
                            width="0.05vw"
                            height="auto"
                            sx={{ background: '#A4A4A4' }}
                          />
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              <CalendarMonthIcon
                                sx={{ fontSize: { xs: '4vw', sm: '1vw' } }}
                              />
                            </Box>
                            <Typography
                            fontFamily='Open Sans'
                            whiteSpace='nowrap'
                            fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '3.5vw',
                              }}
                            >
                              Date
                            </Typography>
                          </Box>
                        </Box>
                      </Button>
                    )}
                    {state && (
                      <Button
                        onClick={searchTabOpen}
                        style={{
                          flex: 1,
                          height: '100%',
                          color: '#A4A4A4',
                          textTransform: 'none',
                          fontWeight: '400',
                        }}
                      >
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-evenly"
                        >
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              <LocationOnIcon
                                sx={{ fontSize: { xs: '3vw', sm: '1vw' } }}
                              />
                            </Box>
                            <Typography
                            fontFamily='Open Sans'
                            whiteSpace='nowrap'
                            fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '2.5vw',
                              }}
                            >
                              No. of Guest
                            </Typography>
                          </Box>
                          <Box
                            width="0.05vw"
                            height="auto"
                            sx={{ background: '#A4A4A4' }}
                          />
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              <GroupsIcon
                                sx={{ fontSize: { xs: '3.2vw', sm: '1.2vw' } }}
                              />
                            </Box>
                            <Typography
                            fontFamily='Open Sans'
                               whiteSpace='nowrap'
                               fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '2.5vw',
                              }}
                            >
                              Group Type
                            </Typography>
                          </Box>
                          <Box
                            width="0.05vw"
                            height="auto"
                            sx={{ background: '#A4A4A4' }}
                          />
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Box display="flex" alignItems="center">
                              <CalendarMonthIcon
                                sx={{ fontSize: { xs: '3vw', sm: '1vw' } }}
                              />
                            </Box>
                            <Typography
                             whiteSpace='nowrap'
                             fontFamily='Open Sans'
                             fontWeight='400'
                              fontSize={{
                                sm: '0.9vw',
                                xs: '2.5vw',
                              }}
                            >
                              Date
                            </Typography>
                          </Box>
                        </Box>
                      </Button>
                      // <Box display='flex' alignItems='center' margin='0px 1.25rem' sx={{ flex: 1 }}>
                      // 	<Box
                      // 		display='flex'
                      // 		justifyContent='flex-end'
                      // 		width='25px'
                      // 		alignItems='center'
                      // 	>
                      // 		<img width='70%' src='/assets/images/mapLocation.svg' alt='' />
                      // 	</Box>
                      // 	<InputBase
                      // 		sx={{
                      // 			ml: 1,
                      // 			flex: 1,
                      // 			pl: '1.25rem',
                      // 			fontFamily: 'Arial, FontAwesome',
                      // 			height: '100%',
                      // 		}}
                      // 		placeholder='Enter Your Location'
                      // 		value={city ? city : ''}
                      // 		inputProps={{ 'aria-label': 'search google maps' }}
                      // 		onChange={handleChange}
                      // 	/>
                      // 	<Box display='flex' alignItems='center'>
                      // 		<img src='/assets/images/currentLocation.svg' alt='' />
                      // 	</Box>
                      // </Box>
                    )}
                    <IconButton
                      onClick={searchTabOpen}
                      style={{
                        padding: '0.625rem',
                        background: 'black',
                        color: 'white',
                        borderRadius: '0px 6px 6px 0px',
                        height: '100%',
                        width: '3rem',
                      }}
                      aria-label="search"
                    >
                      <SearchIcon
                        sx={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </IconButton>
                  </>
                )}
                {stateSearched && (
                  <Box
                    display="flex"
                    alignItems="center"
                    margin="0px"
                    height="-webkit-fill-available"
                    width="100%"
                    sx={{ flex: 1 }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      borderRadius="6px"
                      border="1px solid #DEDEDE"
                      alignItems="center"
                      height="-webkit-fill-available"
                      width="100%"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        fontWeight="700"
                        fontSize="1.25rem"
                        display="flex"
                        alignItems="center"
                      >
                        <Box height="100%">
                          <Button
                            style={{ height: '100%' }}
                            onClick={() => onClickBack()}
                          >
                            <img
                              src="/assets/images/detail/arrowBack.svg"
                              alt="img"
                            />
                          </Button>
                        </Box>
                        <Box display='flex' alignItems='center'>
                          <Box
                           width={{xs:'70px',sm:'fit-content'}}
                            sx={{
                              fontWeight: '600',
                              fontSize: '0.75rem',
                              lineHeight: '16px',
                            }}
                          >
                            {new Date(
                              bookingDate?.toString()
                            ).toLocaleDateString('default', {
                              month: 'long',
                              day: 'numeric',
                            })},{` `}{new Date().getFullYear()}
                          </Box>
                          {/* <Box height={2} /> */}
                          <Box
                            sx={{
                              fontWeight: '600',
                              fontSize: '0.75rem',
                              lineHeight: '16px',
                              textTransform:'capitalize',
                              whiteSpace:'nowrap'
                            }}
                          >
                            , {guestCount} {guestCount >1 ?  ' Guests':' Guest'} ,{ width <600 && <br/>} {groupType?groupType.replaceAll('_',' '):"Allow All"}
                          </Box>
                        </Box>
                      </Box>
                      <Box height="100%">
                        <Button
                          onClick={searchTabOpen}
                          style={{
                            background: '#272F3D',
                            width: '43px',
                            height: '100%',
                            borderRadius: '0px 6px 6px 0px',
                          }}
                        >
                          <img src="/assets/images/detail/edit.svg" alt="img" />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>
            <Box
              display={{ sm: 'flex', xs: 'none' }}
              justifyContent="flex-end"
              flexGrow="0.5"
              gap={2.8}
              height={{ xl: '42px' }}
            >
              <Box
                display={{ md: 'flex', sm: 'none' }}
                fontWeight="500"
                alignItems="center"
                color="#000000"
                sx={{
                  cursor: 'pointer',
                  boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.06)',
                  bgcolor: '#FFFFFF',
                  paddingX: '1rem',
                  height: '2.5rem',
                  borderRadius: '6px',
                  border: '1px solid #CBCBCB',
                  fontSize: '0.9rem',
                  backgroundColor: '',
                  transition: '0.2s',
                  whiteSpace:'nowrap',
                  fontFamily:'Open Sans',
                  fontWeight:'500',
                  color: '#000000',
                  '&:hover,&:focus': {
                    background: '#8F7EF3',
                    color: 'white',
                  },
                }}
                onClick={() => {
                  navigate(ROUTES.HOST_LANDING)
                }}
              >
                Become a Host
              </Box>
              {isAuthenticated || isAuthenticatedThroughRegistration ? (
                <Box>
                  <Button
                    aria-describedby={id}
                    onClick={handleClick}
                    variant="contained"
                    sx={{
                      background: '#8F7EF3',
                      height: '2.5rem',
                      paddingX: '1.563rem',
                      width: '100%',
                      color: 'white',
                      display: 'flex',
                      gap: '0.375rem',
                      '&:hover,&:focus': {
                        background: '#EFEFEF',
                        color: 'black',
                      },
                    }}
                  >
                    <MenuIcon />
                    {user && (
                      <Avatar
                        sx={{ height: '1.6rem', width: '1.6rem' }}
                        alt="Profile Image"
                        src={
                          user?.profileImage
                            ? user?.profileImage
                            : user.avatar
                        }
                      />
                    )}
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    sx={{
                      left: '-48px',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    PaperProps={{
                      style: {
                        borderRadius: '20px',
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignContent="center"
                      padding="2.375rem 2.5rem"
                      width="303px"
                      sx={{
                        boxShadow:
                          '0px -4px 4px rgba(0, 0, 0, 0.08), 0px 4px 4px rgba(0, 0, 0, 0.08)',
                        borderRadius: '20px',
                        background: '#FFFFFF',
                        overflow: 'hidden',
                      }}
                    >
                      {menuItems.map((item, index) => (
                        <Box key={item.id}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            padding="0.313rem"
                            sx={{
                              cursor: 'pointer',
                              borderRadius: '8px',
                              ':hover': {
                                background: '#F3F1FF',
                              },
                            }}
                            onClick={() => {
                              navigate(item.path as any)
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <Box
                                marginRight="0.813rem"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <img width="24px" src={item.img} alt="img" />
                              </Box>
                              <Typography
                                fontSize="0.75rem"
                                fontWeight={500}
                                lineHeight="1.4em"
                                letterSpacing="0.015em"
                                fontFamily="Montserrat"
                              >
                                {item.title}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                cursor: 'pointer',
                                paddingX: '0.625rem',
                              }}
                            >
                              <ArrowForwardIosIcon
                                sx={{
                                  fontSize: '0.75rem',
                                  // '@media (max-width: 900px)': {
                                  // 	fontSize: '14px',
                                  // },
                                  color: '#000000',
                                }}
                              />
                            </Box>
                          </Box>
                          <Box paddingY="0.75rem">
                            <Divider />
                          </Box>
                        </Box>
                      ))}
                      <Box onClick={logoutUser}>
                        <Button
                          sx={{
                            textAlign: 'left',
                            textTransform: 'none',
                            color: '#1A191E',
                          }}
                        >
                          <Typography
                            fontSize="0.75rem"
                            fontWeight={500}
                            lineHeight="1.4em"
                            letterSpacing="0.015em"
                            fontFamily="Open Sans"
                          >
                            Logout
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </Box>
              ) : (
                // <Box
                // 	display={{ md: 'flex', sm: 'none' }}
                // 	fontWeight='500'
                // 	alignItems='center'
                // 	color='#000000'
                // 	sx={{
                // 		cursor: 'pointer',
                // 		boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.06)',
                // 		bgcolor: '#FFFFFF',
                // 		paddingX: '1rem',
                // 		height: '3rem',
                // 		borderRadius: '6px',
                // 		border: '1px solid #CBCBCB',
                // 		fontSize: '1.125rem',
                // 		backgroundColor: '',
                // 		transition: '0.2s',
                // 		'&:hover,&:focus': {
                // 			background: '#8F7EF3',
                // 			color: 'white',
                // 		},
                // 	}}
                // 	onClick={() => navigate(ROUTES.OTP)}
                // >
                // 	Sign In
                // </Box>
                <Button
                  aria-describedby={id}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  variant="contained"
                  sx={{
                    fontFamily:'Open Sans',
                    textTransform: 'none',
                    background: '#8F7EF3',
                    paddingX: '1.563rem',
                    fontWeight: '600',
                    height: '2.5rem',
                    fontSize: '0.9rem',
                    color: 'white',
                    display: 'flex',
                    gap: '0.375rem',
                    whiteSpace:'nowrap',
                    '&:hover,&:focus': {
                      background: '#EFEFEF',
                      color: 'black',
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default NavBar
