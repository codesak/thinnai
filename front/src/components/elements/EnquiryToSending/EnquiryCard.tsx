import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, Typography } from '@mui/material';
import { Autoplay, EffectCube, Pagination } from 'swiper';
import '../../styles/Enquiry/Enquiry.scss';

const EnquiryCard = ({ slide, images }: any) => {
	return (
		<>
			<Swiper
				style={{
					width: '100%',
					height: '266px',
				}}
				grabCursor={true}
				cubeEffect={{
					slideShadows: true,
					shadowOffset: 10,
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, EffectCube, Pagination]}
				className='mySwiper'
			>
				{images.map((element: any) => (
					<SwiperSlide key={element?.length}>
						<img width='100%' height='266px' src={element} alt='img' />
					</SwiperSlide>
				))}
			</Swiper>
			<Box display='flex' justifyContent='space-between' paddingX='0.813rem'>
				<Box mt='0.507rem'>
					<Typography fontSize='1rem' fontWeight='600' fontFamily='Open Sans'>
						{slide.title}
					</Typography>
					<Box mb='0.313rem' display='flex' gap='0.313rem' alignItems='center'>
						<PlaceIcon
							sx={{
								color: '#000000',
								fontSize: '0.938rem',
							}}
						/>
						<Typography fontSize='0.75rem' fontWeight='400' fontFamily='Open Sans' color='#6D6D6D'>
							{slide.location}
						</Typography>
					</Box>
					<Box display='flex' gap='0.313rem' alignItems='center'>
						<EmojiEmotionsIcon
							sx={{
								color: '#000000',
								fontSize: '0.938rem',
							}}
						/>
						<Typography fontSize='0.75rem' fontWeight='400' fontFamily='Open Sans' color='#6D6D6D'>
							{slide.hosts}
						</Typography>
					</Box>
				</Box>
				<Box>
					<Typography
						fontSize='0.625rem'
						fontWeight='300'
						fontFamily='Open Sans'
						color='#000000'
						marginBottom='0.588rem'
					>
						2 Guest : {slide.hours} Hour
					</Typography>
					<Button
						sx={{
							height: '25.88px',
							width: '76.9px',
							borderRadius: '14px',
							border: '1px solid #2B941C',
							fontSize: '0.875rem',
							color: '#2B941C',
							fontFamily: 'Inter',
							fontWeight: '600',
						}}
					>
						₹ {slide.price}
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default EnquiryCard;
