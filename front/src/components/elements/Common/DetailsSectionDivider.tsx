import { Box, Divider } from '@mui/material';

export default function DetailsSectionDivider() {
	return (
		<Box>
			<Box height={{ sm: 24, xs: 20 }} />
			<Divider />
			<Box height={{ sm: 24, xs: 20 }} />
		</Box>
	);
}
