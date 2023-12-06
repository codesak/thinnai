import {useState,useRef,useEffect} from 'react'
import style from '../../styles/Booking/bottomPaymentSummary.module.css'
import { Box,Divider } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
const BottomPaymentSummary = ({viewBook,
    setViewBook,
    amountDetails,
    handlePay,
    id}:any) => {
        
    const [billView, setBillView] = useState(false)
  const billDetails  = [
    {
      field: 'Nominal Price',
      price: `${Number(amountDetails?.nominalPrice).toFixed(2)}`,
    },
    {
      field: 'Services & Add Ons',
      price: `${Number(amountDetails?.addOnServicePrice).toFixed(2)}`,
    },
    {
      field: 'Cleaning Charge',
      price: `${Number(amountDetails?.cleaningPrice).toFixed(2)}`,
    },
    {
      field: 'Cutlery Discount',
      price: `${Number(amountDetails?.cutleryDiscount).toFixed(2)}`,
    },
    {
      field: 'Service Charge',
      price: `${Number(amountDetails?.serviceCharge).toFixed(2)}`,
    },
    {
      field: 'GST (18%)',
      price: `${Number(amountDetails?.gstAmount.toFixed(2))}`,
    },
  ]
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
    <div className={style.mainContainer}>
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
              
                <div style={{ display: 'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <div style={{ display: 'flex' }}>
                    <div>Total Price &nbsp;</div>
                    <span style={{ fontWeight: '700' }}> ₹{amountDetails?.nominalPrice}</span>
                  </div>
                </div>
            </Box>
          </Box>
          <button className={style.paynow} onClick={()=>handlePay(id,'instant')}>Submit</button>
        </Box>
      </Box>
    </div>
  )
}

export default BottomPaymentSummary