import { Box, Button, Divider, Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { ROUTES } from '../../../utils/routing/routes';
import style from '../../styles/Enquiry/bookingDetails.module.css'

const BookingDetails = ({ handleChangesMenu }: any) => {
	const navigate = useNavigate();
	const dispatch: Dispatch<any> = useDispatch();
	const property: any = useSelector<RootState, string>(state => state.details.property);

	const location = useLocation();
	const pathName = location.pathname;

	const [enquiryData, setEnquiryData] = useState<any>(Date.now());
	const [bookingFrom, setBookingFrom] = useState<any>(Date.now());
	const [bookingTo, setBookingTo] = useState<any>(Date.now());

	const bookingEnquiries = useSelector<RootState, any>(state => state.booking.enquiryStatus[0]);
	const enquiries = useSelector<RootState, any>(state => state.enquiry.enquiries[0]);
	const cart = useSelector<RootState, any>(state => state.cart.items);

	useEffect(() => {
		if (pathName === ROUTES.ENQUIRY_STATUS) {
			setBookingFrom(bookingEnquiries?.bookingFrom);
			setBookingTo(bookingEnquiries?.bookingTo);
			setEnquiryData(bookingEnquiries);
		} else {
			if (enquiries) {
				setBookingFrom(enquiries.startTime);
				setBookingTo(enquiries.endTime);
				setEnquiryData(enquiries);
			}
		}
	}, [bookingEnquiries, enquiries, pathName]);

	// useEffect(() => {
		
	// 		setBookingFrom(cart[0].bookingFrom);
	// 		setBookingTo(cart[0].bookingTo);
		
	// },[])
	const onClick = () => {
		navigate(-1);
	};

	return (
		<div className={style.mainContainer}>
			<Box>
				<Typography	className={style.title}>
					Booking Details{' '}
				</Typography>
				{/* <Button
					style={{
						textTransform: 'none',
					}}
					onClick={() => (handleChangesMenu ? handleChangesMenu() : onClick())}
				>
					
				</Button> */}
			</Box>
			<Box className={style.divider}>
				<Divider />
			</Box>
			<div>
			<table className={style.dataContainer}>
						<tr>
							<td className={style.key}>
								No. of guests :
							</td>
							<td className={style.value}>
								{enquiryData?.guestCount || 6}
							</td>
						</tr>
							<tr>
								<td className={style.key}>
									Time :
								</td>
								<td className={style.value}>
									{bookingFrom ? new Date(bookingFrom).toLocaleTimeString('default', {
											hour: 'numeric',
											minute: 'numeric',
											hour12: true,
										}) : '3:00pm'}{' '}
										-{' '}
										{bookingTo ? new Date(bookingTo).toLocaleTimeString('default', {
											hour: 'numeric',
											minute: 'numeric',
											hour12: true,
										}) : '5:00pm'}
								</td>
							</tr>
			</table>
			<table className={style.dataContainer}>
						<tr>
							<td className={style.key}>
							Guest type :
							</td>
							<td className={style.value}>
							{enquiryData?.groupType || 'family'}
							</td>
						</tr>
							<tr>
								<td className={style.key}>
								Date :
								</td>
								<td className={style.value}>
								{bookingFrom ? new Date(bookingFrom).toLocaleDateString('default', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})
										.split('/')
										.join('.')
									: '03.08.2022'	}
								</td>
							</tr>
			</table>
			{/* <table  className={style.dataContainer}>
						<tr>
							<td className={style.key}>
								Guest type
							</td>
							<td className={style.value}>
								{enquiryData?.groupType || 'family'}
							</td>
						<td className={style.key}>
								Date :
						</td>
						<td className={style.value}>
							{bookingFrom ? new Date(bookingFrom).toLocaleDateString('default', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})
										.split('/')
										.join('.')
									: '03.08.2022'	}		
						</td>
						</tr>
			</table> */}
			</div>
			{/* <Box className={style.dataContainer}>
				<Box>
					<div className={style.singleData}>
						<h4>
							No. of guests
						</h4>
						<p>:{enquiryData?.guestCount || 6}</p>
					</div>
					<div className={style.singleData}>
						<h4>
							Guest type
						</h4>
						<p> :{enquiryData?.groupType || 'family'}</p>
					</div>
				</Box>
				<Box>
					<div className={style.singleData}>
						<h4>Time :</h4>
						
							<p style={{ color: '#6053AE' }}>
								{bookingFrom ? new Date(bookingFrom).toLocaleTimeString('default', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true,
								}) : '0'}{' '}
								-{' '}
								{bookingTo ? new Date(bookingTo).toLocaleTimeString('default', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true,
								}) : '0'}
							</p>
					</div>	
					<div className={style.singleData}>
						<h4>Date :</h4>
						<p>
						{new Date(bookingFrom).toLocaleDateString('default', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})
										.split('/')
										.join('.')}			
						</p>
					</div>
				</Box>
				
			</Box> */}
		</div>
	);
};

export default BookingDetails;
