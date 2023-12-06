import { loadBooking, loadInvitedBookings } from '../../../actions/booking';
import { RootState } from '../../../store';
import { BOOKING_DETAIL_LEVEL } from '../../../utils/consts';
import BookingDetails from '../../elements/BookingTracking/BookingDetails';
import NoBookings from '../../elements/BookingTracking/NoBookings';
import ConfirmedCard from '../../elements/BookingTracking/SummaryCards/ConfirmedCard';
import Loading from '../../elements/Loading/Loading';
import { Box, Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Invited = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const { bookingId } = useParams<{ bookingId: string }>();
	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const invitedBookings = useSelector<RootState, any>(state => state.booking.invitedTo);
	const booking = useSelector<RootState, Object>(state => state.booking.booking);
	const bookingDate = useSelector<RootState, Date>(state => state.search.bookingDate);

	useEffect(() => {
		dispatch(loadInvitedBookings());
	}, []);

	useEffect(() => {
		if (bookingId) {
			dispatch(loadBooking(bookingId));
		}
	}, [bookingId]);

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
				!bookingId &&
				(invitedBookings && invitedBookings.length > 0 ? (
					<Box
						display='flex'
						flexDirection='column'
						gap={{
							xl: '4.625rem',
							md: '4.625rem',
							sm: '1.875rem',
							xs: '1.875rem',
						}}
						marginBottom={{
							xl: '1.875rem',
							md: '1.875rem',
							sm: '1.875rem',
							xs: '6.25rem',
						}}
						overflow='hidden'
					>
						<Box marginTop={4} marginBottom={4}>
							<Typography variant='h4'>Invited Bookings</Typography>
						</Box>
						{invitedBookings?.map((item: any, index: number) => (
							<ConfirmedCard
								key={index}
								index={index}
								item={item}
								color={colors[index]}
								isInvitedBooking={true}
							/>
						))}
					</Box>
				) : (
					<NoBookings />
				))}
			{!bookingLoading && bookingId && Object.keys(booking).length && (
				<BookingDetails
					bookingDetailLevel={BOOKING_DETAIL_LEVEL.INVITED}
					booking={booking}
					bookingDate={bookingDate}
					isMyBooking={false}
				/>
			)}
		</>
	);
};

export default Invited;

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
