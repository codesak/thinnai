import { Box, Typography } from '@mui/material'
import React from 'react'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { makeStyles } from '@mui/styles'

import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { loadProperty } from '../../../../actions/details'
import { ROUTES } from '../../../../utils/routing/routes'
import { startLoading } from '../../../../actions/root'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import required modules
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import PlaceIcon from '@mui/icons-material/Place'
import SwiperCore, { Autoplay, EffectCube, Pagination } from 'swiper'
import '../../../styles/Enquiry/Enquiry.scss'
import PlaceSkeleton from '../PlaceSkeleton'
import ResponsiveSkeleton from '../ResponsiveSkeleton'
import { S3_BASE_URL } from '../../../../utils/consts'
import heart from "../../../../assets/images/ic_heart.svg"
import star from "../../../../assets/images/ic_star.svg"

interface properties {
  _id: string
  propertyPictures: string[]
  propertyName: string
  slugString: string
  city: string
  state: string
  area:string
  happyCustomers: number
  maxGuestCount: string
  minDuration: string
  price: string
  directBooking: boolean
  originalPrice: string
  discount: string
}

const useStyles: any = makeStyles({
  placeCard: {
    cursor: 'pointer',
    background: '#FFFFFF',
    overflow: 'hidden',
    //paddingBottom: '1.25rem',
    borderRadius: '20px',
    boxShadow: '0px 2.5px 3px rgba(0, 0, 0, 0.1)',
  },
})

SwiperCore.use([Pagination, Autoplay])

const OtherSpaces = () => {
  const sameProperties = useSelector<RootState, properties[]>(
    (state) => state.landing.spaces
  )

  const mainLoading = useSelector<RootState, boolean>(
    (state) => state.main.loading
  )

  const dispatch: Dispatch<any> = useDispatch()
  const swiperRefs = useRef<(SwiperCore | null)[]>([])

  const navigate = useNavigate()
  const classes = useStyles()
  const [placeCardFocusTracker, setPlaceCardFocusTracker] = useState<boolean[]>(
    []
  )

  useEffect(() => {
    if (sameProperties) {
      setPlaceCardFocusTracker(
        Array.from(new Array(sameProperties.length), (_, __) => false)
      )
      if (swiperRefs.current.length === 0) {
        swiperRefs.current = Array.from(
          new Array(sameProperties.length),
          (_, __) => null
        )
      }
    }
  }, [sameProperties])

  const handleClick = (id: string, slug: string) => {
    dispatch(startLoading('LOADING_DETAILS'))
    dispatch(
      loadProperty(id, () => navigate(ROUTES.PROPERTY_DETAIL + `/${slug}`))
    )
  }

  const handleMouseEnterCard = (index: number) => {
    const cardsInFocusUpdated = Array.from(
      new Array(sameProperties.length),
      (_, currentIndex) => currentIndex === index
    )
    setPlaceCardFocusTracker(cardsInFocusUpdated)
    if (swiperRefs.current[index]) {
      swiperRefs.current[index]?.autoplay.start()
    }
  }

  const handleMouseLeaveCard = (index: number) => {
    setPlaceCardFocusTracker(
      Array.from(new Array(sameProperties.length), (_, __) => false)
    )
    if (swiperRefs.current[index]) {
      swiperRefs.current[index]?.autoplay.stop()
    }
  }
  const onInit = (Swiper: SwiperCore, index: number): void => {
    swiperRefs.current[index] = Swiper
  }

  return (
    <>
      <Box>
        <Typography
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="600"
          fontSize={{ xs: '15px', sm: '25px' }}
          lineHeight={{ xs: '18px', sm: '35px' }}
          color="#000000"
          textTransform="capitalize"
        >
          Check Other spaces Out
        </Typography>

        {mainLoading && <PlaceSkeleton />}
        {mainLoading && <ResponsiveSkeleton />}
        {!mainLoading && (
          <Box
            marginTop={{
              xs: '10%',
              md: '3%',
            }}
            marginBottom={{
              md: '0',
              xs: '3rem',
            }}
            marginX={{
              xl: '0.625rem',
              md: '0.625rem',
              sm: '.875rem',
              xs: '.875rem',
            }}
            sx={{
              '@media (min-width: 2400px)': {
                maxWidth: '90%',
                margin: 'auto',
                marginTop: '2%',
              },
              '@media (min-width: 2600px)': {
                maxWidth: '80%',
                margin: 'auto',
                marginTop: '2%',
              },
            }}
          >
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                xl: 'repeat(4, 1fr)',
              }}
              gap={{
                xs: '8vw',
                md: '2vw',
              }}
              sx={{
                '@media (min-width: 1800px)': {
                  gridTemplateColumns: 'repeat(5, 1fr)',
                },
                '@media (min-width: 2600px)': {
                  gap: '1vw',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                },
              }}
            >
              {sameProperties.map((item, index) => (
                <Box
                onClick={() => handleClick(item._id, item.slugString)}
                onMouseEnter={() => handleMouseEnterCard(index)}
                onMouseLeave={() => handleMouseLeaveCard(index)}
                height={{
                  xs: 'fit-content',
                  sm: 'fit-content',
                  md: 'fit-content',
                  xl: '50vh',
                }}
                key={item._id}
                className={classes.placeCard}
                position="relative"
                // flexWrap='wrap'
                sx={{
                  transition: '0.5s',
                  ':hover': {
                    transform: 'scale(1.04)',
                  },
                  '@media (min-width: 1400px)': {
                    height: '45vh',
                  },
                  '@media (min-width: 1600px)': {
                    height: '43vh',
                  },
                  '@media (min-width: 1800px)': {
                    height: '35vh',
                  },

                  '@media (min-width: 1900px)': {
                    height: 'auto',
                  },

                  '@media (min-width: 2600px)': {
                    height: 'auto',
                  },
                }}
              >
                {item.directBooking && (
                  <Box position="absolute" right="18px" top="17px" zIndex="2">
                    <Box
                      p="5px"
                      fontSize="12px"
                      bgcolor="#E7FFD5"
                      // width='85px'
                      // height='17px'
                      fontFamily="Open Sans"
                      borderRadius="5px"
                      fontWeight={400}
                      textAlign="center"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
                    >
                      Book Instantly
                    </Box>
                  </Box>
                )}
                <Swiper
                  onInit={(e) => onInit(e, index)}
                  style={{
                    width: '100%',
                    height: '30vh',
                  }}
                  autoplay={
                    placeCardFocusTracker[index] ? { delay: 2000 } : false
                  }
                  speed={2000}
                  grabCursor={true}
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
                  {item.propertyPictures.map((element, imageIndex) => (
                    <SwiperSlide
                      key={imageIndex}
                      style={{
                        height: '100%',
                      }}
                    >
                      <Box height="100%">
                        <img
                          width="100%"
                          height="100%"
                          src={`${S3_BASE_URL}${element}`}
                          alt="img"
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  //paddingLeft='1rem'
                  //paddingRight='1rem'
                  //marginTop='0.813rem'
                  margin="1rem"
                >
                  <Box>
                    <Typography
                      fontSize={{ xs: '3.5vw', sm: '2.5vw', md: '1vw' }}
                      color="#1A191E"
                      sx={{
                        '@media (min-width: 1800px)': {
                          fontSize: '0.7vw',
                        },
                      }}
                      fontWeight="600"
                      fontFamily="Open Sans"
                    >
                      {item.propertyName.length <= 18
                        ? item.propertyName
                        : item.propertyName.substr(0, 18) + '...'}
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
                          color: '#D23535',
                          fontSize: { xs: '3.5vw', md: '0.9vw' },
                        }}
                      />
                      <Typography
                        fontSize="0.8vw"
                        sx={{
                          '@media (max-width: 1122px)': {
                            fontSize: '0.625rem',
                          },
                          '@media (max-width: 900px)': {
                            fontSize: '0.75rem',
                          },
                          '@media (min-width: 1800px)': {
                            fontSize: '0.5vw',
                          },
                        }}
                        fontWeight="400"
                        fontFamily="Open Sans"
                        color="#6D6D6D"
                      >
                        {/* {item.area.length + item.city.length <= 16 ? (
                          <span>
                            {item.area}, {item.city}
                          </span>
                        ) : (
                          <span>
                            {`${item.area}, ${item.city}`.substr(0, 16) +
                              '...'}
                          </span>
                        )} */}
                        <span>
                            {item.area}, {item.city}
                          </span>
                      </Typography>
                    </Box>
                    <Box display="flex" gap="3px" alignItems="center">
                      <img src={item.happyCustomers !== 0? `${heart}`:`${star}`}
                        style={{
                          color: '#000000',
                        }}
                        alt= "img"
                      />
                      <Typography
                        fontSize="0.8vw"
                        sx={{
                          '@media (max-width: 1122px)': {
                            fontSize: '0.625rem',
                          },
                          '@media (max-width: 900px)': {
                            fontSize: '0.75rem',
                          },
                          '@media (min-width: 1800px)': {
                            fontSize: '0.5vw',
                          },
                        }}
                        fontWeight="600"
                        fontFamily="Open Sans"
                        color={item.happyCustomers === 0? `${'#B78622'}`:`${'#58AA06'}`}
                      >
                       {item.happyCustomers === 0? "NEW SPACE": `${item.happyCustomers} Happy Guest `}
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
                        xl: '0.9vw',
                        md: '0.7vw',
                        sm: '0.938rem',
                        xs: '0.6rem',
                      }}
                      sx={{
                        '@media (min-width: 1800px)': {
                          fontSize: '0.5vw',
                        },
                      }}
                      fontWeight="300"
                      fontFamily="Inter"
                      color="#383838"
                      marginBottom="0.588rem"
                      textAlign="right"
                    >
                      Starts From
                    </Typography>
                    <Typography
                      textAlign="right"
                      fontFamily="Inter"
                      fontSize={{
                        xs: '4vw',
                        sm: '3vw',
                        md: '1.3vw',
                      }}
                      sx={{
                        '@media (min-width: 1800px)': {
                          fontSize: '0.9vw',
                        },
                      }}
                      fontWeight="600"
                      color="#000000"
                      letterSpacing={'0.02em'}
                    >
                      ₹{item.price}
                    </Typography>
                    <Typography
                      textAlign="right"
                      fontFamily="Open Sans"
                      fontSize={{
                        xs: '2.4vw',
                        md: '0.6vw',
                      }}
                      sx={{
                        '@media (min-width: 1800px)': {
                          fontSize: '0.5vw',
                        },
                      }}
                      fontWeight="600"
                    >
                      <s>₹ {item.originalPrice}</s>
                      <span style={{ color: '#D23535' }}>
                        {' '}
                        ( {item.discount}% off )
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default OtherSpaces
