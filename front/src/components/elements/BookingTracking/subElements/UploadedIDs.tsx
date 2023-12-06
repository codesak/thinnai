import React, { Dispatch } from 'react';
import { RootState } from '../../../../store';
import { S3_BASE } from '../../../../utils/consts';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { removeInvitedGuest } from '../../../../actions/booking';

const UploadedIDs = ({ invitedGuestList }: { invitedGuestList: any[] }) => {
	const dispatch: Dispatch<any> = useDispatch();

	const location = useLocation();

	const bookingId = useSelector<RootState, string>(state => state.booking.booking._id);
	const booking = useSelector<RootState, any>(state => state.booking.booking);

	const removeGuest = (invitedGuestId: string) => {
		dispatch(removeInvitedGuest({ bookingId, invitedGuestId }));
	};

	const settings = {
		dots: false,
		infinite: false,
		speed: 300,
		swipeToSlide: true,
		draggable: true,
		slidesToShow: 2.5,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2.2,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1.5,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1.5,
				},
			},
		],
	};

	return (
		<Box className='UploadedCarousel' width='101%'>
			<Box display='flex' justifyContent='space-between'>
				<Box className='label'>Uploaded Ids</Box>
				<Box
					display='flex'
					alignItems='center'
					gap={0.6}
					borderRadius={75}
					marginRight={{ xs: '1.5%' }}
					padding={{ xs: '0px 0.938rem', sm: '0px 1.563rem' }}
					fontSize={{ sm: '0.85rem', xs: '0.65rem' }}
					lineHeight='1.5em'
					sx={{
						background: '#FFE1E1',
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: '400',
						color: '#1A191E',
					}}
				>
					<Box display='flex' margin='auto'>
						<AccessTimeOutlinedIcon
							sx={{
								color: '#EE6262',
								fontSize: '1rem !important',
								'@media (max-width: 600px)': { fontSize: '0.85rem !important' },
							}}
						/>
					</Box>
					<Box
						fontSize={{
							xl: '0.75rem',
							md: '0.75rem',
							sm: '0.5rem',
							xs: '0.5rem',
						}}
					>
						Waiting for at least{' '}
						<span style={{ color: '#EF6A6A', fontWeight: '700' }}>
							{Math.max(booking.inquiry?.guestCount - booking.invitedGuests?.length - 1, 0)} more
						</span>{' '}
						IDs
					</Box>
				</Box>
			</Box>
			<Slider {...settings}>
				{invitedGuestList.map((item: any, index: number) => (
					<Box
						key={index}
						width='auto'
						marginTop={{
							sm: 4,
							xs: 5,
						}}
					>
						<Box
							display='flex'
							alignItems='center'
							gap={0.5}
							sx={{ background: '#F2F0DF' }}
							marginRight='1rem'
							padding={{ xs: '0.938rem 1.125rem', sm: '0.5rem 0.5rem' }}
							position='relative'
							borderRadius='10px'
						>
							<Avatar
								sx={{
									width: '30px',
									height: '30px',
								}}
							>
								<img
									width='100%'
									height='100%'
									src={
										item.guest?.user?.profileImage
											? `${S3_BASE}${item.guest.user.profileImage}`
											: item.guest.user?.avatar
									}
									alt=''
								/>
							</Avatar>
							<Box>
								<Box
									fontFamily='Open Sans'
									lineHeight='1.2em'
									fontSize={{ xs: '0.8rem', sm: '0.7rem' }}
									fontWeight='400'
									color='#272F3D'
								>
									{item.guest.user?.fullName}
								</Box>
							</Box>
							<Box position='absolute' right='8px' top='-14px'>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '27px !important',
										height: '27px !important',
										cursor: 'pointer',
										borderRadius: '50%',
										overflow: 'hidden',
										transition: 'all 0.4s',
										':hover': {
											opacity: 0.8,
										},
									}}
									onClick={() => removeGuest(item.guest.user?._id)}
								>
									<img width='100%' height='100%' src='/assets/images/cancel.svg' alt='' />
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Slider>
		</Box>
	);
};

export default UploadedIDs;
