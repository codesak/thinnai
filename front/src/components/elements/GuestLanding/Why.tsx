import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

const Why = () => {
	return (
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
					Why Thinnai?
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
						md: '14px',
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
					Of many things, here’s the what you’d love the most.
				</Box>
			</Box>
			<Box
				position='relative'
				height={{ md: '347px', xs: '820px' }}
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
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
							>
								<img
									className='why_image'
									style={{ zIndex: '1', transition: '0.5s' }}
									src='/assets/images/page/why1.svg'
									alt=''
								/>
								<img
									className='why_image'
									style={{ position: 'absolute', left: '70%', top: '42%', transition: '0.5s' }}
									src='/assets/images/page/tree.svg'
									alt=''
								/>
							</Box>
							<Box className='how__header xs_header'>Affordable private dining</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								A space for two is more affordable than the coffee for two at a Cafe.
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
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
							>
								<img
									style={{ transition: '0.5s' }}
									className='why_image'
									src='/assets/images/page/why2.svg'
									alt=''
								/>
							</Box>
							<Box className='how__header xs_header'>Freedom of Choice</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								Order your favourite food & Drinks from any Outlet in the area.
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
									background: 'linear-gradient(180deg, #faedd8 50%, #eba847 50%)',
									aspectRatio: '1',
									borderRadius: '50%',
								}}
							>
								<img
									style={{ transition: '0.5s' }}
									className='why_image'
									src='/assets/images/page/why3.svg'
									alt=''
								/>
							</Box>
							<Box className='how__header xs_header'>Personalised Experience</Box>
							<Box className='why__p' width={{ xl: '60%' }} textAlign='center'>
								Your Choice of Ambience, Food, Drinks and music only at Thinnai.
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default Why;
