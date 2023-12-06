import { Box, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import Rating from '../Common/Rating';

const MyReviews = () => {
	const [rating] = useState({
		good: 125,
		neutral: 50,
		bad: 10,
	});

	const data = [
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 1,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 2,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 3,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 4,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 5,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 6,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 7,
			price: 500,
		},
		{
			name: 'Thinnai host 1',
			comment:
				'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
			img: '/assets/images/profile/profile-2.svg',
			reaction: '/assets/images/profile/happy.svg',
			id: 8,
			price: 500,
		},
	];
	return (
		<Box
			paddingTop='3.75rem'
			margin={{
				xl: '0px 3.75rem',
				md: '0px 3.75rem',
				sm: '0px 1.875rem',
				xs: '0px 1.875rem',
			}}
		>
			<Typography fontSize='2.25rem'>My Reviews</Typography>
			<Box width='70%' marginTop='1.25rem'>
				<Box height={10} />
				<Box>
					<Rating data={rating} height={{ sm: 35, xs: 31.5 }} />
				</Box>
				<Box height={{ sm: 28, xs: 18 }} />
			</Box>
			<Box>
				{data.map(review => (
					<>
						<Box
							key={review.id}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							marginX={1}
						>
							<Box marginBottom='0.938rem' display='flex' alignItems='center' gap={4}>
								<Box>
									<img width='89px' src='/assets/images/profile/profile-2.svg' alt='' />
								</Box>
								<Box>
									<Box display='flex' alignItems='center' gap={2}>
										<Typography fontSize='1.5rem' fontWeight='400'>
											{review.name}
										</Typography>
										<img src='/assets/images/profile/happy.svg' alt='' />
									</Box>
									<Typography fontFamily='Montserrat' fontSize='1.125rem' color='#656565'>
										{review.comment}
									</Typography>
								</Box>
							</Box>
							<Typography
								sx={{
									fontSize: '1.5rem',
									textTransform: 'none',
									color: '#2B941C',
								}}
							>
								₹ {review.price}
							</Typography>
						</Box>
						<Box marginBottom='0.938rem'>
							<Divider />
						</Box>
					</>
				))}
			</Box>
		</Box>
	);
};

export default MyReviews;
