import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';

const Payments = () => {
	const navigate = useNavigate();
	return (
		<Box>
			<Typography
				letterSpacing='0.015em'
				fontWeight={600}
				fontFamily='Montserrat'
				mt='1.875rem'
				fontSize='2.25rem'
			>
				Your Payments
			</Typography>
			<Typography color='#1A191E' fontFamily='Open Sans' fontSize='1.375rem' mb='3.75rem'>
				Keep tracks of all your payments & refunds
			</Typography>

			<Button
				onClick={() => navigate(ROUTES.PAYMENTS_REQUESTS)}
				variant='contained'
				sx={{
					bgcolor: '#000000',
					color: 'white',
					fontSize: '1.5rem',
					fontWeight: 600,
					fontFamily: 'Open Sans',
					padding: '0.75rem 2.5rem',
					textTransform: 'none',
				}}
			>
				Track Payments
			</Button>
		</Box>
	);
};

export default Payments;
