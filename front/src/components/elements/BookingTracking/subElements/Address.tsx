import { Box, Button, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Marker from '../../Common/subElements/Marker';
import style from '../../../styles/Booking/address.module.css'

const Address = () => {
	const bookedProperty = useSelector<RootState, any>(state => state.booking.booking.property);
	var pathname = window.location.pathname;
	let pathCheck = pathname.split('/')[1]
	const geoLocation = {
		lat: 27.3826,
		lng: 79.584,
	};

	return (
		<Box>
			<Box
				display={{
					xl: 'block',
					md: 'block',
					sm: 'none',
					xs: 'none',
				}}
			>
				<Box height={{ sm: 50, xs: 25 }} />
			</Box>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<h2	className='aboutPlace__header' style={{marginTop:'1.5rem'}}>
					Address
				</h2>
				{/* <Box
					display={{
						xl: 'block',
						md: 'block',
						sm: 'block',
						xs: 'block',
					}}
				>
					<Button
						variant='contained'
						sx={{
							textTransform: 'none',
							bgcolor: '#8F7EF3',
							borderRadius: '6px',
							color: 'white',
							fontSize: '0.625rem',
						}}
					>
						Copy
					</Button>
				</Box> */}
			</Box>
			<p className={style.info}>Exact location and Address Will be shared 12 hours before the booking</p>
			{pathCheck !== 'enquiry-summary' || 'unpaid' && <Box
				display={{
					xl: 'block',
					md: 'block',
					sm: 'none',
					xs: 'none',
				}}
				className='aboutPlace__p'
				marginBottom='1rem'
			>
				House No- {bookedProperty?.houseNumber}, {bookedProperty?.tower}, {bookedProperty?.street} street, {bookedProperty?.locality}, {bookedProperty?.landmark} ,{bookedProperty?.city}, {bookedProperty?.state}, {bookedProperty?.zipCode}
			</Box>}
			
			<Box
				display={{
					xl: 'none',
					md: 'none',
					sm: 'block',
					xs: 'block',
				}}
				fontSize='0.75rem'
				fontWeight={400}
				fontFamily='Open Sans'
				className='aboutPlace__p'
			>
				{bookedProperty?.address}
			</Box>
			<Box height={{ md: '284px', sm: '150px', xs: '143px' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyANrSZmh9Dzui1tXkC9H6R72Jv_03JxGcE',
					}}
					defaultCenter={{ lat: 27.3826, lng: 79.584 }}
					defaultZoom={8}
					// isMarkerShown
					yesIWantToUseGoogleMapApiInternals
				>
					<Marker {...geoLocation} />
				</GoogleMapReact>
			</Box>
			<div className={style.nearestLocation}>
				{
					bookedProperty?.nearbyBusStop?.busStopName && <div>
					<h4 className='aboutPlace__header'>Nearest Metro Station</h4>
					<p>{bookedProperty?.nearbyBusStop?.busStopName}</p>
				</div>
				}
				{
					bookedProperty?.nearbyMetro?.metroName && 
					<div>
					<h4 className='aboutPlace__header'>Nearest Bus Station</h4>
					<p>{bookedProperty?.nearbyMetro?.metroName}</p>
				</div>
				}
				
			</div>
		</Box>
	);
};

export default Address;
