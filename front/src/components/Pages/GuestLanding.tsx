// import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { resetStore } from '../../actions/root'
import { ROUTES } from '../../utils/routing/routes'
import Footer from '../elements/GuestLanding/Footer'
import How from '../elements/GuestLanding/How'
import Memories from '../elements/GuestLanding/Memories'
import More from '../elements/GuestLanding/More'
import Try from '../elements/GuestLanding/Try'
import Video from '../elements/GuestLanding/Video'
import What from '../elements/GuestLanding/What'
import Why from '../elements/GuestLanding/Why'
import HostFeatured from '../elements/HostLanding/HostFeatured'
import SectionTitle from '../elements/HostLanding/SectionTitle'
import Faqs from './Faqs'
// import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import isAuthenticatedNow from '../../utils/isAuthenticatedNow'
import { useEffect } from 'react'
import CommunityForm from './CommunityForm'
import '../styles/Pages/Page.scss'
import { TOKEN_KEY } from '../../utils/consts'
import WhatsappMobile from '../elements/Common/WhatsappMobile'
import { Typography, useMediaQuery } from '@mui/material';

const GuestLanding = () => {
  const navigate = useNavigate()

  // const isAuthenticated = useSelector<RootState, boolean>(
  //   (state) => state.guestAuth.isAuthenticated
  // )

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[])

  useEffect(()=>{
	if (localStorage.getItem(TOKEN_KEY)){
		navigate(ROUTES.EXPLORE)
	}
  })

  const isAuthenticated = isAuthenticatedNow()

  const textLoop = [
    'Dining!',
    'Theatre!',
    'Workspace!',
    'Moments!',
    'Memories!',
    'Time!',
  ]

  const onClick = () => {
    navigate(ROUTES.EXPLORE)
    resetStore('RESET_LANDING')
  }

  return (
    <Box fontFamily="'Montserrat', sans-serif" className='page'>
		{/* <WhatsappMobile/> */}
			<Box
				padding={{ sm: '48px', xs: '24px' }}
				height={{ xl: '100vh', md: '100vh', sm: '545px', xs: '450px' }}
				overflow='hidden'
				sx={{ background: '', margin: '0', position: 'relative' }}
			>
				<Box width='100%'>
					<video
						playsInline
						onCanPlay={e => (e.currentTarget.muted = true)}
						loop
						autoPlay
						muted
						className='video'
					>
						<source src='/assets/videos/new.mp4' type='video/mp4' />
					</video>
				</Box>
				<Box height={60} />
				<AppBar
					position='absolute'
					sx={{
						background: 'rgba(0, 0, 0, 1)',
						boxShadow: 'none',
						top: '0',
						left: '0',
						padding: '0.5rem 6rem',
						'@media (max-width: 600px)': { padding: '10px 24px' },
					}}
				>
					<Container maxWidth='xl'>
						<Toolbar
							disableGutters
							variant='dense'
							sx={{
								minHeight: '3.5rem',
							}}
						>
							<Box style={{ flexGrow: '2' }}>
								<img
									style={{
										height: '3rem',
									}}
									src='/assets/images/logo.png'
									alt=''
								/>
							</Box>
							<Box display='flex' flexGrow='0.2' gap={2.8} justifyContent='flex-end'>
								<Box
									display={{ sm: 'flex' }}
									alignItems='center'
									fontSize='18px'
									fontWeight='400'
									color='#FFFFFF'
									sx={{ cursor: 'pointer' }}
									onClick={() => navigate(ROUTES.HOST_LANDING)}
								>
									Host Your Space
								</Box>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
				<Box
					className='open__text'
					color='white'
					width={{ md: '90%', sm: '95%', xs: '100%' }}
					margin={{ xl: '40vh 100px', md: '30vh 60px', sm: '120px auto', xs: '75px auto' }}
				>
					<Box textAlign='center'>
						<Box
							fontStyle='normal'
							fontWeight='500'
							fontSize={{ md: '38px', sm: '35px', xs: '20px' }}
							lineHeight={{ sm: '55px', xs: '38px' }}
						>
							Experience the Joy of
						</Box>
						<Box
							fontStyle='normal'
							fontWeight='700'
							fontSize={{ md: '3.7rem', sm: '35px', xs: '20px' }}
							lineHeight={{ sm: '55px', xs: '38px' }}
							marginTop='12px'
							display={'flex'}
							justifyContent={{ xs: 'center', md: 'center' }}
							// fontSize= {{md:'54px',sm:'40px',xs:'24px'}}
							// lineHeight= {{sm:'67.5px',xs:'43px'}}
							// sx={{'@media (max-width: 900px)':{textAlign:'center'}}}
							minWidth={{ md: '420px', sm: '350px', xs: '250px' }}
						>
							Private <Box width={'0.5rem'} />
							<Typewriter
								
								options={{
									strings: textLoop,
									autoStart: true,
									loop: true,
								}}
								onInit={(typewriter) => {
									typewriter
									  .pauseFor(1000)
								  }}
							/>
						</Box>
					</Box>
					<Box height={{ sm: 10, xs: 0, md: 18 }} />
					<Box
						fontStyle='normal'
						fontWeight='400'
						fontSize={{ md: '25px', sm: '20px', xs: '17px' }}
						lineHeight={{ sm: '34px', xs: '27px' }}
						sx={{ textAlign: 'center' }}
						display='none'
					>
						The Thinnai Experience is here.
					</Box>
					<Box height={{ sm: 22, xs: 40, md: 28 }} />
					<Box display='flex' component={motion.div} whileHover={{ scale: 1.1 }}>
						<Button
							className='page_display_mobile'
							variant='contained'
							sx={{
								margin: '0 auto',
								fontFamily: 'Open Sans',
								fontStyle: 'normal',
								fontWeight: '600',
								fontSize: '21px',
								lineHeight: '45px',
								color: '#FFFFFF',
								background: '#D8A356',
								padding: '5px 60px',
								borderRadius: '15px',
								'&:hover': {
									background: '#D8A355',
								},
								'@media (max-width: 600px)': {
									fontSize: '18px',
								},
							}}
							onClick={()=> navigate(ROUTES.EXPLORE)}
						>
							VIEW SPACES
						</Button>
					</Box>
					{/* <Box top= {{sm:'95%',xs:'70%'}} width= {{sm:'80%',xs:'88%'}} sx={{position:'absolute',}}>
          <MenuTabs/>
        </Box> */}
				</Box>
			</Box>
			<Box sx={{textAlign:'center',marginTop:'1.5rem'}} className='page_display_desktop'>
			<Button
							variant='contained'
							sx={{
								textAlign:'center',
								fontFamily: 'Open Sans',
								fontStyle: 'normal',
								fontWeight: '600',
								fontSize: '21px',
								lineHeight: '45px',
								color: '#FFFFFF',
								background: '#D8A356',
								padding: '5px 60px',
								borderRadius: '15px',
								'&:hover': {
									background: '#D8A355',
								},
								'@media (max-width: 600px)': {
									fontSize: '18px',
								},
							}}
							onClick={()=> navigate(ROUTES.EXPLORE)}
						>
							VIEW SPACES
						</Button>
			</Box>
			
			<Box height={{ md: 160, xs: 20 }} />
	
			<Box>
				<How />
			</Box>
			<Box height={50} />
			<Box>
				<Why />
			</Box>
			{/* <Box height={{ md: 150, sm: 50, xs: 50 }} />
			<Box>
				<Video />
			</Box> */}
			<Box height={{ md: 100, sm: 50, xs: 50 }} />
			<Box>
				<What onClick={onClick} />
			</Box>
			{/* <Box>
				<EmptySpace />
			</Box> */}
			<Box height={100} />
			<Box>
				<Memories />
			</Box>
			<Box
				height={{ md: 100, sm: 100, xs: 100 }}
				sx={{
					'@media (max-width: 900px)': {
						marginTop: '100px',
					},
					'@media (max-width: 601px)': {
						marginTop: '0px',
					},
				}}
			/>
			<Box>
				<More />
			</Box>

			{/* Meaning of Thinnai */}

			<Box>
				<Box
					margin={{
						xl: '0px 70px',
						md: '0px 70px',
						sm: '0px 40px',
						xs: '0px 15px',
					}}
				>
					<Typography
						textAlign='center'
						mt={{
							xl: '80px',
							md: '80px',
							sm: '45px',
							xs: '45px',
						}}
						fontFamily='Montserrat'
						lineHeight={{
							xl: '52px',
							md: '52px',
							sm: '29px',
							xs: '29px',
						}}
						fontSize={{
							xl: '43px',
							md: '43px',
							sm: '24px',
							xs: '24px',
						}}
						fontWeight={600}
						color='black'
						mb={{
							xl: '64px',
							md: '64px',
							sm: '28px',
							xs: '28px',
						}}
					>
						Thinnai : It's Meaning and Significance
					</Typography>
				</Box>

				<Box
					position='relative'
					minHeight={{ md: '500px', sm: '400px', xs: '350px' }}
					display='flex'
					width='100%'
					justifyContent='center'
				>
					<Box position='absolute' width='100%'>
						<Box height={{ sm: 80, xs: 90 }} />
						<img style={{ width: '100%' }} src='/assets/images/page/Vector1.svg' alt='' />
					</Box>
					<Box position='absolute' width='100%'>
						<Box height={{ sm: 100, xs: 130 }} />
						<img style={{ width: '100%' }} src='/assets/images/page/Vector2.svg' alt='' />
					</Box>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						width={{ md: '72%', xs: '82%' }}
					>
						<iframe
							style={{ width: '100%', zIndex: '1', height: '100%', borderRadius: '25px' }}
							src='https://www.youtube.com/embed/iLqhrHF08VY'
							title='YouTube video player'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowFullScreen
						></iframe>
					</Box>
				</Box>
			</Box>

			<Box height={{ md: 100, sm: 100, xs: 50 }} />


			<Box>
				<Try />
			</Box>
			<Box>
				<HostFeatured />
			</Box>
			{/* frequently asked question */}
			<Box
				marginX={{
					xl: '70px',
					md: '70px',
					sm: '40px',
					xs: '15px',
				}}
				marginTop={{
					xl: '130px',
					md: '130px',
					sm: '62px',
					xs: '62px',
				}}
			>
				<SectionTitle subTitle='' title='Frequently asked questions' />
				<Box
					marginTop={{
						xl: '120px',
						md: '120px',
						sm: '32px',
						xs: '32px',
					}}
				>
					<Faqs />
				</Box>
			</Box>
			<Box
				height={{
					xl: '215px',
					md: '215x',
					sm: '81px',
					xs: '81px',
				}}
			/>
			{/* <Box
				overflow='hidden'
				paddingBottom={{
					xl: '249px',
					md: '249px',
					sm: '72px',
					xs: '72px',
				}}
				sx={{
					'@media (min-width: 900px)': {
						backgroundImage: 'url(assets/images/host_landing/bg-community.jpg)',
					},
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'left bottom',
				}}
			>
				<CommunityForm />
			</Box> */}
			<Box>
				<Footer />
			</Box>
		</Box>
  )
}

export default GuestLanding
