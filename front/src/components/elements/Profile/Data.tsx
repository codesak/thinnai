import { Box, Divider, Typography } from '@mui/material';

const Data = () => {
	return (
		<Box>
			<Typography
				letterSpacing='0.015em'
				fontWeight={600}
				fontFamily='Montserrat'
				mt='1.875rem'
				fontSize='2.25rem'
			>
				Make your account data
			</Typography>
			<Typography
				color='#1A191E'
				fontFamily='Open Sans'
				fontSize='1.375rem'
				fontWeight={400}
				mb='3.75rem'
			>
				You can make request to download or delete your personal information from Thinnai.
			</Typography>

			<Box mb='2.5rem'>
				<Typography
					letterSpacing='0.015em'
					fontWeight={500}
					fontFamily='Montserrat'
					mt='1.563rem'
					fontSize='1.25rem'
					color='#1A191E'
				>
					Make your account data
				</Typography>
				<Typography
					color='#9E9E9E'
					fontFamily='Open Sans'
					fontSize='1.125rem'
					fontWeight={400}
					mb='1.25rem'
				>
					You can make request to download or delete your personal information from Thinnai.
				</Typography>
				<Divider />
			</Box>
			<Box>
				<Typography
					letterSpacing='0.015em'
					fontWeight={500}
					fontFamily='Montserrat'
					mt='1.563rem'
					fontSize='1.25rem'
					color='#1A191E'
				>
					Make your account data
				</Typography>
				<Typography
					color='#9E9E9E'
					fontFamily='Open Sans'
					fontSize='1.125rem'
					fontWeight={400}
					mb='1.25rem'
				>
					You can make request to download or delete your personal information from Thinnai.
				</Typography>
				<Divider />
			</Box>
		</Box>
	);
};

export default Data;
