import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();
	return (
		<Box
			display='flex'
			flexDirection='column'
			paddingY={{
				xl: 0,
				md: 0,
				sm: 5,
				xs: 5,
			}}
		>
			<Box
				height={'0.5px'}
				width='98%'
				marginX='auto'
				marginBottom={{
					xl: 0,
					md: 0,
					sm: 12,
					xs: 12,
				}}
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
					alignItems='center'
					gap={{ md: 2, xs: 1 }}
					lineHeight='1.4em'
					fontSize='1.188rem'
				>
					<Box>© Thinnai Experiences </Box>
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
					<Box sx={{cursor:'pointer'}} onClick={()=>navigate('/policy/privacy-policy')}>Privacy Policy</Box>
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
					<Box sx={{cursor:'pointer'}} onClick={()=>navigate('/policy/guest-terms-of-use')}>Terms and Conditions</Box>
				</Box>
				<Box
					display='flex'
					gap={{ md: 3, xs: 3, sm: 4 }}
					alignItems='center'
					flexDirection={{
						xl: 'row',
						md: 'row',
						sm: 'column',
						xs: 'column',
					}}
					paddingY={{
						xl: 0,
						md: 0,
						sm: 2,
						xs: 2,
					}}
				>
					<Box lineHeight='1.5em' fontSize='1.188rem'>
						Follow us on:
					</Box>
					<Box
						display='flex'
						gap={{ md: 2, xs: 2 }}
						alignItems='center'
						justifyContent={{
							xl: 'flex-end',
							md: 'flex-end',
							sm: 'center',
							xs: 'center',
						}}
					>
						<Box display='flex' alignItems='center' height={{ md: '80px', xs: '30px' }}>
							<a href='https://www.instagram.com/bookmythinnai' target='_blank' rel='noreferrer'>
								<img
									style={{ objectFit: 'contain', height: '100%' }}
									src='/assets/images/Page/insta.svg'
									alt=''
								/>
							</a>
						</Box>
						<Box display='flex' alignItems='center' height={{ md: '40px', xs: '30px' }}>
							<a href='https://www.linkedin.com/company/thinnai/' target='_blank' rel='noreferrer'>
								<img
									style={{ objectFit: 'contain', height: '100%' }}
									src='/assets/images/Page/linkedin.svg'
									alt=''
								/>
							</a>
						</Box>
						<Box display='flex' alignItems='center' height={{ md: '40px', xs: '30px' }}>
							<a href='https://www.facebook.com/thinnai.social' target='_blank' rel='noreferrer'>
								<img
									style={{ objectFit: 'contain', height: '100%' }}
									src='/assets/images/Page/facebook.svg'
									alt=''
								/>
							</a>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;
