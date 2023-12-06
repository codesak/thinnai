import { loadConfirmedBookings, loadOngoingBooking } from '../../../actions/booking';
import { RootState } from '../../../store';
import { BOOKING_DETAIL_LEVEL } from '../../../utils/consts';
import BookingDetails from '../../elements/BookingTracking/BookingDetails';
import NoBookings from '../../elements/BookingTracking/NoBookings';
import Loading from '../../elements/Loading/Loading';
import Box from '@mui/system/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Ongoing() {
	const dispatch = useDispatch();
	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const bookingDate = useSelector<RootState, Date>(state => state.search.bookingDate);
	const booking = useSelector<RootState, any>(state => state.booking.booking);

	useEffect(() => {
		dispatch(loadOngoingBooking());
	}, []);

	if (bookingLoading) {
		return (
			<Box display='flex' gap={5} justifyContent='center'>
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
		);
	} else if (Object.keys(booking).length === 0) {
		return <NoBookings headerText='Ongoing Booking' />;
	}

	return (
		<BookingDetails
			bookingDetailLevel={BOOKING_DETAIL_LEVEL.ONGOING}
			booking={booking}
			bookingDate={bookingDate}
			isMyBooking={true}
		/>
	);
}
