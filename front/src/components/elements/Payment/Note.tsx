import { Box, Typography } from '@mui/material';

const Note = () => {
	return (
		<Box
			bgcolor='#EEFCEC'
			display='flex'
			flexDirection={{
				xl: 'row',
				md: 'row',
				sm: 'row',
				xs: 'row',
			}}
			gap='0.625rem'
			borderRadius='4px'
			padding='1.25rem'
		>
			<Typography color='#228514' fontSize='1rem' whiteSpace='nowrap'>
				Note :
			</Typography>
			<Typography fontSize='1rem' color='#383838'>
				The balance amount if any, will be refunded back to your account
			</Typography>
		</Box>
	);
};

export default Note;
