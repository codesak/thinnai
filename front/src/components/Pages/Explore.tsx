import Box from '@mui/material/Box'
import { Dispatch, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlaces } from '../../actions/main'
import LocationCarousel from '../elements/Explore/LocationCarousel'
import NavBar from '../elements/Explore/NavBar'
import Places from '../elements/Explore/Places'
import Search from '../elements/Explore/Search'
import '../styles/Main/main.css'
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routing/routes'
import MobileHeader from '../elements/Common/mobileOnly/MobileHeader'
import Filter from '../elements/Explore/subElements/Filter'
import ResponsiveMenu from '../elements/Explore/subElements/ResponsiveMenu'
//import firebase from '../../utils/push-notification'
import axios from 'axios'
import { Typography } from '@mui/material'
import MobileLogin from '../AuthPages/MobileLogin'
import store, { RootState } from '../../store'
import { loadUser } from '../../actions/guestAuth'
import { getCart } from '../../actions/cart'
import Whatsapp from '../elements/Common/Whatsapp'
import style from '../styles/explore.module.css'
// import ReactGA from 'react-ga';


const Explore = () => {

  // Google Ads
  // useEffect(() => {
  //   // Track page view
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);


  const navigate = useNavigate()
  const dispatch: Dispatch<any> = useDispatch()
  const user = useSelector<RootState, any>((state:any) => state.guestAuth.user)

	const [searchState, setSearchState] = useState(false);
	const openSearch = () => {
		setSearchState(true);
	};
	//const messaging = firebase.messaging();
	const [token,setToken]=useState<any | null>(null)

  const isAuthenticated = store.getState().register.isAuthenticated
  const [viewLogin, setViewLogin] = useState<boolean>(false)

  const tokenPresent = localStorage.getItem('token')
  

  useEffect(()=>{
    if(!(isAuthenticated===null || isAuthenticated===false)){
    dispatch(loadUser({}))
  }
  },[])
  useEffect(() => {
    dispatch(getCart())
 },[])
  // useEffect(() => {
  //   Notification()
  // }, [])

	/* useEffect(() => {
		Notification.requestPermission()
			  .then((permission) => {
				  if(permission === 'granted') {
					messaging.getToken().then((newToken:any) => {
						axios.post("https://canary.bookmythinnai.com/api/push/sendtouser",{ourtoken:newToken}).then((res:any)=>{
						}).then((res:any)=>{
							setToken(newToken)
						})
					
						});	
					}
			  })
	  }, []); */


	 /*  async function callNotification(){
		await 
	  } */
	const [showFilter, setShowFilter] = useState(false);
	const [showSort, setShowSort] = useState(false);

  const [cityName, setCityName] = useState('')
  const filterClose = () => {
    setShowFilter(true)
    if (showFilter || showSort) {
      setShowFilter(false)
      setShowSort(false)
    }
  }

  const sortApply = () => {
    setShowSort(true)
    if (showFilter || showSort) {
      setShowFilter(false)
      setShowSort(false)
    }
  }

  const filterDataServices = [
    {
      img: '/assets/images/filterIcons/ic_movie.svg',
      text: 'Private Screening Experience',
    },
    {
      img: '/assets/images/filterIcons/ic_candle_light.svg',
      text: 'Candle Light Dinner',
    },
    // {
    //   img: '/assets/images/filterIcons/ic_decoration.svg',
    //   text: 'Special Decors',
    // },
  ]

  const filterDataGroupTypes = [
    {
      img: '/assets/images/detail/amenities/music.svg',
      text: 'Friends',
    },
    {
      img: '/assets/images/detail/amenities/music.svg',
      text: 'Couples',
    },
    {
      img: '/assets/images/detail/amenities/music.svg',
      text: 'Kids Friendly',
    },
    {
      img: '/assets/images/detail/amenities/music.svg',
      text: 'Family',
    },
  ]

  const filterDataPermits = [
    {
      img: '/assets/images/filterIcons/ic_smoke_thinline.svg',
      text: 'smoking',
      title:'Allow Smoking'
    },
    {
      img: '/assets/images/filterIcons/ic_alcohol.svg',
      text: 'alcohol',
      title:'Allow Alcohol'
    },
    {
      img: '/assets/images/filterIcons/ic_non_veg_thinline.svg',
      text: 'non_veg',
      title:'Allow Non-Veg'
    },
    {
      img: '/assets/images/filterIcons/ic_floor_decoration.svg',
      text: 'floor_decor',
      title:'Allow Floor Decor'
    },
    {
      img: '/assets/images/filterIcons/ic_table_decor_thinline.svg',
      text: 'table_decor',
      title:'Allow Table Decor'
    },
    {
      img: '/assets/images/filterIcons/ic_cake.svg',
      text: 'cake',
      title:'Allow Cake'
    },
    {
      img: '/assets/images/filterIcons/ic_alcohol.svg',
      text: 'hookah',
      title:'Allow Hookah'
    },
  ]

  const [homeSelected, setHomeSelected] = useState(true)
  const homeClick = () => {
    if (!homeSelected) {
      setHomeSelected(true)
      setBookSelected(false)
      setChatSelected(false)
      setAccountOpen(false)
    }
    setViewLogin(false)
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
    if(!tokenPresent){setViewLogin(true)}
    if(tokenPresent) navigate(ROUTES.CONFIRMED)
  }

  const [chatSelected, setChatSelected] = useState(false)
  const chatClick = () => {
    
    
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

  const [accountOpen, setAccountOpen] = useState(false)
  const accountClick = () => {
    if (!accountOpen) {
      setHomeSelected(false)
      setBookSelected(false)
      setChatSelected(false)
      setAccountOpen(true)
    }
    if(!tokenPresent){setViewLogin(true)}
    if(tokenPresent) navigate(ROUTES.PROFILE)
  }
  

  const previousState=()=>{
      setHomeSelected(true)
      setBookSelected(false)
      setChatSelected(false)
      setAccountOpen(false)
      setViewLogin(false)
  }

  const [stateSearched, setStateSearched] = useState(false)
  const searched = () => {
    setSearchState(false)
    setStateSearched(true)
    dispatch(loadPlaces())
  }

  const [viewBook, setViewBook] = useState(false)
  const [commingSoon, setCommingSoon] = useState(true)

  const guestCount = useSelector<RootState, any>(state => state.search.guestCount);
  useEffect(()=>{
    if(guestCount>1){
      setStateSearched(true)
      
    }
  },[])
  
  

  return (
    <Box
      fontFamily="'Montserrat', sans-serif"
      position="relative"
      sx={{ overflowX: 'hidden' }}
      minHeight="100vh"
      margin={{
        sm: searchState || showFilter ? '0  ' : '0 ',
        xs: '0',
      }}
      padding={{
        md: searchState || showFilter ? '0 4.5rem ' : '0 4.5rem',
        sm: searchState || showFilter ? '0' : '0',
        xs: '0',
      }}
    >
      {/* <Whatsapp/> */}
      {/* Decorative-Circle---------------------------------------- */}
      <Box
        className="circle"
        zIndex="0"
        display={{ sm: 'none' }}
        width={{ xs: '172px', md: '430.23px', sm: '' }}
        top={{ xs: '-82.86px', md: '-245px', sm: '' }}
        right={{ xs: '-82.86px', md: '-179px', sm: '' }}
        border="1px solid #EECBBC"
      />
      <Box
        className="circle"
        zIndex="0"
        display={{ sm: 'none' }}
        width={{ xs: '203px', md: '507.78px', sm: '' }}
        top={{ xs: '-80px', md: '-273px', sm: '' }}
        right={{ xs: '-80px', md: '-207px', sm: '' }}
        border="1px solid #EECBBC"
      />
      <Box
        className="circle"
        zIndex="0"
        display={{ sm: 'none' }}
        width={{ xs: '230px', md: '575.31px', sm: '' }}
        top={{ xs: '-82px', md: '-301px', sm: '' }}
        right={{ xs: '-82px', md: '-199px', sm: '' }}
        border="3px solid rgba(238, 203, 188, 0.2)"
      />
      <Box
        className="circle"
        zIndex="0"
        display={{ sm: 'none' }}
        width={{ xs: '253px', md: '634.84px', sm: '' }}
        top={{ xs: '-80px', md: '-318px', sm: '' }}
        right={{ xs: '-80px', md: '-185px', sm: '' }}
        border="1px solid rgba(238, 203, 188, 0.93)"
      />

      {viewLogin && <MobileLogin previousState={previousState}/>}

      { !viewLogin && <Box position="relative" width="100%">
        {!viewBook && (
          <div className={style.mobileHeaderWrapper}>
          <MobileHeader color="black" urlPath="/" headerText={''} />
            <div className={style.cartContainer} onClick={() => navigate(ROUTES.ENQUIRY_SUMMARY)}>
              <img src="/assets/images/ic_cart.svg" alt="" />
            </div>
          </div>
          
        )}
        <NavBar
          stateSearched={stateSearched}
          setStateSearched={setStateSearched}
          searchTabOpen={openSearch}
          state={searchState}
          searchTabClose={() => setSearchState(false)}
          searched={searched}
        />
        
      </Box>}
      <Box position="relative">
       { !viewLogin && <> {searchState && (
          <Box display={{ sm: 'block', md: 'none' }} width="100%" zIndex="5">
            <Search setSearchState={setSearchState} onClick={searched} />
          </Box>
        )}
        <Box height={20} />
        <Box>
          <LocationCarousel
            cityName={cityName}
            setCityName={setCityName}
            commingSoon={commingSoon}
            setCommingSoon={setCommingSoon}
            onClick={() => setShowFilter(true)}
          />
        </Box>

				{commingSoon===true ?<Box>
				   <Places />
				</Box>: <Box display='flex' gap='4em' justifyContent='center' alignItems='center' sx={{flexDirection:'column', marginTop:{xs:'5rem', sm:'5.5rem'}}}>
					<Box width={{xs:'50%',sm:'20%'}}><img style={{width:'100%', height:'100%', objectFit:'cover'}} src="/assets/images/launching_soon.svg" alt="img" /></Box>
					<Typography width={{xs:'55%',md:'90%'}} fontFamily='Montserrat' fontStyle='normal' fontWeight='600' fontSize={{xs:'15px',sm:'30px',md:'40px'}} lineHeight={{xs:'20px',sm:'30px',md:'40px'}} textAlign='center' color='#777F8B' letterSpacing='0.015rem'>We're getting ready to launch in {cityName} soon.</Typography>
				</Box> }
				
				<Box height={{xs:'80px',sm:'50px'}} />
				{searchState && (
					<Box
						className='search-overlay'
						position='absolute'
						display={{ md: 'block', xs: 'none' }}
						onClick={() => setSearchState(false)}
						sx={{
							background: 'rgba(0, 0, 0, 0.63)',
							top: 0,
							bottom: 0,
							left: '-80px',
							right: '-80px',
						}}
						zIndex='2'
					/>
				)} </>}
				<Filter
					showFilter={showFilter}
					showSort={showSort}
					sortApply={sortApply}
					filterClose={filterClose}
					filterDataAmenities={filterDataGroupTypes}
					filterDataServices={filterDataServices}
					filterDataPermits={filterDataPermits}
				/>
				<ResponsiveMenu
				    // showFilter={showFilter}
				    // filterClose={filterClose}
					// filterDataAmenities={filterDataGroupTypes}
					// filterDataServices={filterDataServices}
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
			{showFilter && (
				<Box
					onClick={() => setShowFilter(false)}
					display={{ xs: 'none', md: 'block' }}
					zIndex='6'
					position='absolute'
					top='0'
					left='0'
					right='0'
					bottom='0'
					sx={{ background: 'rgba(0, 0, 0, 0.63)' }}
				/>
			)}
		</Box>
	);
};

export default Explore
