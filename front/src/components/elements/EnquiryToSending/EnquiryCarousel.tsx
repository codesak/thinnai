import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RootState } from '../../../store'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import required modules
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import PlaceIcon from '@mui/icons-material/Place'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Dispatch, useEffect, useRef, useState } from 'react'
import SwiperCore, { Autoplay, EffectCube, Pagination } from 'swiper'
import '../../styles/Enquiry/Enquiry.scss'
import { loadProperty } from '../../../actions/details'
import { loadPlaces } from '../../../actions/main'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routing/routes'
import { startLoading } from '../../../actions/root'
import { getProperties } from '../../../actions/cart'
import { S3_BASE_URL } from '../../../utils/consts'

const useStyles: any = makeStyles({
  swiper: {
    height: '22rem',
    cursor: 'pointer',
    background: '#FFFFFF',
    overflow: 'hidden',
    paddingBottom: '1.25rem',
    borderRadius: '20px',
    boxShadow: '0px 2.5px 3px rgba(0, 0, 0, 0.1)',
    width: '341px !important',
    position: 'relative',
    // height: '360px',
    // cursor: 'grab',
    // background: '#FFFFFF',
    // borderRadius: '20px',
    // boxShadow: '0px 2.5px 3px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 600px)': {
      width: '300.0px !important',
      height: '390px',
    },
    '@media (max-width:390px)': {
      width: '283.79px !important',
      height: '390px',
    },
    '@media (max-width:326px)': {
      width: '240.79px !important',
      height: '400px',
    },
  },
})

SwiperCore.use([Pagination, Autoplay])

const EnquiryCarousel = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const breakPoint = useMediaQuery('(max-width:600px)')
  const swiperRefs = useRef<(SwiperCore | null)[]>([])
  const [placeCardFocusTracker, setPlaceCardFocusTracker] = useState<boolean[]>(
    []
  )

  const properties = useSelector<RootState, any>(
    (state) => state.cart.properties
  )

  useEffect(() => {
    dispatch(startLoading('LOADING_MAIN'))
    dispatch(loadPlaces())
    dispatch(getProperties())
  }, [])
  const handleClick = (id: string, slug: string) => {

    dispatch(startLoading('LOADING_DETAILS'))
    dispatch(
      loadProperty(id, () => navigate(ROUTES.PROPERTY_DETAIL + `/${slug}`))
    )
  }

  const handleMouseEnterCard = (index: number) => {
    const cardsInFocusUpdated = Array.from(
      new Array(properties.length),
      (_, currentIndex) => currentIndex === index
    )
    setPlaceCardFocusTracker(cardsInFocusUpdated)
    if (swiperRefs.current[index]) {
      swiperRefs.current[index]?.autoplay.start()
    }
  }

  const handleMouseLeaveCard = (index: number) => {
    setPlaceCardFocusTracker(
      Array.from(new Array(properties.length), (_, __) => false)
    )
    if (swiperRefs.current[index]) {
      swiperRefs.current[index]?.autoplay.stop()
    }
  }

  const onInit = (Swiper: SwiperCore, index: number): void => {
    swiperRefs.current[index] = Swiper
  }

  return (
    <Box
      marginBottom={{
        xl: 0,
        md: 0,
        sm: 20,
        xs: 20,
      }}
    >
      <Swiper
        slidesPerView={breakPoint ? 1 : 3}
        style={{
          paddingBottom: '0.625rem',
          margin: '0 1.25rem',
        }}
        spaceBetween={breakPoint ? 20 : 61}
        className="mySwiper"
      >
        {properties &&
          properties.map((property: any, index: any) => (
            <SwiperSlide
              onClick={() => handleClick(property._id, property.slugString)}
              key={property._id}
              className={classes.swiper}
              onMouseEnter={() => handleMouseEnterCard(index)}
              onMouseLeave={() => handleMouseLeaveCard(index)}
            >
              <Box position="absolute" right="18px" top="17px" zIndex="2">
                <Box
                  fontSize="0.5rem"
                  bgcolor="#E7FFD5"
                  width="75px"
                  height="17px"
                  fontFamily="Open Sans"
                  borderRadius="5px"
                  fontWeight={400}
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Book Instantly
                </Box>
              </Box>
              <Swiper
                onInit={(e) => onInit(e, index)}
                style={{
                  width: '100%',
                  height: '266px',
                }}
                autoplay={
                  placeCardFocusTracker[index] ? { delay: 1000 } : false
                }
                grabCursor={true}
                // navigation={{
                // 	nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // 	//disabledClass: "swiper-button-disabled"
                //   }}
                cubeEffect={{
                  slideShadows: true,
                  shadowOffset: 10,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, EffectCube, Pagination]}
                className="mySwiper"
              >
                {property?.propertyPictures?.map((element: string) => (
                  <SwiperSlide key={element?.length}>
                    <img
                      width="100%"
                      height="266px"
                      src={`${S3_BASE_URL}${element}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Box display='flex' justifyContent='space-between' paddingX='0.813rem'>
								<Box mt='0.513rem'>
									<Typography fontSize='1rem' fontWeight='600' fontFamily='Open Sans'>
										{property.propertyName}
									</Typography>
									<Box mb='0.313rem' display='flex' gap='0.313rem' alignItems='center'>
										<PlaceIcon
											sx={{
												color: '#000000',
												fontSize: '0.938rem',
											}}
										/>
										<Typography
											fontSize='0.75rem'
											fontWeight='400'
											fontFamily='Open Sans'
											color='#6D6D6D'
										>
											{`${property.city}, ${property.state}`}
										</Typography>
									</Box>
									<Box display='flex' gap='0.313rem' alignItems='center'>
										<EmojiEmotionsIcon
											sx={{
												color: '#000000',
												fontSize: '0.938rem',
											}}
										/>
										<Typography
											fontSize='0.75rem'
											fontWeight='400'
											fontFamily='Open Sans'
											color='#6D6D6D'
										>
											{property.happyCustomers}
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
										{property.maxGuestCount} Guest : {property.minDuration} Hour
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
										₹ {property.price}
									</Button>
								</Box>
							</Box> */}
              <Box
                display="flex"
                justifyContent="space-between"
                paddingLeft="1rem"
                paddingRight="1rem"
                marginTop="0.813rem"
              >
                <Box>
                  <Typography
                    fontSize="1rem"
                    fontWeight="600"
                    fontFamily="Open Sans"
                  >
                    {property.propertyName.length <= 18
                      ? property.propertyName
                      : property.propertyName.substr(0, 18) + '...'}
                  </Typography>
                  <Box
                    mb="0.313rem"
                    mt="0.313rem"
                    display="flex"
                    gap="0.188rem"
                    alignItems="center"
                  >
                    <PlaceIcon
                      sx={{
                        color: '#000000',
                        fontSize: '0.938rem',
                      }}
                    />
                    <Typography
                      fontSize="0.75rem"
                      sx={{
                        '@media (max-width: 1122px)': {
                          fontSize: '0.625rem',
                        },
                        '@media (max-width: 900px)': {
                          fontSize: '0.75rem',
                        },
                      }}
                      fontWeight="400"
                      fontFamily="Open Sans"
                      color="#6D6D6D"
                    >
                      {property.city.length + property.state.length <= 20 ? (
                        <span>
                          {property.city}, {property.state}
                        </span>
                      ) : (
                        <span>
                          {`${property.city}'+','+'${property.state}`.substr(
                            0,
                            20
                          ) + '...'}
                        </span>
                      )}
                    </Typography>
                  </Box>
                  <Box display="flex" gap="3px" alignItems="center">
                    <EmojiEmotionsIcon
                      sx={{
                        color: '#000000',
                        fontSize: '0.813rem',
                      }}
                    />
                    <Typography
                      fontSize="0.75rem"
                      sx={{
                        '@media (max-width: 1122px)': {
                          fontSize: '0.625rem',
                        },
                        '@media (max-width: 900px)': {
                          fontSize: '0.75rem',
                        },
                      }}
                      fontWeight="400"
                      fontFamily="Open Sans"
                      color="#6D6D6D"
                    >
                      {property.happyCustomers} Guests Hosted
                    </Typography>
                  </Box>
                </Box>
                <Box
                  width={{
                    xl: 'auto',
                    md: '40%',
                    xs: 'auto',
                  }}
                >
                  <Typography
                    fontSize={{
                      xl: '0.938rem',
                      md: '0.688rem',
                      sm: '0.938rem',
                      xs: '0.938rem',
                    }}
                    fontWeight="300"
                    fontFamily="Open Sans"
                    color="#000000"
                    marginBottom="0.588rem"
                    textAlign="right"
                  >
                    2 Guest : {property.minDuration} Hour
                  </Typography>
                  <Typography
                    textAlign="right"
                    fontFamily="Inter"
                    fontSize="1rem"
                    fontWeight="600"
                    color="#000000"
                    letterSpacing={'0.02em'}
                  >
                    ₹{property.price}
                  </Typography>
                  <Typography
                    textAlign="right"
                    fontFamily="Open Sans"
                    fontSize="0.75rem"
                    fontWeight="400"
                  >
                    <s>₹ {property.originalPrice}</s>
                    <span style={{ color: '#D23535' }}>
                      {' '}
                      ( {property.discount}% off )
                    </span>
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}

export default EnquiryCarousel
