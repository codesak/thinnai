import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';


const TestPaymentResponse = () => {
	

	return <>
	 <Box sx={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="subtitle1" component="p" gutterBottom>
        Thank you for your purchase! Your payment has been successfully processed.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Back to Home
      </Button>
    </Box>
	</>
};

export default TestPaymentResponse;
