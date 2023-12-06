import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider, { Settings as SliderSettings} from 'react-slick';
import { loadSchedule } from '../../../actions/schedule';
import { setBookingDate } from '../../../actions/search';
import { RootState } from '../../../store';
import { CURRENT_DATE, UPDATED_SS } from '../../../utils/consts';
import '../../styles/Main/dateCarousel.scss';
import '../../styles/Main/slick.scss';

interface datesCarouselProps {
	propertyId?: string;
	passedDate?: Date;
	bg?:string;
}

const DatesCarousel = ({ propertyId, passedDate,bg }: datesCarouselProps) => {
	const Cell = styled(Paper)(({ theme }) => ({
		fontSize: '1.35rem',
		fontWeight: '500',
		height: '37.8px',
		borderRadius: '50%',
		aspectRatio: '1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		margin: 'auto',
		boxShadow: 'none',
		cursor: 'pointer',
	}));

	const dispatch: Dispatch<any> = useDispatch();
	// const [currentDate, setCurrentDate] = useState(new Date());
	
	const currentDate = useSelector<RootState, any>(state => state.dateChanger.currentDate);
	

	// New Date Picker
	const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	const [month, setMonth] = useState(new Date().getMonth())

	function getDaysInMonth(month:any, year:any) {
		var date = new Date(year, month, 1);
		var days = [];
		while (date.getMonth() === month) {
		  days.push(new Date(date));
		  date.setDate(date.getDate() + 1);
		}
		return days;
	  }

	  let monthNumber = new Date().getMonth()
	  let yearNumber = new Date().getFullYear()

	  let arr = [...getDaysInMonth(monthNumber,yearNumber),...getDaysInMonth(monthNumber+1,yearNumber)]


	  const todayDate = new Date().getDate()

		//   const [tds, setTds] = useState(new Date().getDate())



		  const [settings, setSettings] = useState<SliderSettings>({
			infinite: false,
			speed: 500,
			slidesToShow: 6,
			slidesToScroll: 1,
			swipe: true,
			draggable: true,
			swipeToSlide: true,
			initialSlide: 0,
			arrows:true,
			beforeChange: (current, next) =>{
				setMonth(arr.slice(todayDate-1,todayDate + 29)[next].getMonth());	
			},
		});

	// New DAte Picker

	// const daySchedule = useSelector<RootState, any>(state => state.schedule.unavailableDatesByDay);
	const dateChangerState = useSelector<RootState, any>(state => state.dateChanger.dateChanger);
	
	

	
	

	// useEffect(() => {
	// 	if (propertyId) {
	// 		dispatch(loadSchedule(propertyId, startOfMonth(currentDate), endOfMonth(currentDate)));
	// 	}
	// 	if (passedDate) {
	// 		// setCurrentDate(new Date(passedDate));
	// 		// dispatch({type:CURRENT_DATE,payload:(new Date(passedDate))})
			
	// 	}
	// }, [dispatch,currentDate,passedDate,propertyId]);

	

	const value = currentDate;
	// const startDate = startOfMonth(value);
	// const endDate = endOfMonth(value);
	// const numDays = differenceInDays(endDate, startDate) + 1;
	// const miDays = differenceInDays(endDate,value);

	// const prevMonth = () => setCurrentDate(sub(value, { months: 1 }));
	// const nextMonth = () => setCurrentDate(add(value, { months: 1 }));

	const handleClickDate = (index: Date) => {
		//const date = setDate(value, index);
		
		//setCurrentDate(index);
		
		dispatch({type:CURRENT_DATE,payload:(index)})
		
	};	
	useEffect(() => {
		dispatch(
			setBookingDate({
				bookingDate: new Date(currentDate!?.toString()).toJSON(),
			})
		);	
	}, [currentDate, dispatch]);

	const myRef = useRef<null | HTMLDivElement>(null);
	let dateRef = useRef(HTMLElement)
	var isCurrentDate:boolean;
	// const [count, setCount] = useState(true)
	// const inview = 0;
	// const sliderRef = useRef();

	// const [dateState, setDateState] = useState(value.getDate())
	
	

	
		  

	  
	return (
		<Box
			className='dates'
			sx={{
				fontFamily: 'Open Sans',
				fontStyle: 'normal',
			}}
		>
			<>
			{/* <Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				bgcolor={bg ?? '#EAE7FF'}
				gap={1}
				sx={{
					fontWeight: '600',
					fontSize: '1.1rem',
					lineHeight: '27px',
					paddingTop:"0.5rem",
					paddingBottom:"0.5rem",
					letterSpacing: '-0.065em',
					color: '#1A191E',
				}}
			>
			{(count === false) && <Box onClick={()=>{prevMonth(); setCount(true);setSettings({...settings, initialSlide:inview});setDateState(value.getDate());}} sx={{ cursor: 'pointer' }}>
					{'<'}
				</Box>}
				<Box width='8rem'>{format(value, 'LLLL')}</Box>
				{(count === true) && <Box onClick={()=>{nextMonth(); setCount(false);setSettings({...settings, initialSlide:0});setDateState(1)}} sx={{ cursor: 'pointer' }}>
					{'>'}
				</Box>}
			</Box>
			<Box height={20} />
			<Box display='flex' id='dates-count' height='auto' className='dates-count' ref={dateRef}>
					
				<Slider key={settings.initialSlide} {...settings}>
					{Array.from({ length: numDays }).slice(dateState-1,numDays).map((_, index) => {
						//temp hack for app compatibility
						const checkDateBase = new Date(
							new Date(new Date(value).setDate(1)).setHours(5, 30, 0, 0)
						);
						const checkDate = new Date(
							checkDateBase.setDate(checkDateBase.getDate() + index + dateState)
						).toISOString();
						const isUnavailable =
							daySchedule.includes(checkDate) || Date.parse(checkDate) < Date.now() - 86400000;
						const date = index + dateState;
						
						
						const formatDate = setDate(checkDateBase, date);
						const dayNumber = formatDate.getDay();
						const dayName = weeks[dayNumber];
						isCurrentDate = date === value.getDate();
						

						return (
							<>
							<Box margin='0 0.5rem 0 0.5rem' key={index}>
								<Cell
									key={date}
									ref={isCurrentDate ? myRef : null}
									className={
										isUnavailable ? 'unDate test' : isCurrentDate ? 'focused test' : 'test'
									}
									sx={{
										background: isCurrentDate ? '#8F7EF3' : 'none',
										color: isCurrentDate ? '#FFFFFF' : isUnavailable ? '#B63232' : '',
										position: 'relative',
										overflow: 'hidden',
										fontWeight: '600',
										fontSize: '1.2rem',
									}}
									onClick={() => {
										if (!isUnavailable) {
											handleClickDate(date);
										}
									}}
								>
									{date}
									
								</Cell>
								<Box
									sx={{
										fontSize: '0.631rem',
										textAlign: 'center',
										color: isCurrentDate ? '#8F7EF3' : '',
										margin: '8px 0 8px 0',
										
									}}
								>
									{dayName}
								</Box>
							</Box>
							</>
						);
					})}
				</Slider>
				<Box height={20} />
			</Box> */}
			</>
			{/* New Date Picker */}

			<Box display='flex' flexDirection='column' id='dates-count' height='auto' className='dates-count' ref={dateRef}>

				<Box margin='0 0 10px 0'
				 sx={{
					fontWeight: '600',
					fontSize: '1.1rem',
					fontFamily:'Open Sans',
					lineHeight: '27px',
					paddingTop:"0.5rem",
					paddingBottom:"0.5rem",
					letterSpacing: '.2em',
					color: '#1A191E',
				}}>
					{monthsArr[month]}</Box>

				<Slider {...settings}>

					{arr.slice(todayDate-1,todayDate + 29).map((item, idx:number)=>{
					const date = value?.getDate();
					
					return(
						<Box margin='2px 0rem 0 0rem' key={idx} className={item.getDate()===dateChangerState ?"a2z":""}>
						<Cell
						            key={date}
									ref={isCurrentDate ? myRef : null}
									className="days__number"
									sx={{
										position: 'relative',
										overflow: 'hidden',
										fontWeight: '600',
										fontSize: '1.2rem',
										background:'inherit'
									}}
									onClick={() => {
											handleClickDate(item);
											dispatch({type:UPDATED_SS,payload:(item.getDate())})
									}}>
                          {item.getDate()}
						</Cell>
						<Box       
						            className="date__days"
									sx={{
										fontSize: '0.631rem',
										textAlign: 'center',
										color: isCurrentDate ? '#8F7EF3' : '',
										margin: '2px 0 6px 0',
										
									}}
								>
									{weeks[item.getDay()]}
								</Box>
						</Box>
					)})}
				  
				</Slider>

			</Box>
		</Box>
	);
};

export default DatesCarousel;
