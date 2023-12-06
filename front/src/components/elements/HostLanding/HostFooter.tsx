import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';

const HostFooter = ({ caller }: { caller: string }) => {
	const navigate = useNavigate();
	return (
		<Box
			position='relative'
			paddingBottom={{
				md: 0,
				xs: '2rem',
			}}
		>
			<Box display='flex' flexDirection='column'>
				<Box
					height={{
						xl: '0.5px',
						md: '0.5px',
						sm: '0px',
						xs: '0px',
					}}
					width='98%'
					margin='0px auto'
					sx={{ background: 'black' }}
				/>
				<Box
					display='flex'
					justifyContent={{ md: 'space-between', xs: 'center' }}
					gap={{ md: 0, xs: 1 }}
					padding='0px 5%'
					height={80}
					flexDirection={{ md: 'row', xs: 'column' }}
					fontSize={{ md: '1.031rem', xs: '0.688rem' }}
					sx={{
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: '400',
						lineHeight: '26px',
						color: '#000000',
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
						alignItems={{
							xl: 'center',
							md: 'center',
							sm: 'flex-start',
							xs: 'flex-start',
						}}
						gap={{ md: 2, sm: '2px', xs: '2px' }}
					>
						<Box
							margin={{
								sm: 'auto',
								xs: 'auto',
							}}
						>
							<Box
								marginBottom={{
									xl: '0px',
									md: '0px',
									sm: '3.75rem',
									xs: '3.75rem',
								}}
							>
								{' '}
								© Thinnai Experiences
							</Box>
						</Box>
						<Box
							display={{
								xl: 'block',
								md: 'block',
								sm: 'none',
								xs: 'none',
							}}
							height='3px'
							width='3px'
							borderRadius='50%'
							sx={{ background: 'black' }}
						/>
						<div onClick={() => navigate(ROUTES.POLICY_BASE + '/privacy-policy')}>
							<Box
								style={{
									cursor: 'pointer',
								}}
							>
								Privacy Policy
							</Box>
						</div>
						<Box
							display={{
								xl: 'block',
								md: 'block',
								sm: 'none',
								xs: 'none',
							}}
							height='3px'
							width='3px'
							borderRadius='50%'
							sx={{ background: 'black' }}
						/>
						<div
							onClick={() =>
								caller == 'Host'
									? navigate(ROUTES.POLICY_BASE + '/guest-terms-of-use')
									: navigate(ROUTES.POLICY_BASE + '/host-terms-of-use')
							}
						>
							<Box
								style={{
									cursor: 'pointer',
								}}
							>
								Terms of Use
							</Box>
						</div>
						<Box
							display={{
								xl: 'block',
								md: 'block',
								sm: 'none',
								xs: 'none',
							}}
							height='3px'
							width='3px'
							borderRadius='50%'
							sx={{ background: 'black' }}
						/>
						<div
							onClick={() => navigate(ROUTES.POLICY_BASE + '/updation-cancellation-and-reschedule')}
						>
							<Box
								style={{
									cursor: 'pointer',
								}}
							>
								Booking Updation Policy
							</Box>
						</div>
					</Box>
					<Box display='flex' gap={{ md: 3, xs: '0.813rem', sm: '0.813rem' }} alignItems='center'>
						<Box>Follow us on: </Box>
						<Box display='flex' gap={{ md: 2, xs: 1 }} alignItems='center'>
							{/* <Box
								display='flex'
								alignItems='center'
								height={{ md: '40px', xs: '30px' }}
								width={{
									xl: '2.5rem',
									md: '2.5rem',
									sm: '1.8rem',
									xs: '1.8rem',
								}}
							>
								<a href='https://www.instagram.com/bookmythinnai' target='_blank' rel='noreferrer'>
									<img
										style={{ width: '100%', objectFit: 'contain', height: '100%' }}
										src='/assets/images/page/instagram.svg'
										alt=''
									/>
								</a>
							</Box> */}
							<Box display='flex' alignItems='center' height={{ md: '80px', xs: '30px' }}>
							<a href='https://www.instagram.com/bookmythinnai' target='_blank' rel='noreferrer'>
								<img
									style={{ objectFit: 'contain', height: '100%' }}
									src='/assets/images/page/insta.svg'
									alt=''
								/>
							</a>
						</Box>
							<Box
								display='flex'
								alignItems='center'
								height={{ md: '40px', xs: '30px' }}
								width={{
									xl: '2.5rem',
									md: '2.5rem',
									sm: '1.8rem',
									xs: '1.8rem',
								}}
							>
								<a
									href='https://www.linkedin.com/company/thinnai/'
									target='_blank'
									rel='noreferrer'
								>
									<img
										style={{ width: '100%', objectFit: 'contain', height: '100%' }}
										src='/assets/images/page/linkedin.svg'
										alt=''
									/>
								</a>
							</Box>
							<Box
								display='flex'
								alignItems='center'
								height={{ md: '40px', xs: '30px' }}
								width={{
									xl: '2.5rem',
									md: '2.5rem',
									sm: '1.8rem',
									xs: '1.8rem',
								}}
							>
								<a href='https://www.facebook.com/thinnai.social' target='_blank' rel='noreferrer'>
									<img
										style={{ width: '100%', objectFit: 'contain', height: '100%' }}
										src='/assets/images/page/facebook.svg'
										alt=''
									/>
								</a>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				display={{
					xl: 'none',
					md: 'none',
					sm: 'block',
					xs: 'block',
				}}
				position='absolute'
				right='10px'
				bottom='-40px'
				height='131px'
				width='113px'
			>
				<img height='100%' width='100%' src='/assets/images/page/host-community.png' alt='' />
			</Box>
		</Box>
	);
};

export default HostFooter;
