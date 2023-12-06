import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';

const NotFound = () => {
	const [isHidden, setIsHidden] = useState(false);
	const navigate = useNavigate()
	return (
		<Box>
			<Box
				marginTop={{
					md: 12,
					xs: 5,
				}}
				paddingBottom={{
					md: 0,
					xs: 8,
				}}
				marginX={{
					xl: '4.938rem',
					md: '4.938rem',
					sm: '1.875rem',
					xs: '1rem',
				}}
				height='85vh'
				display='flex'
				justifyContent={{
					md: 'space-between',
					xs: 'center',
				}}
				alignItems='center'
				flexDirection={{
					md: 'row',
					xs: 'column',
				}}
			>
				<Box
					marginTop={{
						md: 0,
						xs: 5,
					}}
					width={{
						md: '57%',
						xs: '100%',
					}}
					textAlign={{
						md: 'left',
						xs: 'center',
					}}
					order={{
						md: '1',
						xs: '2',
					}}
				>
					<Typography
						fontSize={{
							xl: '3rem',
							md: '2.6rem',
							sm: '2.8rem',
							xs: '1.6rem',
						}}
						fontWeight={700}
						lineHeight='1em'
						fontFamily='Montserrat'
					>
						{/* Will connect back soon... */}
						Oops, looks like we hit a bump in the road!
					</Typography>
					<Typography
						marginTop='0.9rem'
						fontSize={{
							md: '1.3rem',
							sm: '1.1rem',
							xs: '1rem',
						}}
						fontWeight='400'
						color='#454444'
						lineHeight='1.3em'
						fontFamily='Montserrat'
					>
						{/* The server is in a maintenance mode, please come back later or{' '}
						<span
							style={{
								color: '#8F7EF3',
							}}
						>
							contact us{' '}
						</span>
						for bookings. */}
						But fear not, Book My Thinnai’s is full of amazing spaces just waiting to be booked.
                        Let’s find your next adventure together!
					</Typography>
					{!isHidden && (
						<Button
							variant='contained'
							sx={{
								background: 'black',
								marginTop: 5,
								borderRadius: '40px',
								paddingX: '1.5rem',
								textTransform: 'none',
								fontSize: '1.1rem',
								fontFamily: 'Montserrat',
								boxShadow: 'none',
							}}
							onClick={()=>navigate(ROUTES.EXPLORE)}
						>
							{/* Contact Us */}
							Explore Spaces
						</Button>
					)}
				</Box>
				<Box
					order={{
						md: '2',
						xs: '1',
					}}
					width={{
						md: '43%',
						xs: '100%',
					}}
				>
					<Box
						width={{
							xl: '80%',
							xs: '100%',
						}}
					>
						<img width='100%' height='100%' src='/assets/images/confirmed/no-booking.svg' alt='img' />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default NotFound;
