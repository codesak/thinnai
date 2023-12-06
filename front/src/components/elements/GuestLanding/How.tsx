import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {Tween, Timeline } from 'react-gsap';


const How = () => {
	return (
		<Box padding={{ xl: '0 150px', md: '0 100px' }} margin={{ xl: '2rem 0', md: '1rem 0' }}>
			<Box
				display='flex'
				position='relative'
				width={{ md: '100%', xs: '100%' }}
				margin='0 auto'
				justifyContent={{
					xl: 'end',
					md: 'end',
					sm: 'center',
					xs: 'center',
				}}
				flexDirection={{
					xl: 'row',
					md: 'row',
					sm: 'column',
					xs: 'column',
				}}
				
			>
				<Box
					order={{
						xl: 1,
						md: 1,
						sm: 2,
						xs: 2,
					}}
					position={{ xs: 'relative', md: 'relative' }}
					sx={{
						// '@media (max-width: 900px)': {
						// 	transform: 'translate(-50%, -50%)',
						// 	left: '35%',
						// 	top: '50%',
						// },
						'@media (max-width: 900px)': {
							transform: 'translate(0)',
							left: '0',
							top: '70px',
							textAlign: 'center',
						},
						'@media (max-width: 600px)': {
							top: '20px',
						},
					}}
					left='0'
					width={{ md: '100%', xs: '100%' }}
				>
					<Box
						component='h2'
						fontSize={{ md: '2.25rem', xs: '2.25rem' }}
						style={{
							fontWeight: '600',
							lineHeight: '44px',
							margin: '0',
						}}
					>
						How it works?
					</Box>
					<Box
						component='p'
						width={{ md: '100%', xs: '100%' }}
						margin={{ md: '14px 0', xs: '0' }}
						fontSize={{ md: '18px', xs: '14px' }}
						style={{
							fontFamily: 'Open Sans',
							fontStyle: 'normal',
							fontWeight: '300',
							lineHeight: '25px',
						}}
					>
						Here’s the three simple steps for you.
					</Box>
				</Box>
				<Box
					order={{
						xl: 2,
						md: 2,
						sm: 1,
						xs: 1,
					}}
					height={210}
					position='relative'
					right={{
						xl: '-20px',
						md: '-20px',
						sm: '0px',
						xs: '0px',
					}}
					margin={{
						xl: '',
						md: '',
						sm: 'auto',
						xs: 'auto',
					}}
					display={{ md: 'none', xs: 'none' }}
				>
					<img
						height='100%'
						style={{ objectFit: 'contain' }}
						src='/assets/images/Page/how.svg'
						alt=''
					/>
				</Box>
			</Box>
			<Box
				height={{
					xl: 40,
					md: 40,
					sm: 100,
					xs: 60,
				}}
			/>
			<Box>
				<Grid className='how__container' container>
					<CssBaseline />
					<Grid
						item
						md={6}
						xs={12}
						className='how__images'
						display='flex'
						flexDirection={{
							xl: 'row',
							md: 'row',
							sm: 'column',
							xs: 'column',
						}}
						marginBottom={{
							xl: '0px',
							md: '0px',
							sm: '20px',
							xs: '60px',
						}}
						justifyContent='center'
						alignItems='center'
					>
						<Box
							display='flex'
							justifyContent='center'
							width={{
								xl: 'auto',
								md: 'auto',
								sm: '70%',
								xs: '90%',
							}}
							className='how_img_container'
						>
							<img 
								className="how_image" 
								width='90%' 
								height='90%' 
								src='/assets/images/Page/how.gif' alt='' />
						</Box>
					</Grid>
					<Grid item md={5} xs={12} margin='auto'>
						{/* <Box
							margin={{ xs: 'auto', md: '' }}
							component={motion.div}
							initial={{ translateX: '30px', opacity: '0' }}
							whileInView={{ translateX: '0px', opacity: '1' }}
							viewport={{ once: true }}
							transition={{
								delay: 0.2,
								x: { duration: 0.5 },
								default: { ease: 'linear' },
							}}
						> */}
						
									<Timeline
										target={
										<Grid className='how__container' container>
											<Grid
												item
												xl={1.8}
												md={2.3}
												sm={1}
												xs={1.5}
												fontSize={{ md: '48px', sm: '38px', xs: '28px' }}
												lineHeight={{
													xl: '59px',
													md: '50px',
													sm: '40px',
													xs: '30px',
												}}
												height={{ xs: '80%', md: '100%' }}
												style={{
													aspectRatio: '1',
													background: '#1A191E',
													borderRadius: '50%',
													color: 'black',
													fontWeight: '600',
													// border: '1px solid #F4CF97',
													WebkitTextStroke: '1.15px #FFEBCD',
												}}
												display='flex'
												justifyContent='center'
												alignItems='center'
												marginLeft={{ xs: 'auto', md: '0' }}
											>
												<Box
													data-text='1'
													className='how__stroke-correction'
													sx={{
														position: 'relative',
													}}
												>
													1
												</Box>
											</Grid>
											<Grid
												item
												md={8}
												xs={8}
												display='flex'
												flexDirection='column'
												justifyContent='center'
												marginLeft={{ md: 3.7, xs: 1.7 }}
												marginRight={{ md: '0', xs: 'auto' }}
											>
												<Box className='how__header'>Book the ambience of your choice.</Box>
												<Box className='how__p'>
													Select a Thinnai space of your choice, add your requirements and simply book it.
												</Box>
											</Grid>
											<Grid container className='side_line how__container'>
												<Grid item md={2.3} xl={1.8} xs={1.5} marginLeft={{ md: '0', xs: 'auto' }}>
													<Box
														width={1}
														height={63}
														maxWidth='1px'
														margin={{ md: '10px auto', xs: '0px auto' }}
														sx={{ background: '#000000' }}
													></Box>
												</Grid>
												<Grid
													item
													display={{ md: 'none', xs: 'block' }}
													xs={8}
													marginLeft='13.6px'
													marginRight={{ md: '0', xs: 'auto' }}
												></Grid>
											</Grid>
										</Grid>
									}
									>
											<Tween from={{ opacity: -1 }} to={{ opacity: 1 }} />
									</Timeline>
								
							
								<Grid className='how__container' container>
								<Grid
									item
									md={2.3}
									xl={1.8}
									sm={1}
									xs={1.6}
									height={{ xs: '80%', md: '100%' }}
									fontSize={{ md: '48px', sm: '38px', xs: '28px' }}
									lineHeight={{
										xl: '59px',
										md: '50px',
										sm: '40px',
										xs: '30px',
									}}
									style={{
										aspectRatio: '1',
										background: '#F4CF97',
										borderRadius: '50%',
										color: '#F4CF97',
										fontWeight: '600',
										// border: '1px solid #F4CF97',
										WebkitTextStroke: '2px #1A191E',
									}}
									display='flex'
									justifyContent='center'
									alignItems='center'
									marginLeft={{ xs: 'auto', md: '0' }}
								>
									<Box
										data-text='2'
										className='how__stroke-correction-two'
										sx={{
											position: 'relative',
										}}
									>
										2
									</Box>
								</Grid>
								<Grid
									item
									md={8}
									xs={8}
									display='flex'
									flexDirection='column'
									justifyContent='center'
									marginLeft={{ md: 3.7, xs: 1.7 }}
									marginRight={{ md: '0', xs: 'auto' }}
								>
									<Box className='how__header'>Order Favourite Food through delivery apps</Box>
									<Box className='how__p'>
										Once booked, Order your favourite food from different food outlets to your
										Thinnai space.
									</Box>
								</Grid>
								<Grid container alignItems='center'>
									<Grid item md={2.3} xl={1.8} xs={1.5} marginLeft={{ md: '0', xs: 'auto' }}>
										<Box
											height={63}
											maxWidth='1px'
											margin={{ md: '10px auto', xs: '0px auto' }}
											sx={{ background: '#000000' }}
										></Box>
									</Grid>
									<Grid
										item
										display={{ md: 'none', xs: 'block' }}
										marginLeft='13.6px'
										xs={8}
										marginRight={{ md: '0', xs: 'auto' }}
									></Grid>
								</Grid>
							</Grid>
									
								
								
								<Grid container className='how__container'>
								<Grid
									item
									md={2.3}
									xl={1.8}
									sm={1}
									xs={1.6}
									height={{ xs: '80%', md: '100%' }}
									fontSize={{ md: '2.5rem', sm: '38px', xs: '28px' }}
									lineHeight={{
										xl: '59px',
										md: '3rem',
										sm: '40px',
										xs: '30px',
									}}
									style={{
										aspectRatio: '1',
										background: '#1A191E',
										borderRadius: '50%',
										color: 'black',
										fontWeight: '600',
										WebkitTextStroke: '1.15px #FFEBCD',
									}}
									display='flex'
									justifyContent='center'
									alignItems='center'
									marginLeft={{ xs: 'auto', md: '0' }}
								>
									<Box
										data-text='3'
										className='how__stroke-correction'
										sx={{
											position: 'relative',
										}}
									>
										3
									</Box>
								</Grid>
								<Grid
									item
									md={8}
									xs={8}
									display='flex'
									flexDirection='column'
									justifyContent='center'
									marginLeft={{ md: 3.7, xs: 1.7 }}
									marginRight={{ md: '0', xs: 'auto' }}
								>
									<Box className='how__header'>Enjoy Private Dining at a Beautiful Ambience</Box>
									<Box className='how__p'>
										Experience the Luxury of Private Dining in a Beautiful Ambience of your choice.
									</Box>
								</Grid>
							</Grid>

									
					
							
						{/* </Box> */}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default How;
