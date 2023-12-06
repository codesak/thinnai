import { CssBaseline, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

const HostFeatured = () => {
	const location = useLocation();
	const pathName = location.pathname;

	const featuredGuest = [
		{
			img: '/assets/images/1.png',
			link: 'https://hospitality.economictimes.indiatimes.com/news/operations/food-and-beverages/thinnai-the-airbnb-of-dining-spaces-to-launch-in-november/86864000',
		},
		{
			img: '/assets/images/2.png',
			link: 'https://www.deccanherald.com/metrolife/metrolife-your-bond-with-bengaluru/eat-listen-to-music-read-books-meet-in-others-homes-1065676.html',
		},
		{
			img: '/assets/images/3.png',
			link: 'https://www.newindianexpress.com/cities/bengaluru/2022/may/25/bengaluru-startup-offersprivate-dining-experience-with-favourite-food-2457504.html',
		},
		{
			img: '/assets/images/4.png',
			link: 'https://www.whatshot.in/bangalore/thinnai-v-175326',
		},
		{
			img: '/assets/images/5.png',
			link: 'https://www.instagram.com/reel/CiSNo8BqJSV/?utm_source=ig_web_copy_link ',
		},
	];
	const featuredHost = [
		{
			img: '/assets/images/host_landing/featured-1.svg',
			link: 'https://hospitality.economictimes.indiatimes.com/news/operations/food-and-beverages/thinnai-the-airbnb-of-dining-spaces-to-launch-in-november/86864000',
		},
		{
			img: '/assets/images/host_landing/featured-2.svg',
			link: 'https://www.deccanherald.com/metrolife/metrolife-your-bond-with-bengaluru/eat-listen-to-music-read-books-meet-in-others-homes-1065676.html',
		},
		{
			img: '/assets/images/host_landing/featured-3.svg',
			link: 'https://www.newindianexpress.com/cities/bengaluru/2022/may/25/bengaluru-startup-offersprivate-dining-experience-with-favourite-food-2457504.html',
		},
		{
			img: '/assets/images/host_landing/featured-4.svg',
			link: 'https://www.whatshot.in/bangalore/thinnai-v-175326',
		},
	];

	return (
		<Box
			mt={{
				xl: '220px',
				md: '220px',
				sm: '56px',
				xs: '56px',
			}}
			minHeight={{
				xl: '387px',
				md: '387px',
				sm: '177px',
				xs: '177px',
			}}
			bgcolor='#FCF5E9'
		>
			<Typography
				pt={{
					xl: '48px',
					md: '48px',
					sm: '16px',
					xs: '16px',
				}}
				color='#1A191E'
				fontWeight='700'
				fontFamily='Montserrat'
				fontSize={{
					xl: '36px',
					md: '36px',
					sm: '24px',
					xs: '24px',
				}}
				textAlign='center'
				lineHeight={{
					xl: '43.88px',
					md: '43.88px',
					sm: '29.26px',
					xs: '29.26px',
				}}
			>
				Featured on
			</Typography>
			{/* <Box
				marginTop={{
					xl: '52px',
					md: '52px',
					sm: '27px',
					xs: '27px',
				}}
				display='flex'
				justifyContent='center'
				alignItems='center'
				gap={{
					xl: '34px',
					md: '34px',
					sm: '34px',
					xs: '34px',
				}}
				width='80%'
				margin='auto'
				sx={{
					overflowX: 'auto',
				}}
			>
				<Box paddingLeft='20px'>
					<Box
						width={{
							xl: '290px',
							md: '290px',
							sm: '132px',
							xs: '132px',
						}}
						height={{
							xl: '149px',
							md: '149px',
							sm: '68px',
							xs: '68px',
						}}
						borderRadius='6px'
						overflow='hidden'
					>
						<img
							height='100%'
							width='100%'
							src={
								pathName === '/host_landing'
									? '/assets/images/host_landing/featured-1.svg'
									: '/assets/images/1.png'
							}
							alt=''
						/>
					</Box>
				</Box>
				<Box>
					<Box
						width={{
							xl: '290px',
							md: '290px',
							sm: '132px',
							xs: '132px',
						}}
						height={{
							xl: '149px',
							md: '149px',
							sm: '68px',
							xs: '68px',
						}}
						borderRadius='6px'
						overflow='hidden'
					>
						<img
							height='100%'
							width='100%'
							src={
								pathName === '/host_landing'
									? '/assets/images/host_landing/featured-1.svg'
									: '/assets/images/2.png'
							}
							alt=''
						/>
					</Box>
				</Box>
				<Box>
					<Box
						width={{
							xl: '290px',
							md: '290px',
							sm: '132px',
							xs: '132px',
						}}
						height={{
							xl: '149px',
							md: '149px',
							sm: '68px',
							xs: '68px',
						}}
						borderRadius='6px'
						overflow='hidden'
					>
						<img
							height='100%'
							width='100%'
							src={
								pathName === '/host_landing'
									? '/assets/images/host_landing/featured-1.svg'
									: '/assets/images/3.png'
							}
							alt=''
						/>
					</Box>
				</Box>
				<Box paddingRight='20px'>
					<Box
						width={{
							xl: '290px',
							md: '290px',
							sm: '132px',
							xs: '132px',
						}}
						height={{
							xl: '149px',
							md: '149px',
							sm: '68px',
							xs: '68px',
						}}
						borderRadius='6px'
						overflow='hidden'
					>
						<img
							height='100%'
							width='100%'
							src={
								pathName === '/host_landing'
									? '/assets/images/host_landing/featured-1.svg'
									: '/assets/images/4.png'
							}
							alt=''
						/>
					</Box>
				</Box>
				<Box paddingRight='20px'>
					<Box
						width={{
							xl: '290px',
							md: '290px',
							sm: '132px',
							xs: '132px',
						}}
						height={{
							xl: '149px',
							md: '149px',
							sm: '68px',
							xs: '68px',
						}}
						borderRadius='6px'
						overflow='hidden'
					>
						<img
							height='100%'
							width='100%'
							src={
								pathName === '/host_landing'
									? '/assets/images/host_landing/featured-1.svg'
									: '/assets/images/4.png'
							}
							alt=''
						/>
					</Box>
				</Box>
			</Box> */}
			<Box padding={{ xl: '0 10px' }}>
				<Grid
					container
					gap={{ md: 3, xs: 3 }}
					padding={{ sm: '30px 50px', xs: '30px 0px' }}
					wrap='nowrap'
					direction='row'
					className='carousel-cont'
					id='carousel'
					sx={{
						overflowX: 'scroll',
						'&::WebkitScrollbar': { display: 'none' },
						scrollbarWidth: '0px',
					}}
				>
					<CssBaseline />
					{featuredGuest.map((item: any, index: number) => (
						<Grid
							item
							key={index}
							xl={4}
							md={4}
							xs={12}
							display='flex'
							flexDirection='column'
							flexGrow='1'
							padding={2}
							width='100%'
							// overflow='hidden'
							sx={{
								borderRadius: '6px',
								zIndex: '1',
							}}
						>
							<a href={item.link} target='_blank' rel='noreferrer'>
								<Box
									margin='auto'
									width={{
										xs: '80px',
										md: '140px',
									}}
									height={{
										xs: '80px',
										md: '140px',
									}}
									sx={{ position: 'relative' }}
								>
									<img
										style={{
											width: '100%',
											height: '100%',
											borderRadius: '6px',
										}}
										src={item.img}
										alt=''
									/>
								</Box>
							</a>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default HostFeatured;
