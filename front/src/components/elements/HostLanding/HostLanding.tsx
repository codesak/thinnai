	import { Box, Button, Typography, useMediaQuery } from '@mui/material';
	import { makeStyles } from '@mui/styles';
	import { motion } from 'framer-motion';
	import Typewriter from 'typewriter-effect';
	import HostFeatured from './HostFeatured';
	import HostNav from './HostNav';
	import '../../styles/Pages/Page.scss';
	import SectionTitle from './SectionTitle';
	import CommunityForm from '../../Pages/CommunityForm';
	import Faqs from '../../Pages/Faqs';
	import Footer from '../GuestLanding/Footer';
	import { useEffect } from 'react';
	import WhatsappMobile from '../Common/WhatsappMobile';

	const useStyles: any = makeStyles({
		topBanner: {
			background: 'linear-gradient(146.48deg, rgba(26, 25, 30, 0.6) 0%, rgba(0, 0, 0, 0) 97.84%)',
			display: 'flex',
			alignItems: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		},
	});

	const HostLanding = () => {
		useEffect(()=>{
			window.scrollTo({
			top: 0,
			behavior: "smooth",
			});
		},[])
		const classes = useStyles();
		const breakPoint = useMediaQuery('(max-width:600px)');
		const mdBreakPoint = useMediaQuery('(max-width:900px)');

		const textLoop = [
			'Hosting!',
			'Experience!',
			'Memories!',
			'Moments!',
			'Friends!',
			'Community!',
			'Income!',
		];

		const data = [
			{
				title: 'Good income',
				desc: 'We all maintain our home as beautiful and clean as possible, but We never get the appreciation or make money out of it. Thinnai is here to turn the tables with just a Table.  ',
				img: '/assets/images/host_landing/passive-girl.svg',
				number: '/assets/images/host_landing/passive-1.svg',
				id: 1,
			},
			{
				title: 'Meet unique people ',
				desc: 'In our monotonous Life, we don’t have energy or time to socialise as we like to. Upon Hosting with Thinnai, you get to meet Unique set of people for a short duration who would spend a quality time at the space you have created.',
				img: '/assets/images/host_landing/passive-girl-2.svg',
				number: '/assets/images/host_landing/passive-2.svg',
				id: 2,
			},
			{
				title: 'Effortless hosting',
				desc: 'We are known for traditionally hosting lunch and Dinners, but today’s modern lifestyle requires Modern Hosting. With Thinnai, you will now have to provide only the Dining space as the Guests will order their favourite food through delivery Apps.  ',
				img: '/assets/images/host_landing/passive-girl-3.svg',
				number: '/assets/images/host_landing/passive-3.svg',
				id: 3,
			},
		];

		const blogs = [
			{
				category: 'Blogs',
				img: '/assets/images/host_landing/blog-1.svg',
				title: 'Follow the lay',
				des: " It's better than kicking the puppy dog around and all that so. Let's make a happy little mountain now.",
				id: 1,
			},
			{
				category: 'Blogs',
				img: '/assets/images/host_landing/blog-2.svg',
				title: 'Follow the lay',
				des: " It's better than kicking the puppy dog around and all that so. Let's make a happy little mountain now.",
				id: 2,
			},
		];

		const articles = [
			{
				category: 'Articles',
				img: '/assets/images/host_landing/article-1.svg',
				title: 'Follow the lay',
				des: " It's better than kicking the puppy dog around and all that so. Let's make a happy little mountain now.",
				id: 1,
			},
			{
				category: 'Articles',
				img: '/assets/images/host_landing/article-2.svg',
				title: 'Follow the lay',
				des: " It's better than kicking the puppy dog around and all that so. Let's make a happy little mountain now.",
				id: 2,
			},
		];

		return (
			<Box>
				<WhatsappMobile/>
				<Box
					height={{
						xl: '100vh',
						md: '100vh',
						sm: '60vh',
						xs: '40vh',
					}}
					
					position='relative'
					overflow='hidden !important'
					className={classes.topBanner}
					// sx={{
					// 	backgroundImage: breakPoint
					// 		? "url('/assets/images/host_landing/top-banner-mobile.svg')"
					// 		: "url('/assets/images/host_landing/top-banner.svg')",
					// 	backgroundRepeat: 'no-repeat',
					// 	// '@media (max-width: 900px)': {
					// 	//   backgroundSize: '100%',
					// 	// },
					// }}
				>
					<Box width='100%'>
						<video
							style={{
								filter: 'brightness(0.7)',
								position: 'absolute',
								top: '7vh',
								left: 0,
								minWidth: '100%',
								objectFit: 'cover',
								width: '100%',
								height: '100%',
							}}
							loop
							playsInline
							onCanPlay={e => (e.currentTarget.muted = true)}
							autoPlay
							muted
							className='video'
						>
							<source src='/assets/videos/host_landing.mp4' type='video/mp4' />
						</video>
					</Box>
					<Box
						position='absolute'
						height='100%'
						width='100%'
						sx={{
							boxShadow: 'none',
							top: '0',
							left: '0',
						}}
					>
						<HostNav />
						<Box
							className='open__text'
							color='white'
							width={{ md: '90%', sm: '95%', xs: '100%' }}
							margin={{ xl: '40vh 100px', md: '50vh 60px', sm: '120px auto', xs: '30px auto' }}
						>
							<Box textAlign='center'>
								<Box
									fontStyle='normal'
									fontWeight='500'
									fontSize={{ md: '38px', sm: '35px', xs: '20px' }}
									lineHeight={{ sm: '55px', xs: '38px' }}
								>
									Open Doors to Thinnai
								</Box>
								<Box
									fontStyle='normal'
									fontWeight='700'
									fontSize={{ md: '3.7rem', sm: '35px', xs: '20px' }}
									lineHeight={{ sm: '55px', xs: '38px' }}
									marginTop='5px'
									textAlign={{ xs: 'center', md: 'center' }}
									// fontSize= {{md:'54px',sm:'40px',xs:'24px'}}
									// lineHeight= {{sm:'67.5px',xs:'43px'}}
									// sx={{'@media (max-width: 900px)':{textAlign:'center'}}}
									minWidth={{ md: '420px', sm: '350px', xs: '250px' }}
								>
									<Typewriter
										options={{
											strings: textLoop,
											autoStart: true,
											loop: true,
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
							{/* <Box height={{ sm: 22, xs: 40, md: 28 }} /> */}
							<Box 
								display='flex' 
								component={motion.div} 
								whileHover={{ scale: 1.1 }} 
							>
											<Button
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
													marginTop:'5vh',
													justifyContent:'center',
													alignItems:'center',
													borderRadius: '15px',
													'&:hover': {
														background: '#D8A355',
													},
													'@media (max-width: 600px)': {
														fontSize: '18px',
													},
												}}
												href='https://docs.google.com/forms/d/e/1FAIpQLSd62sxWJH4394_4RcIUa0XFWcL9AFvKwa6TXdL04IdtsRVwzw/viewform'
											>
												JOIN NOW
											</Button>
							</Box>
						
							{/* <Box top= {{sm:'95%',xs:'70%'}} width= {{sm:'80%',xs:'88%'}} sx={{position:'absolute',}}>
								<MenuTabs/>
								</Box> */}
						</Box>
					</Box>

				
				</Box>

			

				{/* Community */}
				<Box bgcolor='#F4CF97' display={'none'}>
					<Box
						margin={{
							xl: '0px 70px',
							md: '0px 70px',
							sm: '0px 40px',
							xs: '0px 15px',
						}}
					>
						<Typography
							fontFamily='Montserrat'
							lineHeight={{
								xl: '29px',
								md: '29px',
								sm: '20px',
								xs: '20px',
							}}
							fontSize={{
								xl: '24px',
								md: '24px',
								sm: '16px',
								xs: '16px',
							}}
							fontWeight='400'
							color='rgba(0, 0, 0, 0.5)'
							pt={{
								xl: '116px',
								md: '116px',
								sm: '31px',
								xs: '31px',
							}}
						>
							Welcome To Thinai{' '}
						</Typography>
						<Typography
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
							pb={{
								xl: '95px',
								md: '95px',
								sm: '23px',
								xs: '23px',
							}}
							fontWeight={600}
							color='black'
							mb='11px'
						>
							Community
						</Typography>
						<Box>
							<Box display='flex' justifyContent='center' alignItems='center' position='relative'>
								<img width='100%' src='/assets/images/host_landing/community.jpg' alt='' />
								<Box
									sx={{
										fontSize: '73px',
										paddingY: breakPoint ? '15px' : '30px',
										backdropFilter: 'blur(9.5)',
										width: '100%',
										background:
											'linear-gradient(164.87deg, rgba(26, 25, 30, 0.6) 1%, rgba(0, 0, 0, 0) 109.07%)',
									}}
									position='absolute'
									left={0}
									bottom={{
										xl: '-110px',
										md: '-110px',
										sm: '-110px',
										xs: '-106px',
									}}
								>
									<Box display='flex' justifyContent='space-between'>
										<Box display='flex' justifyContent='center' alignItems='center' margin='auto'>
											<Typography
												paddingLeft={{
													xl: 3,
													md: 3,
													sm: 2,
													xs: 1,
												}}
												fontSize={{
													xl: '24px',
													md: '24px',
													sm: '14px',
													xs: '14px',
												}}
												fontWeight={300}
												color='white'
												textAlign='center'
												fontFamily='Montserrat'
												width={{
													md: '100%',
													sm: '200px',
													xs: '100px',
												}}
												// paddingRight={{
												// 	xl: 3,
												// 	md: 3,
												// 	sm: 2,
												// 	xs: 1,
												// }}
											>
												Explore more about Thinai
											</Typography>
										</Box>
										<Box
											sx={{
												overflowX: 'auto',
												display: 'flex',
												justifyContent: 'flex-start',
												alignItems: 'center',
												gap: '7px',
											}}
										>
											<Box width='300px'>
												<img
													style={{
														display: 'block',
														height: breakPoint ? '76px' : '172px',
													}}
													width='100%'
													src='/assets/images/host_landing/community-1.svg'
													alt=''
												/>
											</Box>
											<Box
												width='300px'
												marginLeft={{
													xl: '0',
													md: '0',
													sm: '0px',
													xs: '5px',
												}}
											>
												<img
													style={{
														display: 'block',
														height: breakPoint ? '76px' : '172px',
													}}
													width='100%'
													src='/assets/images/host_landing/community-2.svg'
													alt=''
												/>
											</Box>
											<Box
												width='300px'
												display={{
													xl: 'block',
													md: 'block',
													sm: 'none',
													xs: 'none',
												}}
											>
												<img
													style={{
														display: 'block',
														height: breakPoint ? '76px' : '172px',
													}}
													width='100%'
													src='/assets/images/host_landing/community-1.svg'
													alt=''
												/>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* Why hosting */}
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
							mt={{
								xl: '80px',
								md: '80px',
								sm: '45px',
								xs: '0px',
							}}
							fontFamily='Montserrat'
							lineHeight={{
								xl: '29px',
								md: '29px',
								sm: '20px',
								xs: '20px',
							}}
							fontSize={{
								xl: '24px',
								md: '24px',
								sm: '16px',
								xs: '16px',
							}}
							fontWeight='400'
							color='rgba(0, 0, 0, 0.5)'
							pt='116px'
						>
							Benefits
						</Typography>
						<Typography
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
							Why hosting
						</Typography>
					</Box>
					<Box>
						<Box
							display='flex'
							sx={{
								overflowX: 'auto',
							}}
							flexDirection={{
								xl: 'row',
								md: 'row',
								sm: 'column',
								xs: 'column',
							}}
							gap={{
								xl: '20px',
								md: '20px',
								sm: '32px',
								xs: '32px',
							}}
							margin={{
								xl: '0px 70px',
								md: '0px 70px',
								sm: '0px 40px',
								xs: '0px 15px',
							}}
						>
							{data.map(card => (
								<Box
									marginBottom={{
										xl: '0px',
										md: '0px',
										sm: '32px',
										xs: '32px',
									}}
									key={card.id}
									bgcolor='#FFFFFF'
									zIndex='1050'
									boxShadow='0px 4px 15px rgba(0, 0, 0, 0.1)'
									borderRadius='8px'
									paddingX='20px'
									display='flex'
									flexDirection={{
										xl: 'column',
										md: 'column',
										sm: 'row',
										xs: 'column',
									}}
									gap={{
										xl: '0px',
										md: '0px',
										sm: '0px',
										xs: '0px',
									}}
								>
									<Box
										display='flex'
										justifyContent={{
											xl: 'space-between',
											md: 'space-between',
											sm: 'flex-start',
											xs: 'center',
										}}
										alignItems={{
											xl: 'center',
											md: 'center',
											sm: 'flex-start',
											xs: 'center',
										}}
									>
										<Box
											height={{
												xl: '281.3px',
												md: '281.3px',
												sm: '59px',
												xs: 'auto',
											}}
											width={{
												xl: card.title === 'Passive income' ? '70px' : '107.45px',
												md: card.title === 'Passive income' ? '70px' : '107.45px',
												sm: '36px',
												xs: 'auto',
											}}
											marginRight={{
												xl: '0px',
												md: '0px',
												sm: '31px',
												xs: '0px',
											}}
										>
											<img
												style={{
													display: 'block',
													marginTop: mdBreakPoint ? '50px' : '',
													height: '100%',
													width: '100%',
												}}
												src={card.number}
												alt=''
											/>
										</Box>
										<Box>
											<img
												style={{ display: mdBreakPoint ? 'none' : 'block' }}
												src={card.img}
												alt=''
											/>
										</Box>
									</Box>
									<Box
										pb={{
											xl: '100px',
											md: '50px',
											sm: '20px',
											xs: '20px',
										}}
									>
										<Typography
											mt='41px'
											mb='16px'
											fontSize='24px'
											fontWeight='600'
											fontFamily='Montserrat'
											textAlign={{
												xl: 'left',
												md: 'left',
												sm: 'left',
												xs: 'center',
											}}
										>
											{card.title}
										</Typography>
										<Typography
											textAlign={{
												xl: 'left',
												md: 'left',
												sm: 'left',
												xs: 'center',
											}}
											fontSize='16px'
											fontFamily='Montserrat'
											color='rgba(0, 0, 0, 0.5)'
										>
											{card.desc}
										</Typography>
										<Box
											display='flex'
											justifyContent={{ xs: 'center', sm: 'center', md: 'flex-end' }}
											paddingTop={{ xs: '2rem', sm: '2rem', md: 0 }}
										>
											<img
												style={{
													display: mdBreakPoint ? 'block' : 'none',
													width: mdBreakPoint ? '' : '50%',
												}}
												src={card.img}
												alt=''
											/>
										</Box>
									</Box>
								</Box>
							))}
						</Box>
						<Box width={'100%'} height='240px' bgcolor='#F4CF97' mt='-120px'></Box>
					</Box>
				</Box>
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
							Hear from our community of hosts
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
								src='https://www.youtube.com/embed/-SixQVOxPe0'
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
							></iframe>
						</Box>
					</Box>
				</Box>
				{/* Start Hosting */}
				<Box>
					<Box>
						<Box
							margin={{
								xl: '0px 70px',
								md: '0px 70px',
								sm: '0px 40px',
								xs: '0px 15px',
							}}
							pt={{
								xl: '116px',
								md: '116px',
								sm: '52px',
								xs: '52px',
							}}
							mb={{
								xl: '64px',
								md: '64px',
								sm: '41px',
								xs: '41px',
							}}
						>
							<SectionTitle subTitle='Start hosting' title='How to be our host' />
						</Box>
						<Box>
							{/* Set up an empty space */}
							<Box
								sx={{
									background: mdBreakPoint
										? "url('/assets/images/host_landing/start-mobile-hosting-bg.svg')"
										: "url('/assets/images/host_landing/start-hosting-bg.svg')",
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '0px 100px',
								}}
							>
								<Box
									marginX={{
										xl: '70px',
										md: '70px',
										sm: '40px',
										xs: '15px',
									}}
									display='flex'
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
									justifyContent='space-between'
									alignItems='center'
									gap={10}
									marginBottom={{
										xl: '69px',
										md: '150px',
										sm: '84px',
										xs: '84px',
									}}
								>
									<Box
										order={{
											xl: '1',
											md: '1',
											sm: '2',
											xs: '2',
										}}
										display='flex'
										alignItems='flex-start'
										gap={{
											xl: '7px',
											md: '7px',
										}}
										marginTop={{
											xl: '0px',
											md: '0px',
											sm: '50px',
											xs: '50px',
										}}
									>
										<Box
											marginRight={{
												md: '7px',
												sm: '24px',
												xs: '24px',
											}}
										>
											<img
												style={{
													display: 'block',
													marginTop: '12px',
													width: breakPoint ? '24px' : '',
												}}
												src='/assets/images/host_landing/one-hosting.svg'
												alt=''
											/>
										</Box>
										<Box>
											<Typography
												letterSpacing='0.015em'
												fontWeight={600}
												fontFamily='Montserrat'
												fontSize={{
													xl: '36px',
													md: '36px',
													sm: '24px',
													xs: '24px',
												}}
											>
												Find a Empty Corner
											</Typography>
											<Typography
												fontSize={{
													xl: '16px',
													md: '16px',
													sm: '14px',
													xs: '14px',
												}}
												fontFamily='Montserrat'
												color='rgba(0, 0, 0, 0.5)'
											>
												Create a comfortable seating by placing a Dining Table and chairs in any Empty
												yet secluded space in your home or commercial establishment.
											</Typography>
										</Box>
									</Box>
									<Box
										order={{
											xl: '2',
											md: '2',
											sm: '1',
											xs: '1',
										}}
										width={mdBreakPoint ? '90%' : 'auto'}
									>
										<img
											style={{
												width: mdBreakPoint ? '100%' : '',
												borderRadius: '20px',
											}}
											src='/assets/images/host_landing/setup1.png'
											alt=''
										/>
									</Box>
								</Box>
								{/* Register Yourself */}
								<Box
									marginX={{
										xl: '70px',
										md: '70px',
										sm: '40px',
										xs: '15px',
									}}
									display='flex'
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
									justifyContent='space-between'
									alignItems='center'
									gap={10}
									marginBottom={{
										xl: '69px',
										md: '150px',
										sm: '84px',
										xs: '84px',
									}}
								>
									<Box width={mdBreakPoint ? '90%' : 'auto'}>
										<img
											style={{
												width: mdBreakPoint ? '100%' : '',
												borderRadius: '20px',
											}}
											src='/assets/images/host_landing/setup2.png'
											alt=''
										/>
									</Box>
									<Box
										display='flex'
										alignItems='flex-start'
										gap={{
											xl: '7px',
											md: '7px',
										}}
										marginTop={{
											xl: '0px',
											md: '0px',
											sm: '50px',
											xs: '50px',
										}}
									>
										<Box
											marginRight={{
												md: '7px',
												sm: '24px',
												xs: '24px',
											}}
										>
											<img
												style={{
													display: 'block',
													marginTop: '12px',
													width: breakPoint ? '24px' : '',
												}}
												src='/assets/images/host_landing/two-hosting.svg'
												alt=''
											/>
										</Box>
										<Box>
											<Typography
												letterSpacing='0.015em'
												fontWeight={600}
												fontFamily='Montserrat'
												fontSize={{
													xl: '36px',
													md: '36px',
													sm: '24px',
													xs: '24px',
												}}
											>
												Beautify it
											</Typography>
											<Typography
												fontSize={{
													xl: '16px',
													md: '16px',
													sm: '14px',
													xs: '14px',
												}}
												fontFamily='Montserrat'
												color='rgba(0, 0, 0, 0.5)'
											>
												Decorate the space to create a unique and beautiful Dining Ambience. For
												example: Lights, art, candles, wall hangings, plants etc. Let your creativity
												flow.
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
							{/* Starting hosting Guests */}
							<Box
								sx={{
									background: mdBreakPoint
										? "url('/assets/images/host_landing/start-mobile-hosting-bg.svg')"
										: "url('/assets/images/host_landing/start-hosting-bg.svg')",
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '0px 100px',
								}}
							>
								<Box
									marginX={{
										xl: '70px',
										md: '70px',
										sm: '40px',
										xs: '15px',
									}}
									display='flex'
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
									justifyContent='space-between'
									alignItems='center'
									gap={10}
									marginBottom={{
										xl: '69px',
										md: '150px',
										sm: '84px',
										xs: '84px',
									}}
								>
									<Box
										order={{
											xl: '1',
											md: '1',
											sm: '2',
											xs: '2',
										}}
										display='flex'
										alignItems='flex-start'
										gap={{
											xl: '7px',
											md: '7px',
										}}
										marginTop={{
											xl: '0px',
											md: '0px',
											sm: '50px',
											xs: '50px',
										}}
									>
										<Box
											marginRight={{
												md: '7px',
												sm: '24px',
												xs: '24px',
											}}
										>
											<img
												style={{
													display: 'block',
													marginTop: '12px',
													width: breakPoint ? '24px' : '',
												}}
												src='/assets/images/host_landing/three-hosting.svg'
												alt=''
											/>
										</Box>
										<Box>
											<Typography
												letterSpacing='0.015em'
												fontWeight={600}
												fontFamily='Montserrat'
												fontSize={{
													xl: '36px',
													md: '36px',
													sm: '24px',
													xs: '24px',
												}}
											>
												Register as a Host
											</Typography>
											<Typography
												fontSize={{
													xl: '16px',
													md: '16px',
													sm: '14px',
													xs: '14px',
												}}
												fontFamily='Montserrat'
												color='rgba(0, 0, 0, 0.5)'
											>
												Download our Mobile App for Hosts from your Appstore/ Playstore, tell us about
												your space and yourself and get registered as a Host.
											</Typography>
										</Box>
									</Box>
									<Box
										order={{
											xl: '2',
											md: '2',
											sm: '1',
											xs: '1',
										}}
										width={mdBreakPoint ? '90%' : 'auto'}
									>
										<img
											style={{
												width: mdBreakPoint ? '100%' : '',
												borderRadius: '20px',
											}}
											src='/assets/images/host_landing/setup3.png'
											alt=''
										/>
									</Box>
								</Box>
								{/* Make memories of a lifetime */}
								<Box
									margin={{
										xl: '0px 70px',
										md: '0px 70px',
										sm: '0px 40px',
										xs: '0px 15px',
									}}
									display='flex'
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
									justifyContent='space-between'
									alignItems='center'
									gap={10}
									marginBottom={{
										xl: '69px',
										md: '150px',
										sm: '84px',
										xs: '84px',
									}}
								>
									<Box width={mdBreakPoint ? '90%' : 'auto'}>
										<img
											style={{
												borderRadius: '20px',
												width: mdBreakPoint ? '100%' : '',
											}}
											src='/assets/images/host_landing/setup4.png'
											alt=''
										/>
									</Box>
									<Box
										display='flex'
										alignItems='flex-start'
										gap={{
											xl: '7px',
											md: '7px',
										}}
										marginTop={{
											xl: '0px',
											md: '0px',
											sm: '50px',
											xs: '50px',
										}}
									>
										<Box
											marginRight={{
												md: '7px',
												sm: '24px',
												xs: '24px',
											}}
										>
											<img
												style={{
													display: 'block',
													marginTop: '12px',
													width: breakPoint ? '24px' : '',
												}}
												src='/assets/images/host_landing/four-hosting.svg'
												alt=''
											/>
										</Box>
										<Box>
											<Typography
												letterSpacing='0.015em'
												fontWeight={600}
												fontFamily='Montserrat'
												fontSize={{
													xl: '36px',
													md: '36px',
													sm: '24px',
													xs: '24px',
												}}
											>
												Get paid for making memories
											</Typography>
											<Typography
												fontSize={{
													xl: '16px',
													md: '16px',
													sm: '14px',
													xs: '14px',
												}}
												fontFamily='Montserrat'
												color='rgba(0, 0, 0, 0.5)'
											>
												Start Hosting Guests from Thinnai to experience the joy of effortless hosting,
												Good Income and meeting New people. Let’s get you started today!
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					mt={{
						xl: '250px',
						md: '250px',
						sm: '90px',
						xs: '90px',
					}}
					display='none'
					alignItems='center'
					height={{
						xl: '565px',
						md: '565px',
						sm: '320px',
						xs: '320px',
					}}
					style={{
						backgroundImage: "url('/assets/images/host_landing/CTA.jpg')",
					}}
				>
					<Box
						margin={{
							xl: '0px 70px',
							md: '0px 70px',
							sm: '0px 40px',
							xs: '0px 15px',
						}}
						width={{
							xl: '50%',
							md: '50%',
							sm: '100%',
							xs: '100%',
						}}
					>
						<Typography
							letterSpacing='0.015em'
							fontWeight={700}
							fontFamily='Montserrat'
							color='#FFFFFF'
							mb={{
								xl: '21px',
								md: '21px',
								sm: '15px',
								xs: '15px',
							}}
							lineHeight={{
								xl: '43.88px',
								md: '43.88px',
								sm: '24.38px',
								xs: '24.38px',
							}}
							fontSize={{
								xl: '36px',
								md: '36px',
								sm: '20px',
								xs: '20px',
							}}
						>
							WHAT ARE YOU WAITING FOR?
						</Typography>
						<Typography
							fontSize={{
								xl: '19px',
								md: '19px',
								sm: '16px',
								xs: '16px',
							}}
							lineHeight={{
								xl: '25.87px',
								md: '25.87px',
								sm: '21.79px',
								xs: '21.79px',
							}}
							fontFamily='Montserrat'
							color='rgba(255, 255, 255, 0.85)'
							fontWeight={300}
							mb={{
								xl: '44px',
								md: '44px',
								sm: '29px',
								xs: '29px',
							}}
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</Typography>
						<Box
							display='flex'
							justifyContent={{
								xl: 'flex-start',
								md: 'flex-start',
								sm: 'center',
								xs: 'center',
							}}
						>
							<Button
								variant='contained'
								sx={{
									background: '#D8A356',
									borderRadius: '8px',
									fontSize: breakPoint ? '14px' : '25px',
									textTransform: 'none',
									color: '#FFFFFF',
									paddingX: breakPoint ? '30px' : '40px',
									paddingY: '10px',
									boxShadow: 'none',
									fontWeight: '500',
									lineHeight: '36.57px',
									'@media (max-width: 600px)': {
										lineHeight: '17.07px',
									},
								}}
								onClick={e => {
									window.open('https://forms.gle/Q2Lau7wVDX6MMzDe7', '_blank', 'noopener,noreferrer');
								}}
							>
								Check Out Spaces
							</Button>
						</Box>
					</Box>
				</Box>
				<Box display={'none'}>
					<Box>
						<Box
							marginX={{
								xl: '70px',
								md: '70px',
								sm: '40px',
								xs: '15px',
							}}
							marginTop={{
								xl: '201px',
								md: '201px',
								sm: '81px',
								xs: '81px',
							}}
							marginBottom={{
								xl: '115px',
								md: '115px',
								sm: '100px',
								xs: '100px',
							}}
						>
							<SectionTitle subTitle='Testimonial' title='What our lovely client say about us' />
						</Box>
						{/* Testimonial Desktop  */}
						<Box
							display={{
								xl: 'block',
								md: 'block',
								sm: 'none',
								xs: 'none',
							}}
						>
							<Box
								display='flex'
								flexDirection={{
									xl: 'row',
									md: 'row',
									sm: 'column',
									xs: 'column',
								}}
							>
								<Box
									width={{
										xl: '40%',
										md: '40%',
										sm: '100%',
										xs: '100%',
									}}
									height='400px'
									paddingBottom={12}
									sx={{
										boxShadow: '8px 4px 16px rgba(0, 0, 0, 0.08)',
										backgroundImage: "url('/assets/images/host_landing/testimonial-bg.svg')",
										position: 'relative',
									}}
								>
									<Box position='absolute' bottom='-95px' right='0'>
										<img height='300px' src='/assets/images/host_landing/client-1.svg' alt='' />
									</Box>
								</Box>
								<Box
									width={{
										xl: '60%',
										md: '60%',
										sm: '100%',
										xs: '100%',
									}}
									bgcolor='#F4CF97'
									mt={10}
									paddingX={{
										xl: '44px',
										md: '44px',
										sm: '20px',
										xs: '20px',
									}}
								>
									<Typography
										pt='100px'
										fontSize='28px'
										fontWeight={600}
										fontFamily='Inter'
										mb='21px'
									>
										Alina gosh
									</Typography>
									<Typography
										color='rgba(0, 0, 0, 0.5)'
										fontSize='16px'
										fontWeight={400}
										fontFamily='Inter'
										mb='29px'
									>
										Exercising the imagination, experimenting with talents, being creative; these
										things, to me, are truly the windows to your soul. This is where you take out all
										your hostilities and frustrations. It's better than kicking the puppy dog around
										and all that so. Let's make a happy little mountain now. Isn't it great to do
										something you can't fail at? Let's give him a friend too. Everybody needs a
										friend.
									</Typography>
									<Typography pb={10} fontSize='20px' fontWeight={500} fontFamily='Inter'>
										Hosted : 1500+ Happy Guests
									</Typography>

									<Box
										display={{
											xl: 'block',
											md: 'block',
											sm: 'none',
											xs: 'none',
										}}
									>
										<Box display='flex' justifyContent='flex-end'>
											<Button
												sx={{
													borderRadius: '40px',
												}}
											>
												<img src='/assets/images/host_landing/next.svg' alt='' />
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
						{/* Testimonial Mobile Responsive */}
						<Box
							display={{
								xl: 'none',
								md: 'none',
								sm: 'block',
								xs: 'block',
							}}
						>
							<Box>
								<Box
									height='400px'
									zIndex={100}
									paddingBottom={12}
									sx={{
										boxShadow: '8px 4px 16px rgba(0, 0, 0, 0.08)',
										backgroundImage: "url('/assets/images/host_landing/testimonial-bg.svg')",
										position: 'relative',
									}}
								></Box>
								<Box zIndex={1000} bgcolor='#F4CF97' mt={-40} position='relative'>
									<Box
										position='absolute'
										top='-50px'
										right={{
											sm: '45%',
											xs: '30%',
										}}
									>
										<img
											style={{
												zIndex: '100000',
											}}
											height='110px'
											width='142px'
											src='/assets/images/host_landing/client-1.svg'
											alt=''
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
											display='flex'
											justifyContent='flex-end'
											marginRight={{
												sm: '100px',
												xs: '20px',
											}}
										>
											<Button
												sx={{
													borderRadius: '40px',
													width: '23px',
													height: '22.96px',
												}}
											>
												<img width='100%' src='/assets/images/host_landing/next.svg' alt='' />
											</Button>
										</Box>
									</Box>
									<Box
										padding={{
											xl: '44px',
											md: '44px',
											sm: '40px',
											xs: '40px',
										}}
									>
										<Typography
											pt='100px'
											fontSize='28px'
											fontWeight={600}
											fontFamily='Inter'
											mb='21px'
										>
											Alina gosh
										</Typography>
										<Typography
											color='rgba(0, 0, 0, 0.5)'
											fontSize='16px'
											fontWeight={400}
											fontFamily='Inter'
											mb='29px'
										>
											Exercising the imagination, experimenting with talents, being creative; these
											things, to me, are truly the windows to your soul. This is where you take out
											all your hostilities and frustrations. It's better than kicking the puppy dog
											around and all that so. Let's make a happy little mountain now. Isn't it great
											to do something you can't fail at? Let's give him a friend too. Everybody needs
											a friend.
										</Typography>
										<Typography pb={10} fontSize='20px' fontWeight={500} fontFamily='Inter'>
											Hosted : 1500+ Happy Guests
										</Typography>
									</Box>
									<Box
										display={{
											xl: 'block',
											md: 'block',
											sm: 'none',
											xs: 'none',
										}}
									>
										<Box display='flex' justifyContent='flex-end'>
											<Button
												sx={{
													borderRadius: '40px',
												}}
											>
												<img src='/assets/images/host_landing/next.svg' alt='' />
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* Featured Blogs and article */}
				{/* <Box
					marginX={{
						xl: '70px',
						md: '70px',
						sm: '40px',
						xs: '15px',
					}}
				>
					<Box display='flex' justifyContent='space-between' alignItems='center'>
						<Box
							marginTop={{
								xl: '164px',
								md: '164px',
								sm: '33px',
								xs: '33px',
							}}
							marginBottom={{
								xl: '115px',
								md: '115px',
								sm: '89px',
								xs: '89px',
							}}
						>
							<SectionTitle subTitle='Featured' title='Featured Blogs and article' />
						</Box>
						<Box
							display={{
								xl: 'block',
								md: 'block',
								sm: 'block',
								xs: 'none',
							}}
						>
							<Button
								sx={{
									fontSize: '20px',
									fontWeight: '500',
									lineHeight: '162%',
									color: '#000000',
									marginTop: '80px',
									textTransform: 'none',
								}}
							>
								See all
							</Button>
						</Box>
					</Box>
					<Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
						<Box
							gridColumn={{
								xl: 'span 5',
								md: 'span 5',
								sm: 'span 12',
								xs: 'span 12',
							}}
							height={{
								xl: '377.06px',
								md: '377.06px',
								sm: '340px',
								xs: '340px',
							}}
							sx={{
								backgroundImage: 'url(/assets/images/host_landing/blog-1.png)',
								backgroundRepeat: 'no-repeat',
								position: 'relative',
								backgroundSize: 'cover',
								borderRadius: '8px',
								overflow: 'hidden',
							}}
						>
							<Box marginTop='21px' marginRight='28px'>
								<Typography
									fontWeight={500}
									fontSize='20px'
									fontFamily='Montserrat'
									lineHeight='24.38px'
									color='rgba(255, 255, 255, 0.5)'
									textAlign='right'
								>
									Blogs
								</Typography>
							</Box>
							<Box
								position='absolute'
								left={0}
								bottom={8}
								sx={{
									background: '#1A191E99',
									width: '100%',
									height: '140px',
								}}
							>
								<Box paddingX='20px' paddingTop={2} color='white'>
									<Typography fontWeight={600} fontSize='20px' fontFamily='Inter'>
										Follow the lay{' '}
									</Typography>
									<Typography fontWeight={300} fontSize='14px' fontFamily='Inter'>
										It's better than kicking the puppy dog around and all that so. Let's make a happy
										little mountain now.
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box
							gridColumn={{
								xl: 'span 7',
								md: 'span 7',
								sm: 'span 12',
								xs: 'span 12',
							}}
							height={{
								xl: '377.06px',
								md: '377.06px',
								sm: '340px',
								xs: '340px',
							}}
							sx={{
								backgroundImage: 'url(/assets/images/host_landing/blog-2.png)',
								backgroundRepeat: 'no-repeat',
								position: 'relative',
								backgroundSize: 'cover',
								borderRadius: '8px',
								overflow: 'hidden',
							}}
						>
							<Box marginTop='21px' marginRight='28px'>
								<Typography
									fontWeight={500}
									fontSize='20px'
									fontFamily='Montserrat'
									lineHeight='24.38px'
									color='rgba(255, 255, 255, 0.5)'
									textAlign='right'
								>
									Blogs
								</Typography>
							</Box>
							<Box
								position='absolute'
								left={0}
								bottom={8}
								sx={{
									background: '#1A191E99',
									width: '100%',
									height: '140px',
								}}
							>
								<Box paddingX='20px' paddingTop={2} color='white'>
									<Typography fontWeight={600} fontSize='20px' fontFamily='Inter'>
										Follow the lay{' '}
									</Typography>
									<Typography fontWeight={300} fontSize='14px' fontFamily='Inter'>
										It's better than kicking the puppy dog around and all that so. Let's make a happy
										little mountain now.
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box
							gridColumn={{
								xl: 'span 7',
								md: 'span 7',
								sm: 'span 12',
								xs: 'span 12',
							}}
							height={{
								xl: '377.06px',
								md: '377.06px',
								sm: '340px',
								xs: '340px',
							}}
							sx={{
								backgroundImage: 'url(/assets/images/host_landing/article-1.png)',
								backgroundRepeat: 'no-repeat',
								position: 'relative',
								backgroundSize: 'cover',
								borderRadius: '8px',
								overflow: 'hidden',
							}}
						>
							<Box marginTop='21px' marginRight='28px'>
								<Typography
									fontWeight={500}
									fontSize='20px'
									fontFamily='Montserrat'
									lineHeight='24.38px'
									color='rgba(255, 255, 255, 0.5)'
									textAlign='right'
								>
									Article
								</Typography>
							</Box>
							<Box
								position='absolute'
								left={0}
								bottom={8}
								sx={{
									background: '#1A191E99',
									width: '100%',
									height: '140px',
								}}
							>
								<Box paddingX='20px' paddingTop={2} color='white'>
									<Typography fontWeight={600} fontSize='20px' fontFamily='Inter'>
										Follow the lay{' '}
									</Typography>
									<Typography fontWeight={300} fontSize='14px' fontFamily='Inter'>
										It's better than kicking the puppy dog around and all that so. Let's make a happy
										little mountain now.
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box
							gridColumn={{
								xl: 'span 5',
								md: 'span 5',
								sm: 'span 12',
								xs: 'span 12',
							}}
							height={{
								xl: '377.06px',
								md: '377.06px',
								sm: '340px',
								xs: '340px',
							}}
							sx={{
								backgroundImage: 'url(/assets/images/host_landing/article-2.png)',
								backgroundRepeat: 'no-repeat',
								position: 'relative',
								backgroundSize: 'cover',
								borderRadius: '8px',
								overflow: 'hidden',
							}}
						>
							<Box marginTop='21px' marginRight='28px'>
								<Typography
									fontWeight={500}
									fontSize='20px'
									fontFamily='Montserrat'
									lineHeight='24.38px'
									color='rgba(255, 255, 255, 0.5)'
									textAlign='right'
								>
									Article
								</Typography>
							</Box>
							<Box
								position='absolute'
								left={0}
								bottom={8}
								sx={{
									background: '#1A191E99',
									width: '100%',
									height: '140px',
								}}
							>
								<Box paddingX='20px' paddingTop={2} color='white'>
									<Typography fontWeight={600} fontSize='20px' fontFamily='Inter'>
										Follow the lay{' '}
									</Typography>
									<Typography fontWeight={300} fontSize='14px' fontFamily='Inter'>
										It's better than kicking the puppy dog around and all that so. Let's make a happy
										little mountain now.
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box> */}
				{/* Featured on */}
				<HostFeatured />

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
							xl: '179px',
							md: '179px',
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
					//<CommunityForm />
				</Box> */}
				<Box
					marginTop={{
						xl: '0px',
						md: '0px',
						sm: '72px',
						xs: '72px',
					}}
				>
					<Footer  />
				</Box>
			</Box>
		);
	};

	export default HostLanding;
