import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { S3_BASE } from '../../../utils/consts';
import { ROUTES } from '../../../utils/routing/routes';
import { useEffect } from 'react';
import { loadUser } from '../../../actions/guestAuth';

const PersonalInfo = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector<RootState, any>(state => state.guestAuth.user);
	const profile = useSelector<RootState, any>(state => state.profile.userData);
	useEffect(()=>{
		dispatch(loadUser({}))
	  },[])

	return (
		<Box>
			<Box
				sx={{
					background: '#000000',
					minHeight: '35vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Back Button */}
				<Box position='absolute' left={10} top={10}>
					<Button
						onClick={() => navigate(-1)}
						sx={{
							textTransform: 'none',
							color: '#f1f1f1f1',
						}}
					>
						{' '}
						<ArrowBackIosNewIcon
							sx={{
								fontSize: '1.1rem',
								paddingRight: '0.3rem',
							}}
						/>{' '}
						Back
					</Button>
				</Box>
				{/* Right Circle */}
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'block' }}
					width={{ xs: '172px', md: '30vw', sm: '' }}
					top={{ xs: '-82.86px', md: '-17vw', sm: '' }}
					right={{ xs: '-82.86px', md: '0', sm: '' }}
					border='1px solid #EECBBC'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'block' }}
					width={{ xs: '203px', md: '27vw', sm: '' }}
					top={{ xs: '-80px', md: '-16vw', sm: '' }}
					right={{ xs: '-80px', md: '0', sm: '' }}
					border='1px solid #EECBBC'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'block' }}
					width={{ xs: '230px', md: '24vw', sm: '' }}
					top={{ xs: '-82px', md: '-16vw', sm: '' }}
					right={{ xs: '-82px', md: '0', sm: '' }}
					border='3px solid rgba(238, 203, 188, 0.2)'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'block' }}
					width={{ xs: '253px', md: '21vw', sm: '' }}
					top={{ xs: '-80px', md: '-16vw', sm: '' }}
					right={{ xs: '-80px', md: '0', sm: '' }}
					border='1px solid rgba(238, 203, 188, 0.93)'
				/>

				{/* Left circle */}
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'none', sm: 'block' }}
					width={{ xs: '172px', md: '30vw', sm: '' }}
					bottom={{ xs: '-82.86px', md: '-17vw', sm: '' }}
					left={{ xs: '-82.86px', md: '-5vw', sm: '' }}
					border='1px solid #EECBBC'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'none', sm: 'block' }}
					width={{ xs: '203px', md: '27vw', sm: '' }}
					bottom={{ xs: '-80px', md: '-16vw', sm: '' }}
					left={{ xs: '-80px', md: '-5vw', sm: '' }}
					border='1px solid #EECBBC'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'none', sm: 'block' }}
					width={{ xs: '230px', md: '24vw', sm: '' }}
					bottom={{ xs: '-82px', md: '-16vw', sm: '' }}
					left={{ xs: '-82px', md: '-5vw', sm: '' }}
					border='3px solid rgba(238, 203, 188, 0.2)'
				/>
				<Box
					className='circle'
					zIndex='0'
					display={{ xs: 'none', sm: 'block' }}
					width={{ xs: '253px', md: '21vw', sm: '' }}
					bottom={{ xs: '-80px', md: '-16vw', sm: '' }}
					left={{ xs: '-80px', md: '-5vw', sm: '' }}
					border='1px solid rgba(238, 203, 188, 0.93)'
				/>

				<Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						width={{
							xl: '8rem',
							md: '8rem',
							sm: '6rem',
							xs: '6rem',
						}}
						height={{
							xl: '8rem',
							md: '8rem',
							sm: '6rem',
							xs: '6rem',
						}}
						borderRadius='50%'
						overflow='hidden'
					>
						<img
							width='100%'
							height='100%'
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							src={user.profileImage ? S3_BASE + user.profileImage : user.avatar}
							alt=''
						/>
					</Box>
					{/* <Button
						sx={{
							textTransform: 'none',
							color: 'white',
							fontSize: '1.2vw',
							fontFamily: 'Montserrat',
							textDecoration: 'underline',
						}}
					>
						Edit
					</Button> */}
				</Box>
			</Box>
			<Box
				margin={{
					xl: '0px 3.75rem',
					md: '0px 3.75rem',
					sm: '0px 1.875rem',
					xs: '0px 1.875rem',
				}}
			>
				<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
					<Box marginBottom='0.938rem'>
						<Typography marginY='3.75rem' fontFamily='Montserrat' fontSize='2rem'>
							Personal Information
						</Typography>
					</Box>
					{/* <Button
						sx={{
							textDecoration: 'underline',
							fontSize: '1.5rem',
							fontFamily: 'Montserrat',
							textTransform: 'none',
							color: '#000000',
						}}
						onClick={() => navigate(ROUTES.GUEST_MANAGE_PROFILE)}
					>
						Edit
					</Button> */}
				</Box>
				<Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Legal Name
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{user.fullName}
							</Typography>
						</Box>
					</Box>
					<Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					{/* <Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Gender
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{profile.gender}
							</Typography>
						</Box>
					</Box> */}
					{/* <Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Date of birth
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{new Date(profile.dateOfBirth).toLocaleDateString('default', {
									day: 'numeric',
									month: 'numeric',
									year: 'numeric',
								})}
							</Typography>
						</Box>
					</Box>
					<Box marginBottom='0.938rem'>
						<Divider />
					</Box> */}
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Email Id
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{user.email}
							</Typography>
						</Box>
					</Box>
					<Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Phone Number
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{user.phone}
							</Typography>
						</Box>
					</Box>
					{/* <Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Government Id
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{profile.idProofNumber ? profile.idProofNumber : 'Not Provided'}
							</Typography>
						</Box>
					</Box>
					<Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Address
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{profile.address ? profile.address : 'Not Provided'}
							</Typography>
						</Box>
					</Box> */}
					{/* <Box marginBottom='0.938rem'>
						<Divider />
					</Box>
					<Box display='flex' justifyContent='space-between' alignItems='center' marginX={1}>
						<Box marginBottom='0.938rem'>
							<Typography fontFamily='Montserrat' fontSize='1.5rem' fontWeight='400'>
								Emergency Contact
							</Typography>
							<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
								{profile.emergencyContact ? profile.emergencyContact : 'Not Provided'}
							</Typography>
						</Box>
					</Box> */}
					{/* <Box marginBottom='0.938rem'>
						<Divider />
					</Box> */}
					<Box height={38}/>
				</Box>
			</Box>
		</Box>
	);
};

export default PersonalInfo;
