import FlagIcon from '@mui/icons-material/Flag';
import Box from '@mui/material/Box';
import DetailsSectionDivider from './DetailsSectionDivider';

export default function ReportThinnai() {
	return (
		<Box
			width='100%'
			marginBottom={{
				md: '0',
				xs: '4rem',
			}}
		>
			<Box
				paddingRight={{ md: '5rem', sm: '0rem' }}
				display='flex'
				alignItems='center'
				fontFamily='Open Sans'
				fontStyle='normal'
				fontWeight='600'
				fontSize={{md:'1.125rem',xs:"12px"}}
				lineHeight='1.6em'
				sx={{ textDecorationLine: 'underline' }}
				color='#383838'
			>
				<FlagIcon sx={{ marginRight:'0.5rem',
				'@media (max-width: 600px)': {
						marginRight:'0.1rem',
						 height:"15px"
					}, }}/>
				 Report this Host/Thinnai space
			</Box>
			<DetailsSectionDivider />
		</Box>
	);
}
