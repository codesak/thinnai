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

interface EnquiryBottomButtonProps {
  viewBook?:boolean
  setViewBook?:((value: boolean) => void) | null
  amountDetails?:any
  onClickProceed?:any
}
export default function EnquiryBottomButton({
  viewBook,
  setViewBook,
  amountDetails,
  onClickProceed
}: EnquiryBottomButtonProps) {
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
  const [encReqURL, setEncReqURL] = useState('')

  //Slide up Full Bill Details
  const [priceAction, setPriceAction] = useState(0)
  // useEffect(()=>{
  //   setPriceAction(totalAmount ?? 0)
  // },[totalAmount])

  const convenienceFee = Number((priceAction * 0.095).toFixed(2))
  const [billView, setBillView] = useState(true)
  const billDetails  = [
    {
      field: 'Nominal Price',
      price: `${Number(amountDetails?.priceBreakdown?.nominalPrice).toFixed(2)}`,
    },
    {
      field: 'Services & Add Ons',
      price: `${Number(amountDetails?.priceBreakdown?.addOnServicePrice).toFixed(2)}`,
    },
    {
      field: 'Cleaning Charge',
      price: `${Number(amountDetails?.priceBreakdown?.cleaningPrice).toFixed(2)}`,
    },
    {
      field: 'Cutlery Discount',
      price: `${Number(amountDetails?.priceBreakdown?.cutleryDiscount).toFixed(2)}`,
    },
    {
      field: 'Service Charge',
      price: `${Number(amountDetails?.priceBreakdown?.serviceCharge).toFixed(2)}`,
    },
    {
      field: 'GST (18%)',
      price: `${Number(amountDetails?.priceBreakdown?.gstAmount.toFixed(2))}`,
    },
  ]
  //For wallet checkbox
  const [walletChecked, setWalletChecked] = useState(false)
  const ref=useRef<HTMLElement>(null)
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
    <Box width={'100vw'}>
      <Box
        position="fixed"
        zIndex={1000}
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
        {!viewBook && (
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
                      <Box>{item.field}</Box>
                      <Box>₹{item.price}</Box>
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
              
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex' }}>
                    <div>Total Price &nbsp;</div>
                    <span style={{ fontWeight: '700' }}> ₹{amountDetails?.actualAmount}</span>
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
                      ₹ {totalPrice?.toFixed(2)}{' '}
                    </span>
                    <span style={{ color: '#D23535' }}> ( 20% off )</span>
                  </Box> */}
                </div>
            </Box>
          </Box>
          <Box width='30vw'>
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
                height: '36px',
                // width: '25vw',
                width: '8.5rem',
                textTransform: 'none',
                '@media (max-width: 300px)': {
                  width: '40vw',
                },
              }}
              onClick={onClickProceed}
            >
              Next
            </Button>
            {/* <PaymentProceedButton setEncReqURL={setEncReqURL} /> */}

          </Box>
        </Box>
      </Box>
    </Box>
  )
}
