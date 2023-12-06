import { Box, Button, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
const CustomerSupport = (hide?:any) => {
	const user = useSelector<RootState, any>((state:any) => state.guestAuth.user)
  const token = localStorage.getItem('token')
  let url:any = null;
  if(token) {
    url = `https://wa.me/+919677790546?text=Hi%20there!%20I'm%20${user.firstName} ${user.lastName}.%20My%20User%20Id%20is%20${user.phone}.%20I’m%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`
  } else {
    url = "https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20"
  }
	const handleClick = () => {
		window.open(url, "_blank");
	}
	return (
		<>
			{/* <Button
				sx={{
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0.5rem',
					display: 'flex',
					borderRadius: '5px',
					cursor: 'pointer',
					transition: '0.3s',
					textTransform: 'none',
					':hover': {
						background: '#f7f5ffad',
					},
				}}
			>
				<Box
					display='flex'
					alignItems='center'
					gap={{
						md: '1rem',
						sm: '0.396rem',
						xs: '0.396rem',
					}}
				>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						width={{
							xs: '40px',
						}}
					>
						<img width='100%' src='/assets/images/profile/personal-info.svg' alt='' />
					</Box>
					<Typography
						fontFamily='Montserrat'
						textAlign='center'
						fontSize='1rem'
						fontWeight={600}
						color='#272F3D'
					>
						Check Breakdown
					</Typography>
				</Box>
				<Box
					fontWeight='700'
					fontSize='1.25rem'
					sx={{
						transform: 'rotate(180deg)',
					}}
				>
					<img src='/assets/images/detail/arrowBack.svg' alt='' />
				</Box>
			</Button> */}
			{/* <Box marginY='1.5rem'>
				<Divider sx={{ borderColor: 'rgba(196, 196, 196, 0.5)', borderBottomWidth: '0.5px' }} />
			</Box> */}
			<Button
				sx={{
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0rem',
					display: 'flex',
					borderRadius: '5px',
					cursor: 'pointer',
					transition: '0.3s',
					textTransform: 'none',
					':hover': {
						background: '#f7f5ffad',
					},
				}}
				onClick={handleClick}
			>
				<Box
					display='flex'
					alignItems='center'
					gap={{
						md: '1rem',
						sm: '0.396rem',
						xs: '0.396rem',
					}}
				>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						width={{
							xs: '40px',
						}}
					>
						<img width='100%' src='/assets/images/share/whatsapp.svg' alt='' />
					</Box>
					<Typography
						fontFamily='Montserrat'
						textAlign='center'
						fontSize='1.4rem'
						fontWeight={600}
						color='#272F3D'
					>
						Chat Support
					</Typography>
				</Box>
				<Box
					fontWeight='700'
					fontSize='1.25rem'
					sx={{
						transform: 'rotate(180deg)',
					}}
				>
					<img src='/assets/images/detail/arrowBack.svg' alt='' />
				</Box>
			</Button>
		</>
	);
};

export default CustomerSupport;
