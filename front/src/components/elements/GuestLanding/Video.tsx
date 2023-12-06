import Box from '@mui/material/Box';

const Video = () => {
	return (
		<Box
			position='relative'
			minHeight={{ md: '500px', sm: '400px', xs: '350px' }}
			display='flex'
			width='100%'
			justifyContent='center'
		>
			<Box position='absolute' width='100%'>
				<Box height={{ sm: 80, xs: 90 }} />
				<img style={{ width: '100%' }} src='/assets/images/page/Vector1.svg' alt='' />
			</Box>
			<Box position='absolute' width='100%'>
				<Box height={{ sm: 100, xs: 130 }} />
				<img style={{ width: '100%' }} src='/assets/images/page/Vector2.svg' alt='' />
			</Box>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				width={{ md: '72%', xs: '82%' }}
			>
				<iframe
					style={{ width: '100%', zIndex: '1', height: '100%', borderRadius: '25px' }}
					src='https://www.youtube.com/embed/-SixQVOxPe0'
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				></iframe>
			</Box>
		</Box>
	);
};

export default Video;
