import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from 'react-slick';
import { S3_BASE } from '../../../utils/consts';
import '../../styles/Detail/carousel.scss';

function PropertyReviewsCarousel({ reviews }: { reviews: any[] }) {
	const settings = {
		infinite: true,
		speed: 500,
		dots: true,
		slidesToShow: 1,
		centerMode: false,
		centerPadding: '0px',
	};

	return (
		<Box>
			{/* <Box className='detail__header' width='100%' mt={2}>
				Top Reviews
			</Box> */}
			<Box display='flex' justifyContent='center' className='reviewCarousel'>
				<Box
					width={{
						md: '70vw',
						xs: '40rem',
					}}
				>
					<Slider {...settings}>
						{reviews?.map((item: any, index) => (
							<div key={index}>
								<Box
									padding={{ md: '3rem 4rem',xs:'2rem 2rem 2rem 3.5rem' }}
									sx={{
										background: ['#EEFCEC', '#F3F1FF'][index % 2],
										borderRadius: '20px',
									}}
									minHeight={{sm:'400px', xs:'300px'}}
								>
									<Grid container width='100%' wrap='nowrap'>
										<Grid item xl={1.5} sm={1.5} xs={2.5}>
											<Box
												width={{ xl: '80%', xs: '80%' }}
												borderRadius='50%'
												sx={{ aspectRatio: '1' }}
											>
												<img
													style={{ objectFit: 'contain', width: '100%', borderRadius: '50%' }}
													src={
														item.reviewer.profileImage
															? S3_BASE + item.reviewer.profileImage
															: item.reviewer.avatar
													}
													alt=''
												/>
											</Box>
										</Grid>
										<Grid item xl={10.5} sm={10.5} xs={9.5}>
											<Box
												fontSize={{ sm: '1rem', xs: '0.5rem' }}
												paddingTop='0.5rem'
												sx={{
													fontFamily: 'Open Sans',
													fontStyle: 'normal',
												}}
											>
												<Box display='flex' justifyContent='space-between' flexDirection={{xs:'column',md:'row'}}>
													<Typography
														sx={{
															fontWeight: '700',
															color: '#272F3D',
															fontSize: '1.75rem',
															fontFamily: 'Open Sans',
														}}
													>
														{item.reviewer.firstName}
													</Typography>
													<Box
														fontSize={{ md: '18px', sm: '0.8rem', xs: '1.2rem' }}
														sx={{
															fontWeight: '300',
															color: '#383838',
														}}
													>
														reviewed on{' '}
														{new Date(item.reviewedOn.toString()).toLocaleDateString('default', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														})}
													</Box>
												</Box>
												<Box height='1rem' />
												<Box
													width={{ md: '95%', sm: '98%', xs: '100%' }}
													fontSize='1.4rem'
													fontFamily='Open Sans'
												>
													"{item.review}"
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</div>
						))}
					</Slider>
				</Box>
			</Box>
		</Box>
	);
}

export default PropertyReviewsCarousel;
