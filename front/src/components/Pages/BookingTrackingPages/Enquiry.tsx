import { Box, Grid, Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEnquiredBookings } from '../../../actions/booking';
import { RootState } from '../../../store';
import EnquiryCard from '../../elements/BookingTracking/SummaryCards/EnquiryCard';
import Loading from '../../elements/Loading/Loading';

const Enquiry = () => {
	const dispatch: Dispatch<any> = useDispatch();

	const [openEnquiries, setOpenEnquiries] = useState<any[]>([]);
	const [cancelledEnquiries, setCancelledEnquiries] = useState<any[]>([]);
	//TODO: Move enquiries to enquiry store!
	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const enquiredBookings = useSelector<RootState, any[]>(state => state.booking.enquiry);
	useEffect(() => {
		dispatch(loadEnquiredBookings());
	}, [dispatch]);

	useEffect(() => {
		if (enquiredBookings && enquiredBookings.length > 0) {
			let tempOpen: any[] = [];
			let tempCancelled: any[] = [];
			enquiredBookings.forEach(enquiry => {
				if (enquiry.inquiryStatus === 'pending') tempOpen.push(enquiry);
				else if (enquiry.inquiryStatus === 'cancelled') tempCancelled.push(enquiry);
			});
			setOpenEnquiries(tempOpen);
			setCancelledEnquiries(tempCancelled);
		}
	}, [enquiredBookings]);

	return (
		<>
			{bookingLoading && (
				<Box
					sx={{
						height: '50%',
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
			{!bookingLoading && (
				<Box>
					<Box marginTop={4} marginBottom={4}>
						<Typography variant='h5' padding={{xs:'0rem 0rem 0rem 3rem', sm:'0rem'}}>
							{openEnquiries.length === 0 && 'No'} Open Enquiries
						</Typography>
					</Box>
					{openEnquiries?.map((item: any, enquiryGroupIndex: number) => (
						<Box marginBottom='3.438rem' key={enquiryGroupIndex}>
							<Typography variant='h6' marginTop='3.75rem' marginBottom='2.938rem' padding={{xs:'0 3rem', sm:'0px'}}>
								{new Date(item.bookingFrom).toLocaleDateString('default', {
									day: 'numeric',
									month: 'short',
								})}
							</Typography>
							<Grid container gap={3} justifyContent='center'>
								{item.inquiries?.map((enquiry: any, enquiryIndex: number) => (
									<EnquiryCard
										key={enquiryIndex}
										enquiryDetails={enquiry}
										enquiryGroupIndex={enquiryGroupIndex}
										enquiryIndex={enquiryIndex}
										bookingFrom={item.bookingFrom}
										bookingTo={item.bookingTo}
									/>
								))}
							</Grid>
						</Box>
					))}
					<Box marginTop={7} marginBottom={4}>
						<Typography variant='h5'>
							{cancelledEnquiries.length === 0 && 'No'} Cancelled Enquiries
						</Typography>
					</Box>
					{cancelledEnquiries?.map((item: any, enquiryGroupIndex: number) => (
						<Box marginBottom='3.438rem' key={enquiryGroupIndex}>
							<Typography variant='h6' marginTop='3.75rem' marginBottom='2.938rem'>
								{new Date(item.bookingFrom).toLocaleDateString('default', {
									day: 'numeric',
									month: 'short',
								})}
							</Typography>
							<Grid container gap={4} justifyContent='center'>
								{item.inquiries?.map((enquiry: any, enquiryIndex: number) => (
									<EnquiryCard
										key={enquiryIndex}
										enquiryDetails={enquiry}
										enquiryGroupIndex={enquiryGroupIndex}
										enquiryIndex={enquiryIndex}
										bookingFrom={item.bookingFrom}
										bookingTo={item.bookingTo}
										isCancelled
									/>
								))}
							</Grid>
						</Box>
					))}
				</Box>
			)}
		</>
	);
};

export default Enquiry;
