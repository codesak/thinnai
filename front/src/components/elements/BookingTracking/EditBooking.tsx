import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import style from '../../styles/Booking/editbooking.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Box, Button, ButtonGroup, Grid, TextareaAutosize, Typography } from '@mui/material'
import axios from 'axios'
import { S3_BASE } from '../../../utils/consts'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routing/routes'
import PaymentProceedButton from '../Payment/PaymentProceedButton'
import { cancelBooking } from '../../../actions/booking'

interface dataProp {
  id: string
  text: string
  pic: string
}
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:'100%',md:600},
  height: {xs:350,md:300},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditBooking = (setEncReqURL: any, setScreen: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const booking = useSelector<RootState, any>((state) => state.booking.booking)
  const [guestCount, setGuestCount] = useState<number>(booking?.requestData?.guestCount)
  const [editBooking, setEditBooking] = useState<boolean>(false)
  const [additionalServices, setAdditionalServices] = useState<boolean>(false)
  const [viewFinal, setViewFinal] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<boolean>(false)
  const [valueAddItem1, setValueAddItem1] = useState<string[]>(booking?.requestData?.servicesRequested)
  const [valueAddItem2, setValueAddItem2] = useState<string[]>(booking?.requestData?.cleaningCharges)
  const [addonServicesSelected, setAddonServicesSelected] = useState<string[]>(booking?.requestData?.addOnServicesRequested)
  const [cutlery, setCutlery] = useState<boolean>(booking?.requestData?.plateGlassCutlery)
  const [reason, setReason] = useState<string>()

  //modal state and function
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //function for unique elements
  function uniqByForEach<T>(array: T[]) {
    const result: T[] = [];
    array?.forEach((item) => {
      if (!result.includes(item)) {
        result.push(item);
      }
    })
    return result;
  }
  const servicesRequested = [...uniqByForEach(valueAddItem1)]
  const cleaningCharges = [...uniqByForEach(valueAddItem2)]
  const addOnServices = [...uniqByForEach(addonServicesSelected)]

  const updatedResult: any = {
    orderId: booking?._id, // orderId
    newRequestData: {
      property: booking.property._id, // propertyId
      bookingFrom: booking.requestData.bookingFrom,
      bookingTo: booking.requestData.bookingTo,
      guestCount: guestCount,
      servicesRequested: servicesRequested,
      cleaningCharges: cleaningCharges,
      addOnServicesRequested: addOnServices,
      plateGlassCutlery: cutlery,
    },
  }

  const data1 = [
    {
      id: 'alcohol',
      text: 'alcohol',
      pic: '/assets/images/detail/alcohol.svg',
    },
    {
      id: 'hookah',
      text: 'hookah',
      pic: '/assets/images/detail/hooka.svg',
    },
  ]
  const data2 = [
    {
      id: 'cake',
      text: 'Cake',
      pic: '/assets/images/detail/cake.svg',
      map: 'cake',
    },
    {
      id: 'tableDecorations',
      text: 'Table Decorations',
      pic: '/assets/images/detail/table.svg',
      map: 'table_decor',
    },
    {
      id: 'floorDecorations',
      text: 'Floor Decorations',
      pic: '/assets/images/detail/belun.svg',
      map: 'floor_decor',
    },
  ]
  const data3 = [
    {
      text: 'Cutlery Required',
      pic: '/assets/images/plate-1.png',
      value: true,
    },
    {
      text: 'Cutlery Not Required',
      pic: '/assets/images/plate-2.svg',
      value: false,
    },
  ]
  // guest count incremental
  const incremental = () => {
    if (
      guestCount <
      booking?.property?.maxGuestCount
    ) {
      setGuestCount(guestCount + 1)
    } else {
      setErrMsg(true)
    }
  }
  // guest count decremental
  const decremental = () => {
    if (guestCount > booking?.requestData?.guestCount) {
      setGuestCount(guestCount - 1)
      setErrMsg(false)
    }
  }
  //cutlery selecting function
  const onClickCt = (value: boolean) => {
    setCutlery(value)
  }
  //TODO: only send mapped values
  const onClickAa2 = (index: number) => {
    if (!booking.requestData?.cleaningCharges.includes(data2[index].id)) {
      if (valueAddItem2.includes(data2[index].id)) {
        setValueAddItem2([
          ...valueAddItem2.filter((item: string) => item !== data2[index].id),
        ])
      } else if (
        !booking.requestData?.cleaningCharges.includes(data2[index].id)
      ) {
        setValueAddItem2([...valueAddItem2, data2[index].id])
      }
    }
  }
  //TODO: only send mapped values
  const onClickAa1 = (index: number) => {
    if (!booking.requestData?.servicesRequested.includes(data1[index].id)) {
      if (valueAddItem1.includes(data1[index].id)) {
        setValueAddItem1([
          ...valueAddItem1.filter((item: string) => item !== data1[index].id),
        ])
      } else if (
        !booking.requestData?.cleaningCharges.includes(data1[index].id)
      ) {
        setValueAddItem1([...valueAddItem1, data1[index].id])
      }
    }
  }

  //AddonServices
  const onAddAddonService = (addOnServiceId: string) => {
    if (!booking.requestData?.addOnServicesRequested.includes(addOnServiceId)) {
      if (addonServicesSelected.includes(addOnServiceId)) {
        setAddonServicesSelected([
          ...addonServicesSelected.filter(
            (item: string) => item !== addOnServiceId
          ),
        ])
      } else {
        setAddonServicesSelected([...addonServicesSelected, addOnServiceId])
      }
    }
  }

  // function for checking availability in spaces
  let arr2: dataProp[] = []
  const servicesProvides = booking.property.services
  const handleServices1 = () => {
    for (let i = 0; i < data2.length; i++) {
      for (let j = 0; j < servicesProvides.length; j++) {
        if (data2[i].map.toLowerCase() === servicesProvides[j].toLowerCase()) {
          arr2.push(data2[i])
        }
      }
    }
    return arr2
  }

  //update api fetch (change location in V2 if need)
  const apiFetch = async () => {
    if (!updatedResult.newRequestData.cleaningCharges.length) {
      delete updatedResult.newRequestData.cleaningCharges
    }
    if (!updatedResult.newRequestData.addOnServicesRequested.length) {
      delete updatedResult.newRequestData.addOnServicesRequested
    }
    if (!updatedResult.newRequestData.servicesRequested.length) {
      delete updatedResult.newRequestData.servicesRequested
    }
    if (!updatedResult.newRequestData.plateGlassCutlery) {
      delete updatedResult.newRequestData.plateGlassCutlery
    }
    const res: any = await axios.patch(
      `/api/booking/requestChange/${booking?._id}`,
      updatedResult
    )
    const actualAmount = Number(res?.data?.bookingRequestPriceDifference?.totalPrice + res?.data?.bookingRequestPriceDifference?.serviceCharge + res?.data?.bookingRequestPriceDifference?.gstAmount).toFixed(2)
    let myPromise = new Promise(function(myResolve:any, myReject:any) {
     // "Producing Code" (May take some time)
     dispatch({ type: 'HIGHEST_PROP', payload: { actualAmount } })
        myResolve("success"); // when successful
        myReject("error");  // when error
      });
      myPromise?.then(()=>setViewFinal(true))
     }


  //cancel booking 
  const cancelApi = async () => {
    dispatch(cancelBooking(booking?._id, reason))
    navigate(ROUTES.CANCELLED)
  }



  if (editBooking) {
    return (
      <div className={style.container}>
        <h4>Edit Booking</h4>
        {/* <div className={style.priceChange}>
              <h4>Difference in Price</h4>
              <p>+ ₹450</p>
          </div> */}
        {(!viewFinal && additionalServices) && (
          <div className="component__booking__card">
            {/* <BookingCard/> */}

            <Box
              display="flex"
              flexDirection={{
                md: 'row',
                sm: 'row',
                xs: 'column',
              }}
              alignItems="center"
              width="100%"
              gap={2}
              sx={{ marginBottom: { xs: '2rem', sm: '0', md: '0' } }}
            >
              {handleServices1()?.map((item, index) => (
                <Box
                  onClick={() => onClickAa2(index)}
                  key={index}
                  width={{
                    sm: '158px',
                    xs: '100%',
                  }}
                  height="130px"
                  border="0.5px solid #868686"
                  borderRadius="5px"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: valueAddItem2.includes(data2[index].id)
                      ? '#F2F0DF'
                      : '',
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box textAlign="center" padding="0.3rem">
                    <Box
                      margin="auto"
                      height="50px"
                      width={{
                        xs: '60%',
                      }}
                    >
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                        src={item.pic}
                        alt="img"
                      />
                    </Box>
                    <Box height="50%" marginTop="0.6rem">
                      <Box
                        marginY="0.05rem"
                        fontWeight={600}
                        lineHeight="1.5em"
                        fontSize={{
                          sm: '0.8rem',
                          xs: '5vw',
                        }}
                      >
                        {item.text}
                      </Box>
                      <Typography
                        fontSize={{
                          sm: '0.6rem',
                          xs: '3.5vw',
                        }}
                        lineHeight="1.3em"
                      >
                        Cleaning Charges:{' '}
                        <span style={{ fontWeight: '800' }}>₹99</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <div className={style.servicesWithCharge}>
              <h5>Select To Add Permits To Bring</h5>
              <p>Cleaning charges are applicable</p>
              {/* <Services/> */}
              <Grid
                container
                gap={2}
                justifyContent={{
                  sm: 'flex-start',
                  xs: 'center',
                }}
                sx={{ marginBottom: { xs: '2rem', sm: '0', md: '0' } }}
              >
                {data3.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => onClickCt(item.value)}
                    width={{
                      xl: '40%',
                      md: '46%',
                      sm: '158px',
                      xs: '100%',
                    }}
                    height="140px"
                    border="0.5px solid #868686"
                    borderRadius="5px"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: item.value === cutlery ? '#F2F0DF' : '',
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        src={item.pic}
                        alt="img"
                      />
                      <Typography
                        fontSize="1rem"
                        fontWeight="600"
                        fontFamily="Open Sans"
                        textAlign="center"
                      >
                        {item.value ? 'YES' : 'NO'}
                      </Typography>
                      <Typography
                        fontSize="0.688rem"
                        lineHeight="1.2em"
                        textAlign="center"
                        letterSpacing="0.02em"
                      >
                        Discount {item.value ? 0 : 5}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </div>
            <Box height={20} />
            <button
              className={style.next}
              onClick={() => { apiFetch() }}
            >
              Next
            </button>
          </div>
        )}
        {!additionalServices && (
          <div>
            <div>
              <h4>Group Details</h4>
              <div>
                <h5>No. of Guests : {guestCount} </h5>

                <div>
                  <ButtonGroup
                    size="small"
                    style={{
                      border: '1px solid #868686',
                      height: '33px',
                      width: '100%',
                    }}
                    aria-label="small button group"
                  >
                    <Button
                      onClick={() => decremental()}
                      style={{ border: 'none', color: '#000000' }}
                      disabled={guestCount === 0}
                    >
                      -
                    </Button>
                    <Button
                      style={{
                        border: 'none',
                        fontWeight: '900',
                        fontFamily: 'Open Sans',
                        flex: '1',
                        textTransform: 'capitalize',
                        color: '#272F3D',
                      }}
                    >
                      {guestCount}
                    </Button>
                    <Button
                      onClick={() => incremental()}
                      style={{ border: 'none', color: '#000000' }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </div>
                {errMsg && (
                  <Typography
                    className="book__header"
                    fontWeight="400!important"
                    color="#ff3333!important"
                  >
                    This Property allows a maximum{' '}
                    {booking?.property?.maxGuestCount} guest
                  </Typography>
                )}
              </div>
              <h5>Select To Add Permits To Bring</h5>
              <Box
                display="flex"
                flexDirection={{
                  md: 'row',
                  sm: 'row',
                  xs: 'column',
                }}
                alignItems="center"
                width="100%"
                gap={2}
                sx={{ marginBottom: { xs: '2rem', sm: '0', md: '0' } }}
              >
                {data1.map((item, index) => (
                  <Box
                    onClick={() => onClickAa1(index)}
                    key={index}
                    width={{
                      sm: '158px',
                      xs: '100%',
                    }}
                    height="130px"
                    border="0.5px solid #868686"
                    borderRadius="5px"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: valueAddItem1.includes(data1[index].id)
                        ? '#F2F0DF'
                        : '',
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box textAlign="center" padding="0.3rem">
                      <Box
                        margin="auto"
                        height="50px"
                        width={{
                          xs: '60%',
                        }}
                      >
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                          src={item.pic}
                          alt="img"
                        />
                      </Box>
                      <Box height="50%" marginTop="0.6rem">
                        <Box
                          marginY="0.05rem"
                          fontWeight={600}
                          lineHeight="1.5em"
                          fontSize={{
                            sm: '0.8rem',
                            xs: '5vw',
                          }}
                        >
                          {item.text}
                        </Box>
                        <Typography
                          fontSize={{
                            sm: '0.6rem',
                            xs: '3.5vw',
                          }}
                          lineHeight="1.3em"
                        >
                          Cleaning Charges:{' '}
                          <span style={{ fontWeight: '800' }}>₹99</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </div>
            <Box height={20} />
            <h5>Select Additional Services</h5>
            <div className="addOnServices__container">
              <Box display="flex" flexDirection="column" width="100%" gap={2}>
                {booking?.property?.addOnServices.map(
                  (item: any, index: number) => (
                    <Box
                      onClick={() => onAddAddonService(item?.addOnServiceId)}
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
                        backgroundColor: addonServicesSelected.includes(
                          item.addOnServiceId
                        )
                          ? '#F2F0DF'
                          : '',
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
                            width: window.innerWidth > 600 ? '8vw' : '30vw',
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
              </Box>
            </div>
            {
              <button
                className={style.next}
                onClick={() => setAdditionalServices(true)}
              >
                Next
              </button>
            }
          </div>
        )}
        {(viewFinal && additionalServices) && (<>
          <div>
            Payment Now
            <Box height={20}/>
              <PaymentProceedButton setEncReqURL={setEncReqURL} />
          </div>
        </>)}
      </div>
    )
  }

  return (<>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cancel Booking
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, fontStyle: 'inherit' }}>
          Are you sure you want to cancel, a cancellation charge of Rs. 200 will be applied in case you proceed with cancellation.
        </Typography>
        <Box height={10}/>
        <TextareaAutosize
                  onResize={undefined}
                  onResizeCapture={undefined}
                  style={{
                    minWidth: '100%',
                    padding: '0.938rem',
                    height:'7vh',
                    fontSize: '1.125rem',
                    border: '1px solid #DFDAFF',
                    borderRadius: '6px',
                    resize: 'none',
                  }}
                  autoFocus
                  defaultValue={reason}
                  onChange={(e: any) => setReason(e.target.value)}
                  placeholder="Leave a message!"
                />
        <div className={style.btnContainer}>
          <button className={`${style.next} ${style.cancel}`} onClick={() => cancelApi()}>
            Proceed
          </button>
          <button className={style.next} onClick={() => setOpen(false)}>
            Go Back
          </button>
        </div>
      </Box>
    </Modal>
    <div className={style.container}>
      <p>
        Booking ID: <span>{booking?._id}</span>
      </p>
      <hr />
      <Box display={
                location.pathname === `${ROUTES.CANCELLED}/details` 
                  ? 'flex'
                  : 'none'
              }>This Booking is Cancelled</Box>
      <Box display={
                location.pathname === `${ROUTES.CANCELLED}/details` 
                  ? 'none'
                  : 'flex'
              }>
        
      <div className={style.btnContainer}>
        <button className={`${style.next} ${style.cancel}`} onClick={() => handleOpen()}>
          Cancel Booking
        </button>
        <button className={style.next} onClick={() => {setEditBooking(true);if(window.innerWidth<600){setEncReqURL?.setScreen(true)}}}>
          Edit Booking
        </button>
      </div>
      </Box>
    </div>
  </>
  )
}

export default EditBooking
