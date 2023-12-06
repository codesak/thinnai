import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { useEffect, useState,useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../../store'
import { ROUTES } from '../../../../utils/routing/routes'
import isAuthenticatedNow from '../../../../utils/isAuthenticatedNow'
import PaymentProceedButton from '../../Payment/PaymentProceedButton'
import { useLocation } from 'react-router-dom'
interface bottomButtonPaymentSummaryProps {
  setViewBook: ((value: boolean) => void) | null
  viewBook: boolean
  onNextBooking: Function | null
  amountDetails?: any
  showReserveMessage?: boolean
  discountPrice?: number
  buttonStop?:boolean
  secondState?:boolean
}
export default function BottomButtonPaymentSummary({
  setViewBook,
  viewBook,
  onNextBooking,
  amountDetails,
  secondState,
  showReserveMessage,
  discountPrice,
  buttonStop,
}: bottomButtonPaymentSummaryProps) {
  const navigate = useNavigate()
  const wallet = useSelector(
    (state: RootState) => state.profile.userData.wallet
  )
  const bookingDate = useSelector<RootState, Date>(
    (state) => state.search.bookingDate
  )
  const guestCount = useSelector<RootState, number>(
    (state) => state.search.guestCount
  )
  const groupType = useSelector<RootState, string>(
    (state) => state.search.groupType
  )
  // const isAuthenticated = useSelector<RootState, any>(state => state.guestAuth.isAuthenticated);
  const isAuthenticated = isAuthenticatedNow()
  const instantBooking = useSelector<RootState, boolean>(
    (state) => state.details.property.directBooking
  )

  //Slide up Full Bill Details
  const [billView, setBillView] = useState(false)
  const ref = useRef<HTMLDivElement>(null);
  const billDetails  = [
    {
      field: 'Nominal Price',
      price: `${Number(amountDetails?.nominalPrice.toFixed(2))}`,
    },
    {
      field: 'Cleaning Charge',
      price: `${Number(amountDetails?.cleaningPrice.toFixed(2))}`,
    },
    {
      field: 'Add On Services',
      price: `${Number(amountDetails?.addOnServicePrice.toFixed(2))}`,
    },
    {
      field: 'Cutlery Discount',
      price: `${Number(amountDetails?.cutleryDiscount.toFixed(2))}`,
    },
    // {
    //   field: 'Platform Fee',
    //   price: `${amountDetails?.serviceCharge}`,
    // },
    // {
    //   field: 'GST (18%)',
    //   price: `${amountDetails?.gstAmt}`,
    // },
    
  ]
  //For wallet checkbox
  const [walletChecked, setWalletChecked] = useState(false)
  const [encReqURL, setEncReqURL] = useState('')
  const location = useLocation();
  const onClickNextPhone = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('pathName', location.pathname);
      navigate(ROUTES.LOGIN)
    } else if (setViewBook !== null) {
      !viewBook && setViewBook(true)
    } else if (viewBook && onNextBooking) {
      onNextBooking()
    }
  }

    useEffect(() => {
      const handleClickOutside = (event:MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setBillView(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },[ref])
  
  return (
    <Box width={'100%'}>
      <Box
        position="fixed"
        display={{ xs: 'flex', md: 'none' }}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight={!viewBook ? { xs: 66 } : { xs: 66, sm: 80 }}
        bottom="0px"
        width={viewBook ? '100%' : '100%'}
        padding="0 8%"
        sx={{
          background: '#FFFFFF',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          boxShadow: '0px -8px 17px rgba(0, 0, 0, 0.16)',
        }}
        ref={ref}
      >
        {viewBook && (
          <Box position="relative">
            <Box
              className="detail-expand-cont"
              position="absolute"
              top={
                billView
                  ? { sm: '-39.8px', xs: '-39.5px' }
                  : { xs: '-39.5px', sm: '-39.8px' }
              }
              left={{ sm: '48%', xs: '45%' }}
              sx={{
                background: 'rgba(143, 126, 243, 0.26)',
                borderRadius: '0px',
              }}
              width="52px"
              height="40px"
              display="flex"
              alignItems="flex-end"
            >
              <Box
                className="detail-expand"
                position="absolute"
                top="1.5px"
                left="0"
                sx={{
                  background: '#FFFFFF',
                  borderRadius: '0px',
                }}
                width="52px"
                height="40px"
                display="flex"
                alignItems="flex-end"
                onClick={() => setBillView(!billView)}
              >
                <Box>
                  <KeyboardArrowDownIcon
                    sx={{
                      color: 'black',
                      position: 'absolute',
                      left: '14px',
                      bottom: '-4px',
                      transform: !billView ? 'rotate(180deg)' : '',
                    }}
                  />
                </Box>
              </Box>
            </Box>
            {!billView && (
              <Box>
                <Box
                  width="100%"
                  height="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    fontWeight: '400',
                    fontSize: '0.688rem',
                    lineHeight: '13px',
                    color: '#9A9393',
                  }}
                >
                  Expand to see Payment Summary
                </Box>
                <Divider />
              </Box>
            )}

            {billView && (
              <Box
                className="detail-bill"
                width="100%"
                padding="0.938rem 0"
                sx={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                }}
              >
                {/* <Box height={35} /> */}
                {/* <Box
                  width="100%"
                  sx={{
                    fontWeight: '400',
                    fontSize: '0.688rem',
                    lineHeight: '22px',
                    color: '#383838',
                  }}
                >
                  <FormControlLabel
                    sx={{ margin: '0' }}
                    control={
                      <Checkbox 
                        checked={walletChecked}
                        onChange={(event) =>
                          setWalletChecked(event.target.checked)
                        }
                      />
                    }
                    label={
                      <Typography
                        sx={{ paddingLeft: '0.625rem', fontSize: '0.813rem' }}
                      >
                        Use your{' '}
                        <span style={{ fontWeight: '600' }}>
                          Rs.{wallet} Thinnai Wallet balance.
                        </span>
                      </Typography>
                    }
                  />
                </Box> */}
                <Box height={12} />
                <Box
                  width="17rem"
                  sx={{
                    border: '1px solid rgba(143, 126, 243, 0.55)',
                    borderRadius: '4px',
                    padding: '0.75rem 1.375rem',
                    fontWeight: '400',
                    fontSize: '0.688rem',
                    lineHeight: '23px',
                    color: '#383838',
                  }}
                >
                  {billDetails.map((item, index) => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      key={index}
                    >
                      <Box color={`${item.field === 'Cutlery Discount' && 'green'}`}>{item.field}</Box>
                      <Box color={`${item.field === 'Cutlery Discount' && 'green'}`}>{`${item.field === 'Cutlery Discount' ? '- ₹' + item.price : '₹' +item.price}`}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          padding="4% 0"
        >
          <Box>
            <Box
              sx={{
                fontWeight: '500',
                fontSize: '1rem',
                lineHeight: '20px',
              }}
            >
              {!viewBook ? (
                new Date(bookingDate?.toString()).toLocaleDateString('default', {
                  month: 'long',
                  day: 'numeric',
                })
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex' }}>
                    <div>Total Price &nbsp;</div>
                    <span style={{ fontWeight: '700' }}> ₹{amountDetails.totalAmtWithoutServiceCharge}</span>
                  </div>
                  {/* <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '400',
                      fontSize: '0.7rem',
                      lineHeight: '27px',
                    }}
                  >
                    <span style={{ textDecoration: 'line-through' }}>
                      ₹ {discountPrice?.toFixed(2)}{' '}
                    </span>
                    <span style={{ color: '#D23535' }}> ( 20% off )</span>
                  </Box> */}
                </div>
              )}
            </Box>
            <Box height={2} />
            {!viewBook && (
              <Box
                color="#827B7B"
                sx={{
                  fontWeight: '400',
                  fontSize: '0.925rem',
                  lineHeight: '20px',
                  textTransform:'capitalize',
                }}
              >{guestCount}
                {guestCount !== 0 ? `${guestCount >1 ?  ' Guests':' Guest'}` : ''} <br />{groupType.replaceAll('_',' ')}
              </Box>
            )}
          </Box>
          <Box display='flex' flexDirection='column' width={{xs:'30vw',md:''}}>
                      {buttonStop && <Typography
                        className="book__header"
                        fontWeight="400!important"
                        color="#ff3333!important"
                      >
                        Guest Type Not Available
                      </Typography>}
            <Button
              variant="contained"
              className="continue_btn"
              sx={{
                background: '#272F3D !important',
                color: 'white',
                fontWeight: '400',
                fontSize: '0.75rem',
                lineHeight: '1.4em',
                textAlign: 'center',
                alignSelf:'end',
                height: '36px',
                // width: '25vw',
                width: '8.5rem',
                textTransform: 'none',
                '@media (max-width: 300px)': {
                  width: '40vw',
                },
                '&.Mui-disabled':{
                  color:'#ffffff'
                }
              }}
              //disabled={buttonStop && !groupType}
              onClick={onClickNextPhone}
            >
              {isAuthenticated
                ? showReserveMessage
                  ? 'Reserve Your slot'
                  : buttonStop ? 'Move to Explore': 'Next'
                : 'Login To Continue'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
