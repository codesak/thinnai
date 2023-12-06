import { rescheduleBooking } from '../../../../actions/booking';
import { timeArray } from '../../../../utils/consts';
import DatesCarousel from '../../Explore/DatesCarousel';
import TimeCarousel from '../TimeCarousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CounterButton = styled(Paper)(({ theme }) => ({
	width: '1rem',
	height: '1rem',
	borderRadius: '50%',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 0.375rem',
	cursor: 'pointer',
}));

export default function RescheduleRequest({
	booking,
	bookingDate,
}: {
	booking: any;
	bookingDate: any;
}) {
	const [timeShown, setTimeShown] = useState('06:00 AM');
	const [timeIndex, setTimeIndex] = useState<number | null>(null);
	const dispatch = useDispatch();
	const getData = (i: number) => {
		const data = timeArray[i];
		setTimeShown(data.time);
	};

	useEffect(() => {
		if (timeIndex === null) {
			let date = new Date(new Date().setMinutes(0, 0, 0)).toLocaleTimeString('default', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			});
			date = date.replace('00:', '12:');
			const indexOfCurrentTime = timeArray.findIndex(
				timeElement => timeElement.time === date.toUpperCase()
			);
			setTimeShown(timeArray[indexOfCurrentTime].time);
			setTimeIndex(indexOfCurrentTime);
			return;
		}
		const time = timeArray[timeIndex];
		setTimeShown(time.time);
	}, [timeIndex]);

	const [time, setTime] = useState(60);
	const increase = () => {
		setTime(time + 10);
	};
	const decrease = () => {
		if (time > 60) {
			setTime(time - 10);
		}
	};

	const [startTime, setStartTime] = useState<Date>();
	useEffect(() => {
		const StartTime24 = new Date('01/01/2001 ' + timeShown).toLocaleTimeString('default', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		});
		const date = new Date(booking?.bookingFrom);
		date.setHours(Number(StartTime24.split(':')[0]));
		date.setMinutes(Number(StartTime24.split(':')[1]));
		setStartTime(date);
	}, [booking?.bookingFrom, timeShown]);

	const [endTime, setEndTime] = useState<Date>();
	useEffect(() => {
		const date = new Date(startTime as Date);
		date.setMinutes(date.getMinutes() + time);
		setEndTime(date);
	}, [startTime, time]);

	const onclickSend = () => {
		dispatch(
			rescheduleBooking(
				{ bookingFrom: startTime, bookingTo: endTime, bookingDate: bookingDate },
				booking._id
			)
		);
	};

	return (
		<>
			<Box display='flex' justifyContent='flex-end'>
				<Box
					sx={{ background: '#EFECFF' }}
					borderRadius='164px'
					width='fit-content'
					padding='5px 1.25rem'
					display={{ md: 'block', xs: 'none' }}
				>
					<Box
						fontFamily='Open Sans'
						fontStyle='normal'
						fontWeight='400'
						fontSize='0.625rem'
						lineHeight='19px'
						display='flex'
						alignItems='center'
						textAlign='center'
						letterSpacing='0.015em'
						color='#6053AE'
					>
						{booking.property.directBooking === true ? 'Direct Booking' : 'On Request Booking'}
					</Box>
				</Box>
			</Box>
			<Box height={'20px'} />
			<Box
				display={{ md: 'flex', xs: 'none' }}
				justifyContent='space-between'
				padding='1.25rem'
				sx={{
					border: '1px solid #000000',
					filter: 'drop-shadow(3px 4px 8px rgba(0, 0, 0, 0.25))',
					borderRadius: '6px',
				}}
			>
				<Box>
					<Box className='book__header' lineHeight='22px'>
						For selected slot, Pay
					</Box>
				</Box>
				<Box display='flex' flexDirection='column' alignItems='flex-end' gap='2px'>
					<Box>
						<Button
							style={{
								fontWeight: '500',
								fontSize: '1.1rem',
								lineHeight: '20px',
								letterSpacing: '0.02em',
								padding: '2.5px 1.219rem',
								color: '#000000',
							}}
						>
							₹ {booking.property.additionalCharges}
						</Button>
						more
					</Box>
				</Box>
			</Box>

			<Box height={{ md: 45, xs: 0 }} />
			<Box
				textAlign='center'
				height={120}
				width='100%'
				sx={{
					background: '#F3F1FF',
				}}
			>
				<DatesCarousel />
				<Typography>
					This space receives enquiries, {booking.property.visibility} days in advance only
				</Typography>
			</Box>
			<Box height={25} />
			<Box>
				<Box className='book__header'>Select Timing</Box>
				<Box height={20} />
				<Box width='85%' margin='auto'>
					<Box width='100%' display='flex' justifyContent='space-around'>
						<Box width='50%'>
							<Box display='flex' width='80%' flexDirection='column' alignItems='center'>
								<Box className='book__timing-head'>TIME</Box>
								<Box className='book__timing-p'>{timeShown}</Box>
							</Box>
						</Box>
						<Box height='auto' width='1.5px' sx={{ background: '#DEDEDE' }} />
						<Box display='flex' width='50%' flexDirection='column' alignItems='center'>
							<Box className='book__timing-head'>DURATION</Box>
							<Box display='flex' alignItems='center'>
								<CounterButton onClick={decrease}>-</CounterButton>
								<Box className='book__timing-p'>{time} min</Box>
								<CounterButton onClick={increase}>+</CounterButton>
							</Box>
						</Box>
					</Box>
					<Box height={20} />
					<Divider />
					<Box height={20} />
					<Box>
						<Box display='flex' justifyContent='center'>
							<img height={22} src='/assets/images/detail/pointingArrow.svg' alt='' />
						</Box>
						<Box height={3} sx={{ background: 'radial-gradient(#8F7EF3 , #8F7EF300);' }} />
						<Box height={3} width='100%' />
						<Box width={{ md: '99.5%', xs: '99.5%', sm: '99%' }}>
							{timeIndex != null && (
								<TimeCarousel
									data={timeArray}
									onClick={i => getData(i)}
									setTimeOnSlide={setTimeIndex}
									currentIndex={timeIndex}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
			<Box height={40} />
			<Box>
				<Button
					variant='contained'
					style={{
						width: '100%',
						background: '#262626',
						textTransform: 'none',
						fontFamily: 'Montserrat',
						fontStyle: 'normal',
						fontWeight: '500',
						fontSize: '1.1rem',
						lineHeight: '29px',
						color: '#FFFFFF',
					}}
					onClick={() => {
						onclickSend();
					}}
				>
					SEND REQUEST
				</Button>
			</Box>
		</>
	);
}
