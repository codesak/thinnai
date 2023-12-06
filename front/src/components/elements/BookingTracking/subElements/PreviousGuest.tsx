import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { RootState } from '../../../../store';

const PreviousGuest = () => {
	const friends = useSelector<RootState, any>(state => state.profile.userData.friends);
	const bookingId = useSelector<RootState, string>(state => state.booking.booking._id);

	const settings = {
		dots: false,
		infinite: false,
		speed: 300,
		swipeToSlide: true,
		draggable: true,
		slidesToShow: 5,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	const checkAlreadyAdded = (bookingsInvitedTo: string[]) => {
		if (bookingsInvitedTo.includes(bookingId)) return false;
		else return true;
	};

	return (
		<Box className='UploadedCarousel' width='101%'>
			{friends?.length > 0 && (
				<>
					<Box height={{ sm: 20, xs: 10 }} />
					<Box height='100px' alignItems='center'>
						{/* {data.length >= 3 ? */}
						<Slider {...settings}>
							{friends.map(
								(item: any, index: number) =>
									checkAlreadyAdded(item.bookingsInvitedTo) && (
										<div key={index}>
											<Box
												display='flex !important'
												position='relative'
												borderRadius='10px'
												width='max-content'
												padding={{ xs: '0.938rem 1.125rem', sm: '0.938rem 1.563rem' }}
												gap={2}
												sx={{ background: '#F3F1FF' }}
											>
												<Box>
													<Avatar>
														<img src={item.profileImage ? item.profileImage : item.avatar} alt='' />
													</Avatar>
												</Box>
												<Box display='flex' flexDirection='column' justifyContent='center' gap={1}>
													<Box fontSize={{ xs: '0.8rem', sm: '1rem' }}>
														{item.firstName} {item.lastName}
													</Box>
													<Box display='flex' justifyContent='flex-end'>
														<Button
															sx={{
																bgcolor: '#DFDAFF',
																fontSize: '0.625rem',
																textTransform: 'none',
																color: '#303F52',
																padding: '0.313rem 0px',
															}}
														>
															Add
														</Button>
													</Box>
												</Box>
											</Box>
										</div>
									)
							)}
						</Slider>
					</Box>
				</>
			)}
		</Box>
	);
};

export default PreviousGuest;
