import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Grid, Modal, Typography, ratingClasses } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { S3_BASE } from '../../../utils/consts';
import { ROUTES } from '../../../utils/routing/routes';
import Allowed from '../Common/Allowed';
import Amenities from '../Common/Amenities';
import DetailsListItem from '../Common/DetailsListItem';
import DetailsSectionDivider from '../Common/DetailsSectionDivider';
import FAQs from '../Common/FAQs';
import Policies from '../Common/Policies';
import Rating from '../Common/Rating';
import ReportThinnai from '../Common/ReportThinnai';
import PropertyReviewsCarousel from '../Common/ReviewCarousel';
import Marker from '../Common/subElements/Marker';
import Counter from '../Explore/Counter';
import Loading from '../Loading/Loading';
import BestSuitedFor from './subElements/BestSuitedFor';
import LgbtqBanner from './subElements/LgbtqBanner';
import Price from './subElements/Price';
import ShareModal from './subElements/ShareModal';
import heart from "../../../assets/images/ic_heart.svg"
import star from "../../../assets/images/ic_star.svg"
import CustomerSupport from '../../Pages/BookingTrackingPages/CustomerSupport';
import '../../../components/styles/Detail/detail.scss'
import GetDirections from '../../Pages/BookingTrackingPages/GetDirections';

const AboutPlace = ({amount}:any) => {
	const property: any = useSelector<RootState, string>(state => state.details.property);
	const reviewCount = useSelector<RootState, number>(state => state.details.reviewCount);

	const allowedActivitiesMap = useSelector<RootState, any>(
		state => state.appSettings.allowedActivitiesMap
	);

	const [reviewAvatars, setReviewAvatars] = useState<string[]>([]);
	const [errMsg, setErrMsg] = useState<boolean>(false)
	const [description, setDescription] = useState<number>(160)

	useEffect(() => {
		if (property && property.reviews) {
			const reviews = property.reviews;
			const reviewAvatars: string[] = [];
			reviews.map((review: any, index: number) => {
				if (review.reviewer.profileImage && index < 5) {
					reviewAvatars.push(review.reviewer.profileImage);
				}
			});
			setReviewAvatars(reviewAvatars);
		}
	}, []);

	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	//modal
	const style = {
		position: 'absolute' as 'absolute',
		top:{md:'50%', xs:'none'},
		left:{md:'50%', xs:'none'},
		bottom:{md:'none', xs:'0'},
		height:250,
		transform:{xs:'none', md:'translate(-50%, -50%)'},
		bgcolor: 'background.paper',
		border:'none',
		borderRadius:{md:'12px', xs:'12px 12px 0 0'},
		outline:'none',
		boxShadow: 24,
	  };
	const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
	if (!allowedActivitiesMap || !property) {
		return (
			<Box
				width={{
					md: '30%',
					sm: '40%',
					xs: '60%',
				}}
			>
				<Loading />
			</Box>
		);
	}
	let url = `${window.location.origin}${ROUTES.PROPERTY_DETAIL}/${property?.slugString}`
	let text = ` Hey!! Check out this Amazing Thinnai Space - ${property?.propertyName}. Let’s book it.`;
	const shareDetails = {url ,text };

	return (<>
	{open && <Modal
	open={open}
	onClose={handleClose}
	aria-labelledby="modal-modal-title"
	aria-describedby="modal-modal-description"
	disableScrollLock={true}
     >
		<Box sx={style} width={{md:'500px', xs:'100%'}}>
     <ShareModal
			handleClose={setOpen}
			shareData={shareDetails}
			modalVisible={open}
			/>
			</Box>
	</Modal>}
		<Box
			marginTop={{
				xs: 3,
				sm: 0,
			}}
			width={{
				xl: '100%',
			}}
		>
			<Box>
				<Box display='flex' alignItems='center' gap={{ sm: 1, xs: 1 }}>
					<Box
						// fontSize={{ md: '1.625rem', sm: '1.6rem', xs: '1.3rem' }}
						// sx={{
						// 	fontFamily: 'Open Sans',
						// 	fontStyle: 'normal',
						// 	fontWeight: '600',
						// 	lineHeight: '1.6em !important',
						// 	color: '#000000',
						// }}
						className='aboutPlace__header'
					>
						{property.propertyName}
					</Box>
					<Box
						style={{ cursor: 'pointer' }}
						display='flex'
						marginLeft={{
							sm: '3rem',
							xs: '1rem',
						}}
						onClick={() => {
					        if(navigator.share){navigator.share({
								url: `${window.location.origin}${ROUTES.PROPERTY_DETAIL}/${property.slugString}`,
								text: ` Hey!! Check out this Amazing Thinnai Space - ${property?.propertyName}. Let’s book it.`,
							});}else{
								setOpen(true);
							}
						}}
					>
						<ShareOutlinedIcon fontSize='small' />
					</Box>
				</Box>
				<Box display='flex' justifyContent='space-between' marginTop='.8rem'>
					<Box display='flex' flexDirection='column' gap={1.1}>
						<Box display='flex' alignItems='center' gap={{ sm: 1, xs: 0.2 }}>
							<Box display='flex' alignItems='center' width={{xs:'20px', md:'23px'}} height={{sx:'20px', md:'23px'}}>
								<LocationOnIcon
									sx={{
										width:'100%',
										height:'100%',
										color: '#D23535',
										fontSize: '1.375rem',
										'@media (max-width: 600px)': { fontSize: '1.125rem' },
									}}
								/>
							</Box>
							<Box
								fontWeight='500'
								fontSize={{ xl:'1rem',md: '1rem', sm: '0.95rem', xs: '0.85rem' }}
								lineHeight='1.8em'
							>
								{`${property?.area}, ${property?.city}`}
							</Box>
						</Box>
						<Box display='flex' alignItems='center' gap={{ sm: 1, xs: 0.2 }}>
							<Box display='flex' alignItems='center' padding='3px' width={{xs:'20px', md:'23px'}} height={{sx:'20px', md:'23px'}}>
								
								<img src={property?.happyCustomers !== 0? `${heart}`:`${star}`}
                                  style={{width:'100%',
								          height:'100%',
										  objectFit:'contain',
                                          color: '#000000',
                                       }}
                                  alt= "img"
                                 />
							</Box>
							<Box
								fontWeight='500'
								fontSize={{ xl: '1rem', md: '1rem', sm: '0.95rem', xs: '0.85rem' }}
								lineHeight='1.8em'
								color={property?.happyCustomers === 0? `${'#B78622'}`:`${'#58AA06'}`}
							>
								{property?.happyCustomers === 0? "NEW SPACE": `${property?.happyCustomers} Happy Guest `}
							</Box>
						</Box>
					</Box>
				</Box>
				<DetailsSectionDivider />

                  {property?.addOnServices?.length > 0 && <>
                  {property?.addOnServices?.map(
                          (item: any, index: number) => (
							<>  <Box className='aboutPlace__header'>Special Services</Box>
							<Box height={5}/>
                            <Box
                              width={{xs:'100%', sm:'70%'}}
                              border="0.5px solid #868686"
                              borderRadius="5px"
                              padding={{
                                xl: '1.25rem',
                                md: '0.8rem',
                                sm: '1.25rem',
                                xs: '1.25rem 0',
                              }}
                              gap={{
                                xl: '1.75rem',
                                md: '0.8rem',
                                sm: '1.75rem',
                                xs: '0.75rem',
                              }}
                              style={{
                                cursor: 'pointer',
                              }}
                              display="flex"
                              key={index}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                                gap="0.625rem"
                                paddingLeft={{
                                  sm: '0rem',
                                  xs: '1rem',
                                }}
                              >
                                <img
                                  style={{
                                    width:
                                      window.innerWidth > 600 ? '8vw' : '30vw',
                                    objectFit: 'fill',
                                    objectPosition: 'center',
                                    borderRadius: '5px',
                                  }}
                                  src={`${S3_BASE}${item.addOnThumbnail}`}
                                  alt=""
                                  height="100vh"
                                />
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-around"
                              >
                                <Box>
                                  <Typography
                                    fontSize={{
                                      xs: '1.25rem',
                                    }}
                                    sx={{
                                      '@media (max-width: 1024px)': {
                                        fontSize: '0.8rem',
                                      },
                                    }}
                                    lineHeight="1.4em"
                                    fontWeight={600}
                                    fontFamily="Open Sans"
                                    color="#000000"
                                  >
                                    {item.addOnServiceTitle}
                                  </Typography>
                                  <Typography
                                    fontSize="0.75rem"
                                    lineHeight="1.2em"
                                    fontWeight={400}
                                    fontFamily="Open Sans"
                                    color="#383838"
                                    marginBottom="0.569rem"
                                  >
                                    {item.addOnDescription}
                                  </Typography>
                                </Box>
                                <Box>
                                  {item.addOnPrice !== 0 ?<Typography
                                    fontSize="0.875rem"
                                    lineHeight="1.3em"
                                    fontWeight={400}
                                    fontFamily="Open Sans"
                                    marginBottom="0.569rem"
                                    color="#656565"
                                    letterSpacing="0.02em"
                                  >
                                    Price:{' '}
                                    <span
                                      style={{
                                        fontWeight: '800',
                                      }}
                                    >
                                      ₹{item?.addOnPrice}
                                    </span>
                                  </Typography>:
								  <Typography
                                    fontSize="0.875rem"
                                    lineHeight="1.3em"
                                    fontWeight={400}
                                    fontFamily="Open Sans"
                                    marginBottom="0.569rem"
                                    color="#58AA06"
                                    letterSpacing="0.02em"
                                  >
                                    Free
                                  </Typography>}
                                </Box>
                              </Box>
                            </Box>
							</>
                          )
                        )}
                        <DetailsSectionDivider />
                        </>}

				{property?.services?.length !==0 &&<> 
				<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
					<Allowed services={property?.services} />
				</Box></>}
			</Box>
			<DetailsSectionDivider />
			{/* { (( property?.properties?.ratings?.cleanliness?.good + property?.properties?.ratings?.cleanliness?.bad + property?.properties?.ratings?.cleanliness?.neutral + property?.properties?.ratings?.checkin?.good + property?.properties?.ratings?.checkin?.bad + property?.properties?.ratings?.checkin?.neutral)!==0) &&<>
			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Box display='flex' justifyContent='space-between'>
					<Box className='aboutPlace__header'>Ratings</Box>
				</Box>
				{(( property?.properties?.ratings?.cleanliness?.good + property?.properties?.ratings?.cleanliness?.bad + property?.properties?.ratings?.cleanliness?.neutral )) &&<>  <Box height={{ sm: 30, xs: 18 }} />
				<Box
					sx={{
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: '600',
						fontSize: '1rem',
						lineHeight: '27px',
						color: '#383838',
					}}
				>
					Cleanliness
				</Box>
				<Box height={10} />
				
				  <Box>
					<Rating data={property?.properties?.ratings?.cleanliness} height={{ sm: 35, xs: 31.5 }} />
				</Box>
				</>}
				{((property?.properties?.ratings?.checkin?.good + property?.properties?.ratings?.checkin?.bad + property?.properties?.ratings?.checkin?.neutral)!==0) && <> <Box height={{ sm: 28, xs: 18 }} />
				<Box
					sx={{
						fontFamily: 'Open Sans',
						fontStyle: 'normal',
						fontWeight: '600',
						fontSize: '1rem',
						lineHeight: '27px',
						color: '#383838',
					}}
				>
					Check - in
				</Box>
				<Box height={10} />
				<Box>
					<Rating data={property?.properties?.ratings?.checkin} height={{ sm: 35, xs: 31.5 }} />
				</Box>
				</>}
			</Box> 
			<DetailsSectionDivider />
			</>} */}

			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Box className='aboutPlace__header'>About Thinnai Space</Box>
				<Box height={{ sm: 25, xs: 10 }} />
				<Box className='aboutPlace__p'>{property?.propertyDescription?.length <160 ? property?.propertyDescription : property?.propertyDescription?.substring(0,description)}
				</Box>
				{property?.propertyDescription?.length > 160 && <p
				onClick={()=>setDescription(description === 160 ? property?.propertyDescription.length: 160)}
				style={{
					color: "#000000",
					fontWeight: "600",
					fontSize: "0.875rem",
					cursor:'pointer',
					margin:'0'
				  }}
				>
			    	Read {description === 160 ? `More`:`Less`}
				</p>}
				
			</Box>
			<DetailsSectionDivider />
			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				{property.reviews && property.reviews.length > 0 && (<>
					<Box display='flex' justifyContent='space-between'>
					  <Box className='detail__header' width='100%'>
				        Top Reviews
			           </Box>
					   <Box
						display='flex'
						alignItems='center'
						paddingRight='3rem'
						justifyContent={{ sm: 'flex-end', xs: 'space-between' }}
						flexGrow={{ xs: '0.12', sm: '0' }}
						width='40%'
					>
						<Box
							width='40%'
							height='100%'
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Grid container wrap='nowrap' width='100%' height='60%' justifyContent='center'>
								{reviewAvatars?.map((item, index) => (
									<Grid item xl={1.6} md={1.6} sm={1.6} xs={2} sx={{}} key={index}>
										<Box
											width={{ sm: '25px', xs: '20px' }}
											height={{ sm: '25px', xs: '20px' }}
											display='flex'
											alignItems='center'
											justifyContent='center'
											sx={{
												border: '0.5px solid white',
												borderRadius: '50%',
												overflow: 'hidden',
											}}
										>
											<img
												style={{
													objectFit: 'cover',
													width: '25px',
													height: '25px',
												}}
												src={S3_BASE + item}
												alt=''
											/>
										</Box>
									</Grid>
								))}
							</Grid>
						</Box>
						<Box
							ml={0.5}
							flexGrow={{ xs: '1', sm: '0' }}
							fontSize={{ sm: '0.95vw', xs: '0.813rem' }}
							textAlign={{ xs: 'end', sm: 'initial' }}
							fontWeight={{ sm: '600', xs: 'bold' }}
							whiteSpace='nowrap'
							sx={{
								fontFamily: "'Open Sans', sans-serif",
								fontStyle: 'normal',
								lineHeight: '25px',
							}}
						>
							{`+${reviewCount} Reviews`}
						</Box>
					</Box>
					</Box>
					   <PropertyReviewsCarousel reviews={property.reviews} />
					   </>)}
			</Box>

			{property.reviews && property.reviews.length > 0 && <DetailsSectionDivider />}
			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Amenities amenities={property.amenities} />
			</Box>

			<DetailsSectionDivider />

			{/* <Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<BestSuitedFor activities={property.activities} />
			</Box> */}


			{/* <Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				{property?.preferredGuests?.includes('lgbtq_friendly') && <LgbtqBanner />}
			</Box> */}

			{/* {property?.preferredGuests?.includes('lgbtq_friendly') && <DetailsSectionDivider />} */}

			

			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Box display='flex' alignItems='center' className='aboutPlace__header'>Pricing
					</Box>
					<Box>
						<Counter guest={true} maxValue={property?.maxGuestCount} setErrMsg={setErrMsg} />
					</Box>
				</Box>
				{errMsg && <Typography fontFamily='inherit' color="#ff3333">This Property allows a maximum {property?.maxGuestCount} guest</Typography>}
				<Box>
					<Price />
				</Box>
			</Box>
			<DetailsSectionDivider />
			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Box className='aboutPlace__header'>Click To Know The Location</Box>
				<Box height={10} />
				<Typography className='aboutPlace__p'>This Location is within 100 meters of space.The exact location will be shared on booking day.</Typography>
				<Box height={15}/>
				<Box height={{ md: '15rem', sm: '350px', xs: '200px' }} style={{cursor:'pointer'}} borderRadius='10rem' onClick={() => window.open(property?.approximateLocationUrl, '_blank')}>
					<img src="/assets/images/map.png" style={{width:'100%',height:'100%',objectFit:'cover'}} alt="" />
				</Box>
			</Box>
			<DetailsSectionDivider />

			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<Box display='flex' justifyContent='space-between'>
					<Box className='aboutPlace__header'>Hosted By</Box>

				</Box>
				<Box height={{ md: 25, sm: 40, xs: 40 }} />
				<Box display='flex' justifyContent='space-between'>
					<Box
						display='flex'
						width='50%'
						gap={2.5}
						alignItems={{ sm: 'flex-start', xs: 'center' }}
						flexGrow='1'
					>
						<Box
							display='flex'
							width={{ xl: '12%', md: '12%', sm: '15%', xs: '18%' }}
							alignItems={{ xs: 'center' }}
							sx={{ aspectRatio: '1', borderRadius: '50%' }}
						>
							<img
								style={{ objectFit: 'contain', width: '100%', borderRadius: '50%' }}
								src={
									property?.userData?.user?.profileImage
										? S3_BASE + property?.userData?.user?.profileImage
										: property?.userData?.user?.avatar
								}
								alt='img'
							/>
						</Box>
						<Box display='flex' flexDirection='column' marginTop={{ xl: 3, sm: 1, xs: 0 }}>
							<Box display='flex' alignItems='center'>
								<Box
									fontSize={{ xl: '1.3rem', sm: '1.4rem', xs: '0.9rem' }}
									lineHeight='1.4em'
									sx={{
										fontWeight: '600',
										color: '#383838',
									}}
								>
									{property?.userData?.user?.firstName}
								</Box>
								<Box display='flex' alignItems='center' ml='5px'>
									<CheckCircleIcon sx={{ fontSize: '0.938rem', color: '#24BA0E' }} />
								</Box>
							</Box>
							<Box
								fontWeight='500'
								fontSize={{ xl: '1rem', md: '1rem', sm: '0.95rem', xs: '0.85rem' }}
								lineHeight='1.8em'
								color={property?.happyCustomers === 0? `${'#B78622'}`:`${'#58AA06'}`}
							>
								{`${property?.happyCustomers === 0? `New Host`:property?.happyCustomers}`}{property?.happyCustomers===0?``:` Guest Hosted`}
							</Box>
						</Box>
					</Box>
					<Box
						fontSize={{
							xl: '0.9rem',
							md: '0.9rem',
							sm: '0.85rem',
							xs: '0.6rem',
						}}
						lineHeight='1.5em'
						sx={{
							fontFamily: 'Open Sans',
							fontStyle: 'normal',
							fontWeight: '400',
							lineHeight: '27px',
							color: '#595959',
						}}
					>
						{property?.userData?.acceptanceRate && (
							<Box height={{ xs: '18px' }}>
								Acceptance Rate : {`${property.userData?.acceptanceRate}%`}
							</Box>
						)}
						{property?.userData?.responseTime && (
							<Box height={{ xs: '18px' }}>
								Response Time : &lt;{`${property.userData?.responseTime}hr`}
							</Box>
						)}
						{property?.userData?.cancellationRate && (
							<Box height={{ xs: '18px' }}>
								Cancellation Rate : {`${property.userData?.cancellationRate}%`}
							</Box>
						)}
					</Box>
				</Box>
				<Box height={20} />
				<>
				{(property?.userData?.ratings?.good + property?.userData?.ratings?.neutral + property?.userData?.ratings?.bad)!==0 && <Box>
					<Box
						display='flex'
						justifyContent='space-between'
						sx={{
							fontFamily: 'Open Sans',
							fontStyle: 'normal',
							fontWeight: '600',
							fontSize: '1.05rem',
							lineHeight: '33px',
							color: '#383838',
						}}
					>
						{/* <Box>Ratings</Box> */}
						{/* <Box fontSize='0.9rem' fontWeight='400' color='#8F8F8F'>
							View Reviews
						</Box> */}
					</Box>
					{/* <Box height={20} /> */}
					{/* <Box>
						<Rating data={property?.userData?.ratings} height={{ sm: 35, xs: 31.5 }} />
					</Box> */}
				</Box>}
				</>
				<Box height={{ sm: 50, xs: 20 }} />
				<Box className='aboutPlace__p'>
					{isReadMore
						? [property.userData?.aboutYourself].slice(0, 150)
						: property.userData?.aboutYourself}
					&nbsp;
					{/* <span
						onClick={toggleReadMore}
						style={{
							fontWeight: '600',
							textDecoration: 'underline',
							cursor: 'pointer',
						}}
					>
						{isReadMore ? 'Read More' : ' Show Less'}
					</span> */}
				</Box>
			</Box>
			<DetailsSectionDivider />

			
			{property?.houseRules?.filter((rule:string)=>rule.length)?.length!==0 && <>
			<Box paddingRight={{ md: '5rem', sm: '0rem' }}>
				<DetailsListItem listItems={property.houseRules} header={'House Rules'} />
			</Box>
			<DetailsSectionDivider />
			</>}
		{
			property?.faqs?.length > 0 && <>  <Box paddingRight={{ md: '5rem', sm: '0rem' }}>
			<FAQs />
		</Box>
			<DetailsSectionDivider />
			</>
		}


			<Box>
				<Policies />
			</Box>
			
			<DetailsSectionDivider />
			
			<Box>
				{/* <ReportThinnai /> */}
				<CustomerSupport hide={false}/>
			</Box>
			<Box height={{xs:'100px', md:'80px'}}/>
		</Box>
		</>
	);
};

export default AboutPlace;
