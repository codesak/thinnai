import { setAlert } from '../../actions/alert';
import { addMeToBooking, loadBooking } from '../../actions/booking';
import { RootState } from '../../store';
import { ALERT_TYPE, AuthButtonTheme, SHOW_ONLY_DESKTOP } from '../../utils/consts';
import { ROUTES } from '../../utils/routing/routes';
import RegistrationNavbar from '../elements/GuestAuth/subElements/RegistrationNavbar';
import Loading from '../elements/Loading/Loading';
import '../styles/OtpAuth/otp.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CofnirmInvitedToBooking = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const booking = useSelector<RootState, any>(state => state.booking.booking);
	const userId = useSelector<RootState, any>(state => state.guestAuth.user._id);
	const loading = useSelector<RootState, Object>(state => state.booking.loading);
	const { bookingId } = useParams<{ bookingId: string }>();

	const addToBooking = () => {
		if (bookingId) {
			dispatch(
				addMeToBooking({ bookingId, navigate: () => navigate(`${ROUTES.INVITED_TO}/${bookingId}`) })
			);
		}
	};

	const rejectBooking = () => {
		dispatch(setAlert('Not added to this booking', ALERT_TYPE.SUCCESS));
		navigate(ROUTES.EXPLORE);
	};

	useEffect(() => {
		if (bookingId) {
			dispatch(loadBooking(bookingId));
		}
	}, []);

	useEffect(() => {
		if (booking && Object.keys(booking).length !== 0) {
			const indexOfUnregistered = booking.invitedGuests.findIndex(
				(invited: any) => invited.guest.user._id === userId
			);
			if (booking.guest._id === userId) {
				navigate(ROUTES.CONFIRMED);
			} else if (indexOfUnregistered !== -1) {
				navigate(`${ROUTES.INVITED_TO}/${bookingId}`);
			}
		}
	}, [booking]);

	if (loading || Object.keys(booking).length === 0) {
		return <Loading />;
	}

	const guestName = booking?.guest?.firstName;

	return (
		<Grid container component='main' sx={{ height: '100vh' }} className='otp'>
			<RegistrationNavbar />
			<CssBaseline />
			<Grid
				display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
				item
				xs={false}
				sm={false}
				md={5.5}
				sx={{
					backgroundImage: "url('/assets/images/otp/otp.svg')",
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: '100vh',
				}}
			/>
			<Grid
				item
				xs={12}
				sm={12}
				md={6.5}
				style={{
					position: 'relative',
					maxHeight: '100vh',
					overflowX: 'hidden',
					overflowY: 'scroll',
				}}
			>
				<Grid container>
					<Grid item xs={false} sm={false} md={1}></Grid>
					<Grid item xs={12} sm={12} md={11} position='relative'>
						<Box
							display={SHOW_ONLY_DESKTOP}
							position='fixed'
							//top='0'
							width='100%'
							height={100}
							zIndex='2'
							sx={{ background: 'white' }}
						/>
						<Grid container direction='column' rowGap={{ xs: '18px', md: '0.5rem', sm: '1.25rem' }}>
							<Grid item md={4} xs={4}>
								<Box height={{ xs: 90, md: 130 }} />
								<Box height={{ md: '60px', sm: '90px', xs: '60px' }} />
								<Box className='center'>
									<Box
										paddingLeft={{ md: '0px', sm: '3.75rem', xs: '1.5rem' }}
										fontSize={{ sm: '2.5rem', md: '2.5rem', xs: '1.75rem' }}
										sx={{
											fontFamily: "'Montserrat', sans-serif",
											fontStyle: 'normal',
											fontWeight: '700',
											lineHeight: '34px',
											color: '#1A191E',
										}}
									>
										Are you {guestName}'s Guest?
									</Box>
								</Box>
							</Grid>
							<Box height={{ xs: 90, md: 130 }} />
							<Grid item md={4} xs={4}>
								<Box className='center'>
									<Box
										fontFamily='Montserrat'
										fontStyle='normal'
										color='#272F3D'
										fontWeight='700'
										fontSize='2.2rem'
										lineHeight='1.4em'
										textAlign='center'
										zIndex='2'
									>
										This is booking link of {guestName}, and if you select ‘yes’, you’ll be added as
										guest in {guestName}'s list
									</Box>
								</Box>
							</Grid>
							<Box height={{ md: 30, xs: 50 }} />
							<Grid item md={4} xs={4}>
								<Box height={50} />
								<Box className='center'>
									<Box width='40%' height='46px'>
										<ThemeProvider theme={AuthButtonTheme('black', 'white')}>
											<Button
												fullWidth
												type='submit'
												variant='contained'
												sx={{
													textTransform: 'none',
													fontFamily: 'Open Sans',
													fontWeight: 600,
													fontSize: '1rem',
												}}
												onClick={addToBooking}
											>
												Yes, Add Me
											</Button>
										</ThemeProvider>
									</Box>
									<Box width='5%' />
									<Box width='40%' height='46px'>
										<ThemeProvider theme={AuthButtonTheme('white', 'black')}>
											<Button
												fullWidth
												type='submit'
												variant='contained'
												sx={{
													textTransform: 'none',
													fontFamily: 'Open Sans',
													fontWeight: 600,
													fontSize: '1rem',
												}}
												onClick={rejectBooking}
											>
												No I'm not
											</Button>
										</ThemeProvider>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CofnirmInvitedToBooking;
