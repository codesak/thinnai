import { Box, Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCancelledBookings } from '../../../actions/booking';
import { RootState } from '../../../store';
import CancelledCard from '../../elements/BookingTracking/SummaryCards/CancelledCard';
import Loading from '../../elements/Loading/Loading';
import style from '../../styles/BookingTracking/confirmed.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';

const Cancelled = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadCancelledBookings());
	}, []);

	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const cancelledBookings = useSelector<RootState, any>(state => state.booking.confirmed);
	const [showDetails, setShowDetails] = useState(false);
	const booking = useSelector<RootState, Object>(state => state.booking.booking);
	if (bookingLoading === false && Object.keys(booking).length === 0 && showDetails) {
		navigate(ROUTES.CONFIRMED);
	}

	return (
		<>
			{bookingLoading && (
				<Box
					sx={{
						heigh: '50%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						width={{
							md: '30%',
							sm: '40%',
							xs: '60%',
						}}
					>
						<Loading />
					</Box>
				</Box>
			)}
			{!bookingLoading &&
				!showDetails &&
				(cancelledBookings && cancelledBookings.length > 0 ? (
					<Box className={style.mainContainer}>
							<h5 className={style.title}>Cancelled Bookings</h5>
						{cancelledBookings?.map((item: any, index: number) => (
							<CancelledCard key={index} index={index} item={item} color={colors[index]} />
						))}
					</Box>
				) : (
					<Box
						display='flex'
						justifyContent='center'
						flexDirection='column'
						alignItems='center'
						height='70vh'
					>
						<Box>
							<Box width='50%' margin='auto'>
								<img width='100%' src='/assets/images/confirmed/no-booking.svg' alt='' />
							</Box>
						</Box>
						<Typography
							fontFamily='Montserrat'
							fontSize={{
								md: '3.5rem',
								xs: '2.5rem',
							}}
							lineHeight='1.4em'
							fontWeight={700}
							letterSpacing='0.015em'
							color='#272F3D'
							textAlign='center'
						>
							No Bookings
						</Typography>
						<Typography
							fontFamily='Open Sans'
							fontSize={{
								md: '1.875rem',
								xs: '1rem',
							}}
							lineHeight='1.4em'
							fontWeight={400}
							color='#50555C'
							textAlign='center'
						>
							Currently, no bookings initiated. Go to{' '}
							<Link
								style={{
									textDecoration: 'none',
									fontWeight: 700,
									color: '#8F7EF3',
								}}
								to='/'
							>
								home page.
							</Link>
						</Typography>
					</Box>
				))}
			{/* {!bookingLoading && showDetails && Object.keys(booking).length && (
				<BookingDetails
					bookingDetailLevel={BOOKING_DETAIL_LEVEL.CONFIRMED}
					booking={booking}
					bookingDate={bookingDate}
					isMyBooking={true}
				/>
			)} */}
		</>
	);
};

export default Cancelled;

const colors = [
	{
		bgColor: '#F7F5FF',
		color: '#8F7EF3',
	},
	{
		bgColor: '#F2F0DF',
		color: '#E08600',
	},
	{
		bgColor: '#F7F5FF',
		color: '#8F7EF3',
	},
];
