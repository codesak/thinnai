import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NoBookings({ headerText = 'Bookings' }: { headerText?: string }) {
	return (
		<Box
			display='flex'
			justifyContent='center'
			flexDirection={{xs:'column', md:'row-reverse'}}
			alignItems='center'
			height='70vh'
			gap={2}
		>
			<Box>
				<Box width='60%' margin='auto'>
					<img width='100%' src='/assets/images/confirmed/no-booking.svg' alt='' />
				</Box>
			</Box>
			<Box display='flex' flexDirection='column' gap={{xs:'16px', md:'32px'}}>
			<Typography
				fontFamily='Montserrat'
				fontSize={{
					md: '2.8rem',
					xs: '1.8rem',
				}}
				lineHeight='1.4em'
				fontWeight={700}
				letterSpacing='0.015em'
				color='#272F3D'
				textAlign='center'
			>
				No {headerText}
			</Typography>
			<Typography
				fontFamily='Open Sans'
				fontSize={{
					md: '1.775rem',
					xs: '.9rem',
				}}
				lineHeight='1.4em'
				fontWeight={400}
				color='#50555C'
				textAlign='center'
			>
				Currently, no bookings initiated. Go to{' '}
				<Link
					style={{
						textDecoration: 'none',
						fontWeight: 700,
						color: '#8F7EF3',
					}}
					to='/'
				>
					home page.
				</Link>
			</Typography>
			</Box>
		</Box>
	);
}
