import {
    Box,
    Button,
    CssBaseline,
    Divider,
    Stack,
    Typography,
  } from '@mui/material'
  import FormControl from '@mui/material/FormControl'
  import GroupsIcon from '@mui/icons-material/Groups'
  import { useEffect, useState } from 'react'
  import 'react-image-crop/dist/ReactCrop.css'
  import { useParams } from 'react-router-dom'
  import { BOOKING_DETAIL_LEVEL, S3_BASE_URL } from '../../../utils/consts'
  import { BOOKING_VIEW_TYPE } from '../../../utils/routing/routes'
  import PaymentInfo from '../../Pages/BookingTrackingPages/PaymentInfo'
  import PaymentLinks from '../../Pages/BookingTrackingPages/PaymentLinks'
  import '../../styles/Detail/detail.css'
  import Allowed from '../Common/Allowed'
  import Amenities from '../Common/Amenities'
  import RescheduleRequest from '../Common/BookingProcess/RescheduleRequest'
  import DetailsListItem from '../Common/DetailsListItem'
  import DetailsSectionDivider from '../Common/DetailsSectionDivider'
  import FAQs from '../Common/FAQs'
  import HostedBy from '../Common/HostedBy'
  import Policies from '../Common/Policies'
  import ReportThinnai from '../Common/ReportThinnai'
  import IdVerifyAndUpdate from './IdVerifyAndUpdate'
  import Address from './subElements/Address'
  import CarouselFoodNearby from './subElements/CarouselFoodNearby'
  import NotAllowed from './subElements/NotAllowed'
  import EditBooking from './EditBooking'
  import style from '../../styles/Booking/booking.module.css'
  import { useSelector } from 'react-redux'
  import { RootState } from '../../../store'
  import CustomerSupport from '../../Pages/BookingTrackingPages/CustomerSupport'
  import EditBook from '../../Pages/BookingTrackingPages/EditBook'
  import GetDirections from '../../Pages/BookingTrackingPages/GetDirections'
  import { S3_BASE } from '../../../utils/consts'
  import Permits from '../Common/Permits'
  import SummaryData from '../Payment/SummaryData'
  import { useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import { ROUTES } from '../../../utils/routing/routes'
  import EnquiryBottomButton from '../Detail/mobileSubElements/EnquiryBottomButton'
import BottomButtonPaymentSummary from '../Detail/mobileSubElements/BottomButtonPaymentSummary'
import BottomPaymentSummary from './BottomPaymentSummary'
  const UnpaidBookingDetails = ({
    booking,
    bookingDate,
    isMyBooking,
    bookingDetailLevel,
  }: {
    booking: any
    bookingDate: any
    isMyBooking: boolean
    bookingDetailLevel: BOOKING_DETAIL_LEVEL
  }) => {
    const { viewType } = useParams<{ viewType: BOOKING_VIEW_TYPE }>()
    const navigate = useNavigate()
    const [showReschedule, setShowReschedule] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [viewBook,setViewBook] = useState(false)
    const foodJoints = useSelector<RootState, any>(
          state => state.booking.booking.property?.foodJoints
      );
    useEffect(() => {
      switch (viewType) {
        case BOOKING_VIEW_TYPE.EDIT:
          setShowEdit(true)
          setShowReschedule(false)
          return
        case BOOKING_VIEW_TYPE.RESCHEDULE:
          setShowReschedule(true)
          setShowEdit(false)
          return
        case BOOKING_VIEW_TYPE.DETAILS:
        default:
          setShowReschedule(false)
          setShowEdit(false)
          return
      }
    }, [viewType])
    const handlePay = async(id:any,propertyBookingType:any) => {
      let cartBody = {
        enquiries: [id],
        bookingType: propertyBookingType || "instant"
    }
    try {
      const cartResp = await axios.post(
        `/api/cart/addToCart/`,
        cartBody)
        navigate(ROUTES.ENQUIRY_SUMMARY)
    } catch (error) {
      console.log(error)
    }
      
    }
    return (
      <Box className={style.bookingContainer}>
        <Box
          width={{
            xl: '70%',
            md: '70%',
            sm: '100%',
            xs: '100%',
          }}
        >
          <Box>
            <Box
              bgcolor="#F7F5FF"
              marginTop="1.313rem"
              borderRadius="0.7rem"
              paddingLeft={{
                xl: '4rem',
                md: '3rem',
                sm: '4rem',
                xs: '1.5rem',
              }}
              paddingRight={{
                xl: '4rem',
                md: '3rem',
                sm: '4rem',
                xs: '1.5rem',
              }}
            >
              <Typography
                textAlign="center"
                fontSize="1rem"
                fontWeight="300"
                color="#6053AE"
                paddingY="1.2rem"
              >
                Booking Id :{' '}
                <span style={{ fontWeight: '400' }}>{booking._id}</span>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                paddingBottom="1.125rem"
              >
                <img
                  style={{ borderRadius: '1rem' }}
                  width="100%"
                  src={`${S3_BASE_URL}${booking.property?.propertyPictures[0]}`}
                  alt=""
                />
              </Box>
  
              {/* Update Variable */}
              <Box>
                <Typography
                  fontSize={{
                    xl: '1.5rem',
                    md: '1.2rem',
                    sm: '1.2rem',
                    xs: '1.1rem',
                  }}
                  fontWeight="500"
                  color="#383838"
                >
                  {booking.property?.propertyName}
                </Typography>
              </Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom="1.2rem"
                marginTop="0.7rem"
              >
                <Box>
                  <Typography
                    fontSize={{
                      xl: '1.2rem',
                      md: '1rem',
                      sm: '1rem',
                      xs: '0.9rem',
                    }}
                    fontWeight="300"
                    color="#383838"
                  >
                    No. of guests :{' '}
                    <span style={{ color: '#6053AE' }}>
                      {booking.requestData.guestCount}
                    </span>
                  </Typography>
                  <Typography
                    fontSize={{
                      xl: '1.2rem',
                      md: '1rem',
                      sm: '1rem',
                      xs: '0.9rem',
                    }}
                    fontWeight="300"
                    color="#383838"
                    textTransform='capitalize'
                  >
                    Guest type :{' '}
                    <span style={{ color: '#6053AE', textTransform:'capitalize' }}>
                      {booking.inquiry?.groupType.replaceAll('_',' ')}
                    </span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontSize={{
                      xl: '1.2rem',
                      md: '1rem',
                      sm: '1rem',
                      xs: '0.9rem',
                    }}
                    fontWeight="300"
                    color="#383838"
                  >
                    Time :{' '}
                    <span style={{ color: '#6053AE' }}>
                      {new Date(booking.requestData.bookingFrom).toLocaleTimeString(
                        'default',
                        {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        }
                      )}{' '}
                      -{' '}
                      {new Date(booking.requestData.bookingTo).toLocaleTimeString('default', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </span>
                  </Typography>
                  <Typography
                    fontSize={{
                      xl: '1.2rem',
                      md: '1rem',
                      sm: '1rem',
                      xs: '0.9rem',
                    }}
                    fontWeight="300"
                    color="#383838"
                  >
                    Date :{' '}
                    <span style={{ color: '#6053AE' }}>
                      {new Date(booking.requestData.bookingFrom)
                        .toLocaleDateString('default', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        })
                        .split('/')
                        .join('.')}
                    </span>
                  </Typography>
                </Box>
              </Stack>
              <Box paddingBottom="0.625rem">
                <Divider />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                paddingBottom="20px"
              >
                
                <Typography
                  fontSize={{
                    xl: '0.75rem',
                    md: '0.9rem',
                    sm: '0.5rem',
                    xs: '0.8rem',
                  }}
                  fontWeight="400"
                  color="#383838"
                >
                  Booked on :{' '}
                  <span style={{ color: '#6053AE' }}>
                    {new Date(booking.bookingConfirmedAt)
                      .toLocaleDateString('default', {
                        month: 'long',
                        day: 'numeric',
                      })
                      .split('/')
                      .join('.')}
                  </span>
                </Typography>
              </Box>
            </Box>
            
          </Box>

          <Address />
          <DetailsSectionDivider />
          {/* <DetailsListItem
                      listItems={booking.property?.directions}
                      header={'Steps to Reach Thinnai'}
                  />
                  <DetailsSectionDivider /> */}
                  <GetDirections exactLocaion={booking.property.thinnaiLocationUrl} approxLocation={booking.property.approximateLocationUrl}/>
                  <DetailsSectionDivider />
                  <h4 className='sub-Headings-DetailsPage'>Services Added</h4>
                  {booking?.property?.addOnServices?.map(
                          (item: any, index: number) => (
                            <Box
                              width="100%"
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
                                  <Typography
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
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          )
                        )}
                  <DetailsSectionDivider />
                        {/* Permits Added */}
          <Permits services={[...booking.requestData.servicesRequested,...booking.requestData.addOnServicesRequested,...booking.requestData.cleaningCharges,booking.requestData.plateGlassCutlery && 'cutlery']}/>
          {/* Things Allowed */}
          <DetailsSectionDivider />
          <Allowed services={booking.property.services} />
          {/* Things Not Allowed */}
          <DetailsSectionDivider />
          <NotAllowed services={booking.property.services} />
          {/* Amenities */}
          <Amenities amenities={booking.property.amenities} />
          <DetailsSectionDivider />
          <DetailsListItem
            listItems={booking.property.houseRules}
            header={'House Rules'}
          />
          <Box
            display={{
              xl: 'block',
              md: 'block',
              sm: 'block',
              xs: 'block',
            }}
            mb="2.188rem"
          >
            
            {
              foodJoints && <>
              <Box height={{ sm: 25, xs: 25 }} />
            <Divider />
            <Box height={{ sm: 25, xs: 25 }} />
            <Box>
              <Typography fontSize="1rem" fontWeight={400}>
                Nearby Food Joints
              </Typography>
              <Box mt="0.625rem">
                <CarouselFoodNearby />
              </Box>
            </Box>
              </>
              
            }
            
          </Box>
          {isMyBooking && <HostedBy userData={booking.property.userData}/>}
          {/* <FAQs /> */}
          <DetailsSectionDivider />
          <Policies />
          <DetailsSectionDivider />
          <CustomerSupport />
          <DetailsSectionDivider />
          <BottomPaymentSummary viewBook={viewBook} setViewBook={setViewBook} amountDetails={booking?.inquiry?.priceBreakdown} handlePay={handlePay} id={booking.inquiry._id}/>
          <Box height={100} />
        </Box>
          {/* Payment Summary */}
        <Box
          display={{
            xl: 'block',
            md: 'block',
            sm: 'none',
            xs: 'none',
          }}
          marginTop='1.5rem'
          width={'48%'}
          sx={{
            '@media (max-width: 1090px)': {
              width: '50%',
            },
          }}
        >
          <Box
            border="1px solid #C5C5C5"
            boxShadow="2px 4px 8px 7px rgba(0, 0, 0, 0.04)"
            borderRadius="20px"
            height="fit-content"
            padding={{
              xl: '2.5rem 1.875rem 0px 1.875rem',
              md: '2.5rem 1.875rem 0px 1.875rem',
              sm: '1.25rem 0px',
              xs: '1.25rem 0px',
            }}
          >
            <Typography paddingBottom="1.188rem" fontSize="1.4rem">
              Payment Summary
            </Typography>
            <Divider />

            <Box paddingBottom="1.423rem">
              <Box>
                <SummaryData amount={booking?.inquiry}/>
              </Box>
            </Box>
            <Divider />
            <Box
              mt="1.438rem"
              mb="2.5rem"
              display="flex"
              justifyContent="space-between"
            >
              <Typography
                fontFamily="Open Sans"
                fontSize="1.1rem"
                color="#272F3D"
                fontWeight={600}
              >
                Total amount
              </Typography>
              <div>
                <Typography
                  fontFamily="Inter"
                  fontSize="1.1rem"
                  color="#24BA0E"
                  fontWeight={600}
                >
                  ₹ {booking?.inquiry?.priceBreakdown?.totalPrice}
                </Typography>
              </div>
            </Box>
            {/* <button className={style.payNowBtn} onClick={() => handlePay(booking.inquiry._id,'instant')}>Pay Now</button> */}
            {/* <Box height={20}/> */}
          </Box>
        </Box>
      </Box>
    )
  }
  
  export default UnpaidBookingDetails
  