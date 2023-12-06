import { Box, Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { loadUnpaidBookings } from '../../../actions/booking';
import { RootState } from '../../../store';
import { BOOKING_DETAIL_LEVEL } from '../../../utils/consts';
import { BOOKING_VIEW_TYPE, ROUTES } from '../../../utils/routing/routes';
import BookingDetails from '../../elements/BookingTracking/BookingDetails';
import ConfirmedCard from '../../elements/BookingTracking/SummaryCards/ConfirmedCard';
import Loading from '../../elements/Loading/Loading';
import style from '../../styles/BookingTracking/confirmed.module.css'
import UnpaidCard from '../../elements/BookingTracking/SummaryCards/UnpaidCard';
import UnpaidBookingDetails from '../../elements/BookingTracking/UnpaidBookingDetails';

const Unpaid = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const navigate = useNavigate();
	const { viewType } = useParams<{ viewType: BOOKING_VIEW_TYPE }>();
	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const confirmedBookings = useSelector<RootState, any>(state => state.booking.unpaid);
	const booking = useSelector<RootState, Object>(state => state.booking.booking);
	const bookingDate = useSelector<RootState, Date>(state => state.search.bookingDate);
	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		dispatch(loadUnpaidBookings());
	}, [dispatch]);

	useEffect(() => {
		if (
			viewType === BOOKING_VIEW_TYPE.DETAILS ||
			viewType === BOOKING_VIEW_TYPE.EDIT ||
			viewType === BOOKING_VIEW_TYPE.RESCHEDULE
		) {
			setShowDetails(true);
		} else {
			setShowDetails(false);
		}
	}, [viewType]);

	if (bookingLoading === false && Object.keys(booking).length === 0 && showDetails) {
		navigate(ROUTES.UNPAID);
	}
	const todayBookings:any = confirmedBookings.filter((item:any)=> {
		const {bookingFrom,bookingTo} = item.requestData
		if(bookingFrom) {
			const presentDate = new Date();
			const bookingDate:any = new Date(bookingFrom);
			const bookingEnd:any = new Date(bookingTo)
			if(bookingDate.toDateString() === presentDate.toDateString() && bookingEnd.getTime() > presentDate.getTime())
			return item

		}
	})
	const otherBookings:any = confirmedBookings.filter((item:any)=> {
		const {bookingFrom,bookingTo} = item.requestData
		if(bookingFrom) {
			const presentDate = new Date();
			const bookingDate:any = new Date(bookingFrom);
			const bookingEnd:any = new Date(bookingTo)
			if(bookingDate.toDateString() !== presentDate.toDateString() && bookingEnd.getTime() > presentDate.getTime())
			return item
		}
	})
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
				(confirmedBookings && confirmedBookings.length > 0 ? (
					<Box className={style.mainContainer}>
						
						{
							todayBookings.length > 0 && <>
							{todayBookings?.map((item: any, index: number) => {
								return <UnpaidCard key={index} index={index} item={item} color={colors[index]} />
							})}	
							</>
							
						}
						
						{otherBookings?.map((item: any, index: number) => (
							<UnpaidCard key={index} index={index} item={item} color={colors[index]} />
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
								md: '2.5rem',
								xs: '1.5rem',
							}}
							lineHeight='1.4em'
							fontWeight={700}
							letterSpacing='0.015em'
							color='#272F3D'
							textAlign='center'
						>
							Create FREE Enquiries
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
			{!bookingLoading && showDetails && Object.keys(booking).length && (
				<UnpaidBookingDetails
					bookingDetailLevel={BOOKING_DETAIL_LEVEL.CONFIRMED}
					booking={booking}
					bookingDate={bookingDate}
					isMyBooking={true}
				/>
			)}
		</>
	);
};

export default Unpaid;

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
