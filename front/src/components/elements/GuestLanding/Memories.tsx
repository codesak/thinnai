import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Memories = () => {
	const [onScreenMem, setOnScreenMem] = useState(0);

	const dataMemories = [
		{
			img: '/assets/images/Page/gt1.PNG',
			name: 'Joe Doe',
			memories:
				'Literally we were bored of visiting restaurants every Weekend. It was such a Wonderful Experience, We felt like sitting there forever. Thinnai is such an Amazing concept. ',
		},
		{
			img: '/assets/images/Page/gt2.PNG',
			name: 'Joe D',
			memories:
				'We sincerely appreciate the Quality of Service, customer support, the level of detailing and accountability your team has! Kudos to Thinnai.',
		},
		{
			img: '/assets/images/Page/gt3.PNG',
			name: 'J Doe',
			memories:
				'It was an amazing experience at Thinnai, spent quality time with my friend. Thank you for coming up with such a beautiful concept.',
		},
		{
			img: '/assets/images/Page/gt4.PNG',
			name: 'J Doe',
			memories:
				"Thinnai experience is something I'd cherish forever. One of the best dates of my life, Thank you, Team Thinnai.",
		},
		{
			img: '/assets/images/page/gt5.PNG',
			name: 'J Doe',
			memories:
				'Thinnai is a beautiful experience, kudos to Thinnai for this innovative experience and new concept of Private Dining.',
		},
		{
			img: '/assets/images/Page/gt6.PNG',
			name: 'J Doe',
			memories:
				"Thank you for bringing Thinnai as a concept, it really helps us to escape the hustle and bustle of the city and it's overcrowded restaurants/Cafes.",
		},
		{
			img: '/assets/images/Page/gt7.PNG',
			name: 'J Doe',
			memories:
				'I have no words to express how amazing the Thinnai experience was. I am never going to a restaurant or a cafe to dine out. It’s going to be Thinnai everytime. ',
		},
		{
			img: '/assets/images/Page/gt9.PNG',
			name: 'J Doe',
			memories:
				'My Friends were blown away by the concept of Thinnai and this is the most memorable Birthday ever for me. ',
		},
		{
			img: '/assets/images/Page/gt10.PNG',
			name: 'J Doe',
			memories:
				'It was a spellbound experience, my parents were happy, seeing them smile, forgetting about all the worry we had was something beyond my belief. The Thinnai experience today was something I’d never forget in my life.',
		},
	];

	const leftScroll = () => {
		if (onScreenMem > 0) {
			setOnScreenMem(onScreenMem - 1);
		} else if (onScreenMem === 0) {
			setOnScreenMem(dataMemories.length - 1);
		}
	};
	const rightScroll = () => {
		if (onScreenMem < dataMemories.length - 1) {
			setOnScreenMem(onScreenMem + 1);
		} else if (onScreenMem === dataMemories.length - 1) {
			setOnScreenMem(0);
		}
	};

	useEffect(() => {
		var textChange = setInterval(() => {
			rightScroll();
		}, 10000);
		return () => clearInterval(textChange);
	});

	return (
		<Box>
			<CssBaseline />
			<Box
				width={{ md: '87%', xs: '90%' }}
				margin='auto'
				paddingBottom={{
					xl: '0',
					md: '0',
					sm: '4rem',
					xs: '4rem',
				}}
				fontSize={{ md: '2.25rem', xs: '2.25rem' }}
				textAlign={{
					sm: 'left',
					xs: 'center',
				}}
				lineHeight={{ md: '44px', sm: '32px', xs: '40.82px' }}
				sx={{
					fontWeight: '600',
				}}
			>
				Memories created in Thinnai
			</Box>
			<Box height='5vh' />
			<Box
				position='relative'
				padding={{ md: '10vw 0vh' }}
				display='flex'
				width='100%'
				justifyContent='center'
			>
				<Box
					//  marginTop={{xs:'32px'}}
					//  width={{md:'83%',xs:'90%'}}
					width='100%'
					display='flex'
					flexDirection='column'
					gap={0.8}
				>
					<Box height='120px'></Box>
					<Box
						height={{ md: '150px', xs: '96px' }}
						width='100%'
						sx={{
							background: '#F4CF97',
						}}
					></Box>
					<Box
						width='100%'
						height='11px'
						sx={{
							background: '#F4CF97',
						}}
					></Box>
					<Box
						width='100%'
						height='5px'
						sx={{
							background: '#F4CF97',
						}}
					></Box>
				</Box>
				<Box position='absolute' width='100%' zIndex={-1}>
					<Box>
						<img
							style={{ width: '100%', marginTop: '-10vh' }}
							src='/assets/images/page/memories_illustration.svg'
							alt=''
						/>
					</Box>
				</Box>
				{dataMemories.map((dataMemory, index) => (
					<Box style={{ display: onScreenMem === index ? 'block' : 'none' }}>
						<Box
							width={{ md: '58%', xs: '78%' }}
							height={{ md: '348.42px', sm: '40vh', xs: 'auto' }}
							padding={{ md: '30px', xs: '40px 8px' }}
							sx={{
								background: '#FFFCF8',
								boxShadow: '0px 4px 20px rgba(205, 205, 205, 0.25)',
								backdropFilter: 'blur(10px)',
								borderRadius: '30px',
								position: 'absolute',
								top: '11%',
								left: '13.5%',
								float: 'right',
							}}
						>
							<Box
								width={{ xs: '145px' }}
								height={{ xs: '70px' }}
								display={{ md: 'none', xs: 'block' }}
								sx={{
									float: 'right',
									'@media (max-width: 900px)': {
										float: 'none',
										margin: 'auto',
									},
								}}
								component={motion.div}
								initial={{ translateX: '1.75rem', opacity: '0' }}
								whileInView={{ translateX: '0px', opacity: '1' }}
							>
								<Box
									width={{ md: '432px', sm: '400px', xs: '290px' }}
									height={{ md: '288px', xs: '8.688rem' }}
									display={{ md: 'none', xs: 'block' }}
									sx={{
										position: 'relative',
										right: '13%',
										top: '-120%',
										'@media (max-width: 992px)': {
											right: '80%',
											top: '-190%',
										},
										'@media (max-width: 600px)': {
											right: '48%',
											top: '-190%',
										},
									}}
								>
									<img
										style={{
											width: '100%',
											borderRadius: '20px',
										}}
										src={dataMemory.img}
										alt=''
									/>
								</Box>
							</Box>
							{/* <Box
								fontSize={{ md: '28px', xs: '14px' }}
								lineHeight={{ md: '38px', xs: '25.07px' }}
								style={{
									fontFamily: 'Open Sans',
									fontStyle: 'normal',
									fontWeight: '600',
								}}
								component={motion.div}
								initial={{ translateX: '0px', opacity: '0.2' }}
								whileInView={{ translateX: '1.75rem', opacity: '1' }}
								transition={{
									delay: 0.2,
									x: { duration: 0.3 },
								}}
							>
								<h2>{dataMemory.name}</h2>
							</Box> */}
							<Box
								fontSize={{ md: '1.3rem', sm: '1.1rem', xs: '12px' }}
								lineHeight={{ md: '2rem', sm: '1.5rem', xs: '16.34px' }}
								style={{
									fontFamily: 'Open Sans',
									fontStyle: 'normal',
									fontWeight: '400',
								}}
								paddingBottom={{
									xl: '0px',
									md: '0px',
									sm: '1rem',
									xs: '1rem',
								}}
								paddingTop={{
									md: '10px',
								}}
								width={{
									xl: '73%',
									md: '60%',
									sm: '100%',
									xs: '100%',
								}}
								component={motion.div}
								initial={{ translateX: '0px', opacity: '0.2' }}
								whileInView={{ translateX: '1.75rem', opacity: '1' }}
								sx={{
									'@media (max-width: 900px)': {
										textAlign: 'center',
										marginTop: '12vh',
										paddingRight: '60px',
									},

									'@media (max-width: 600px)': {
										textAlign: 'center',
										marginTop: '30px',
										paddingRight: '60px',
									},
								}}
							>
								<p>{dataMemory.memories}</p>
							</Box>
							<Box
								// className='memories__controls'
								// display='flex'
								// position='absolute'
								// bottom={{
								// 	xl: '60px',
								// 	md: '20px',
								// 	small: '20px',
								// 	xs: '-65px',
								// }}
								gap={2}
								display='flex'
								position='absolute'
								left={{
									xl: '7%',
									md: '7%',
									sm: '7%',
									xs: '35%',
								}}
								bottom={{
									xl: '20%',
									md: '10%',
									sm: '5%',
									xs: '5%',
								}}
								// margin={{
								// 	xl: 'auto',
								// 	md: '4rem auto',
								// 	sm: 'auto',
								// 	xs: 'auto',
								// }}
							>
								<Box
									onClick={leftScroll}
									display='flex'
									alignItems='center'
									justifyContent='center'
									color='white'
									sx={{
										aspectRatio: '1',
										cursor: 'pointer',
										width: '35px',
										boxShadow: '0px 2px 20px rgba(61, 58, 53, 0.32)',
										borderRadius: '50%',
										':hover': {
											border: '0.5px solid black',
										},
									}}
								>
									<ArrowBackIcon style={{ fontSize: '18px', color: 'black' }} />
								</Box>
								<Box
									onClick={rightScroll}
									display='flex'
									alignItems='center'
									justifyContent='center'
									color='#1A191E'
									sx={{
										aspectRatio: '1',
										cursor: 'pointer',
										width: '35px',
										borderRadius: '50%',
										boxShadow: '0px 2px 20px rgba(61, 58, 53, 0.32)',
										':hover': {
											border: '0.5px solid black',
										},
									}}
								>
									<ArrowForwardIcon style={{ fontSize: '18px' }} />
								</Box>
							</Box>
						</Box>
						<Box
							width={{ xl: '432px', md: '402px', sm: '392px', xs: '209px' }}
							height={{ md: '318px', xs: '139px' }}
							display={{ md: 'block', xs: 'none' }}
							sx={{
								position: 'absolute',
								borderRadius: '30px',
								right: '15.5%',
								top: '6%',
								overflow: 'hidden',
							}}
							component={motion.div}
							initial={{ translateX: '30px', opacity: '0.2' }}
							whileInView={{ translateX: '0px', opacity: '1' }}
							transition={{
								delay: 0.2,
								x: { duration: 0.3 },
							}}
						>
							<img style={{ height: '100%' }} src={dataMemory.img} alt='' />
						</Box>
					</Box>
				))}
				{/* <Box
					// className='memories__controls'
					// display='flex'
					// position='absolute'
					// bottom={{
					// 	xl: '60px',
					// 	md: '20px',
					// 	small: '20px',
					// 	xs: '-65px',
					// }}
					gap={2}
					display='flex'

					// margin={{
					// 	xl: 'auto',
					// 	md: '4rem auto',
					// 	sm: 'auto',
					// 	xs: 'auto',
					// }}
				>
					<Box
						onClick={leftScroll}
						display='flex'
						alignItems='center'
						justifyContent='center'
						color='white'
						sx={{
							background: '#1A191E',
							aspectRatio: '1',
							cursor: 'pointer',
							width: '35px',
							boxShadow: '0px 2px 20px rgba(61, 58, 53, 0.12)',
							borderRadius: '50%',
						}}
					>
						<ArrowBackIcon style={{ fontSize: '18px' }} />
					</Box>
					<Box
						onClick={rightScroll}
						display='flex'
						alignItems='center'
						justifyContent='center'
						color='#1A191E'
						sx={{
							background: 'white',
							aspectRatio: '1',
							cursor: 'pointer',
							width: '35px',
							borderRadius: '50%',
						}}
					>
						<ArrowForwardIcon style={{ fontSize: '18px' }} />
					</Box>
				</Box> */}

				{/* <Box
               position='absolute'
               width={{xs:'17%'}}
               height={{sm:'22%',xs:'25%'}}
               bottom={{md:'19%',xs:'36%'}}
               right={{md:'16%',xs:'5%'}}
               zIndex='-1'
               sx={{
                    background: 'rgba(244, 207, 151, 0.2)',
                    borderRadius: '8px',
                 }}
            /> */}
			</Box>
		</Box>
	);
};

export default Memories;
