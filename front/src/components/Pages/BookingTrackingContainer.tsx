import { Button, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { loadPlaces } from '../../actions/main';
import { ROUTES } from '../../utils/routing/routes';
import ActiveLink from '../elements/Common/ActiveLink';
import NavBar from '../elements/Explore/NavBar';
import Search from '../elements/Explore/Search';
import ResponsiveMenu from '../elements/Explore/subElements/ResponsiveMenu';
import '../styles/Booking/BookingContainer.css';
import Whatsapp from '../elements/Common/Whatsapp';

const BookingTrackingContainer = () => {
	const navigate = useNavigate();

	//To Open Search Options
	const [searchState, setSearchState] = useState(false);
	const openSearch = () => {
		setSearchState(true);
	};
	const dispatch: Dispatch<any> = useDispatch();
	const [showFilter, setShowFilter] = useState(false);

	const [showSort, setShowSort] = useState(false);

	const filterClose = () => {
		setShowFilter(true);
		if (showFilter || showSort) {
			setShowFilter(false);
			setShowSort(false);
		}
	};

	const filterDataAmenities = [
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
	];

	const filterDataServices = [
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
		{
			img: '/assets/images/detail/amenities/music.svg',
			text: 'Smoking',
		},
	];

	const [homeSelected, setHomeSelected] = useState(false);
	const homeClick = () => {
		if (!homeSelected) {
			setHomeSelected(true);
			setBookSelected(false);
			setChatSelected(false);
			setAccountOpen(false);
		}
		navigate(ROUTES.EXPLORE);
	};

	const [bookSelected, setBookSelected] = useState(true);
	const bookClick = () => {
		if (!bookSelected) {
			setHomeSelected(false);
			setBookSelected(true);
			setChatSelected(false);
			setAccountOpen(false);
		}
		navigate(ROUTES.CONFIRMED);
	};

	const [chatSelected, setChatSelected] = useState(false);
	const chatClick = () => {
		if (!chatSelected) {
			setHomeSelected(false);
			setBookSelected(false);
			setChatSelected(true);
			setAccountOpen(false);
		}
		navigate(ROUTES.CHAT);
	};

	const [accountOpen, setAccountOpen] = useState(false);
	const accountClick = () => {
		if (!accountOpen) {
			setHomeSelected(false);
			setBookSelected(false);
			setChatSelected(false);
			setAccountOpen(true);
		}
		navigate(ROUTES.PROFILE);
	};

	const [stateSearched, setStateSearched] = useState(false);
	const searched = () => {
		setSearchState(false);
		setStateSearched(true);
		dispatch(loadPlaces());
	};

	return (
		<Box>
			{/* <Whatsapp/> */}
			<Box height={70} display={{ xs: 'flex', sm: 'none' }} justifyContent='center'>
				<Box width='100%' fontWeight='700' fontSize='1.25rem' display='flex' alignItems='center'>
					<Button onClick={() => navigate(ROUTES.EXPLORE)}>
						<img width='12px' src='/assets/images/detail/arrowBack.svg' alt='' />
					</Button>
				</Box>
			</Box>

			<Box
				position='relative'
				display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}
				margin={{
					xl: '0 2.5rem',
					md: '0 2.5rem',
					sm: '0 2rem',
					xs: '0 1.5rem',
				}}
			>
				<NavBar
					stateSearched={stateSearched}
					setStateSearched={setStateSearched}
					searchTabOpen={openSearch}
					state={searchState}
					searchTabClose={() => setSearchState(false)}
					searched={searched}
				/>

				{searchState && (
					<Box position='absolute' width='590px' top='81px' left='29.5%' zIndex='5'>
						<Search onClick={searched} />
					</Box>
				)}
			</Box>
			{/* <ResponsiveMenu
				homeSelected={homeSelected}
				bookSelected={bookSelected}
				chatSelected={chatSelected}
				accountOpen={accountOpen}
				homeClick={homeClick}
				bookClick={bookClick}
				chatClick={chatClick}
				accountClick={accountClick}
			/> */}
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
				<Box
					maxWidth='1600px'
					marginX={{
						xl: '4.938rem',
						md: '4.938rem',
						sm: '1.875rem',
						xs: '1rem',
					}}
					margin={{
						xl: '4rem 3rem 7rem 3rem',
						md: '4rem 3rem 7rem 3rem',
						sm: '0 2.5rem',
						xs: '0 1.5rem',
					}}
				>
					<Box
						width={{
							xl: 'fit-content',
							md: 'fit-content',
							sm: 'auto',
						}}
						margin={{
							md: 'auto',
							xs: 'unset',
						}}
					>
						<Stack
							spacing={{
								xl: 7.2,
								md: 7.2,
								sm: 5,
								xs: 2,
							}}
							id='booking-selector'
							direction='row'
							minHeight={{
								xl: '50px',
								md: '50px',
								sm: '40px',
								xs: '40px',
							}}
							sx={{
								overflowX: 'auto',
								scrollBehavior: 'smooth',
								fontSize: '2rem',
							}}
							padding={{xs:'0 0 0 2.8rem', sm:'0'}}
						>
							{/* <ActiveLink to='ongoing'>Ongoing</ActiveLink> */}
							{/* <ActiveLink to='requests'>Requests</ActiveLink> */}
							{/* <ActiveLink to='enquiry'>Enquiries</ActiveLink> */}
							<ActiveLink to='unpaid'>Enquiries</ActiveLink>
							<ActiveLink to='confirmed'>Confirmed</ActiveLink>
							{/* <ActiveLink to='invited'>Invited</ActiveLink> */}
							<ActiveLink to='completed'>Completed</ActiveLink>
							{/* <ActiveLink to='cancelled'>Cancelled</ActiveLink> */}
						</Stack>
						<Box>
							<Divider />
						</Box>
					</Box>
					<Box className='outletLayout'>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default BookingTrackingContainer;
