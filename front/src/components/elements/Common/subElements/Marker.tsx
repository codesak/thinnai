import { Box } from '@mui/material';
import { Position } from 'google-map-react';
import React from 'react';

const Marker = (props: Position) => {
	return (
		<Box
			zIndex='5'
			width='5rem'
			style={{ transform: 'translate(-50%,-84%)' }}
		>
			<img
				style={{ objectFit: 'contain', width: '100%' }}
				src='/assets/images/detail/booking/Marker.svg'
				alt=''
			/>
		</Box>
	);
};

export default Marker;
