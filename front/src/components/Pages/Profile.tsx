import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { DONE_LOADING_USER, S3_BASE } from '../../utils/consts'
import { ROUTES } from '../../utils/routing/routes'
import MobileHeader from '../elements/Common/mobileOnly/MobileHeader'
import PropertyReviewsCarousel from '../elements/Common/ReviewCarousel'
import NavBar from '../elements/Explore/NavBar'
import Search from '../elements/Explore/Search'
import { loadUser, logout as otpStoreLogout } from '../../actions/guestAuth'
import { logout as registerLogout } from '../../actions/register'
import '../styles/Profile/Profile.css'
import ResponsiveMenu from '../elements/Explore/subElements/ResponsiveMenu'
import Whatsapp from '../elements/Common/Whatsapp'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector<RootState, any>((state) => state.guestAuth.user)
  //const profile = useSelector<RootState, any>((state) => state.profile.userData)
  const awsS3ImgURL=user?.profileImage?.replace(/\+/g, "%2B");
  

  useEffect(() => {
     dispatch(loadUser({}))
    // dispatch({
    //   type: DONE_LOADING_USER,
    // })
  }, [])
  //To Open Search Options
  const [searchState, setSearchState] = useState(false)
 // const [personalInfo, setPersonalInfo] = useState(false)
 // const [myReviews, setMyReviews] = useState(false)

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

  const logoutUser = () => {
    dispatch(registerLogout())
    dispatch(otpStoreLogout())
    navigate(ROUTES.EXPLORE)
  }

  //ResponsiveMenu
  const [homeSelected, setHomeSelected] = useState(false)
  const homeClick = () => {
    if (!homeSelected) {
      setHomeSelected(true)
      setBookSelected(false)
      setChatSelected(false)
      setAccountOpen(false)
    }
    navigate(ROUTES.EXPLORE)
  }

  const [bookSelected, setBookSelected] = useState(false)
  const bookClick = () => {
    if (!bookSelected) {
      setHomeSelected(false)
      setBookSelected(true)
      setChatSelected(false)
      setAccountOpen(false)
    }
    navigate(ROUTES.CONFIRMED)
  }

  const [chatSelected, setChatSelected] = useState(false)
  const chatClick = () => {
    // if (!chatSelected) {
    //   setHomeSelected(false)
    //   setBookSelected(false)
    //   setChatSelected(true)
    //   setAccountOpen(false)
    // }
    // navigate(ROUTES.CHAT)
    let newWindow = window.open();
      if (newWindow != null) {
        const token = localStorage.getItem('token')
  let url:any = null;
  if(token) {
    url = `https://wa.me/+919677790546?text=Hi%20there!%20I'm%20${user.firstName} ${user.lastName}.%20My%20User%20Id%20is%20${user.phone}.%20I’m%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`
  } else {
    url = "https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20"
  }
        newWindow.location.href = url;
      }
  }

  const [accountOpen, setAccountOpen] = useState(true)
  const accountClick = () => {
    if (!accountOpen) {
      setHomeSelected(false)
      setBookSelected(false)
      setChatSelected(false)
      setAccountOpen(true)
    }
    navigate(ROUTES.PROFILE)
  }

  const supports = [
    {
      title: 'How Thinnai Works',
      des: 'Discover the Magic Behind Our Fascinating Thinnai Journey, And Become a part of it',
      img: '/assets/images/profile/work.svg',
    },
    // {
    //   title: 'Safety Centre',
    //   des: 'Let our team know about concerns related to home sharing activity in your area',
    //   img: '/assets/images/profile/safety.svg',
    // },
    // {
    //   title: 'Contact Neighborhood Support',
    //   des: 'Let our team know about concerns related to home sharing activity in your area',
    //   img: '/assets/images/profile/contact.svg',
    // },
    {
      title: 'Get Help',
      des: 'Support When You Need It: Get Help from Our Dedicated Team',
      img: '/assets/images/profile/help.svg',
    },
    // {
    //   title: 'Give us Feedback',
    //   des: 'Let our team know about concerns related to home sharing activity in your area',
    //   img: '/assets/images/profile/feedback.svg',
    // },
  ]

  const legals = [
    {
      title: 'Terms of Services',
      img: '/assets/images/profile/terms.svg',
      path:'/policy/guest-terms-of-use',
    },
    {
      title: 'Privacy Policy',
      img: '/assets/images/profile/policy.svg',
      path:'/policy/privacy-policy',
    },
  ]
  const handleFunction = (index:number)=>{
    if(index===0){navigate('/')}
    else if(index===1){
      const token = localStorage.getItem('token')
      let newWindow = window.open();
  let url:any = null;
  if(token) {
    url = `https://wa.me/+919677790546?text=Hi%20there!%20I'm%20${user.firstName} ${user.lastName}.%20My%20User%20Id%20is%20${user.phone}.%20I’m%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`
  } else {
    url = "https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20"
  }
    if (newWindow != null) {
      newWindow.location.href = url;
    }
    }
  }

  return (
    <Box paddingBottom={10}>
      {searchState && (
					<Box
						className='search-overlay'
						position='absolute'
						display={{ md: 'block', xs: 'none' }}
						onClick={() => setSearchState(false)}
						sx={{
							background: 'rgba(0, 0, 0, 0.63)',
							top: 40,
							bottom: 0,
							left: '-80px',
							right: '-80px',
						}}
						zIndex='5'
					/>
				)}
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
        paddingTop="1.875rem"
        paddingBottom="3.75rem"
        borderRadius={{
          xl: '0px',
          md: '0px',
          sm: '0px 0px 41px 41px',
          xs: '0px 0px 41px 41px',
        }}
        height={{
          xl: '465px',
          md: '465px',
          xs: '425px',
        }}
        sx={{
          backgroundImage: 'url(/assets/images/profile/profile-bg.svg)',
          backgroundColor: '#1A191E',
          backgroundSize: '101%',
          backgroundPosition: '-26px -65px',
          '@media (max-width: 900px)': {
            backgroundSize: '120%',
            backgroundPosition: '-225px -50px',
          },
          '@media (max-width: 600px)': {
            backgroundSize: '263%',
            backgroundPosition: '-740px -146px',
          },
          '@media (max-width: 400px)': {
            backgroundSize: '263%',
            backgroundPosition: '-540px -146px',
          },
          position: 'relative',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!viewBook && (
          <MobileHeader color="white" headerText={'Your Profile'} />
        )}
        
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box paddingTop={4}>
            <Box display="flex">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={{
                  xl: '8rem',
                  md: '8rem',
                  sm: '6rem',
                  xs: '6rem',
                }}
                height={{
                  xl: '8rem',
                  md: '8rem',
                  sm: '6rem',
                  xs: '6rem',
                }}
                borderRadius="50%"
                overflow="hidden"
                margin="auto"
              >
                <img
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src={
                    user?.profileImage
                      ? user?.profileImage
                      : user?.avatar
                  }
                  alt=""
                />
              </Box>
              {/* <Box display={{ xl: 'none', md: 'none', xs: 'block' }}>
                <Button
                  sx={{
                    color: 'white',
                    marginLeft: '-100px',
                    marginTop: '70px',
                    fontSize: '1.375rem',
                  }}
                >
                  <CreateOutlinedIcon />
                </Button>
              </Box> */}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="1.5rem"
            >
              <Box>
                <img
                  width="26px"
                  src="/assets/images/profile/star.svg"
                  alt=""
                />
                <img
                  width="26px"
                  src="/assets/images/profile/star.svg"
                  alt=""
                  style={{ margin: '0px 4.74px' }}
                />
                <img
                  width="26px"
                  src="/assets/images/profile/star.svg"
                  alt=""
                />
              </Box>
            </Box>
            <Box textAlign="center" color="white" paddingBottom={3}>
              <Typography fontSize="1.5rem">{user.fullName}</Typography>
              <Typography
                marginTop="0.313rem"
                fontSize="1.25rem"
                fontWeight="200"
              >
                {user.email}
              </Typography>
              <Typography fontSize="0.938rem" marginTop="0.938rem">
                {user.phone}{' '}
                {user.altPhone && (
                  <>
                    <span style={{ margin: '0px 1.25rem' }}>|</span>{' '}
                    {user.altPhone}
                  </>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          position="absolute"
          bottom={{
            xl: '-100px',
            md: '-100px',
            sm: '-60px',
            xs: '-45px',
          }}
          bgcolor={{
            xl: 'white',
            md: 'white',
            sm: '#EEFCEC',
            xs: '#EEFCEC',
          }}
          borderRadius="6px"
          border={{
            xl: '1px solid #F0F0F0',
            md: '1px solid #F0F0F0',
            sm: '1px solid #8EFFA7',
            xs: '1px solid #8EFFA7',
          }}
          boxShadow="1px 4px 8px rgba(0, 0, 0, 0.25)"
          zIndex="1"
          left="0"
          right="0"
          margin="auto"
          width={{
            xl: '60%',
            md: '60%',
            sm: '90%',
            xs: '90%',
          }}
          sx={{
            transform: 'translateY(-50%)',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            padding={{
              xl: '1.25rem 1.875rem',
              md: '1.25rem 1.875rem',
              sm: '0.625rem 1.25rem',
              xs: '0.313rem 0.625rem',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={{
                xl: 2,
                md: 2,
                sm: '0.438rem',
                xs: '0.438rem',
              }}
              marginLeft={{
                xl: 2,
                md: 2,
                sm: 0,
                xs: 0,
              }}
            >
              <Box
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '13px',
                  xs: '13px',
                }}
              >
                <img
                  width="100%"
                  src="/assets/images/profile/wallet.svg"
                  alt=""
                />
              </Box>
              <Typography
                fontSize={{
                  xl: '1.25rem',
                  md: '1.25rem',
                  sm: '0.75rem',
                  xs: '0.75rem',
                }}
              >
                Wallet Balance
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button
                variant="text"
                sx={{
                  color: '#24BA0E',
                  fontSize: '1.75rem',
                  marginRight: '1.875rem',
                  '@media (max-width: 900px)': {
                    fontSize: '0.938rem',
                    marginRight: '0px',
                  },
                }}
              >
                ₹ {profile.wallet}
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: '1.25rem',
                  '@media (max-width: 900px)': {
                    fontSize: '0.625rem',
                  },
                  textTransform: 'none',
                  bgcolor: '#B7E2AD',
                  color: 'black',
                  boxShadow: 'none',
                }}
              >
                Add Money
              </Button>
            </Box>
          </Box>
        </Box> */}
      </Box>
      <Box
        // paddingTop='7.5rem'
        className="profile-body"
        // margin={{
        // 	xl: '0px 3.75rem',
        // 	md: '0px 3.75rem',
        // 	sm: '0px 1.875rem',
        // 	xs: '0px 1.875rem',
        // }}
      >
        <Typography
          className='Account-font'
          // fontSize={{
          // 	xl: '2.25rem',
          // 	md: '2.25rem',
          // 	sm: '1.375rem',
          // 	xs: '1.3rem',
          // }}
        >
          Account Settings
        </Typography>
        <Box height={30}/>
        <Box
          marginTop={{
            xl: '1.875rem',
            md: '1.875rem',
            sm: '1.75rem',
            xs: '0rem',
          }}
        >
          <Grid
            container
            gap=".75rem"
            flexDirection={{
              xl: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column',
            }}
            // width='50vw !important'
          >
            <Grid
              display={{xs:'flex',sm:'flex',md:'none',xl:'none'}}
              justifyContent="center"
              alignItems="center"
              // minHeight= '156px !important'
              // height='560px'
              width={{
                xl: '20.4vw',
                md: '20.4vw',
                sm: '40.4vw',
                xs: '100%',
              }}
              height={{
                md: '22vh',
                xs: '0',
              }}
              flexDirection="column"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              borderRadius="10px"
              onClick={() => navigate(ROUTES.PERSONAL_INFO)}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      height="65vh"
                      src="/assets/images/profile/personal-info.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize='0.9rem'
                  >
                    Personal Information
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  Personal Information
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="img" />
                </Box>
              </Box>
            </Grid>
            <Box
            display={{xs:'none',sm:'none',md:'flex',xl:'flex'}}
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            border="1px solid #DEDEDE"
            borderRadius="10px"
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.06)"
            padding="2rem"
            marginTop={2}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            bgcolor="#FFFFFF"
            onClick={() => navigate(ROUTES.PERSONAL_INFO)}
          >
            <Box>
              <img
                width="80px"
                height="65vh"
                src="/assets/images/profile/personal-info.svg"
                alt="img"
              />
            </Box>
            <Box>
              <Typography fontSize="25px">Personal Information</Typography>
              <Typography fontSize="17px" fontWeight="200">
              Effortlessly maintain and modify your personal details through our user-friendly website interface. Take charge of your information with a seamless and convenient updating process.
              </Typography>
            </Box>
          </Box>
            {/* <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box> */}
            {/* <Grid
              onClick={() => navigate(ROUTES.PAYMENTS_REQUESTS)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height='260px'
              width="20.4vw"
              height={{
                md: '22vh',
                xs: '10vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      height="65vh"
                      src="/assets/images/profile/payments.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.75rem"
                  >
                    Payments and Requests
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  Payments and Requests
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="img" />
                </Box>
              </Box>
            </Grid> */}
            {/* <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box> */}
            {/* <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height='260px'
              width="20.4vw"
              height={{
                md: '22vh',
                xs: '10vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
              onClick={() => navigate(ROUTES.FRIEND_LIST)}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      height="65vh"
                      src="/assets/images/profile/friend-list.svg"
                      alt="img"
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.75rem"
                  >
                    My Friend List
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  My Friend List
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="img" />
                </Box>
              </Box>
            </Grid> */}
            {/* <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box> */}
            {/* <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height='260px'
              width="20.4vw"
              height={{
                md: '22vh',
                xs: '10vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
              onClick={() => navigate('/profile/my_reviews')}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      height="65vh"
                      src="/assets/images/profile/my-reviews.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.75rem"
                  >
                    My Reviews
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  My Reviews
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="" />
                </Box>
              </Box>
            </Grid> */}
            {/* <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box> */}
            {/* <Grid
              onClick={() => navigate('/profile/privacy_sharing')}
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height='260px'
              width="20.4vw"
              height={{
                md: '22vh',
                xs: '10vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      height="65vh"
                      src="/assets/images/profile/privacy.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.75rem"
                  >
                    Privacy and Sharing
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  Privacy and Sharing
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="" />
                </Box>
              </Box>
            </Grid> */}
            <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box>
            <Grid
               onClick={() => navigate(ROUTES.HOST_LANDING)}
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              justifyContent="center"
              alignItems="center"
              height={{
                md: '260px',
                xs: '6vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '@media (max-width: 1474px)': {
                  width: '19.4vw',
                },
                '@media (max-width: 900px)': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              // xs={12}
              // sm={12}
              // md={3.6}
              // xl={3.8}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                  onClick={() => navigate(ROUTES.HOST_LANDING)}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      src="/assets/images/profile/space.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.9rem"
                  >
                    List your space
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  List your space
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="img" />
                </Box>
              </Box>
            </Grid>
            <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box>
            {/* Refer a HOST */}
            {/* <Grid
               onClick={() => navigate('/profile/privacy_sharing')}
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              justifyContent="center"
              alignItems="center"
              height={{
                md: '260px',
                xs: '10vh',
              }}
              flexDirection="column"
              borderRadius="10px"
              boxShadow={{
                xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                sm: 'none',
                xs: 'none',
              }}
              border={{
                xl: '1px solid #DEDEDE',
                md: '1px solid #DEDEDE',
                sm: 'none',
                xs: 'none',
              }}
              padding={{
                xl: '0px 0.625rem',
                md: '0px 0.625rem',
                sm: '0px 1.25rem',
                xs: '0px 1.25rem',
              }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.4s',
                '&:hover': {
                  backgroundColor: '#DEDEDE',
                },
              }}
              item
              xs={12}
              sm={12}
              md={3.6}
              xl={3.8}
            >
              <Box
                display="flex"
                flexDirection={{
                  xl: 'column',
                  md: 'column',
                  sm: 'row',
                  xs: 'row',
                }}
                justifyContent="space-between"
                alignItems="center"
                width={{
                  xl: 'auto',
                  md: 'auto',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={{
                    xl: '0px',
                    md: '0px',
                    sm: '0.396rem',
                    xs: '0.396rem',
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={{
                      xl: 'auto',
                      md: 'auto',
                      sm: '20.33px',
                      xs: '20.33px',
                    }}
                  >
                    <img
                      width="100%"
                      src="/assets/images/profile/refer.svg"
                      alt=""
                    />
                  </Box>
                  <Typography
                    display={{
                      xl: 'none',
                      md: 'none',
                      sm: 'block',
                      xs: 'block',
                    }}
                    fontSize="0.75rem"
                  >
                    Refer a Host
                  </Typography>
                </Box>
                <Typography
                  display={{
                    xl: 'block',
                    md: 'block',
                    sm: 'none',
                    xs: 'none',
                  }}
                  mt="0.625rem"
                  textAlign="center"
                  fontSize="1.25rem"
                >
                  Refer a Host
                </Typography>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                  fontWeight="700"
                  fontSize="1.25rem"
                  sx={{
                    transform: 'rotate(180deg)',
                  }}
                >
                  <img src="/assets/images/detail/arrowBack.svg" alt="" />
                </Box>
              </Box>
            </Grid> */}
            {/* <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
              marginTop="-0.938rem"
            >
              <Divider
                sx={{
                  borderColor: '#F3F1FF',
                }}
              />
            </Box> */}
          </Grid>
        </Box>
        <Box
          marginTop={{
            xl: '5vh',
            md: '5vh',
            sm: '1.938rem',
            xs: '1.938rem',
          }}
          display={{
            xl: 'block',
            md: 'block',
            sm: 'none',
            xs: 'none',
          }}
        >
          <Typography
            className="Account-font"

            // fontSize='2.25rem'
          >
            Hosting
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            onClick={()=>navigate(ROUTES.HOST_LANDING)}
            border="1px solid #DEDEDE"
            borderRadius="10px"
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.06)"
            padding="2rem"
            marginTop={2}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            bgcolor="#FFFFFF"
          >
            <Box>
              <img
                width="80px"
                height="65vh"
                src="/assets/images/profile/space.svg"
                alt=""
              />
            </Box>
            <Box>
              <Typography fontSize="25px">List your space</Typography>
              <Typography fontSize="17px" fontWeight="200">
              Unlock the potential of your space by listing it on our Thinnai platform, where you can earn income while creating unforgettable memories for guests. Join us today and open doors to new opportunities!
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          marginTop={{
            xl: '5vh',
            md: '5vh',
            sm: '1.938rem',
            xs: '1.938rem',
          }}
          display={{
            xl: 'block',
            md: 'block',
            sm: 'none',
            xs: 'none',
          }}
        >
          <Typography
            className="Account-font"

            //  fontSize='2.25rem'
          >
            Referrals & Credits
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            border="1px solid #DEDEDE"
            borderRadius="10px"
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.06)"
            padding="2rem 2rem"
            marginTop={2}
            bgcolor="#FFFFFF"
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Box>
              <img
                width="80px"
                height="65vh"
                src="/assets/images/profile/refer.svg"
                alt=""
              />
            </Box>
            <Box>
              <Typography fontSize="25px">Refer a Host</Typography>
              <Typography fontSize="17px" fontWeight="200">
                Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim!
              </Typography>
            </Box>
          </Box>
        </Box> */}
        {/* <Box
          display={{
            xl: 'block',
            md: 'block',
            sm: 'none',
            xs: 'none',
          }}
        >
          <PropertyReviewsCarousel reviews={[]} />

          <Box display={'flex'} justifyContent="center">
            <Button
              sx={{
                border: '0.4px solid #000000',
                background: 'transparent',
                outline: 'none',
                borderRadius: '20px',
                fontSize: '1rem',
                cursor: 'pointer',
                color: '#303F52',
                width: '130px',
                height: '40px',
                textTransform: 'none',
              }}
            >
              See all
            </Button>
          </Box>
        </Box> */}
        {/* Support */}
        <Box
          marginTop={{
            xl: '5vh',
            md: '5vh',
            sm: '1.938rem',
            xs: '1.938rem',
          }}
        >
          <Typography
            className="Account-font"
            // fontFamily='Montserrat'
            lineHeight="1.4em"
            // fontWeight={600}
            // color='#333232'
            // fontSize={{
            // 	xl: '2.25ren',
            // 	md: '2.25rem',
            // 	sm: '1rem',
            // 	xs: '1rem',
            // }}
            marginBottom="1.375rem"
          >
            Support
          </Typography>
          {/*  How Thinnai Works*/}
          {supports?.map((support, index) => (
            <>
              <Box
                key={index}
                //marginTop="1.688rem"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={{
                  xl: '1.438rem',
                  md: '1.438rem',
                  sm: '0px',
                  xs: '0px',
                }}
                border={{
                  xl: '1px solid #DEDEDE',
                  md: '1px solid #DEDEDE',
                  sm: 'none',
                  xs: 'none',
                }}
                borderRadius="10px"
                boxShadow={{
                  xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                  md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                  sm: 'none',
                  xs: 'none',
                }}
                padding={{
                  xl: '2rem ',
                  md: '2rem',
                  sm: '1rem 1.25rem',
                  xs: '1rem 1.25rem',
                }}
                bgcolor="#FFFFFF"
                sx={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: '0.4s',
                  '&:hover': {
                    backgroundColor: '#DEDEDE',
                  },
                }}
                onClick={()=>handleFunction(index)}
              >
                <Box
                  display="flex"
                  gap={{
                    xl: 2,
                    md: 2,
                    sm: '1.051rem',
                    xs: '1.051rem',
                  }}
                  alignItems="center"
                >
                  <Box
                    width={{
                      xl: '80px',
                      md: '80px',
                      sm: '1.688rem',
                      xs: '1.688rem',
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    <img width="100%" height="65vh" src={support.img} alt="" />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={{
                        xl: '23px',
                        md: '23px',
                        sm: '0.85rem',
                        xs: '1rem',
                      }}
                      fontFamily="Montserrat"
                      lineHeight="1.4em"
                      fontWeight={500}
                      color="#383838"
                    >
                      {support.title}
                    </Typography>
                    <Typography
                      fontSize={{
                        xl: '17px',
                        md: '17px',
                        sm: '0.538rem',
                        xs: '0.738rem',
                      }}
                      fontFamily="Montserrat"
                      lineHeight="1.5em"
                      color="#A5A5A5"
                      fontWeight="400"
                    >
                      {support.des}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <ArrowForwardIosIcon
                    sx={{
                      fontSize: '1.25rem',
                      '@media (max-width: 900px)': {
                        fontSize: '0.875rem',
                      },
                      color: '#000000',
                    }}
                  />
                </Box>
              </Box>
              <Box
                display={{
                  xl: 'none',
                  md: 'none',
                  sm: 'block',
                  xs: 'block',
                }}
              >
                <Divider
                  sx={{
                    borderColor: '#F3F1FF',
                  }}
                />
              </Box>
            </>
          ))}
        </Box>
        {/* Legal */}
        <Box
          marginTop={{
            xl: '5vh',
            md: '5vh',
            sm: '1.938rem',
            xs: '1.938rem',
          }}
        >
          <Typography
            fontFamily="Montserrat"
            lineHeight="1.4em"
            fontWeight={600}
            color="#333232"
            // fontSize={{
            // 	xl: '2.25rem',
            // 	md: '2.25rem',
            // 	sm: '1rem',
            // 	xs: '1rem',
            // }}
            className="Account-font"
            marginBottom="1.375rem"
          >
            Legal
          </Typography>
          <Box
            display="flex"
            flexDirection={{
              xl: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column',
            }}
            gap={{xs:'0',sm:'0',md:'12px',xl:'12px'}}
          >
            {legals.map((legal, index) => (
              <>
                <Box
                  key={index}
                  onClick={()=>{navigate(legal.path)}}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  border={{
                    xl: '1px solid #DEDEDE',
                    md: '1px solid #DEDEDE',
                    sm: 'none',
                    xs: 'none',
                  }}
                  borderRadius="2%"
                  boxShadow={{
                    xl: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                    md: '0px 4px 30px rgba(0, 0, 0, 0.06)',
                    sm: 'none',
                    xs: 'none',
                  }}
                  padding={{
                    xl: '2rem',
                    md: '2rem ',
                    sm: '0 0 0 1.25rem',
                    xs: '0 0 0 1.25rem',
                  }}
                  overflow="hidden"
                  bgcolor="#FFFFFF"
                  width={{
                    xl: '50%',
                    md: '50%',
                    sm: '100%',
                    xs: '100%',
                  }}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: '0.4s',
                    '&:hover': {
                      backgroundColor: '#DEDEDE',
                    },
                  }}
                >
                  <Box
                    display="flex"
                    gap={{
                      xl: 2,
                      md: 2,
                      sm: '1.051rem',
                      xs: '1.051rem',
                    }}
                    alignItems="center"
                  >
                    <Box
                      width={{
                        xl: '5rem',
                        md: '5rem',
                        sm: '1.688rem',
                        xs: '1.688rem',
                      }}
                      display="flex"
                      alignItems="center"
                    >
                      <img width="100%" height="65vh" src={legal.img} alt="img" />
                    </Box>
                    <Box>
                      <Typography
                        fontSize={{
                          xl: '23px',
                          md: '23px',
                          sm: '0.75rem',
                          xs: '0.9rem',
                        }}
                        lineHeight="1.4em"
                        color="#383838"
                      >
                        {legal.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    marginRight={{
                      xl: '0px',
                      md: '0px',
                      sm: '1.3rem',
                      xs: '1.3rem',
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        fontSize: '1.25rem',
                        '@media (max-width: 900px)': {
                          fontSize: '0.875rem',
                        },
                        color: '#000000',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  display={{
                    xl: 'none',
                    md: 'none',
                    sm: 'block',
                    xs: 'block',
                  }}
                >
                  <Divider
                    sx={{
                      borderColor: '#F3F1FF',
                    }}
                  />
                </Box>
              </>
            ))}
          </Box>
        </Box>
        {/* Responsive Logout button*/}
        <Box
          display={{
            xl: 'none',
            md: 'none',
            sm: 'block',
            xs: 'block',
          }}
          onClick={logoutUser}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={{
              xl: '3.75rem 3.75rem',
              md: '3.75rem 3.75rem',
              sm: '1.25rem 0px 1.25rem 1.25rem',
              xs: '1.25rem 0px 1.25rem 1.25rem',
            }}
            overflow="hidden"
            bgcolor="#FFFFFF"
            width={{
              xl: '50%',
              md: '50%',
              sm: '100%',
              xs: '100%',
            }}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: '0.4s',
              '&:hover': {
                backgroundColor: '#DEDEDE',
              },
            }}
          >
            <Box
              display="flex"
              gap={{
                xl: 3,
                md: 3,
                sm: '1.051rem',
                xs: '1.051rem',
              }}
              alignItems="center"
            >
              <Box>
                <Typography
                  fontSize="1rem"
                  fontFamily="Montserrat"
                  lineHeight="1.5em"
                  fontWeight={500}
                  color="#383838"
                >
                  Log Out
                </Typography>
              </Box>
            </Box>
            <Box
              marginRight={{
                xl: '0px',
                md: '0px',
                sm: '1.3rem',
                xs: '1.3rem',
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: '1.25rem',
                  '@media (max-width: 900px)': {
                    fontSize: '0.875rem',
                  },
                  color: '#000000',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ResponsiveMenu
        homeSelected={homeSelected}
        bookSelected={bookSelected}
        chatSelected={chatSelected}
        accountOpen={accountOpen}
        homeClick={homeClick}
        bookClick={bookClick}
        chatClick={chatClick}
        accountClick={accountClick}
      />
    </Box>
  )
}

export default Profile
