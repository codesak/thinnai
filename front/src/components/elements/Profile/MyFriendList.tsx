import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFriends } from '../../../actions/profile';
import { startLoading } from '../../../actions/root';
import { RootState } from '../../../store';
import { S3_BASE } from '../../../utils/consts';
import NavBar from '../Explore/NavBar';
import Search from '../Explore/Search';
import Loading from '../Loading/Loading';

const options = [
	'None',
	'Atria',
	'Callisto',
	'Dione',
	'Ganymede',
	'Hangouts Call',
	'Luna',
	'Oberon',
	'Phobos',
	'Pyxis',
	'Sedna',
	'Titania',
	'Triton',
	'Umbriel',
];

const ITEM_HEIGHT = 48;

const MyFriendList = () => {
	const dispatch: Dispatch<any> = useDispatch();

	const friendsLoading = useSelector<RootState, boolean>(state => state.profile.loading);
	const friends = useSelector<RootState, any>(state => state.profile.friends);

	useEffect(() => {
		dispatch(startLoading('LOADING_PROFILE'));
		dispatch(loadFriends());
	}, [dispatch]);

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

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//Responsive Booking Menu FullScreen
	const [viewBook, setViewBook] = useState(false);

	const bgColors = ['#F3F1FF', '#EEFCEC', '#E7F0F4', '#F2F0DF'];

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
					xl: '3.75rem 2.5rem 0px 2.5rem',
					md: '3.75rem 2.5rem 0px 2.5rem',
					sm: '3.125rem 0px 0px 0px',
					xs: '3.125rem 0px 0px 0px',
				}}
			>
				<Typography
					letterSpacing='0.015em'
					fontWeight={600}
					fontFamily='Montserrat'
					fontSize='2.25rem'
					mb='3.75rem'
				>
					Friend Request
				</Typography>
				<Box
					sx={{
						mx: 'auto',
						maxWidth: { xs: '100%', md: '60%' },
						border: '1px solid #DEDEDE',
						display: 'flex',
						borderRadius: '6px',
						mb: '2.875rem',
						height: '70px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<TextField
						placeholder='Search your friend'
						sx={{
							paddingX: '0.938rem',
						}}
						fullWidth
						label=''
						id='fullWidth'
					/>
					<IconButton
						style={{
							padding: '1.875rem',
							background: 'black',
							color: 'white',
							borderRadius: '0px 6px 6px 0px',
							width: '10%',
							maxHeight: '70px',
						}}
						aria-label='search'
					>
						<SearchIcon
							sx={{
								fontSize: '2.5rem',
								fontWeight: '300',
							}}
						/>
					</IconButton>
				</Box>
				<Box mb='1.875rem' display='flex' justifyContent='space-between' alignItems='center'>
					<Button
						endIcon={<TuneIcon />}
						sx={{
							fontSize: '1.5rem',
							textTransform: 'none',
							color: '#383838',
						}}
					>
						Filter
					</Button>
					<IconButton
						style={{
							padding: '0.625rem',
							background: 'black',
							color: 'white',
							borderRadius: '6px',
							width: '100px',
							fontSize: '18px',
						}}
						aria-label='search'
					>
						Add +
					</IconButton>
				</Box>
				{friendsLoading && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Box
							width={{
								md: '30%',
								sm: '40%',
								xs: '60%',
							}}
						>
							<Loading />
						</Box>
					</Box>
				)}
				{!friendsLoading && (
					<Box>
						{friends.map((friend: any, index: number) => (
							<>
								<Box
									key={friend._id}
									display='flex'
									justifyContent='space-between'
									alignItems='center'
									marginX={1}
									bgcolor={bgColors[index % 4]}
									paddingX='1.25rem'
									paddingTop='0.938rem'
									mb='0.938rem'
								>
									<Box marginBottom='0.938rem' display='flex' alignItems='center' gap={4}>
										<Box display='flex' justifyContent='center' alignItems='center'>
											<img
												width='53px'
												src={
													friend.profileImage ? `${S3_BASE}${friend.profileImage}` : friend.avatar
												}
												alt=''
											/>
										</Box>
										<Box>
											<Box display='flex' alignItems='center' gap={2}>
												<Typography fontSize='1.375rem' fontWeight='400'>
													{`${friend.firstName} ${friend.lastName}`}
												</Typography>
											</Box>
										</Box>
									</Box>
									<div>
										<IconButton
											aria-label='more'
											id='long-button'
											aria-controls={open ? 'long-menu' : undefined}
											aria-expanded={open ? 'true' : undefined}
											aria-haspopup='true'
											onClick={handleClick}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											id='long-menu'
											MenuListProps={{
												'aria-labelledby': 'long-button',
											}}
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											PaperProps={{
												style: {
													maxHeight: ITEM_HEIGHT * 4.5,
													width: '20ch',
													boxShadow: 'none',
													background: 'black',
													color: '#ffffff',
												},
											}}
										>
											{options.map(option => (
												<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
													{option}
												</MenuItem>
											))}
										</Menu>
									</div>
								</Box>
							</>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default MyFriendList;
