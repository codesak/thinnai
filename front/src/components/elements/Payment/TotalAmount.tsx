import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../store';
import { ROUTES } from '../../../utils/routing/routes';

const TotalAmount = ({totalAmt}:any) => {
	const location = useLocation();
	const pathName = location.pathname;

	const [amount, setAmount] = useState<number>(0);

	const getIndex = (enquiries: any) => {
		const index = enquiries.reduce(
			(iMax: any, x: any, i: any, arr: any) => (x.amount > arr[iMax].amount ? i : iMax),
			0
		);
		return index;
	};

	// const enquiries = useSelector<RootState, any>(state => state.enquiry.enquiries);
	// const bookingEnquiries = useSelector<RootState, any>(state => state.booking.enquiryStatus);
	// const cartAmount = useSelector<RootState, any>(state => state.cart.amount);
	// useEffect(() => {
	// 	if (pathName === ROUTES.ENQUIRY_STATUS) {
	// 		const index = getIndex(bookingEnquiries);
	// 		setAmount(bookingEnquiries[index]?.amount);
	// 	} else {
	// 		const index = getIndex(enquiries);
	// 		setAmount(enquiries[index]?.amount);
	// 	}
	// }, [bookingEnquiries, enquiries, pathName]);

	// const [totalAmount, setTotalAmount] = useState<number>(0);
	// useEffect(() => {
	// 	const convenienceFee = Number((amount * 0.095).toFixed(2));
	// 	const gst = Number((convenienceFee * 0.18).toFixed(2));
	// 	setTotalAmount(amount + convenienceFee + gst);
	// }, [amount]);
	const {actualAmount} = totalAmt
	const total = Number(actualAmount?.toFixed(2))
	return (
		<Box
			padding='1rem 0'
		>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Typography
					fontFamily='Open sans'
					fontWeight={600}
					fontSize={{
						xl: '1.3rem',
						md: '1.3rem',
						sm: '1.25rem',
						xs: '1',
					}}
				>
					{pathName === '/inquiry' ? 'Total Paid amount' : 'Total amount'}
				</Typography>
				<Box
					border={pathName === '/inquiry' ? 'none' : '1px'}
					textAlign='center'
					borderRadius='212px'
					borderColor='#24BA0E'
					style={{ userSelect: 'none' }}
				>
					<Typography
						fontSize={{
							xl: '1.3rem',
							md: '1.3rem',
							sm: '1.25rem',
							xs: '1.25rem',
						}}
						fontWeight={600}
						color={pathName === '/inquiry' ? '#000000' : '#000'}
					>
						₹ {total}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default TotalAmount;
