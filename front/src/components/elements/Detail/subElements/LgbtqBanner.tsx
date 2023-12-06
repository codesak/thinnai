import { Box, Typography } from '@mui/material';
import React from 'react';
import DetailsSectionDivider from '../../Common/DetailsSectionDivider';

export default function LgbtqBanner() {
	return (
		<Box>
			<Box display='flex' justifyContent='space-between' alignItems='center' padding={{xs:'0 1.2rem' ,md:'0 1rem'}}>
				<Box
				sx={{display:'flex', alignItem:'center'}}
					width={{xs:"2.5rem",sm:'2.8rem', xl:'3.8rem'}}
				>
					<img
						style={{
							width: '100%',
							objectFit: 'cover',
						}}
						src='/assets/images/detail/LGBTQ.svg'
						alt=''
					/>
				</Box>
				<Typography
					fontSize={{
						xl: '2rem',
						md: '1.5rem',
						sm: '1.7rem',
						xs: '1rem',
					}}
					lineHeight={{
						xl: '3.075rem',
						md: '3.375rem',
						sm: '3.375rem',
						xs: '2rem',
					}}
					sx={{
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: 600,
						textAlign: 'center',
						background:
							'linear-gradient(180deg, #E40303 20.45%, #FF8C00 32.95%, #F3E200 44.67%, #008026 56%, #004DFF 66.94%, #750787 77.88%)',
						backgroundClip: 'text',
						textFillColor: 'transparent',
						'@media (max-width: 422px)': {
							fontSize: '1.2rem',
							lineHeight: '1.3rem',
						},
					}}
				>
					LGBTQ Friendly Space
				</Typography>
				<Box
				sx={{display:'flex', alignItem:'center'}}

				  width={{xs:"2.5rem",sm:'2.8rem', xl:'3.8rem'}}
				>
					<img
						style={{
							objectFit: 'cover',
							width: '100%'
						}}
						src='/assets/images/detail/LGBTQ.svg'
						alt=''
					/>
				</Box>
			</Box>
		</Box>
	);
}
