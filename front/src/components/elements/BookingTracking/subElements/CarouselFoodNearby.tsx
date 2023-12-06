import { Box, Button, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { RootState } from '../../../../store';

const CarouselFoodNearby = () => {
	const foodJoints = useSelector<RootState, any>(
		state => state.booking.booking.property?.foodJoints
	);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	/* const data = [
		{
			shop: 'Smokin’g Joes',
			title: 'Chinese , Thai , Indian',
			suggestion: 'Thai Green Curry, Makhni daal with Lacha Paratha',
			img: '/assets/images/ongoing_booking/nearby-food.svg',
			id: 1,
		},
		{
			shop: 'Smokin’g Joes',
			title: 'Chinese , Thai , Indian',
			suggestion: 'Thai Green Curry, Makhni daal with Lacha Paratha',
			img: '/assets/images/ongoing_booking/nearby-food.svg',
			id: 2,
		},
		{
			shop: 'Smokin’g Joes',
			title: 'Chinese , Thai , Indian',
			suggestion: 'Thai Green Curry, Makhni daal with Lacha Paratha',
			img: '/assets/images/ongoing_booking/nearby-food.svg',
			id: 3,
		},
		{
			shop: 'Smokin’g Joes',
			title: 'Chinese , Thai , Indian',
			suggestion: 'Thai Green Curry, Makhni daal with Lacha Paratha',
			img: '/assets/images/ongoing_booking/nearby-food.svg',
			id: 4,
		},
		{
			shop: 'Smokin’g Joes',
			title: 'Chinese , Thai , Indian',
			suggestion: 'Thai Green Curry, Makhni daal with Lacha Paratha',
			img: '/assets/images/ongoing_booking/nearby-food.svg',
			id: 5,
		},
	]; */

	return (
		<Box border='1px solid #C7C7C7' paddingY={2} borderRadius='6px'>
			<Slider {...settings}>
				{foodJoints &&
					foodJoints.map((joint: any) => (
						<Box key={joint._id}>
							<Box display={'flex'} justifyContent='space-between' alignItems='center'>
								<Box>
									<Button>
										<img src='/assets/images/ongoing_booking/left-arrow.svg' alt='' />
									</Button>
								</Box>
								<Box display='flex' gap={2}>
									<Box>
										<img src={joint.restaurantImage} alt='' />
									</Box>
									<Box>
										<Typography fontSize='0.75rem' fontWeight={400}>
											{joint.restaurantName}
										</Typography>
										<Typography fontSize='0.563rem' fontWeight={200}>
											{joint.cuisineType}
										</Typography>
										<Box height={{ sm: 7, xs: 7 }} />
										<Divider />
										<Box height={{ sm: 5, xs: 5 }} />
										<Typography fontSize='0.5rem' fontWeight={400}>
											Host Suggestion:
										</Typography>
										<Typography fontSize='0.5rem' color='#868686' fontWeight={400}>
											{joint.foodSuggestions}
										</Typography>
									</Box>
								</Box>
								<Box>
									<Button>
										<img src='/assets/images/ongoing_booking/right-arrow.svg' alt='' />
									</Button>
								</Box>
							</Box>
						</Box>
					))}
			</Slider>
		</Box>
	);
};

export default CarouselFoodNearby;
