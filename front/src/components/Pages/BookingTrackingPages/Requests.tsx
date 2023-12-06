import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
	Box,
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
	loadRequestedBookingsAndInquiries,
	setRescheduledBookingStatus,
	setRescheduledInquiryStatus,
} from '../../../actions/booking';
import { RootState } from '../../../store';
import { fourColorPalette, S3_BASE } from '../../../utils/consts';
import Loading from '../../elements/Loading/Loading';

const Requests = () => {
	const bookingLoading = useSelector<RootState, any>(state => state.booking.loading);
	const reschedules = useSelector<RootState, any>(state => state.booking.reschedules);

	const [selectedInquirySlot, setSelectedInquirySlot] = useState<any>([]);
	const [selectedBookingSlot, setSelectedBookingSlot] = useState<any>([]);

	const dispatch: Dispatch<any> = useDispatch();

	useEffect(() => {
		dispatch(loadRequestedBookingsAndInquiries());
	}, []);

	useEffect(() => {
		if (reschedules && reschedules.inquiries && reschedules.inquiries.length > 0) {
			setSelectedInquirySlot(new Array(reschedules.inquiries.length).fill({}));
		}
		if (reschedules && reschedules.bookings && reschedules.bookings.length > 0) {
			setSelectedBookingSlot(new Array(reschedules.bookings.length).fill({}));
		}
	}, [reschedules]);

	const handleSetBookingStatus = (bookingId: string, bookingStatus: string, index: number) => {
		dispatch(
			setRescheduledBookingStatus(
				bookingId,
				bookingStatus,
				selectedBookingSlot[index].bookingFrom,
				selectedBookingSlot[index].bookingTo
			)
		);
	};

	const handleSetInquiryStatus = (inquiryId: string, inquiryStatus: string, index: number) => {
		dispatch(
			setRescheduledInquiryStatus(
				inquiryId,
				inquiryStatus,
				selectedInquirySlot[index].bookingFrom,
				selectedInquirySlot[index].bookingTo
			)
		);
	};

	const handleBookingSlotChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const selectedSlot = reschedules.bookings[index].reschedule[event.target.value];
		const slots = [...selectedBookingSlot];
		slots[index] = selectedSlot;
		setSelectedBookingSlot(slots);
	};

	const handleInquirySlotChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const selectedSlot = reschedules.inquiries[index].hostRescheduleRequests[event.target.value];
		const slots = [...selectedInquirySlot];
		slots[index] = selectedSlot;
		setSelectedInquirySlot(slots);
	};

	return (
		<>
			{(bookingLoading || Object.keys(reschedules).length === 0) && (
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
			{!bookingLoading && Object.keys(reschedules).length !== 0 && (
				<Box
					width={{
						md: '70%',
						xs: '100%',
					}}
					margin='auto'
				>
					<Box marginY={4}>
						<Typography variant='h5'>
							{reschedules?.bookings.length === 0 && 'No'} Reschedule Requested: For Bookings
						</Typography>
					</Box>
					<Box>
						{reschedules.bookings.map((booking: any, index: number) => (
							<div key={index}>
								<Typography variant='h6' marginTop='3.75rem' marginBottom='2.938rem'>
									{booking.requestedDate}
								</Typography>
								<Box
									bgcolor={fourColorPalette[index % 4].extraLight}
									padding={{
										xl: '2rem',
										md: '2rem',
										sm: '2rem',
										xs: '1.2rem',
									}}
									borderRadius='1rem'
									display='flex'
									gap={{
										xl: '2rem',
										md: '2rem',
										sm: '2rem',
										xs: '1.5rem',
									}}
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
								>
									<Box width={{ md: '40%', sm: '100%' }}>
										<img
											style={{
												width: '100%',
												objectFit: 'fill',
												borderRadius: '1.2rem',
											}}
											src={`${S3_BASE}${booking.property.propertyPictures[0]}`}
											alt=''
										/>
									</Box>
									<Box
										width={{
											xl: '61.50%',
											md: '61.50%',
											sm: '90%',
											xs: '90%',
										}}
										margin='auto'
									>
										<Box
											marginBottom={{
												md: '2rem',
											}}
										>
											<Box
												fontSize={{ md: '2.5rem', sm: '1.9rem', xs: '1.4rem' }}
												className='aboutPlace__header'
												sx={{
													fontFamily: 'Open Sans',
													fontStyle: 'normal',
													fontWeight: '600',
													lineHeight: '1.5em',
													color: '#000000',
												}}
											>
												{booking.property.propertyName}
											</Box>
											<Box display='flex' alignItems='center' gap={{ sm: 1, xs: 0.2 }}>
												<Box display='flex' alignItems='center'>
													<LocationOnIcon
														sx={{
															fontSize: '1.375rem',
															'@media (max-width: 600px)': { fontSize: '1.125rem' },
														}}
													/>
												</Box>
												<Box
													className='aboutPlace__p'
													fontSize={{ md: '1.05rem', sm: '0.95rem', xs: '0.85rem' }}
													lineHeight='1.8em'
												>
													{`${booking.property.city}, ${booking.property.state}`}
												</Box>
											</Box>
										</Box>
										<Box display='flex' justifyContent='space-between'>
											<Box textAlign='left'>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '1rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													No. of guests :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{booking.invitedGuests.length + 1}
													</span>
												</Typography>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '1rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													Guest type :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{booking.inquiry.groupType}
													</span>
												</Typography>
											</Box>
											<Box
												textAlign={{
													xl: 'left',
													md: 'left',
													sm: 'right',
													xs: 'right',
												}}
											>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '0.8rem',
														xs: '0.75rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													Time :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{new Date(booking.bookingFrom).toLocaleTimeString('default', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}{' '}
														-{' '}
														{new Date(booking.bookingTo).toLocaleTimeString('default', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}
													</span>
												</Typography>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '0.8rem',
														xs: '0.75rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													Date :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{new Date(booking.bookingFrom)
															.toLocaleDateString('default', {
																year: 'numeric',
																month: 'numeric',
																day: 'numeric',
															})
															.split('/')
															.join('.')}
													</span>
												</Typography>
											</Box>
										</Box>
										<Box marginY='1.2rem'>
											<Divider />
										</Box>
										{booking.reschedule.findIndex(
											(rescheduleReq: any) => rescheduleReq.requestedBy === 'host'
										) !== -1 && (
											<Box>
												<Typography
													fontSize={{
														xl: '1.75rem',
														md: '1.75rem',
														sm: '1.25rem',
														xs: '1.20rem',
													}}
													fontWeight='600'
													color='#272F3D'
													lineHeight='2.375rem'
													fontFamily='Open Sans'
												>
													Alternate available slots
												</Typography>
												<Typography
													fontSize={{
														xl: '1.5rem',
														md: '1.5rem',
														sm: '1rem',
														xs: '0.9rem',
													}}
													fontWeight='300'
													color='#404040'
													fontFamily='Open Sans'
												>
													Pick a slot and click ‘Confirm’ to Proceed
												</Typography>
												<Box marginTop='1.5rem'>
													<FormControl>
														<RadioGroup
															aria-labelledby='demo-radio-buttons-group-label'
															defaultValue=''
															name='radio-buttons-group'
															onChange={e => handleBookingSlotChange(e, index)}
														>
															{booking.reschedule.map((slot: any, slotIndex: number) => (
																<FormControlLabel
																	key={slotIndex}
																	value={slotIndex}
																	control={<Radio />}
																	label={
																		<Box
																			display='flex'
																			gap={{
																				xl: '5rem',
																				md: '5rem',
																				sm: '3rem',
																				xs: '0rem',
																			}}
																		>
																			<Box
																				fontSize={{
																					xl: '1.125rem',
																					md: '1.125rem',
																					sm: '0.8rem',
																					xs: '0.75rem',
																				}}
																			>
																				<span
																					style={{
																						marginRight: '1rem',
																					}}
																				>
																					Time
																				</span>
																				:{' '}
																				{new Date(slot.bookingFrom).toLocaleTimeString('default', {
																					hour: 'numeric',
																					minute: 'numeric',
																					hour12: true,
																				})}{' '}
																				-{' '}
																				{new Date(slot.bookingTo).toLocaleTimeString('default', {
																					hour: 'numeric',
																					minute: 'numeric',
																					hour12: true,
																				})}
																			</Box>
																			<Box
																				fontSize={{
																					xl: '1.125rem',
																					md: '1.125rem',
																					sm: '0.8rem',
																					xs: '0.75rem',
																				}}
																				textAlign={{
																					xl: 'left',
																					md: 'left',
																					sm: 'right',
																					xs: 'right',
																				}}
																			>
																				Date :{' '}
																				{new Date(slot.bookingDate)
																					.toLocaleDateString('default', {
																						year: 'numeric',
																						month: 'numeric',
																						day: 'numeric',
																					})
																					.split('/')
																					.join('.')}
																			</Box>
																		</Box>
																	}
																/>
															))}
														</RadioGroup>
													</FormControl>
												</Box>
											</Box>
										)}
										<Box
											display='flex'
											justifyContent='flex-end'
											gap='1.25rem'
											marginTop='2.875rem'
										>
											<button
												style={{
													border: '0.4px solid #000000',
													background: 'transparent',
													outline: 'none',
													borderRadius: '6px',
													fontSize: '1rem',
													cursor: 'pointer',
													color: '#303F52',
													width: '50%',
													height: '40px',
												}}
												onClick={() => {
													handleSetBookingStatus(booking._id, 'Cancelled', index);
												}}
											>
												Decline
											</button>
											<button
												style={{
													border: '0.4px solid #000000',
													background: '#1A191E',
													outline: 'none',
													borderRadius: '6px',
													fontSize: '1rem',
													cursor: 'pointer',
													color: 'white',
													width: '50%',
													height: '40px',
												}}
												onClick={() => {
													handleSetBookingStatus(booking._id, 'Confirmed', index);
												}}
											>
												Confirm
											</button>
										</Box>
									</Box>
								</Box>
							</div>
						))}
					</Box>
					<Box marginY={4}>
						<Typography variant='h5'>
							{reschedules?.inquiries.length === 0 && 'No'} Reschedule Requested : For Enquiries
						</Typography>
					</Box>
					<Box>
						{reschedules.inquiries.map((inquiry: any, index: number) => (
							<div key={index}>
								<Typography variant='h6' marginTop='3.75rem' marginBottom='2.938rem'>
									{new Date(inquiry.bookingFrom).toLocaleDateString('default', {
										day: 'numeric',
										month: 'short',
									})}
								</Typography>
								<Box
									bgcolor={fourColorPalette[index % 4].extraLight}
									padding={{
										xl: '2rem',
										md: '2rem',
										sm: '2rem',
										xs: '1.2rem',
									}}
									borderRadius='1rem'
									display='flex'
									gap={{
										xl: '1rem',
										md: '1rem',
										sm: '2rem',
										xs: '1.5rem',
									}}
									flexDirection={{
										xl: 'row',
										md: 'row',
										sm: 'column',
										xs: 'column',
									}}
								>
									<Box width={{ md: '40%', sm: '100%' }}>
										<img
											style={{
												width: '100%',
												objectFit: 'fill',
												borderRadius: '1.2rem',
											}}
											src={`${S3_BASE}${inquiry.property.propertyPictures[0]}`}
											alt=''
										/>
									</Box>
									<Box
										paddingRight={{
											xl: '2rem',
											md: '2rem',
											xs: '0rem',
										}}
										paddingLeft={{
											xl: '2rem',
											md: '2rem',
											xs: '0rem',
										}}
										width={{
											xl: '61.50%',
											md: '61.50%',
											sm: '90%',
											xs: '100%',
										}}
										margin='auto'
									>
										<Box
											marginBottom={{
												md: '1rem',
											}}
										>
											<Box
												fontSize={{ md: '1.5rem', sm: '1.9rem', xs: '1.4rem' }}
												className='aboutPlace__header'
												sx={{
													fontFamily: 'Open Sans',
													fontStyle: 'normal',
													fontWeight: '600',
													lineHeight: '1.5em',
													color: '#000000',
												}}
											>
												{inquiry.property.propertyName}
											</Box>
										</Box>
										<Box display='flex' justifyContent='space-between'>
											<Box textAlign='left'>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '0.8rem',
													}}
													marginBottom='0.5rem'
													fontWeight='300'
													color='#383838'
												>
													No. of guests :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{inquiry.guestCount}
													</span>
												</Typography>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '0.8rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													Guest type :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{inquiry.groupType}
													</span>
												</Typography>
											</Box>
											<Box textAlign='left'>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '0.8rem',
													}}
													fontWeight='300'
													marginBottom='0.5rem'
													color='#383838'
												>
													Time :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{new Date(inquiry.bookingFrom).toLocaleTimeString('default', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}{' '}
														-{' '}
														{new Date(inquiry.bookingTo).toLocaleTimeString('default', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}
													</span>
												</Typography>
												<Typography
													fontSize={{
														xl: '1.125rem',
														md: '1.125rem',
														sm: '1rem',
														xs: '0.8rem',
													}}
													fontWeight='300'
													color='#383838'
												>
													Date :{' '}
													<span style={{ color: fourColorPalette[index % 4].medium }}>
														{new Date(inquiry.bookingFrom)
															.toLocaleDateString('default', {
																year: 'numeric',
																month: 'numeric',
																day: 'numeric',
															})
															.split('/')
															.join('.')}
													</span>
												</Typography>
											</Box>
										</Box>
										<Box marginY='1.2rem'>
											<Divider />
										</Box>
										<Box>
											<Typography
												fontSize={{
													xl: '1.75rem',
													md: '1.3rem',
													sm: '1.25rem',
													xs: '1.20rem',
												}}
												fontWeight='600'
												color='#272F3D'
												lineHeight='2.375rem'
												fontFamily='Open Sans'
											>
												Alternate available slots
											</Typography>
											<Typography
												fontSize={{
													xl: '1.5rem',
													md: '1.1rem',
													sm: '1rem',
													xs: '0.9rem',
												}}
												fontWeight='300'
												color='#404040'
												fontFamily='Open Sans'
											>
												Pick a slot and click ‘Confirm’ to Proceed
											</Typography>
											<Box marginTop='1.5rem'>
												<FormControl>
													<RadioGroup
														aria-labelledby='demo-radio-buttons-group-label'
														defaultValue='female'
														name='radio-buttons-group'
														onChange={e => handleInquirySlotChange(e, index)}
													>
														{inquiry.hostRescheduleRequests.map(
															(rescheduleRequest: any, rescheduleIndex: number) => (
																<FormControlLabel
																	key={rescheduleIndex}
																	value={rescheduleIndex}
																	control={<Radio />}
																	label={
																		<Box
																			display='flex'
																			gap={{
																				xl: '5rem',
																				md: '1rem',
																				sm: '3rem',
																				xs: '0rem',
																			}}
																		>
																			<Box
																				fontSize={{
																					xl: '1rem',
																					md: '1rem',
																					sm: '0.8rem',
																					xs: '0.8rem',
																				}}
																				textAlign={{
																					xl: 'left',
																					md: 'left',
																					sm: 'right',
																					xs: 'right',
																				}}
																				fontWeight='300'
																			>
																				Date :{' '}
																				{new Date(rescheduleRequest.bookingFrom)
																					.toLocaleDateString('default', {
																						year: 'numeric',
																						month: 'numeric',
																						day: 'numeric',
																					})
																					.split('/')
																					.join('.')}
																			</Box>
																			<Box
																				fontSize={{
																					xl: '1rem',
																					md: '1rem',
																					sm: '0.8rem',
																					xs: '0.8rem',
																				}}
																				fontWeight='300'
																			>
																				<span
																					style={{
																						marginLeft: '1rem',
																					}}
																				>
																					Time
																				</span>
																				:{' '}
																				{new Date(rescheduleRequest.bookingFrom).toLocaleTimeString(
																					'default',
																					{
																						hour: 'numeric',
																						minute: 'numeric',
																						hour12: true,
																					}
																				)}{' '}
																				-{' '}
																				{new Date(rescheduleRequest.bookingTo).toLocaleTimeString(
																					'default',
																					{
																						hour: 'numeric',
																						minute: 'numeric',
																						hour12: true,
																					}
																				)}
																			</Box>
																		</Box>
																	}
																/>
															)
														)}
													</RadioGroup>
												</FormControl>
											</Box>
										</Box>
										<Box
											display='flex'
											justifyContent='flex-end'
											gap='1.25rem'
											marginTop='1.5rem'
											marginBottom='0.5rem'
										>
											<button
												style={{
													border: '0.4px solid #000000',
													background: 'transparent',
													outline: 'none',
													borderRadius: '6px',
													fontSize: '1rem',
													cursor: 'pointer',
													color: '#303F52',
													width: '50%',
													height: '40px',
												}}
												onClick={() => {
													handleSetInquiryStatus(inquiry._id, 'Cancelled', index);
												}}
											>
												Decline
											</button>
											<button
												style={{
													border: '0.4px solid #000000',
													background: '#1A191E',
													outline: 'none',
													borderRadius: '6px',
													fontSize: '1rem',
													cursor: 'pointer',
													color: 'white',
													width: '50%',
													height: '40px',
												}}
												onClick={() => {
													handleSetInquiryStatus(inquiry._id, 'Confirmed', index);
												}}
											>
												Confirm
											</button>
										</Box>
									</Box>
								</Box>
							</div>
						))}
					</Box>
				</Box>
			)}
		</>
	);
};

export default Requests;
