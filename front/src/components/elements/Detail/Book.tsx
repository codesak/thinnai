import GroupsIcon from '@mui/icons-material/Groups'
import { Alert, Grid, TextareaAutosize, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
//import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from '@mui/material/styles'
import { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
//import { Operation } from "slate";
import { setAlert } from '../../../actions/alert'
import {
  addEnquiry,
  setAddMoreEnquiry,
  setLoadEnquiryData,
  updateEnquiry,
} from '../../../actions/enquiry'
import { setBookingDate } from '../../../actions/search'
import { RootState } from '../../../store'
import { ALERT_TYPE, S3_BASE, timeArray,SERVICE_CHARGE,GST_CHARGE,CUTLERY_DISCOUNT } from '../../../utils/consts'
import { ROUTES } from '../../../utils/routing/routes'
import '../../styles/Book/Book.scss'
import TimeCarousel from '../Common/TimeCarousel'
import Counter from '../Explore/Counter'
import DatesCarousel from '../Explore/DatesCarousel'
import BottomButtonPaymentSummary from './mobileSubElements/BottomButtonPaymentSummary'
import PropertySummary from './mobileSubElements/PropertySummary'
import isAuthenticatedNow from '../../../utils/isAuthenticatedNow'
import { useRef } from 'react'
import Slider from 'react-slick'
import {
  InputTime,
  generateTimeSlots,
  hrs12Convert,
  calculate_future_time,
} from '../../../utils/helperTimeFunctions'
import book from '../../styles/Book/book.module.css'
import style from '../../styles/Book/alert.module.css'
import axios from 'axios'
import PaymentProceedButton from '../Payment/PaymentProceedButton'
import PaymentProcessingModal from '../Payment/PaymentProcessingModal'
interface bookProps {
  responsiveConditionalData?: boolean
  dataFromDetails?: boolean
  setViewBookFromDetails?: (value: boolean) => void
}

//test
const Book = ({
  responsiveConditionalData = false,
  dataFromDetails,
  setViewBookFromDetails,
}: bookProps) => {
  const CounterButton = styled(Paper)(({ theme }) => ({
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: '#8F7EF3',
    color:'white',
    fontSize: '1.5rem',
    borderRadius: '50%',
    border: '1px solid #8F7EF3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0.375rem',
    cursor: 'pointer',
  }))

  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const loadEnquiryData = useSelector<RootState, Boolean>(
    (state) => state.enquiry.loadEnquiryData
  )
  const addMoreEnquiry = useSelector<RootState, Boolean>(
    (state) => state.enquiry.addMoreEnquiry
  )
  const enquiryId = useSelector<RootState, number>(
    (state) => state.enquiry.enquiryId
  )
  const enquiry = useSelector<RootState, any>((state) =>
    state.enquiry.enquiries.find((enquiry: any) => enquiry.id === enquiryId)
  )
  const [alertMax, setAlertMax] = useState(false)
  const cart = useSelector<RootState, any>((state) =>
  state.cart.items
)
const currentDate = useSelector<RootState, any>(state => state.dateChanger.currentDate);

const [hasIFrameLoaded, setHasIFrameLoaded] = useState(false)
useEffect(() => {
  if(cart.length === 3) setAlertMax(true)
},[])
  // const isAuthenticated = useSelector<RootState, any>(
  //   (state) => state.guestAuth.isAuthenticated
  // )

  const isAuthenticated = isAuthenticatedNow()
  // console.log('🚀 ~ file: Book.tsx:75 ~ isAuthenticated:', isAuthenticated)

  const property = useSelector<RootState, any>(
    (state) => state.details.property
  )
  

  const bookingDate = useSelector<RootState, Date>(
    (state) => state.search.bookingDate
  )

  const cleaningChargeCake = useSelector<RootState, number>(
    (state) => state.appSettings.cleaningChargeCake
  )
  const cleaningTableDecor = useSelector<RootState, number>(
    (state) => state.appSettings.cleaningTableDecor
  )
  const cleaningFloorDecor = useSelector<RootState, number>(
    (state) => state.appSettings.cleaningFloorDecor
  )
  const instantBooking = useSelector<RootState, boolean>(
    (state) => state.details.property.directBooking
  )

  const alertItems = useSelector<RootState, any>((state) => state.alert)

  const [guestCount, setGuestCount] = useState<number>(1)
  const [servicesProvides, setServicesProvides] = useState<any>(
    property.services
  )
  const guestCountStore = useSelector<RootState, number>(
    (state) => state.search.guestCount
  )
  useEffect(() => {
    setGuestCount(guestCountStore)
  }, [guestCountStore])

  const [time, setTime] = useState(60)
  const timeCounter = useRef(0)
  const increase = () => {
    if(timeCounter.current < 4) {
      timeCounter.current = timeCounter.current + 1
      if(timeCounter.current === 0) {
        setTime(60)
      } else if(timeCounter.current === 1) {
        setTime(90)
      } else if (timeCounter.current === 2) {
        setTime(150)
      } else if (timeCounter.current === 3) {
        setTime(210)
      } else if (timeCounter.current === 4) {
        setTime(240)
      }
    }
    // if (time < 240) {
    //       setTime(time + 30)
    // }
  }
  const decrease = () => {
    if(timeCounter.current > 0) {
      timeCounter.current = timeCounter.current - 1
      if(timeCounter.current === 0) {
        setTime(60)
      } else if(timeCounter.current === 1) {
        setTime(90)
      } else if (timeCounter.current === 2) {
        setTime(150)
      } else if (timeCounter.current === 3) {
        setTime(210)
      } else if (timeCounter.current === 4) {
        setTime(240)
      }
    }
  }

  const [hostMsg, setHostMsg] = useState<string>()
  const [alertMsg, setAlertMsg] = useState({status:false,msg:''})
  const [timeShown, setTimeShown] = useState<string>(calculate_future_time()?.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }))
  const [timeIndex, setTimeIndex] = useState<number | null>(null)
  /*
  const [selectedDate, setSelectedDate] = useState<Date>(calculate_future_time())
  */
  const sliderRef = useRef<Slider>(null)
  const getData = (i: number) => {
    const data = timeArray[i]
    setTimeShown(data.time)
  }
  
  // Available and Unavilable Slots
  let from = currentDate;
  from.setHours(0,0,0,0);
  let to = new Date(currentDate);
  to.setHours(23,30,0,0)
  const [myData,setMyData] = useState<any>([]);
  const fetchSlots = async () => {
    const response = await axios.get(`https://bookmythinnai.com/api/schedule/${property._id}?from=${from}&to=${to}`)
    setMyData(response.data)
  }
  useEffect(() => {
    if(property._id)
    fetchSlots();
  },[property,currentDate])
  const unavailableSlots: string[] = [...(myData || []),...(property?.dailyUnavailablity || [])];

  
  useEffect(() => {
    if (alertMsg.status) {
      setTimeout(() => {
        setAlertMsg({...alertMsg,status:false,msg:''})
      }, 5000)
    }
  }, [alertMsg])
  useEffect(() => {
    if(timeIndex === null) {
      let now = calculate_future_time();
      let {indexOfCurrentTime,time} = hrs12Convert(now)
      setTimeIndex(indexOfCurrentTime);
      setTimeShown(time)
    }
    
    let Selected_Date = currentDate.getDate()
    let present = new Date();
    let presentDate = present.getDate();
    present.setMinutes(present.getMinutes()+ 45)
    let upcomingHour = present.getHours()
    
    let upcomingMinutes = present.getMinutes()
    
    let { hour: selectedHour, minutes } = InputTime(timeShown)
    
    if (Selected_Date === presentDate && selectedHour < upcomingHour) {
      setAlertMsg({...alertMsg,status:true,msg:"Reservations are available for time slots that are at least 45 minutes ahead of the present time."})
      let now = calculate_future_time()
      
      const {indexOfCurrentTime,time} = hrs12Convert(now)
      setTimeShown(time)
      setTimeIndex(indexOfCurrentTime)
      setTimeout(() => {
        sliderRef?.current?.slickGoTo(indexOfCurrentTime)
        //console.log('ref',indexOfCurrentTime);
      }, 300)
    } else if (Selected_Date === presentDate && selectedHour === upcomingHour) {
      if(minutes < upcomingMinutes) {
        setAlertMsg({...alertMsg,status:true,msg:"Reservations are available for time slots that are at least 45 minutes ahead of the present time."})
        let now = calculate_future_time()
        const {indexOfCurrentTime,time} = hrs12Convert(now)
        setTimeShown(time)
        setTimeIndex(indexOfCurrentTime)
        setTimeout(() => {
          sliderRef?.current?.slickGoTo(indexOfCurrentTime)
          //console.log('ref',indexOfCurrentTime);
        }, 300)
      }
    } else {
      if (timeIndex !== null) {
      const time = timeArray[timeIndex]
      setTimeShown(time?.time)
      }
    }
  }, [timeIndex, currentDate, sliderRef])

  const [secondState, setSecondState] = useState(false)
  const [thirdState, setThirdState] = useState(false)
  // const [state5, setState5] = useState<boolean>(true);
  const [state6, setState6] = useState<boolean>(true)
  const [state7, setState7] = useState<boolean>(false)
  const [state8, setState8] = useState<boolean>(false)

  const [cutlery, setCutlery] = useState<boolean>(true)
  const onClickCt = (value: boolean) => {
    setCutlery(value)
  }
  const [errMsg, setErrMsg] = useState(false)
  const [errGroupType, setErrGroupType] = useState(false)
  

  interface dataProp {
    id: string
    text: string
    pic: string
  }
  const data1: dataProp[] = [
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
      map:'cake'
    },
    {
      id: 'tableDecorations',
      text: 'Table Decorations',
      pic: '/assets/images/detail/table.svg',
      map:'table_decor'
    },
    {
      id: 'floorDecorations',
      text: 'Floor Decorations',
      pic: '/assets/images/detail/belun.svg',
      map:'floor_decor'
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

  const [valueAddItem1, setValueAddItem1] = useState<string[]>([])
  const [valueAddItem2, setValueAddItem2] = useState<string[]>([])
  const [addonServicesSelected, setAddonServicesSelected] = useState<string[]>(
    []
  )

  //TODO: only send mapped values
  const onClickAa1 = (index: number) => {
    if (valueAddItem1.includes(data1[index].id)) {
      setValueAddItem1([
        ...valueAddItem1.filter((item: string) => item !== data1[index].id),
      ])
    } else {
      setValueAddItem1([...valueAddItem1, data1[index].id])
    }
  }
  //TODO: only send mapped values
  const onClickAa2 = (index: number) => {
    if (valueAddItem2.includes(data2[index].id)) {
      setValueAddItem2([
        ...valueAddItem2.filter((item: string) => item !== data2[index].id),
      ])
    } else {
      setValueAddItem2([...valueAddItem2, data2[index].id])
    }
  }

  const onAddAddonService = (addOnServiceId: string) => {
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

  const [groupType, setGroupType] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupType(event.target.value as string)
  }

  // const handleChange = (event: SelectChangeEvent) => {
  // 	setGroupType(event.target.value as string);
  // };

  const hourSchedule = useSelector<RootState, any>(
    (state) => state.schedule.unavailableDatesByHours
  )
  //option state
  const [errOption, setErrOption] = useState(false)
  const [buttonStop, setButtonStop] = useState(false)

  const [startTime, setStartTime] = useState<Date>()

  

  useEffect(() => {
    const StartTime24 = new Date('01/01/2001 ' + timeShown).toLocaleTimeString(
      'default',
      {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }
    )
    const date = new Date(bookingDate)
    date.setHours(Number(StartTime24.split(':')[0]))
    date.setMinutes(Number(StartTime24.split(':')[1]))
    setStartTime(date)
  }, [bookingDate, timeShown])

  const [endTime, setEndTime] = useState<Date>()

  useEffect(() => {
    const date = new Date(startTime as Date)
    date.setMinutes(date.getMinutes() + time)
    setEndTime(date)
  }, [startTime, time])

  const [amount, setAmount] = useState<any>({nominalPrice:0,cleaningPrice:0,addOnServicePrice:0,cutleryDiscount:0,serviceCharge:0,gstAmt:0,totalAmt:0})
  const offers = [
    {
      offerName: 'For Gala Hours',
      offerDescription: 'Most HAPPENING HOURS of the Day',
      offerImg: '/assets/images/detail/fire.svg',
      startTimeMtoF: '2022-12-20T10:30:00.000',
      endTimeMtoF: '2022-12-20T23:59:00.000',
      startTimeStoS: '2022-12-20T06:30:00.000Z',
      endTimeStoS: '2022-12-20T23:11:00.000Z',
    },
    {
      offerName: 'For Joy Hours',
      offerDescription: 'Exclusive DISCOUNTS and OFFERS',
      offerImg: '/assets/images/detail/sale.svg',
      startTimeMtoF: '2022-12-19T06:00:00.000',
      endTimeMtoF: '2022-12-20T16:00:00.000',
      startTimeStoS: '2022-12-19T06:00:00.000',
      endTimeStoS: '2022-12-20T12:00:00.000',
    },
  ]
  const finalAmount = (
    bookingDate: Date,
    startTime: Date,
    duration: number,
    guestCount: number,
    valueAddItem1: string[],
    valueAddItem2: string[]
  ) => {
    const alcoholStatus =
      valueAddItem1.length > 0 ? 'withAlcohol' : 'withoutAlcohol'

    let timeCategory: string = ''
 /* nominal price
      cleaning price
      add on service price
      cutlery discount
      service charge 
      GST
      total amount
    */
    let nominalPrice:number=0
    let cleaningPrice:number=0
    let addOnServicePrice:number=0
    let cutleryDiscount:number=0
    let serviceCharge:number=0
    let gstAmt:number=0
    let totalAmt:number=0
    let totalAmtWithoutServiceCharge:number=0;

    if (duration === 60)
      timeCategory = 'oneHour'
    else if (duration > 60 && duration <= 90) timeCategory = 'oneAndHalfHour'
    else if (duration > 90 && duration <= 150) timeCategory = 'twoAndHalfHour'
    else if (duration > 150 && duration <= 210)
      timeCategory = 'threeAndHalfHour'
    else if (duration >= 240)
      timeCategory =
        'four'
    let price = 0
    if(startTime) {
      startTime.setSeconds(0)
    }
    const endTime = new Date(startTime)
    if(endTime) {
      endTime.setMinutes(endTime.getMinutes() + duration)
    }
  
    let joyWeekStart: any = null;
    let joyWeekEnd: any = null;
    const isWeekend =
      new Date(bookingDate).getDay() === 0 ||
      new Date(bookingDate).getDay() === 6
      if(new Date(bookingDate).getDay() === 0 ||
      new Date(bookingDate).getDay() === 6) {
      joyWeekStart = new Date(bookingDate);
      joyWeekEnd = new Date(bookingDate)
      joyWeekStart.setHours(6)
      joyWeekStart.setMinutes(0)
      joyWeekStart.setSeconds(0)
      joyWeekEnd.setHours(12)
      joyWeekEnd.setMinutes(0)
      joyWeekEnd.setSeconds(0)

} else {
  joyWeekStart = new Date(bookingDate);
  joyWeekEnd = new Date(bookingDate)
  joyWeekStart.setHours(6)
  joyWeekStart.setMinutes(0)
  joyWeekStart.setSeconds(0)
  joyWeekEnd.setHours(16)
  joyWeekEnd.setMinutes(0)
  joyWeekEnd.setSeconds(0)
}
      let offerType = ''
      if (
          !isWeekend &&
          !isWeekend &&
          new Date(startTime) >=
          joyWeekStart &&
          new Date(endTime) <=
          joyWeekEnd
      ) {
          offerType = 'joyHours'
      }
      
      else if (
        isWeekend &&
        new Date(startTime) >=
        joyWeekStart &&
        new Date(endTime) <=
        joyWeekEnd
    ) {
        offerType = 'joyHours'
    }
      
      else{
          offerType = 'galaHours'
      }

    let guestCountCategory = Math.ceil(Number(guestCount) / 2) - 1
    if (offerType === 'joyHours') {
      price =
        property.pricing.joyHour[guestCountCategory][alcoholStatus][
          timeCategory
        ]
    } else if (offerType === 'galaHours') {
      price =
        property.pricing?.galaHour[guestCountCategory][alcoholStatus][
          timeCategory
        ]
    }
    nominalPrice=price;


    //Todo: Get from app Settings
    if (valueAddItem2.includes('cake')) cleaningPrice += cleaningChargeCake
    if (valueAddItem2.includes('tableDecorations')) cleaningPrice += cleaningTableDecor
    if (valueAddItem2.includes('floorDecorations')) cleaningPrice += cleaningFloorDecor

    addonServicesSelected.forEach((addOnService) => {
      addOnServicePrice += property.addOnServices.find(
        (serviceInternal: any) =>
          addOnService === serviceInternal.addOnServiceId
      )?.addOnPrice
    })

    if (!cutlery) {
      cutleryDiscount = nominalPrice * CUTLERY_DISCOUNT
    }
    price=nominalPrice+cleaningPrice+addOnServicePrice-cutleryDiscount;
  //   {
  //     nominalPrice
  //     cleaningPrice
  //     addonServicesPrice
  //     cutleryDiscount
  //     serviceCharge
  //     gstAmount
  //     totalAmount
  // }
    totalAmtWithoutServiceCharge = price
    serviceCharge=price*SERVICE_CHARGE

    gstAmt=serviceCharge * GST_CHARGE
    totalAmt = price + serviceCharge + gstAmt

    // return Number(price.toFixed(2))
    return {nominalPrice,
      cleaningPrice,
      addOnServicePrice,
      cutleryDiscount,
      serviceCharge,
      totalAmtWithoutServiceCharge,
      gstAmt:Number(gstAmt.toFixed(2)),
      totalAmt:Number(totalAmt.toFixed(2)),
    }
  }
  const [encReqURL, setEncReqURL] = useState('')

  useEffect(() => {
    const price = finalAmount(
      bookingDate,
      startTime as Date,
      time,
      guestCount,
      valueAddItem1,
      valueAddItem2
      )
    setAmount(price)
  }, [
    bookingDate,
    startTime,
    guestCount,
    time,
    valueAddItem1,
    valueAddItem2,
    cutlery,
    addonServicesSelected,
  ])

  const discountPrice: number = amount?.totalAmtWithoutServiceCharge + amount?.totalAmtWithoutServiceCharge * 0.2

  const onClickReserve = () => {
    let enquiry: any = {
      propertyId: property._id,
      propertyName: property.propertyName,
      propertyPictures: property.propertyPictures,
      guestCount: guestCount,
      groupType: groupType,
      city: property.city,
      state: property.state,
      bookingDate: bookingDate,
      startTime: startTime,
      endTime: endTime,
      host: property.user,
      duration: time,
      timeIndex: timeIndex,
      cutlery: cutlery,
      additions1: valueAddItem1,
      additions2: valueAddItem2,
      addOnServicesRequested: addonServicesSelected,
      amount: amount.totalAmt,
      hostMsg: hostMsg,
      propertyBookingType:
        property.directBooking === true ? 'instant' : 'request',
    }

    if (instantBooking) {
      enquiry.id = Math.floor(Math.random() * 1000000000)
      dispatch(addEnquiry(enquiry, () => {navigate(ROUTES.ENQUIRY_SUMMARY)}))
    } else if (loadEnquiryData) {
      enquiry.id = enquiryId
      dispatch(
        updateEnquiry(enquiryId, enquiry, () =>
          navigate(ROUTES.ENQUIRY_SUMMARY)
        )
      )
      dispatch(setLoadEnquiryData({ loadEnquiryData: false }))
    } else {
      if (addMoreEnquiry) {
        dispatch(setAddMoreEnquiry({ addMoreEnquiry: false }))
      }
      // enquiry.id = Math.floor(Math.random() * 1000000000)
      dispatch(
        addEnquiry(enquiry, () => {
          navigate(ROUTES.ENQUIRY_SUMMARY)
        })
      )
    }
  }

  useEffect(() => {
    if (loadEnquiryData) {
      setTime(enquiry.duration)
      setTimeIndex(enquiry.timeIndex)
      setCutlery(enquiry.cutlery)
      setValueAddItem1(enquiry.additions1)
      setValueAddItem2(enquiry.additions2)
      setGuestCount(enquiry.guestCount)
      setGroupType(enquiry.groupType)
      setHostMsg(enquiry.hostMsg)
      if (enquiry.propertyId === property._id) {
        setAddonServicesSelected(enquiry.addOnServicesRequested)
      }
      dispatch(setBookingDate({ bookingDate: enquiry.bookingDate }))
    } else {
      setGuestCount(guestCountStore)
      /* setSelect(groupTypeStore); */
    }
    if (addMoreEnquiry) {
      //setSecondState(true);
      //setThirdState(true);
      setState7(true)
      //setState6(true)
    }
  }, [])

  const [isAvailable, setIsAvailable] = useState(true)
  useEffect(() => {
    if (startTime) {
      hourSchedule.forEach((hour: any) => {
        if (
          startTime!.getTime() > hour.unavailableFrom.getTime() &&
          startTime!.getTime() < hour.unavailableTo.getTime()
        ) {
          setAlert('Host Unavailable during this period', ALERT_TYPE.INFO)
          setIsAvailable(false)
        } else {
          setIsAvailable(true)
        }
      })
    }
  }, [hourSchedule, startTime])
  
  const handleNextOnPhone = () => {
    if (secondState && thirdState && groupType) {
      console.log(1)
      onClickReserve()
      // } else if (secondState && state5) {
      //   setState6(true);
      //   setState5(false);
    } else if (secondState && state6 && groupType && !buttonStop) {
      console.log(2)
      setState7(true)
      setState6(false)
      setErrGroupType(false)
    }
    else if(secondState && state6 && groupType && buttonStop){
      console.log(3)
      navigate(ROUTES.EXPLORE)
      setErrGroupType(false)
    }else if(secondState && state6 && !groupType){setErrGroupType(true)}
     else if (secondState && state7) {
      console.log(5)
      setState7(false)
      if (!property.addOnServices || !property.addOnServices.length) {
        console.log(6)
        setThirdState(true)
        setState8(false)
      } else setState8(true)
    } else if (secondState && state8) {
      console.log(9)
      setState8(false)
      setThirdState(true)
    } else {
      if (isAvailable) {
        const chosenSlots = generateTimeSlots(timeShown, time / 30)
        //console.log('chosenSlots',chosenSlots);
        //console.log('unavailableSlots',unavailableSlots);
        const result = chosenSlots.some((slot) =>
          unavailableSlots?.includes(slot)
        )
        if (result) {
          setAlertMsg({status:true,msg:'No continuouse slots available for selected time,try a different date or time.'})
        } else {
          setSecondState(true)
          
        }
      }
    }
  }

  // const handleBackButton = () =>{
  //   if(thirdState){
  //     setState8(true)
  //     setThirdState(false)
  //     setSecondState(true)
  //   }
  //   else if(state8){
  //     setState8(false)
  //     setState7(true)
  //     setSecondState(true)
  //   }
  //   else if(state7){
  //     setState7(false)
  //     setState6(true)
  //     setSecondState(true)
  //   }
  //   else if(secondState && state6){
  //     // setIsAvailable(true)
  //     setSecondState(false)
  //   }
  // }

  // property services function

  let arr1: dataProp[] = []
  const handleServices = () => {
    for (let i = 0; i < data1.length; i++) {
      for (let j = 0; j < servicesProvides.length; j++) {
        if (data1[i].text.toLowerCase() === servicesProvides[j].toLowerCase()) {
          arr1.push(data1[i])
        }
      }
    }
    return arr1
  }

  let arr2: dataProp[] = []

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
  // Option state
  // Option state
  
  function optionSelect(e:any){
    if(property?.preferredGuests?.includes('allow_all')){
      setErrOption(false);
      setButtonStop(false);
      setErrGroupType(false);
    }
    else if(property?.preferredGuests?.includes(e.target.value)){
      setErrOption(false);
      setButtonStop(false);
      setErrGroupType(false);
    }
    else{
      setErrOption(true);
      setButtonStop(true);
      setErrGroupType(false);
    }
  }

  // useNavBlocker({
  // 	enabled: secondState || thirdState,
  // 	onBlock: navigation => {
  // 		if (thirdState) {
  // 			return navigation.confirm();
  // 		}
  // 		if (secondState && thirdState && groupType) {
  // 			setThirdState(false);
  // 		} else if (secondState && state5) {
  // 			setSecondState(false);
  // 		} else if (secondState && state6) {
  // 			setState5(true);
  // 			setState6(false);
  // 		} else if (secondState && state7) {
  // 			setState7(false);
  // 			setState6(true);
  // 		} else if (secondState && state8) {
  // 			setState7(true);
  // 			setState8(false);
  // 		} else {
  // 			setSecondState(true);
  // 		}
  // 	},
  // });
  // Number(price.toFixed(2)
  
  return (
    <>
      {alertItems.length > 0 && 

      <Alert className={style.alert} severity={alertItems[0].alertType}>{alertItems[0].msg}</Alert>}
      <Box
        padding={{
          xl: '1.475rem 2.188rem',
          md: '1.25rem 1.563rem',
          sm: '3.063rem 3.063rem',
          xs: '1.25rem 1.563rem',
        }}
        width={{ xl: '100%', md: '100%', xs: 'auto' }}
        margin="auto"
        borderRadius={{ md: '20px', xs: '0px' }}
        sx={{
          background: '#FFFFFF',
          border: '1px solid #C5C5C5',
          boxShadow: '2px 4px 8px 7px rgba(0, 0, 0, 0.04)',
        }}
      >
        {window.innerWidth < 600 && (
          <Box position="absolute" top="0%" right="0%" zIndex="2">
            <img src="/assets/images/bgCircle.svg" alt="img" />
          </Box>
        )}
        {/* <Button
          onClick={()=>handleBackButton()}
         >
        <img src="/assets/images/detail/arrowBack.svg" alt="back" />
        </Button> */}
        {secondState ? (
          thirdState ? (
            <Box>
              <Box display="flex" justifyContent="flex-end">
                <Box
                  sx={{ background: '#EFECFF' }}
                  borderRadius="164px"
                  width="fit-content"
                  padding="5px 1.25rem"
                  display={{ md: 'block', xs: 'none' }}
                >
                  <Box
                    fontFamily="Open Sans"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.11em"
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                    letterSpacing="0.015em"
                    color="#6053AE"
                  >
                    {property.directBooking === true
                      ? 'Direct Booking'
                      : 'On Request Booking'}
                  </Box>
                </Box>
              </Box>
              {/* Mobile Only */}
              <Box height={{ sm: 40, md: 0 }} />
              <Box display={{ xs: 'block', md: 'none' }}>
                {window.innerWidth < 600 && (
                  <Box position="absolute" top="0%" right="0%" zIndex="2">
                    <img src="/assets/images/bgCircle.svg" alt="img" />
                  </Box>
                )}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  borderRadius="6px"
                  border="1px solid #DEDEDE"
                  height="42px"
                  alignItems="center"
                  zIndex="2"
                  position="relative"
                  sx={{ background: '#FFFFFF' }}
                >
                  <Box
                    width="100%"
                    height="100%"
                    fontWeight="700"
                    fontSize="1.25rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box height="100%">
                      <Button
                        style={{ height: '100%' }}
                        onClick={() => setViewBookFromDetails?.(false)}
                      >
                        <img src="/assets/images/detail/arrowBack.svg" alt="" />
                      </Button>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          lineHeight: '16px',
                        }}
                      >
                        {new Date(bookingDate.toString()).toLocaleDateString(
                          'default',
                          {
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Box>
                      <Box height={2} />
                      <Box
                        color="#827B7B"
                        sx={{
                          fontWeight: '400',
                          fontSize: '0.625rem',
                          lineHeight: '14px',
                        }}
                        textTransform='capitalize'
                      >
                        {guestCount} {guestCount >1 ?  ' Guests':' Guest'}{`, `}
                        {groupType.replaceAll('_',' ')}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box height={16} />
                <PropertySummary
                  propertyName={property.propertyName}
                  propertyAddressString={`${property.houseNumber} ${property.tower} ${property.street}, ${property.city}
								, ${property.state}`}
                  propertyThumbnail={
                    property?.propertyPictures
                    ? property.propertyPictures[0]
                    : '/assets/images/additional-1.png'
                  }
                />
              </Box>

              {/* RESPONSIVE MENU___________________________________________________________RESPONSIVE MENU */}
              <Box height={!dataFromDetails ? '20px' : '0px'} />
              <Box
                display={{ md: 'flex', xs: 'none' }}
                justifyContent="space-between"
                padding="1rem"
                alignItems="center"
                sx={{
                  border: '1px solid #000000',
                  filter: 'drop-shadow(3px 4px 8px rgba(0, 0, 0, 0.25))',
                  borderRadius: '6px',
                }}
              >
                <Box
                  width={{
                    xs: '100%',
                  }}
                >
                  <Box className="book__header" lineHeight="1.3em">
                    Book Your Thinnai
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '700',
                      // fontSize: '0.6rem',
                      fontSize: '0.7rem',
                      lineHeight: '27px',
                    }}
                  >
                    {new Date(bookingDate as Date).toLocaleString('default', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    |{' '}
                    {new Date(startTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    -{' '}
                    {new Date(endTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  gap="2px"
                  width="135px"
                >
                  <Box
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: '600',
                      fontSize: { xs: '1.613rem', md: '1.6vw', xl: '1.2vw' },
                      lineHeight: '20px',
                      color: '#000000',
                    }}
                    whiteSpace='nowrap'
                  >
                    ₹ {amount.totalAmtWithoutServiceCharge.toFixed(2)}
                  </Box>
                  {/* <Box>
                    <Box
                      sx={{
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        // fontSize: '0.6rem',
                        fontSize: '0.6rem',
                        lineHeight: '27px',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ textDecoration: 'line-through' }}>
                        ₹ {(amount.totalAmtWithoutServiceCharge + amount.totalAmtWithoutServiceCharge * 0.2).toFixed(2)}{' '}
                      </span>
                      <span style={{ color: '#D23535' }}> ( 20% off )</span>
                    </Box>
                  </Box> */}
                </Box>
              </Box>
              {/* Message to Host */}
              <Box marginTop="3.125rem">
                <Box className="book__header" fontFamily="Montserrat">
                  Message to Host
                </Box>
                <Typography
                  marginBottom="0.938rem"
                  fontSize="0.838rem"
                  fontWeight={400}
                  lineHeight="1.3em"
                  fontFamily="Open Sans"
                  color="#707B8E"
                >
                  Anything that you would like the host to know
                </Typography>
                <TextareaAutosize
                  onResize={undefined}
                  onResizeCapture={undefined}
                  style={{
                    // width: '95%',
                    minWidth: '-webkit-fill-available',
                    height: '20vh',
                    padding: '0.938rem',
                    fontSize: '1.125rem',
                    border: '1px solid #DFDAFF',
                    borderRadius: '6px',
                    resize: 'none',
                  }}
                  autoFocus
                  defaultValue={hostMsg}
                  onChange={(e: any) => setHostMsg(e.target.value)}
                  placeholder="Leave a message!"
                ></TextareaAutosize>
              </Box>
              <Box height={{ xs: 30, md: 10 }} />
              {/* <Box height={60} /> */}
              <Box display={{ md: 'block', xs: 'none' }}>
              <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    background: '#262626',
                    textTransform: 'none',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '1.1rem',
                    lineHeight: '29px',
                    color: '#FFFFFF',
                  }}
                  onClick={() => {
                    if (groupType) {
                      onClickReserve()
                    }
                  }}
                >
                  Reserve Your slot
                </Button> 
              </Box>
              <Box height={{ md: 0, xs: 64 }} />
            </Box>
          ) : (
            <Box>
              <Box display="flex" justifyContent="flex-end">
                <Box
                  sx={{ background: '#EFECFF' }}
                  borderRadius="164px"
                  width="fit-content"
                  padding="5px 1.25rem"
                  display={{ md: 'block', xs: 'none' }}
                >
                  <Box
                    fontFamily="Open Sans"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.11em"
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                    letterSpacing="0.015em"
                    color="#6053AE"
                  >
                    {property.directBooking === true
                      ? 'Direct Booking'
                      : 'On Request Booking'}
                  </Box>
                </Box>
              </Box>
              {/* RESPONSIVE MENU___________________________________________________________RESPONSIVE MENU */}
              <Box height={{ sm: 40, md: 0 }} />
              <Box display={{ xs: 'block', md: 'none' }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  borderRadius="6px"
                  border="1px solid #DEDEDE"
                  height="42px"
                  alignItems="center"
                  zIndex="2"
                  position="relative"
                  sx={{ background: '#FFFFFF' }}
                >
                  <Box
                    width="100%"
                    height="100%"
                    fontWeight="700"
                    fontSize="1.25rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box height="100%">
                      <Button
                        style={{ height: '100%' }}
                        onClick={() => setViewBookFromDetails?.(false)}
                      >
                        <img src="/assets/images/detail/arrowBack.svg" alt="" />
                      </Button>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          lineHeight: '16px',
                        }}
                      >
                        {new Date(bookingDate.toString()).toLocaleDateString(
                          'default',
                          {
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Box>
                      <Box height={2} />
                      <Box
                        color="#827B7B"
                        sx={{
                          fontWeight: '400',
                          fontSize: '0.625rem',
                          lineHeight: '14px',
                        }}
                        textTransform='capitalize'
                      >
                        {guestCount !== 0 ? `${guestCount} guests .` : ''}{', '}
                        {groupType.replaceAll('_',' ')}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box height={16} />
                <PropertySummary
                  propertyName={property.propertyName}
                  propertyAddressString={`${property.houseNumber} ${property.tower} ${property.street}, ${property.city}
								, ${property.state}`}
                  propertyThumbnail={
                    property?.propertyPictures
                    ? property.propertyPictures[0]
                    : '/assets/images/additional-1.png'
                  }
                />
              </Box>
              {/* RESPONSIVE MENU___________________________________________________________RESPONSIVE MENU */}
              <Box height={!dataFromDetails ? '20px' : '0px'} />
              <Box
                display={{ md: 'flex', xs: 'none' }}
                justifyContent="space-between"
                padding="1rem"
                alignItems="center"
                sx={{
                  border: '1px solid #000000',
                  filter: 'drop-shadow(3px 4px 8px rgba(0, 0, 0, 0.25))',
                  borderRadius: '6px',
                }}
              >
                <Box
                  width={{
                    xs: '100%',
                  }}
                >
                  <Box className="book__header" lineHeight="1.3em">
                    Book Your Thinnai
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '700',
                      // fontSize: '0.6rem',
                      fontSize: '0.7rem',
                      lineHeight: '27px',
                    }}
                  >
                    {new Date(bookingDate as Date).toLocaleString('default', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    |{' '}
                    {new Date(startTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    -{' '}
                    {new Date(endTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  gap="2px"
                  width="135px"
                >
                  <Box
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: '600',
                      fontSize: { xs: '1.613rem', md: '1.6vw', xl: '1.2vw' },
                      lineHeight: '20px',
                      color: '#000000',
                      whiteSpace:'nowrap'
                    }}
                  >
                    ₹ {amount.totalAmtWithoutServiceCharge.toFixed(2)}
                  </Box>
                  {/* <Box>
                    <Box
                      sx={{
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        // fontSize: '0.6rem',
                        fontSize: '0.6rem',
                        lineHeight: '27px',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ textDecoration: 'line-through' }}>
                        ₹ {(amount.totalAmtWithoutServiceCharge + amount.totalAmtWithoutServiceCharge * 0.2).toFixed(2)}{' '}
                      </span>
                      <span style={{ color: '#D23535' }}> ( 20% off )</span>
                    </Box>
                  </Box> */}
                </Box>
              </Box>
              <Box height={{ md: 20, xs: 0 }} />
              {/* {state5 && (
                <> */}
              {/* <Box display={{ md: "block" }}>
                    <Box className="book__header">Select Timing</Box>
                    <Box height={20} />
                    <Box
                      width={{
                        xl: "85%",
                        md: "100%",
                        xs: "85%",
                      }}
                      margin="auto"
                    >
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-around"
                      >
                        <Box
                          width={{
                            xl: "50%",
                            md: "45%",
                            xs: "50%",
                          }}
                        >
                          <Box
                            display="flex"
                            width="80%"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Box className="book__timing-head">TIME</Box>
                            <Box
                              className="book__timing-p"
                              sx={{
                                color: isAvailable ? "#000000" : "#FF0000",
                              }}
                            >
                              {timeShown}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          height="auto"
                          width="1.5px"
                          sx={{ background: "#DEDEDE" }}
                        />
                        <Box
                          display="flex"
                          width={{
                            xl: "50%",
                            md: "55%",
                            xs: "50%",
                          }}
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box className="book__timing-head">DURATION</Box>
                          <Box display="flex" alignItems="center">
                            <CounterButton onClick={decrease}>-</CounterButton>
                            <Box className="book__timing-p">{time} min</Box>
                            <CounterButton onClick={increase}>+</CounterButton>
                          </Box>
                        </Box>
                      </Box>
                      <Box height={20} />
                      <Divider />
                      <Box height={20} />
                      <Box>
                        <Box display="flex" justifyContent="center">
                          <img
                            height={22}
                            src="/assets/images/detail/pointingArrow.svg"
                            alt=""
                          />
                        </Box>
                        <Box
                          height={3}
                          sx={{
                            background: "radial-gradient(#8F7EF3 , #8F7EF300);",
                          }}
                        />
                        <Box height={3} width="100%" />
                        <Box width={{ md: "99.5%", xs: "99.5%", sm: "99%" }}>
                          {timeIndex != null && (
                            <TimeCarousel
                              data={timeArray}
                              onClick={(i) => getData(i)}
                              setTimeOnSlide={setTimeIndex}
                              currentIndex={timeIndex}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box> */}
              {/* <Box height={30} />
                  <Box display={{ md: "block", xs: "none" }}>
                    <Button
                      variant="contained"
                      style={{
                        width: "100%",
                        background: "#262626",
                        textTransform: "none",
                        fontFamily: "Montserrat",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "1.1rem",
                        lineHeight: "29px",
                        color: "#FFFFFF",
                      }}
                      // onClick={onClickReserve}
                      onClick={() => {
                        if (groupType) {
                          setState6(true);
                          setState5(false);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                  <Box height={{ md: 10, xs: 64 }} />
                </>
              )} */}
              {state6 && (
                <>
                  <Box>
                    <Box display={{ md: 'block' }}>
                      <Box className="book__header" fontFamily='Montserrat'>Select Group Details</Box>
                      <Box height={'0.35rem'} />
                      <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-between"
                        // padding={{ md: '0px 0px 0px 0px', sm: '0' }}
                        // gap={1}
                        // sx={{
                        // 	'@media (max-width: 1020px)': {
                        // 		padding: 0,
                        // 	},
                        // }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          // minWidth={110}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                              fontWeight: '400',
                              // fontSize: '0.875rem',
                              fontSize: '0.9vw',
                              lineHeight: '27px',
                              '@media (max-width: 900px)': {
                                fontSize: '2vw',
                              },
                              '@media (max-width: 600px)': {
                                fontSize: '3.3vw',
                              },
                            }}
                          >
                            <GroupsIcon
                              sx={{
                                fontSize: '1.28vw',
                                textAlign: 'center',
                                '@media (max-width: 900px)': {
                                  fontSize: '2vw',
                                },
                                '@media (max-width: 600px)': {
                                  fontSize: '3.3vw',
                                },
                              }}
                            />
                            &nbsp; No. of Guests
                          </Box>
                          <Box height={6} />
                          <Counter
                            maxValue={
                              loadEnquiryData
                                ? enquiry.propertyId.maxGuestCount
                                : property.maxGuestCount
                            }
                            setErrMsg={setErrMsg}
                          />
                        </Box>
                        <Box
                          // width='40%'
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          position="relative"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                              fontWeight: '400',
                              // fontSize: '0.875rem',
                              fontSize: '0.9vw',
                              lineHeight: '27px',
                              '@media (max-width: 900px)': {
                                fontSize: '2vw',
                              },
                              '@media (max-width: 600px)': {
                                fontSize: '3.3vw',
                              },
                            }}
                          >
                            <GroupsIcon
                              sx={{
                                fontSize: '1.28vw',
                                textAlign: 'center',
                                '@media (max-width: 900px)': {
                                  fontSize: '2vw',
                                },
                                '@media (max-width: 600px)': {
                                  fontSize: '3.3vw',
                                },
                              }}
                            />
                            &nbsp; Group Type
                          </Box>
                          <Box height={6} sx={{ minWidth: 120 }} />
                          <Box height="fit-content">
                            <FormControl
                              size="small"
                              sx={{ m: 1, height: '33px', margin: '0' }}
                            >
                              <select
                                className="groupTypeSelect"
                                name="groupType"
                                id="groupType"
                                value={groupType}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  handleChange(e)
                                  optionSelect(e)
                                }}
                              > 
                                <option value="" selected disabled hidden>
                                  Choose here
                                </option>
                                <option value="couple">Couples</option>
                                <option value="men_and_women">Men and Women</option>
                                <option value="family_with_kids">Family with Kid(s)</option>
                                <option value="family_without_kids" >Family without Kid(s)</option>
                                <option value="women_only">Women only</option>
                                <option value="men_only">Men Only</option>
                              </select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box height={10} />
                    {errOption && (
                      <Typography
                        display={{xs:'none', md:'block'}}
                        className="book__header"
                        fontWeight="400!important"
                        color="#ff3333!important"
                      >
                        Guest Type Not Available
                      </Typography>
                    )}
                    {errMsg && (
                      <Typography
                        className="book__header"
                        fontWeight="400!important"
                        color="#ff3333!important"
                      >
                        This Property allows a maximum{' '}
                        {loadEnquiryData
                          ? enquiry?.propertyId?.maxGuestCount
                          : property?.maxGuestCount}{' '}
                        guest
                      </Typography>
                    )}
                    {errGroupType && (
                      <Typography
                        className="book__header"
                        fontWeight="400!important"
                        color="#ff3333!important"
                      >
                        Select a Group Type
                      </Typography>
                    )}
                    <Box height={20} />
                    {(property.services.includes('alcohol') ||
                      property.services.includes('hookah')) && (
                      <>
                        <Box
                          className="book__header"
                          sx={{ lineHeight: '23px' }}
                        >
                          Select To Add Permits To Bring 
                        </Box>
                        <Box height={10} />
                        <Box
                          display="flex"
                          width="100%"
                          gap={2}
                          justifyContent="flex-start"
                        >
                          {handleServices()?.map((item, index) => (
                            <Box
                              onClick={() => onClickAa1(index)}
                              width="110px"
                              height="110px"
                              border="0.5px solid #868686"
                              borderRadius="5px"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: valueAddItem1.includes(
                                  data1[index].id
                                )
                                  ? '#F2F0DF'
                                  : '',
                              }}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              key={index}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                                gap={1}
                                width="3rem"
                              >
                                <img
                                  src={item.pic}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                  alt="img"
                                />
                                <div>{item.text}</div>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <Box height={20} />
                      </>
                    )}
                  </Box>
                  <Box display={{ md: 'block', xs: 'none' }}>
                    <Button
                      variant="contained"
                      style={{
                        width: '100%',
                        background: '#262626',
                        textTransform: 'none',
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                        lineHeight: '29px',
                        color: '#FFFFFF',
                      }}
                      // onClick={onClickReserve}
                      onClick={() => {
                        if (groupType && !buttonStop) {
                          setState7(true)
                          setState6(false)
                          setErrGroupType(false)
                        }
                        else if(groupType && buttonStop){
                          navigate(ROUTES.EXPLORE)
                          setErrGroupType(false)
                        }
                        else {
                          setErrGroupType(true)
                        }
                      }}
                      disabled={buttonStop && !groupType}
                    >
                     {buttonStop ? 'Move to Explore': 'Next' }
                    </Button>
                  </Box>
                  <Box height={{ md: 0, xs: 120 }} />
                </>
              )}
              {state7 && (
                <>
                  {(property.services.includes('cake') ||
                    property.services.includes('floorDecorations') ||
                    property.services.includes('tableDecorations')) && (
                    <>
                      <Box className="book__header">
                        Select To Add Permits To Bring
                      </Box>
                      <Typography
                        fontWeight={400}
                        fontSize={{
                          md: '0.738rem',
                          sm: '3vw',
                          xs: '3vw',
                        }}
                        color="#707B8E"
                        lineHeight="1.4em"
                      >
                        Cleaning charges are applicable
                      </Typography>
                      <Box height={20} />
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
                        {handleServices1().map((item, index) => (
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
                              backgroundColor: valueAddItem2.includes(
                                data2[index].id
                              )
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
                    </>
                  )}

                  <Box height={20} />
                  <Box>
                    <Box
                      className="book__header"
                      // fontWeight={600}
                      // color='#272f3d'
                      // fontSize={{
                      //   xl: '1.29rem',
                      //   md: '1.2rem',
                      //   sm: '1rem',
                      //   xs: '1.29rem',
                      // }}
                    >
                      Do You Require Plates/Glasses/Cutlery?
                    </Box>
                    <Typography
                      fontWeight={400}
                      fontSize="0.738rem"
                      color="#7B7E84"
                      lineHeight="1.4em"
                    >Get an Instant Discount of {' '}
                      <span
                        style={{
                          color: '#32860A',
                        }}
                      >
                        {' '}
                        ₹{(amount.nominalPrice*0.05).toFixed(2)}{' '}
                      </span>{' '}
                    </Typography>
                    <Box height={15} />
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
                            backgroundColor:
                              item.value === cutlery ? '#F2F0DF' : '',
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
                            {/* <Typography
                              fontSize="0.688rem"
                              lineHeight="1.2em"
                              textAlign="center"
                              letterSpacing="0.02em"
                            >
                              Discount {item.value ? 0 : 5}%
                            </Typography> */}
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Box>

                  <Box height={20} />
                  <Box display={{ md: 'block', xs: 'none' }}>
                    <Button
                      variant="contained"
                      style={{
                        width: '100%',
                        background: '#262626',
                        textTransform: 'none',
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                        lineHeight: '29px',
                        color: '#FFFFFF',
                      }}
                      onClick={() => {
                        if (groupType) {
                          setState7(false)
                          if (
                            !property.addOnServices ||
                            !property.addOnServices.length
                          ) {
                            setThirdState(true)
                            setState8(false)
                          } else setState8(true)
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                  <Box height={{ md: 0, xs: 64 }} />
                </>
              )}
              {state8 && (
                <>
                  {/* Select Additional Services */}
                  {property.addOnServices && (
                    <Box
                      display={
                        property.addOnServices.length === 0 ? 'none' : 'block'
                      }
                    >
                      <Box className="book__header">
                        Select Additional Services
                      </Box>
                      <Typography
                        fontWeight={400}
                        fontSize="0.938rem"
                        color="#707B8E"
                        lineHeight="1.2em"
                      >
                        Cleaning charges are applicable{' '}
                      </Typography>
                      <Box height={25} />
                      <Box
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        gap={2}
                      >
                        {property.addOnServices.map(
                          (item: any, index: number) => (
                            <Box
                              onClick={() =>
                                onAddAddonService(item?.addOnServiceId)
                              }
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
                          )
                        )}
                      </Box>
                    </Box>
                  )}
                  <Box height={{ xs: '60px', sm: '30px' }} />
                  <Box display={{ md: 'block', xs: 'none' }}>
                    <Button
                      variant="contained"
                      style={{
                        width: '100%',
                        background: '#262626',
                        textTransform: 'none',
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                        lineHeight: '29px',
                        color: '#FFFFFF',
                      }}
                      onClick={() => {
                        if (groupType) {
                          setState8(false)
                          setThirdState(true)
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                  <Box height={{ md: 10, xs: 64 }} />
                </>
              )}
            </Box>
          )
        ) : (
          // First State
          <Box>
            <Box display="flex" justifyContent="flex-end">
              <Box
                sx={{ background: '#EFECFF' }}
                borderRadius="164px"
                width="fit-content"
                padding="5px 1.25rem"
                display={{ md: 'block', xs: 'none' }}
              >
                <Box
                  fontFamily="Open Sans"
                  fontStyle="normal"
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.11em"
                  display="flex"
                  alignItems="center"
                  textAlign="center"
                  letterSpacing="0.015em"
                  color="#6053AE"
                >
                  {property.directBooking === true
                    ? 'Direct Booking'
                    : 'On Request Booking'}
                </Box>
              </Box>
            </Box>
            {/* RESPONSIVE MENU___________________________________________________________RESPONSIVE MENU */}
            <Box height={{ sm: 40, md: 0 }} />
            <Box display={{ xs: 'block', md: 'none' }}>
              <Box
                display="flex"
                justifyContent="space-between"
                borderRadius="6px"
                border="1px solid #DEDEDE"
                height="42px"
                alignItems="center"
                zIndex="2"
                position="relative"
                sx={{ background: '#FFFFFF' }}
              >
                <Box
                  width="100%"
                  height="100%"
                  fontWeight="700"
                  fontSize="1.25rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box height="100%">
                    <Button
                      style={{ height: '100%' }}
                      onClick={() => setViewBookFromDetails?.(false)}
                    >
                      <img src="/assets/images/detail/arrowBack.svg" alt="" />
                    </Button>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        lineHeight: '16px',
                      }}
                    >
                      {new Date(bookingDate?.toString()).toLocaleDateString(
                        'default',
                        {
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Box>
                    <Box height={2} />
                    <Box
                      color="#827B7B"
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.625rem',
                        lineHeight: '14px',
                      }}
                      textTransform='capitalize'
                    >
                      {guestCount !== 0 ? `${guestCount} guests .` : ''}{', '}
                      {groupType.replaceAll('_',' ')}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box height={16} />
              {/* <PropertySummary
                propertyName={property.propertyName}
                propertyAddressString={`${property.houseNumber} ${property.tower} ${property.street}, ${property.city}
								, ${property.state}`}
                propertyThumbnail={
                  property?.propertyPictures
                    ? property.propertyPictures[0]
                    : '/assets/images/additional-1.png'
                }
              /> */}
            </Box>

            {/* RESPONSIVE MENU___________________________________________________________RESPONSIVE MENU */}
            <Box height={!dataFromDetails ? '20px' : '0px'} />
            {secondState && (
              <Box
              display={{ md: 'flex', xs: 'none' }}
              justifyContent="space-between"
              padding="1rem"
              alignItems="center"
              sx={{
                border: '1px solid #000000',
                filter: 'drop-shadow(3px 4px 8px rgba(0, 0, 0, 0.25))',
                borderRadius: '6px',
              }}
            >
              <Box
                width={{
                  xs: '100%',
                }}
              >
                <Box className="book__header" lineHeight="1.3em">
                  Book Your Thinnai
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '700',
                    // fontSize: '0.6rem',
                    fontSize: '0.7rem',
                    lineHeight: '27px',
                  }}
                >
                  {new Date(bookingDate as Date).toLocaleString('default', {
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  |{' '}
                  {new Date(startTime as Date).toLocaleTimeString('default', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}{' '}
                  -{' '}
                  {new Date(endTime as Date).toLocaleTimeString('default', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                gap="2px"
                width="135px"
              >
                <Box
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    fontSize: { xs: '1.613rem', md: '1.6vw', xl: '1.2vw' },
                    lineHeight: '20px',
                    color: '#000000',
                  }}
                  whiteSpace='nowrap'
                >
                  ₹ {amount.totalAmtWithoutServiceCharge.toFixed(2)}
                </Box>
                {/* <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '400',
                      // fontSize: '0.6rem',
                      fontSize: '0.6rem',
                      lineHeight: '27px',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ textDecoration: 'line-through' }}>
                      ₹ {(amount.totalAmtWithoutServiceCharge + amount.totalAmtWithoutServiceCharge * 0.2).toFixed(2)}{' '}
                    </span>
                    <span style={{ color: '#D23535' }}> ( 20% off )</span>
                  </Box>
                </Box> */}
              </Box>
            </Box>
            )}
            <Box height='0px' />
            <Box
                display={{ md: 'flex', xs: 'none' }}
                justifyContent="space-between"
                padding="1rem"
                alignItems="center"
                sx={{
                  border: '1px solid #000000',
                  filter: 'drop-shadow(3px 4px 8px rgba(0, 0, 0, 0.25))',
                  borderRadius: '6px',
                }}
              >
                <Box
                  width={{
                    xs: '100%',
                  }}
                >
                  <Box className="book__header" lineHeight="1.3em">
                    Book Your Thinnai
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '700',
                      // fontSize: '0.6rem',
                      fontSize: '0.7rem',
                      lineHeight: '27px',
                    }}
                  >
                    {new Date(bookingDate as Date).toLocaleString('default', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    |{' '}
                    {new Date(startTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    -{' '}
                    {new Date(endTime as Date).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  gap="2px"
                  width="135px"
                >
                  <Box
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: '600',
                      fontSize: { xs: '1.613rem', md: '1.6vw', xl: '1.2vw' },
                      lineHeight: '20px',
                      color: '#000000',
                    }}
                    whiteSpace='nowrap'
                  >
                    ₹ {amount?.totalAmtWithoutServiceCharge?.toFixed(2)}
                  </Box>
                  {/* <Box>
                    <Box
                      sx={{
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        // fontSize: '0.6rem',
                        fontSize: '0.6rem',
                        lineHeight: '27px',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span style={{ textDecoration: 'line-through' }}>
                        ₹ {(amount.totalAmtWithoutServiceCharge + amount.totalAmtWithoutServiceCharge * 0.2).toFixed(2)}{' '}
                      </span>
                      <span style={{ color: '#D23535' }}> ( 20% off )</span>
                    </Box>
                  </Box> */}
                </Box>
              </Box>
            <Box height={{ md: 20, xs: 0 }} />
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              textAlign="center"
              width="100%"
              sx={{
                background: 'rgba(243, 241, 255, 0.5)',
                paddingTop: responsiveConditionalData ? '1.25rem' : '0px',
              }}
            >
              {window.innerWidth < 600 && (
                <Box
                 alignSelf='flex-start'
                  textAlign="left"
                  sx={{
                    background: '#ffffff',
                  }}
                 width='100%'
                 className='book__header'
                >
                  <Typography className='book__header' fontFamily='Montserrat'>Select Date </Typography>
                  <Typography
                    fontWeight={400}
                    fontSize={{
                      md: '1vw',
                      sm: '3vw',
                      xs: '2.5vw',
                    }}
                    fontFamily="inherit"
                    color="#707B8E"
                    lineHeight="1em"
                    margin="0 0 em 0"
                  >
                    Choose your preferred date and time{' '}
                  </Typography>
                  <Box height={10} />
                </Box>
              )}
              <Box width='85%'>
              <DatesCarousel
                propertyId={
                  loadEnquiryData ? enquiry?.propertyId : property._id
                }
                passedDate={loadEnquiryData ? enquiry?.bookingDate : ''}
              />
              </Box>
              <Box height={25} />

              <Typography
                fontFamily="Open Sans"
                fontSize="0.7rem"
                bgcolor="#F3F1FF"
                padding="0.6rem"
                fontWeight="600"
              >
                All Thinnai spaces can be booked,{' '}
                <span
                  style={{
                    fontWeight: '700',
                  }}
                >
                  {property.visibility}
                </span>{' '}
                days in advance only
              </Typography>
            </Box>
            <Box height={'1.5rem'} />

            <Box>
              <Box display={{ md: 'block' }}>
              <Divider />
              <Box height={20} />
                <Box className="book__header" style={{textAlign:'center'}}>Check-in Time</Box>
                  <Box height={20} />
                  <Box>
                    <Box display="flex" justifyContent="center">
                      <img
                        height={22}
                        src="/assets/images/detail/pointingArrow.svg"
                        alt=""
                      />
                    </Box>
                    {/* <Box
                      height={3}
                      sx={{
                        background: 'radial-gradient(#8F7EF3 , #8F7EF300);',
                      }}
                    /> */}
                    <Box height={3} width="100%" />
                    <Box
                      width={{ md: '99.5%', xs: '99.5%', sm: '99%' }}
                      sx={{
                        marginBottom: { xs: '0rem', sm: '0', md: '0' },
                      }}
                    >
                      {timeIndex != null && (
                        <TimeCarousel
                          data={timeArray}
                          onClick={(i) => getData(i)}
                          setTimeOnSlide={setTimeIndex}
                          currentIndex={timeIndex}
                          sliderRef={sliderRef}
                          unavailableSlots={unavailableSlots}
                        />
                      )}
                      <div className={book.container}>
                        {alertMsg && (
                          <p className={book.msg}>
                            {alertMsg.msg}
                          </p>
                        )}
                        {(cart.length === 3 && instantBooking === false) && (
                          <p className={book.msg}>
                            You can make up to three Enquiries. To delete or proceed, please go to the cart.
                          </p>
                        )}
                        
                      </div>
                        
                      {/* {cart.length === 3 ? "You can make up to three Enquiries. To delete or proceed, please go to the cart."} */}
                    </Box>
                  </Box>
                  <Divider />
                  <Box height={20} />
                  <Box className="book__header" style={{textAlign:'center'}}>Duration</Box>
                  <Box height={20} />
                <Box
                  width={{
                    xl: '85%',
                    md: '100%',
                    xs: '85%',
                  }}
                  margin="auto"
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Box
                      width={{
                        xl: '50%',
                        md: '45%',
                        xs: '50%',
                      }}
                    >
                      <Box
                        display="flex"
                        width="80%"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Box className="book__timing-head">CHECK-IN TIME</Box>
                        <Box
                          className="book__timing-p"
                          sx={{
                            color: isAvailable ? '#000000' : '#FF0000',
                          }}
                        >
                          {timeShown}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      height="auto"
                      width="1.5px"
                      sx={{ background: '#DEDEDE' }}
                    />
                    <Box
                      display="flex"
                      width={{
                        xl: '50%',
                        md: '55%',
                        xs: '50%',
                      }}
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Box className="book__timing-head">DURATION</Box>
                      <Box display="flex" alignItems="center">
                        <CounterButton onClick={decrease}>-</CounterButton>
                        <Box className="book__timing-p">{time} min</Box>
                        <CounterButton onClick={increase}>+</CounterButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box height={30} />
              </Box>
            </Box>
            {/* <Box height="2rem" /> */}
            {/* <Box>
              <Box className="book__header">
                Select To Add Permits To Bring (+20% Base Charge)
              </Box>
              <Box height={15} />
              <Box display="flex" width="100%" gap={2}>
                {data1.map((item, index) => (
                  <Box
                    onClick={() => onClickAa1(index)}
                    width="158px"
                    height="163px"
                    border="0.5px solid #868686"
                    borderRadius="5px"
                    style={{
                      cursor: "pointer",
                      backgroundColor: valueAddItem1.includes(data1[index].text)
                        ? "#F2F0DF"
                        : "",
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gap={1}
                    >
                      <img src={item.pic} alt="" />
                      <div>{item.text}</div>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box> */}
            <Box height={{ xs: 30, md: 6 }} />

            <Box display={{ md: 'block', xs: 'none' }}>
              <Button
                variant="contained"
                className="continue_btn"
                style={{
                  width: '100%',
                  background: '#262626',
                  textTransform: 'none',
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '1.1rem',
                  lineHeight: '29px',
                  color: '#FFFFFF',
                }}
                onClick={() => {
                  if (!isAuthenticated) {
                    
                    sessionStorage.setItem('pathName', location.pathname);
                    navigate(ROUTES.LOGIN)
                  } 
                  else if (cart.length === 3 && instantBooking === false) {
                    navigate(ROUTES.ENQUIRY_SUMMARY)
                  }
                  else if (isAvailable) {
                    const chosenSlots = generateTimeSlots(timeShown, time / 30)
                    //console.log('chosenSlots',chosenSlots);
                    //console.log('unavailableSlots',unavailableSlots);
                    const result = chosenSlots.some((slot) =>
                      unavailableSlots?.includes(slot)
                    )
                    if (result) {
                      setAlertMsg({status:true,msg:'No continuouse slots available for selected time,try a different date or time.'})
                    } else {
                      setSecondState(true)
                      setState7(false)
                    }
                  }
                }}
              >
                {isAuthenticated ? cart.length === 3 && instantBooking === false ? 'Go To Cart' : 'Reserve Your slot' : 'Login To Continue'}
              </Button>
            </Box>
            <Box height={{ md: 0, xs: 64 }} />
          </Box>
        )}
      </Box>
      
      <BottomButtonPaymentSummary
        secondState={secondState}
        viewBook={true}
        setViewBook={null}
        onNextBooking={handleNextOnPhone}
        amountDetails={amount}
        discountPrice={discountPrice}
        showReserveMessage={thirdState}
        buttonStop={buttonStop}
      />
    </>
  )
}

export default Book
