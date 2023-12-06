import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../store';
import summary from '../../styles/Payment/summary.module.css'

const SummaryData = ({amount}:any) => {
	// const {addOnServicePrice,cleaningPrice,cutleryDiscount,gstAmount,nominalPrice,serviceCharge} = amount?.priceBreakdown
	const location = useLocation();
	const congratulations = location.pathname;

	// const enquiries = useSelector<RootState, any>(state => state.enquiry.enquiries);
	// const index = enquiries.reduce(
	// 	(iMax: any, x: any, i: any, arr: any) => (x.amount > arr[iMax].amount ? i : iMax),
	// 	0
	// );
	// const amount = useSelector<RootState, any>(state => state.enquiry.enquiries[index]?.amount) ?? 0;


	return (
		<Box className={summary.wrapper}
			padding={congratulations ? '1.25rem 0px 0px 0px' : '2.5rem 3.125rem 0.938rem 3.125rem'}
			marginX={{
				xl: congratulations ? '0px' : '1.875rem',
				md: congratulations ? '0px' : '1.875rem',
				sm: congratulations ? '0px' : '1.875rem',
				xs: '0',
			}}
		>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font} color='#383838'>
					Nominal Price
				</Typography>
				<Typography className={summary.font}>
					₹ {amount?.priceBreakdown?.nominalPrice}
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font} color='#383838'>
					Services & Add Ons
				</Typography>
				<Typography className={summary.font}>
					₹ {amount?.priceBreakdown?.addOnServicePrice}
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font}>
					Cleaning Charges
				</Typography>
				<Typography className={summary.font}>
					₹ {amount?.priceBreakdown?.cleaningPrice}

				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font}>
					Cutlery Discount
				</Typography>
				<Typography className={summary.font}>
					₹ {Number(amount?.priceBreakdown?.cutleryDiscount.toFixed(2))}

				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font}>
					Service Charge
				</Typography>
				<Typography className={summary.font}>
					₹ {Number(amount?.priceBreakdown?.serviceCharge.toFixed(2))}
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={congratulations ? '5px' : '1.5rem'}
			>
				<Typography className={summary.font}>
					GST (18%)
				</Typography>
				<Typography className={summary.font}>
					₹ {Number(amount?.priceBreakdown?.gstAmount.toFixed(2))}
				</Typography>
			</Box>
		</Box>
	);
};

export default SummaryData;
