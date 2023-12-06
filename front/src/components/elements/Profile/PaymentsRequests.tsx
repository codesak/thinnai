import { Button, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';
import ActiveLink from '../Common/ActiveLink';
import NavBar from '../Explore/NavBar';
import Search from '../Explore/Search';

const PaymentsRequests = () => {
	//To Open Search Options
	const [searchState, setSearchState] = useState(false);
	const openSearch = () => {
		setSearchState(true);
	};

	//To change SearchBar to Searched Details
	const [stateSearched, setStateSearched] = useState(false);
	const searched = () => {
		setSearchState(false);
		setStateSearched(true);
	};

	//Responsive Booking Menu FullScreen
	const [viewBook, setViewBook] = useState(false);

	return (
		<Box
			margin={{
				sm: '1.375rem 1.875rem 0px 1.875rem',
				xs: '0px 1.25rem',
			}}
		>
			{!viewBook && (
				<Box height={70} display={{ xs: 'flex', sm: 'none' }} justifyContent='center'>
					<Box width='100%' fontWeight='700' fontSize='1.25rem' display='flex' alignItems='center'>
						<Button>
							<img width='12px' src='/assets/images/detail/arrowBack.svg' alt='' />
						</Button>
					</Box>
				</Box>
			)}
			<Box position='relative' display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}>
				{!viewBook && (
					<NavBar
						stateSearched={stateSearched}
						setStateSearched={setStateSearched}
						searchTabOpen={openSearch}
						state={searchState}
						searchTabClose={() => setSearchState(false)}
						searched={searched}
					/>
				)}
				{searchState && (
					<Box position='absolute' width='590px' top='81px' left='29.5%' zIndex='5'>
						<Search onClick={searched} />
					</Box>
				)}
			</Box>
			<Box
				margin={{
					xl: '3.75rem 2.5rem 0px 7.5rem',
					md: '3.75rem 2.5rem 0px 5rem',
					sm: '3.125rem 0px 0px 0px',
					xs: '3.125rem 0px 0px 0px',
				}}
				padding={{
					xl: '0.75rem 0 1.25rem 0',
					md: '0.75rem 0 1.25rem 0',
					sm: '0px 0px',
					xs: '0px 0px',
				}}
			>
				<Box
					width={{
						xl: '100%',
						md: '100%',
						sm: 'auto',
					}}
				>
					<Stack
						spacing={{
							xl: 7.2,
							md: 7.2,
							sm: 5,
							xs: 5,
						}}
						direction='row'
						minHeight={{
							xl: '60px',
							md: '60px',
							sm: '40px',
							xs: '40px',
						}}
						sx={{
							overflowX: 'auto',
						}}
					>
						<ActiveLink to={ROUTES.PAYMENTS_REQUESTS}>Payments</ActiveLink>
						<ActiveLink to='returns'>Returns</ActiveLink>
					</Stack>
					<Box>
						<Divider />
					</Box>
				</Box>
				<Box>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default PaymentsRequests;
