import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { ROUTES } from '../../utils/routing/routes'
import NavBar from '../elements/Explore/NavBar'
import Search from '../elements/Explore/Search'
import BookingDetails from '../elements/Payment/BookingDetails'
import DetailPicture from '../elements/Payment/DetailPicture'
import Note from '../elements/Payment/Note'
import OtherPayment from '../elements/Payment/OtherPayment'
import PaymentSummary from '../elements/Payment/PaymentSummary'
import ProceedButton from '../elements/Payment/ProceedButton'
import SummaryData from '../elements/Payment/SummaryData'
import TotalAmount from '../elements/Payment/TotalAmount'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import payment from '../styles/Payment/payment.module.css'
import { sendEnquiries } from '../../actions/enquiry'
import { recordPayment } from '../../actions/payment'
import { startLoading } from '../../actions/root'
import PaymentProceedButton from '../elements/Payment/PaymentProceedButton'
import PaymentProcessingModal from '../elements/Payment/PaymentProcessingModal'
import { getCart,highestPriceProp } from '../../actions/cart'
import { useRef } from 'react'
import Whatsapp from '../elements/Common/Whatsapp'

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const enquiries = useSelector<RootState, any>(
    (state) => state.enquiry.enquiries
  )
  
  const {bookingType,items:cart,loading,highestProp:amount} = useSelector<RootState, any>((state) => state.cart)
  //To Open Search Options
  const [searchState, setSearchState] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(true)
  const [mark, setMark] = useState("1")
  const [mark1, setMark1] = useState("")
  // const [amount, setAmount] = useState<any>({addOnServicePrice:0,cleaningPrice:0,cutleryDiscount:0,gstAmount:0,nominalPrice:0,serviceCharge:0,max:0})

  const [encReqURL, setEncReqURL] = useState('')
  // console.log('🚀 ~ file: Payment.tsx:44 ~ Payment ~ encReqURL:', encReqURL)
  const [hasIFrameLoaded, setHasIFrameLoaded] = useState(false)

  const openSearch = () => {
    setSearchState(true)
  }

  //To change SearchBar to Searched Details
  const [stateSearched, setStateSearched] = useState(false)
  const searched = () => {
    setSearchState(false)
    setStateSearched(true)
  }

  //Responsive Booking Menu FullScreen
  // const [viewBook, setViewBook] = useState(false);
  const onClick = () => {
    dispatch(startLoading('LOADING_DETAILS'))
    dispatch(
      recordPayment({ host: enquiries[index].host, paymentAmount: amount })
    )
    // dispatch(sendEnquiries(() => navigate(ROUTES.CONGRATULATIONS)))
  }
  const data = [
    {
      title: 'Canara Bank Debit Card',
      img: 'assets/images/payment/visa.svg',
      exp: '05/26',
      accountNumber: '**** **** **** 5026',
      id: '1',
    },
    {
      title: 'ICICI Bank Debit Card',
      img: 'assets/images/payment/mastercard.svg',
      exp: '05/26',
      accountNumber: '**** **** **** 5026',
      id: '2',
    },
  ]
  const enquiryLoading = useSelector<RootState, boolean>(
    (state) => state.enquiry.loading
  )
  const index = enquiries.reduce(
    (iMax: any, x: any, i: any, arr: any) =>
      x.amount > arr[iMax].amount ? i : iMax,
    0
  )
  // const amount =
  //   useSelector<RootState, any>(
  //     (state) => state.enquiry.enquiries[index]?.amount
  //   ) ?? 0
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

    const isMountedRef = useRef(false);

    useEffect(() => {
      dispatch(getCart())
    },[])

    // useEffect(() => {
    //   if(cart.length > 0) {
    //     let highest:any = {}
    //     let max:number=0;
    //     cart.forEach((item:any)=> {
    //       let temp:any = Object.values(item.priceBreakdown).reduce((total:any,value:any) => {
    //         return total+value
    //       },0)
  
    //       if(max < temp) {
    //         console.log('temp',item.priceBreakdown
    //         )
    //         const {serviceCharge,gstAmount,totalPrice} = item.priceBreakdown
    //         max=Number(temp.toFixed(2))
    //         highest = item
    //         highest.actualAmount = serviceCharge+gstAmount+totalPrice
    //       }
    //     })
    //     setAmount(highest)
    //   }
      
    // }, [cart])
    
    useEffect(() => {
      dispatch(highestPriceProp())
    }, [])
    useEffect(() => {
      if (isMountedRef.current) {
        if (cart.length === 0) {
          navigate(ROUTES.EXPLORE)
        }
      } else {
        isMountedRef.current = true;
      }
    }, [cart]);
    return (
      <>
      <Box>
        {/* <Box className={payment.mobileNavigation}>
						<ArrowBackIosIcon className={payment.backIcon}/>
						<Typography variant='h1'>Payment</Typography>
					</Box> */}
         {/* <Whatsapp/>  */}
        <Box height={{ xs: '40px', sm: '0px', md: '0px' }} />
         <Box padding='0 .8rem' display={{xs:'block', md:'none'}}>
         <Box className={payment.bookingDetailsMobile}>
            <DetailPicture/>
						<BookingDetails />
            <Box height={20}/>
            <Note/>
            <Box height={20}/>
					</Box>
          <Box height={10}/>
         </Box>

        {/* Navigation Bar */}
        <Box display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}>
          <NavBar
            stateSearched={stateSearched}
            setStateSearched={setStateSearched}
            searchTabOpen={openSearch}
            state={searchState}
            searchTabClose={() => setSearchState(false)}
            searched={searched}
          />
          {/* {searchState && (
						<Box position='absolute' width='590px' top='81px' left='29.5%' zIndex='5'>
							<Search onClick={searched} />
						</Box>
					)} */}
        </Box>
        <Box>
          <Box className={payment.mainContainer}>
            <Box>
              <Box className={payment.cardsPaymentWrapper}>
                <Typography variant="h4" className={payment.titleDesktop}>
                  Payment
                </Typography>
                <Typography className={payment.selectPaymentTitle}>
                  Select Payment Method
                </Typography>

                <Typography className={payment.suggestedText} variant="body2">
                  Suggested for you
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={mark}
                  value={mark}
                  name="radio-buttons-group"
                >
                  {data?.map((card, index) => (
                    <React.Fragment key={index}>
                      {bookingDetails ? (
                        <Box className={payment.atmCardContainer} key={index}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems={{
                              xl: 'space-between',
                              md: 'space-between',
                              sm: 'center',
                              xs: 'start',
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="flex-start"
                              gap="13px"
                              justifyContent="space-between"
                            >
                              <Box className={payment.imgContainer}>
                                <img src={card.img} alt="" />
                              </Box>
                              <Box>
                                <Box>
                                  <Box className={payment.infoWrap}>
                                    <Typography className={payment.cardTitle}>
                                      {card.title}
                                    </Typography>
                                    <Box className={payment.expiryDesktop}>
                                      Exp - {card.exp}
                                    </Box>
                                  </Box>
                                  <Typography className={payment.cardNumber}>
                                    {card.accountNumber}
                                  </Typography>
                                </Box>
                                <Box className={payment.guidelinesDesktop}>
                                  Secure this card as per
                                  <span> RBI Guidelines</span>{' '}
                                </Box>
                              </Box>
                            </Box>
                            <Box className={payment.expiry}>
                              Exp - {card.exp}
                            </Box>
                            <Box
                              color="#A0A0A0"
                              display="flex"
                              justifyContent="flex-end"
                              alignItems="center"
                            >
                              <FormControlLabel
                                value={card.id}
                                control={<Radio />}
                                label=""
                                onClick={()=>{setMark(card.id);setMark1("")}}
                              />
                            </Box>
                          </Box>
                          <Box className={payment.guidelines}>
                            Secure this card as per<span> RBI Guidelines</span>{' '}
                          </Box>
                          <Divider />
                        </Box>
                      ) : (
                        <Box>
                          <Box
                            display="flex"
                            justifyContent={{
                              xl: 'space-between',
                              md: 'space-between',
                              sm: 'space-between',
                              xs: 'center',
                            }}
                            alignItems={{
                              xl: 'flex-start',
                              md: 'flex-start',
                              sm: 'center',
                              xs: 'center',
                            }}
                            flexDirection={{
                              xl: 'row',
                              md: 'row',
                              sm: 'column',
                              xs: 'column',
                            }}
                          >
                            <Box>
                              <img src={card.img} alt="" />
                            </Box>
                            <Box>
                              <Typography>{card.title}</Typography>
                              <Typography color="#A0A0A0">
                                {card.accountNumber}
                              </Typography>
                            </Box>
                            <Box color="#A0A0A0">Exp - {card.exp}</Box>
                          </Box>
                          <Box>
                            <Accordion
                              expanded={expanded === 'panel1'}
                              onChange={handleChange('panel1')}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <p style={{ margin: 'auto' }}>
                                  <span style={{ color: '#A0A0A0' }}>
                                    Secure this card as per
                                  </span>{' '}
                                  RBI Guidelines
                                </p>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="detail__p">
                                  Lorem ipsum dolor sit amet, conseibendum
                                  lorem. Morbi convallis convallis diam sit amet
                                  lacinia. Aliquam in elementum tellus."Lorem
                                  ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                          <Divider />
                          <Box height={{ sm: 50, xs: 30 }} />
                        </Box>
                      )}
                    </React.Fragment>
                  ))}
                </RadioGroup>
              </Box>
              {/* <Box className={payment.securePaymentBarDesktop}>100% Secure Payments</Box> */}
              <OtherPayment bookingDetails={bookingDetails} setMark={setMark} setMark1={setMark1} mark1={mark1} />
            </Box>
            {bookingDetails ? (
              <Box className={payment.summaryWrapper}>
                <Box
                  marginBottom="1.625rem"
                  display={{
                    md: 'block',
                    xs: 'none',
                  }}
                >
                  <Note />
                </Box>

                {/* Payment Summary Component */}
                <Box className={payment.paymentSummary}>
                  <Box
                    display={{
                      md: 'block',
                      xs: 'none',
                    }}
                  >
                    <DetailPicture />
                  </Box>
                  <Box
                    marginBottom="1.25rem"
                    display={{
                      md: 'block',
                      xs: 'none',
                    }}
                  >
                    <BookingDetails />
                  </Box>
                  <Divider
                    sx={{
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                  <Typography className={payment.paymentSummaryTitle}>
                    Payment Summary
                  </Typography>
                  <Divider className={payment.divide} />
                  <Box className={payment.summaryDataContainer}>
                    <SummaryData amount={amount}/>
                  </Box>
                  <Box marginTop="1.25rem">
                    <Divider className={payment.divide} />
                  </Box>
                  <Box className={payment.totalAmountContainer}>
                    <TotalAmount totalAmt={amount}/>
                  </Box>
                  <PaymentProceedButton setEncReqURL={setEncReqURL} />
                </Box>
                {/* End Of Payment Summary Component */}
                <Box
                  display={{
                    md: 'none',
                    xs: 'flex',
                  }}
                  justifyContent="center"
                  marginTop="4.813rem"
                >
                  <PaymentProceedButton setEncReqURL={setEncReqURL} />
                </Box>
              </Box>
            ) : (
              <Box
                width={{
                  xl: '50%',
                  md: '50%',
                  sm: '100%',
                  xs: '100%',
                }}
              >
                <Box
                  border="1px solid #C5C5C5"
                  boxShadow="2px 4px 8px 7px rgba(0, 0, 0, 0.04)"
                  borderRadius="20px"
                  height="fit-content"
                  paddingBottom="30px"
                >
                  <DetailPicture />
                  <BookingDetails />
                  {/* Total amount */}
                  <Box
                    margin={{
                      xl: '0px',
                      md: '0px 0px',
                      sm: '0px 1.25rem',
                      xs: '0px 1.25rem',
                    }}
                  >
                    <TotalAmount totalAmt={amount}/>
                  </Box>
                </Box>
                <Box marginTop="1.625rem">
                  <Note />
                </Box>
              </Box>
            )}
            {/* End */}
          </Box>
          {!bookingDetails && (
            <Box
              paddingY={7}
              width={{
                xl: '60%',
                md: '80%',
                sm: '100%',
                xs: '100%',
              }}
              margin="auto"
            >
              <PaymentSummary amount={amount} />
            </Box>
          )}
          {bookingDetails && (
            <Box className={payment.proceedContainer}>
              <Box className={payment.mobileProceedBar}>
                <Box className={payment.priceContainer}>
                  <Typography className={payment.discountedPrice}>
                    ₹ {amount?.max}
                  </Typography>
                  <Typography className={payment.originalPrice}>
                    <span>₹600</span>{' '}
                    <span style={{ color: '#D23535' }}>(25% off)</span>
                  </Typography>
                </Box>
                {/* <Button variant="contained" className={payment.proceedBtn} onClick={onClick}>PROCEED</Button> */}
                <PaymentProceedButton setEncReqURL={setEncReqURL} />
              </Box>
              <Box className={payment.securePaymentBar}>
                100% Secure Payments
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <PaymentProcessingModal
        hasIFrameLoaded={hasIFrameLoaded}
        setHasIFrameLoaded={setHasIFrameLoaded}
        encReqURL={encReqURL}
      />
    </>
  )
}

export default Payment
