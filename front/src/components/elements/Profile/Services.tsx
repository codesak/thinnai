import { Box, Typography } from '@mui/material';

const Services = () => {
	return (
		<Box>
			<Typography
				letterSpacing='0.015em'
				fontWeight={600}
				fontFamily='Montserrat'
				mt='1.563rem'
				fontSize='2.25rem'
				color='#1A191E'
			>
				Data Sharing
			</Typography>
			<Typography
				color='#6D6D6D'
				fontFamily='Open Sans'
				fontSize='1.375rem'
				fontWeight={400}
				mb='2.5rem'
			>
				Decide how your data is used for Thinnai research
			</Typography>

			<Typography
				letterSpacing='0.015em'
				fontWeight={500}
				fontFamily='Montserrat'
				mt='1.563rem'
				fontSize='1.25rem'
				color='#1A191E'
			>
				Include my profile & listing in search engines
			</Typography>
		</Box>
	);
};

export default Services;
