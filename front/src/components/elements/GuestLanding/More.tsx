import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

const More = () => {
	return (
		// <Box position='relative' className='more' height={{ md: 'auto' }}>
		// 	<Box
		// 		sx={{
		// 			background:
		// 				'linear-gradient(0, rgba(244, 207, 151, 0.2) 55.98%, rgba(244, 207, 151, 0) 91.22%)',
		// 			padding: '75px 0',
		// 		}}
		// 		className='more__header'
		// 		//height={{ md: '499px', xs: '982px' }}
		// 		borderRadius={{ sm: '135px 0px 0', xs: '50px 0px 0' }}
		// 	>
		// 		<h2
		// 			style={{
		// 				fontWeight: '600',
		// 				fontSize: '36px',
		// 				lineHeight: '44px',
		// 				margin: '0 auto',
		// 				width: '80%',
		// 			}}
		// 		>
		// 			More than just a dining space!
		// 		</h2>
		// 		<p
		// 			style={{
		// 				fontFamily: 'Open Sans',
		// 				fontStyle: 'normal',
		// 				fontWeight: '300',
		// 				fontSize: '18px',
		// 				lineHeight: '25px',
		// 				margin: '1rem auto',
		// 				width: '80%',
		// 			}}
		// 		>
		// 			Our Beautiful Thinnai spaces are used for many creative works.
		// 		</p>
		// 	</Box>
		// 	<Box
		// 		position='relative'
		// 		borderRadius={{ sm: '0 0px 119px', xs: '0 0px 50px' }}
		// 		sx={{
		// 			background: '#F4CF97',
		// 			zIndex: '2',
		// 			width: '100%',
		// 		}}
		// 	>
		// 		<Box position='relative' height='100%' width={{ xs: '88%' }} margin='auto'>
		// 			<Grid
		// 				container
		// 				height='100%'
		// 				position='relative'
		// 				direction={{ xs: 'column', md: 'row' }}
		// 				flexWrap='nowrap'
		// 				top={{ md: '-34%', xs: '-72.3%' }}
		// 				gap={{ md: '0', xs: 8 }}
		// 				justifyContent={{ md: 'space-between' }}
		// 			>
		// 				<CssBaseline />
		// 				<Grid
		// 					item
		// 					xs={4}
		// 					display='flex'
		// 					flexDirection='column'
		// 					gap={2}
		// 					alignItems='center'
		// 					justifyContent='space-evenly'
		// 					component={motion.div}
		// 					paddingY={'3vh'}
		// 					initial={{ translateY: '-20px', opacity: '0' }}
		// 					whileInView={{ translateY: '0px', opacity: '1' }}
		// 					viewport={{ once: true }}
		// 					transition={{
		// 						delay: 0.2,
		// 						x: { duration: 0.5 },
		// 					}}
		// 				>
		// 					<Box
		// 						display='flex'
		// 						position='relative'
		// 						justifyContent='center'
		// 						alignItems='center'
		// 						minWidth='288px'
		// 						width='288px'
		// 						sx={{
		// 							background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
		// 							aspectRatio: '1',
		// 							borderRadius: '50%',
		// 						}}
		// 					>
		// 						<img style={{ zIndex: '1' }} src='/assets/images/page/more1.svg' alt='' />
		// 					</Box>
		// 					<Box className='how__header'>Meetings & Remote work</Box>
		// 					<Box className='how__p' textAlign='center'>
		// 						Private & Inspiring work spaces curated for productive work sessions and meetings.{' '}
		// 					</Box>
		// 				</Grid>
		// 				<Grid
		// 					item
		// 					xs={4}
		// 					display='flex'
		// 					flexDirection='column'
		// 					gap={2}
		// 					alignItems='center'
		// 					justifyContent='space-evenly'
		// 					paddingY={'3vh'}
		// 					component={motion.div}
		// 					initial={{ translateY: '-20px', opacity: '0' }}
		// 					whileInView={{ translateY: '0px', opacity: '1' }}
		// 					viewport={{ once: true }}
		// 					transition={{
		// 						delay: 0.2,
		// 						x: { duration: 0.5 },
		// 					}}
		// 				>
		// 					<Box
		// 						display='flex'
		// 						justifyContent='center'
		// 						alignItems='center'
		// 						width='288px'
		// 						minWidth='288px'
		// 						sx={{
		// 							background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
		// 							aspectRatio: '1',
		// 							borderRadius: '50%',
		// 						}}
		// 					>
		// 						<img style={{ objectFit: 'contain' }} src='/assets/images/page/more2.svg' alt='' />
		// 					</Box>
		// 					<Box className='how__header'>Host Workshops</Box>
		// 					<Box className='how__p' width={{ xl: '60%' }} textAlign='center'>
		// 						Beautiful spaces to host workshops which induces creativity and adds more value to
		// 						the entire experience{' '}
		// 					</Box>
		// 				</Grid>
		// 				<Grid
		// 					item
		// 					xs={4}
		// 					display='flex'
		// 					flexDirection='column'
		// 					gap={2}
		// 					alignItems='center'
		// 					justifyContent='space-evenly'
		// 					paddingY={'3vh'}
		// 					component={motion.div}
		// 					initial={{ translateY: '-20px', opacity: '0' }}
		// 					whileInView={{ translateY: '0px', opacity: '1' }}
		// 					viewport={{ once: true }}
		// 					transition={{
		// 						delay: 0.2,
		// 						x: { duration: 0.5 },
		// 					}}
		// 				>
		// 					<Box
		// 						display='flex'
		// 						justifyContent='center'
		// 						alignItems='center'
		// 						minWidth='288px'
		// 						width='288px'
		// 						sx={{
		// 							background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
		// 							aspectRatio: '1',
		// 							borderRadius: '50%',
		// 						}}
		// 					>
		// 						<img src='/assets/images/page/more3.svg' alt='' />
		// 					</Box>
		// 					<Box className='how__header'>Solo Dates</Box>
		// 					<Box className='how__p' width={{ xl: '60%' }} textAlign='center'>
		// 						Doing anything you like peacefully, while having your favourite food as & when you
		// 						like.{' '}
		// 					</Box>
		// 				</Grid>
		// 			</Grid>
		// 		</Box>
		// 	</Box>
		// </Box>

		<Box position='relative' className='why' height={{ md: '694px', xs: '1800px' }}>
			<Box
				sx={{
					background:
						'linear-gradient(180deg, rgba(244, 207, 151, 0.2) 73.35%, rgba(244, 207, 151, 0.008) 100%)',
					// borderRadius: '135px 0px 119px',
					padding: '75px 0',
				}}
				className='why__header'
				height={{ md: '499px', xs: '1052px' }}
				borderRadius={{ sm: '135px 0px 119px', xs: '50px 0px 50px' }}
			>
				<h2
					style={{
						fontWeight: '600',
						fontSize: '2.25rem',
						lineHeight: '44px',
						margin: '0 auto',
						width: '80%',
					}}
				>
					More than just a dining space!
				</h2>
				<Box
					sx={{
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: '300',
						fontSize: '18px',
						lineHeight: '25px',
						margin: '0 auto',
						width: '80%',
					}}
					marginTop={{
						xl: '5px',
						md: '5px',
						sm: '10px',
						xs: '10px',
					}}
					textAlign={{
						xl: 'left',
						md: 'left',
						sm: 'center',
						xs: 'center',
					}}
				>
					Our Beautiful Thinnai spaces are used for many creative works.
				</Box>
			</Box>
			<Box
				position='relative'
				height={{ md: '347px', xs: '875px' }}
				borderRadius={{ sm: '135px 0px 119px', xs: '50px 0px 50px' }}
				sx={{
					background: '#F4CF97',
					bottom: '152px',
					zIndex: '2',
					width: '100%',
				}}
			>
				<Box position='relative' height='100%' width={{ xs: '88%' }} margin='auto'>
					<Grid
						// ref={myRef}
						container
						height='100%'
						position='relative'
						direction={{ xs: 'column', md: 'row' }}
						flexWrap='nowrap'
						top={{ md: '-41.5%', xs: '-74.2%' }}
						gap={{ md: '0', xs: 8 }}
						justifyContent={{ md: 'space-between' }}
					>
						<CssBaseline />
						<Grid
							item
							xl={4}
							display='flex'
							flexDirection='column'
							gap={2}
							alignItems='center'
							justifyContent='space-evenly'
							margin={{ xs: 'auto', md: '' }}
						>
							<Box
								display='flex'
								position='relative'
								justifyContent='center'
								alignItems='center'
								width='288px'
								sx={{
									':hover img': {
										transform: { xs: 'scale(0.7)', md: 'scale(1.3)' },
									},
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
								component={motion.div}
								initial={{ translateY: '-20px', opacity: '0' }}
								whileInView={{ translateY: '0px', opacity: '1' }}
								viewport={{ once: true }}
							>
								<img
									style={{ zIndex: '1'}}
									src='/assets/images/page/more1.svg'
									alt=''
								/>
								<img
									style={{ position: 'absolute', left: '70%', top: '42%' }}
									src='/assets/images/page/tree.svg'
									alt=''
								/>
							</Box>
							<Box className='how__header xs_header'>Meetings & Remote work</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								Private & Inspiring work spaces curated for productive work sessions and meetings.
							</Box>
						</Grid>
						<Grid
							item
							xl={4}
							display='flex'
							flexDirection='column'
							gap={2}
							alignItems='center'
							justifyContent='space-evenly'
							margin={{ xs: 'auto', md: '' }}
						>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								width='288px'
								sx={{
									':hover img': {
										transform: { xs: 'scale(0.7)', md: 'scale(1.3)' },
									},
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
								component={motion.div}
								initial={{ translateY: '-20px', opacity: '0' }}
								whileInView={{ translateY: '0px', opacity: '1' }}
								viewport={{ once: true }}
							>
								<img src='/assets/images/page/more2.svg' alt='' />
							</Box>
							<Box className='how__header xs_header'>Host Workshops</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								Beautiful spaces to host workshops which induces creativity and adds more value to
								the entire experience{' '}
							</Box>
						</Grid>
						<Grid
							item
							xl={4}
							display='flex'
							flexDirection='column'
							gap={2}
							alignItems='center'
							justifyContent='space-evenly'
							margin={{ xs: 'auto', md: '' }}
						>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								width='288px'
								sx={{
									':hover img': {
										transform: { xs: 'scale(0.7)', md: 'scale(1.3)' },
									},
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
								component={motion.div}
								initial={{ translateY: '-20px', opacity: '0' }}
								whileInView={{ translateY: '0px', opacity: '1' }}
								viewport={{ once: true }}
							>
								<motion.img
									style={{ transition: '0.5s' }}
									whileInView={{ opacity: '1' }}
									initial={{ opacity: '0' }}
									src='/assets/images/page/more3.svg'
									alt=''
								/>
							</Box>
							<Box className='how__header xs_header'>Solo Dates</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								Doing anything you like peacefully, while having your favourite food as & when you
								like.
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default More;
