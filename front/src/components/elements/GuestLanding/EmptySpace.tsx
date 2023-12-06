import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

const EmptySpace = () => {
	return (
		<Box>
			<CssBaseline />
			<Box>
				<Box display='flex' position='relative' width={{ md: '100%', xs: '90%' }} margin='0 auto'>
					<Box display={{ md: 'flex', xs: 'none' }} width='100%'>
						<img
							className='emptySpaces__dashed'
							style={{ margin: 'auto', width: '69.5%' }}
							src='/assets/images/page/Vector_13.svg'
							alt=''
						/>
						<img
							className='emptySpaces__dashed'
							style={{
								position: 'absolute',
								right: '10.2%',
								top: '30.25%',
								width: '5.15%',
							}}
							src='/assets/images/page/Vector_14.svg'
							alt=''
						/>
					</Box>
					<Box
						position={{ md: 'absolute', xs: 'relative' }}
						width='100%'
						height={{ md: '100%', xs: '200px' }}
						textAlign='center'
						margin='auto'
						fontSize={{ md: '3.375rem', sm: '2.5rem', xs: '1.875rem' }}
						lineHeight='1.5em'
						sx={{
							fontWeight: '700',
							textTransform: 'uppercase',
						}}
						border={{ md: 'none', xs: '1px dashed #000000' }}
						borderRadius={{ md: 'none', xs: '8px' }}
					>
						<Box position='relative' top={{ lg: '86px', xs: '40px' }}>
							Do you have an <br />
							<span
								data-text='EMPTY SPACE ?'
								className='emptySpace__stroke-correction'
								style={{
									WebkitTextStroke: '3px #000000',
									color: 'white',
									position: 'relative',
								}}
							>
								empty space ?
							</span>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box height={{ md: '0px', xs: 35 }} />
			<Box position='relative' height={{ md: 'auto', xs: '700px' }}>
				<Grid
					container
					direction={{ md: 'row', xs: 'column' }}
					className='emptySpace__grid__cont'
					wrap='nowrap'
					margin='auto'
					width='73%'
					height={{ md: '354px', xs: 'auto' }}
					position='relative'
					paddingLeft={{ xl: '1.75rem', lg: '1.25rem', md: '1.25rem', xs: '0px' }}
				>
					<Grid
						item
						display='flex'
						width={{ md: '100%', xs: '100%' }}
						height='354px'
						justifyContent='center'
						alignItems='center'
						md={4}
						position='relative'
						maxWidth={{ md: '33.333% !important', xs: 'none' }}
						top={{ xs: '-50px', md: '0px' }}
					>
						<img
							className='emptySpace__imgs'
							style={{ position: 'absolute' }}
							src='/assets/images/page/Vector_10.svg'
							alt=''
						/>
						<img
							className='emptySpace__img__res emptySpace__back__img1'
							src='/assets/images/page/Vector_17.svg'
							alt=''
						/>
						<Box
							width='100%'
							height='354px'
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute', left: '0px', top: '0px' }}
						>
							<Box
								className='emptySpace-steps'
								textAlign='center'
								position='relative'
								bottom='10px'
							>
								Add joy to your life <br /> and others
							</Box>
							<img
								className='emptySpace__img__avtar1'
								style={{ padding: '0 0 1.25rem 1.563rem', width: '40%' }}
								src='/assets/images/page/emptySpace1.svg'
								alt=''
							/>
						</Box>
					</Grid>
					<Grid
						item
						display='flex'
						flexDirection='column'
						width='100%'
						height='354px'
						paddingLeft={{ md: '0px', xs: '1.563rem' }}
						justifyContent='flex-end'
						alignItems='center'
						md={4}
						position='relative'
						maxWidth={{ md: '33.333% !important', xs: 'none' }}
						top={{ xs: '-228px', md: '0px' }}
						left={{ xs: '-38px', md: '12px' }}
						className='emptySpace__grid2'
					>
						<img
							className='emptySpace__imgs emptySpace__background__img2'
							style={{ height: '423px', position: 'absolute' }}
							src='/assets/images/page/Vector_7.svg'
							alt=''
						/>
						<img
							className='emptySpace__img__res emptySpace__back__img2'
							src='/assets/images/page/Vector_17.svg'
							alt=''
						/>
						<Box
							width='100%'
							height='354px'
							paddingLeft={{ xl: '1.563rem' }}
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute' }}
							left={{ md: '0px', xs: '28px' }}
							top={{ md: '0px', xs: '28px' }}
						>
							<img
								className='emptySpace__img__avtar2'
								style={{ paddingLeft: '0px', width: '70%' }}
								src='/assets/images/page/emptySpace2.svg'
								alt=''
							/>
							<Box className='emptySpace-steps' position='relative' top='22px'>
								Additional Income Source
							</Box>
						</Box>
					</Grid>
					<Grid
						item
						display={{ md: 'flex', xs: 'none' }}
						width='100%'
						height='354px'
						justifyContent='center'
						alignItems='center'
						md={4}
						position='relative'
						maxWidth={{ md: '33.333% !important', xs: 'none' }}
					>
						<img
							style={{ width: '130%', position: 'absolute' }}
							src='/assets/images/page/Vector_9.svg'
							alt=''
						/>
						<Box
							width='100%'
							height='354px'
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute', left: '0px', top: '0px' }}
						>
							<img
								style={{ padding: '2.188rem 0 0 1.563rem', width: '70%' }}
								src='/assets/images/page/emptySpace3.svg'
								alt=''
							/>
							<Box className='emptySpace-steps' position='relative' top='13px'>
								Meet Interesting People
							</Box>
						</Box>
					</Grid>
					<Grid
						item
						display={{ md: 'none', xs: 'flex' }}
						width='100%'
						height='354px'
						justifyContent='center'
						alignItems='center'
						md={4}
						position='relative'
						top={{ xs: '-302px', md: '0px' }}
					>
						<img src='/assets/images/page/Vector_16.svg' alt='' />
						<Box
							width='100%'
							height='354px'
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute', left: '0px', top: '-20px' }}
						>
							<img style={{ padding: '0px' }} src='/assets/images/page/emptySpace4.svg' alt='' />
							<Box className='emptySpace-steps' position='relative' top='1px'>
								Meet Interesting People
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box display='flex' justifyContent='center'>
				<Button
					variant='contained'
					sx={{
						background: '#1A191E',
						fontFamily: 'Montserrat',
						fontStyle: 'normal',
						fontWeight: '400',
						fontSize: '1.25rem',
						lineHeight: '24px',
						textTransform: 'capitalize',
						margin: 'auto',
						padding: '0.813rem 3.75rem',
						textAlign: 'center',
					}}
				>
					Request a Call
				</Button>
			</Box>
		</Box>
	);
};

export default EmptySpace;
