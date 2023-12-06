import Box from '@mui/material/Box/Box';
import React from 'react';

export default function TopCircles() {
	return (
		<Box
			display={{
				xl: 'none',
				md: 'none',
				sm: 'block',
				xd: 'block',
			}}
		>
			<Box
				className='circle'
				width={{ xs: '172px', md: '430.23px', sm: '' }}
				top={{ xs: '-82.86px', md: '-245px', sm: '' }}
				right={{ xs: '-82.86px', md: '-179px', sm: '' }}
				border='1px solid #EECBBC'
				zIndex={-1}
			/>
			<Box
				className='circle'
				width={{ xs: '203px', md: '507.78px', sm: '' }}
				top={{ xs: '-80px', md: '-273px', sm: '' }}
				right={{ xs: '-80px', md: '-207px', sm: '' }}
				border='1px solid #EECBBC'
				zIndex={-1}
			/>
			<Box
				className='circle'
				width={{ xs: '230px', md: '575.31px', sm: '' }}
				top={{ xs: '-82px', md: '-301px', sm: '' }}
				right={{ xs: '-82px', md: '-199px', sm: '' }}
				border='3px solid rgba(238, 203, 188, 0.2)'
				zIndex={-1}
			/>
			<Box
				className='circle'
				width={{ xs: '253px', md: '634.84px', sm: '' }}
				top={{ xs: '-80px', md: '-318px', sm: '' }}
				right={{ xs: '-80px', md: '-185px', sm: '' }}
				border='1px solid rgba(238, 203, 188, 0.93)'
				zIndex={-1}
			/>
		</Box>
	);
}
