import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import MobileHeader from '../Common/mobileOnly/MobileHeader';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 0 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

type msgDataInterface = {
	chatName: string;
	msg: string;
	sender: string;
	time: string;
	dateString: string;
	dateDigit: number;
	day: string;
	month: string;
	year: number;
};

interface chatListProp {
	chatList: {
		id: number;
		img: string;
		name: string;
		lastSeen: string;
		limitedMsg: boolean;
	}[];
	chatListConfirmed: {
		id: number;
		img: string;
		name: string;
		lastSeen: string;
		limitedMsg: boolean;
	}[];
	setOpenChat: (value: number) => void;
	setShowChat: (value: boolean) => void;
	msgList: msgDataInterface[];
	setMsgList: (value: msgDataInterface[]) => void;
	setConfirmedSelected: (value: boolean) => void;
	confirmedSelected: boolean;
	openSelectedChat: () => void;
}

const ChatList = ({
	chatList,
	setOpenChat,
	setShowChat,
	msgList,
	setMsgList,
	chatListConfirmed,
	setConfirmedSelected,
	confirmedSelected,
	openSelectedChat,
}: chatListProp) => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const tabStyle = {
		default_tab: {
			fontSize: '0.763rem',
			'@media (max-width: 1180px)': {
				fontSize: '0.9vw',
			},
			'@media (max-width: 900px)': {
				fontSize: '0.763rem',
			},
			lineHeight: '18px',
			textTransform: 'capitalize',
			minHeight: '28px',
			color: '#898A8D',
			flexGrow: '1',
			padding: '0',
		},
		active_tab: {
			color: '#8F7EF3 !important',
			fontSize: '0.781rem',
			'@media (max-width: 1180px)': {
				fontSize: '0.9vw',
			},
			'@media (max-width: 900px)': {
				fontSize: '0.781rem',
			},
			lineHeight: '18px',
			textTransform: 'capitalize',
			minHeight: '28px',
			flexGrow: '1',
			padding: '0',
		},
	};
	function getStyle(isActive: boolean) {
		return isActive ? tabStyle.active_tab : tabStyle.default_tab;
	}

	const getIndexOfInquiries = (id: number) => {
		setOpenChat(id);
		setShowChat(true);
		setConfirmedSelected(false);
	};
	const getIndexOfConfirmed = (id: number) => {
		setOpenChat(id);
		setShowChat(true);
		setConfirmedSelected(true);
	};
	const lastMsgg = (a: { img: string; name: string; lastSeen: string; limitedMsg: boolean }) => {
		const res1 = msgList.filter(page1 => page1.chatName === a.name);
		const lastmsgData = res1[res1.length - 1];
		return lastmsgData;
	};

	const date = new Date();
	const dayDigit = date.getDay();
	const dateDigit = date.getDate();
	const monthDight = date.getMonth();
	const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthName = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const day = week[dayDigit];
	const month = monthName[monthDight];

	const dateString = () => {
		const dateStr = `${day}, ${dateDigit} ${month}`;
		return dateStr;
	};

	const [searchConfirmedOrBooking, setSearchConfirmedOrBooking] = useState<string>('');
	const [searchInquiries, setSearchInquiries] = useState<string>('');
	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (confirmedSelected) {
			setSearchConfirmedOrBooking(e.target.value);
		}
		if (!confirmedSelected) {
			setSearchInquiries(e.target.value);
		}
	};

	return (
		<Box width={{ md: '85%', xs: '92%' }} position='relative' margin='0 auto' className='classList'>
			{/* Decorative-Circle---------------------------------------- */}
			<Box
				className='circle'
				zIndex='0'
				display={{ sm: 'none' }}
				width={{ xs: '172px' }}
				top={{ xs: '-119.86px' }}
				right={{ xs: '-125.86px' }}
				border='1px solid #EECBBC'
			/>
			<Box
				className='circle'
				zIndex='0'
				display={{ sm: 'none' }}
				width={{ xs: '203px' }}
				top={{ xs: '-130px' }}
				right={{ xs: '-128px' }}
				border='1px solid #EECBBC'
			/>
			<Box
				className='circle'
				zIndex='0'
				display={{ sm: 'none' }}
				width={{ xs: '230px' }}
				top={{ xs: '-136px' }}
				right={{ xs: '-129px' }}
				border='3px solid rgba(238, 203, 188, 0.2)'
			/>
			<Box
				className='circle'
				zIndex='0'
				display={{ sm: 'none' }}
				width={{ xs: '253px' }}
				top={{ xs: '-130px' }}
				right={{ xs: '-122px' }}
				border='1px solid rgba(238, 203, 188, 0.93)'
			/>
			{/* Decorative-Circle---------------------------------------- */}

			<MobileHeader headerText={'Chat'} />
			<Box>
				<Box display='flex' justifyContent='center' flexGrow={{ md: 2, xs: 1 }}>
					<Paper
						component='form'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							height: '40px',
							borderRadius: '6px',
							border: '1px solid #DEDEDE',
							background: '#FFFFFF',
							zIndex: '1',
							boxShadow: 'none',
							'@media (max-width: 900px)': { width: '100%' },
						}}
					>
						<>
							<Box display='flex' alignItems='center' margin='0px 0.625rem' sx={{ flex: 1 }}>
								<InputBase
									sx={{
										ml: 0,
										flex: 1,
										pl: '0.5rem',
										height: '100%',
										fontSize: '0.813rem',
									}}
									placeholder='Search'
									onChange={e => handleSearch(e)}
								/>
							</Box>
							<IconButton
								style={{
									padding: '0.625rem',
									background: 'black',
									color: 'white',
									borderRadius: '0px 6px 6px 0px',
									height: '100%',
									width: '14%',
								}}
								aria-label='search'
							>
								<SearchIcon />
							</IconButton>
						</>
					</Paper>
				</Box>
			</Box>
			<Box height={20} />
			<Box>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }} display={{ xs: 'block' }}>
					<Tabs
						sx={{
							minHeight: '25px',
							overflow: 'visible',
							'>div': {
								overflow: 'visible !important',
								'>span': { bottom: '-1px' },
							},
						}}
						value={value}
						onChange={handleChange}
						aria-label='basic tabs'
						className='indicator_tab'
					>
						<Tab
							sx={getStyle(value === 0)}
							style={{}}
							label='Guests with inquiries'
							{...a11yProps(0)}
						/>
						<Tab
							sx={getStyle(value === 1)}
							label='Guests with confirmed booking'
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Box height='68vh' className='classlists' sx={{ overflowY: 'scroll' }}>
						{chatList
							.filter(chat => {
								if (searchInquiries === '') {
									return chat;
								} else if (chat.name.toLowerCase().includes(searchInquiries.toLowerCase())) {
									return chat;
								}
							})
							.map((data, index) => (
								<Box
									onClick={() => getIndexOfInquiries(data.id)}
									sx={{ cursor: 'pointer' }}
									key={index}
								>
									<Grid container style={{ padding: '15px 0' }}>
										<Grid item sm={3} xs={2.7}>
											<Box
												borderRadius='50%'
												width={{ sm: '65%', xs: '69%' }}
												margin='0 auto'
												display='flex'
												sx={{ aspectRatio: '1' }}
											>
												<img
													style={{
														margin: 'auto',
														objectFit: 'contain',
														width: '100%',
													}}
													src={data.img}
													alt=''
												/>
											</Box>
										</Grid>
										<Grid item sm={9} xs={9.3}>
											<Box display='flex' height='100%'>
												<Grid container margin='auto'>
													<Grid
														item
														xs={7}
														sx={{
															fontFamily: 'Open Sans',
															fontStyle: 'normal',
														}}
													>
														<Box
															sx={{
																fontWeight: '700',
																fontSize: '0.875rem',
																lineHeight: '22px',
																color: '#000000',
															}}
														>
															{data.name}
														</Box>
														<Box
															sx={{
																fontWeight: '400',
																fontSize: '0.75rem',
																lineHeight: '20px',
																color: '#1A191E',
															}}
														>
															{lastMsgg(data)?.sender.includes(' ')
																? lastMsgg(data)?.sender.substring(
																		0,
																		lastMsgg(data)?.sender.indexOf(' ')
																  )
																: lastMsgg(data)?.sender}
															: &nbsp;
															{lastMsgg(data)?.msg.length > 15
																? `${lastMsgg(data)?.msg.slice(0, 15)}...`
																: lastMsgg(data)?.msg}
														</Box>
													</Grid>
													<Grid item xs={5} display='flex' flexDirection='column'>
														{data.limitedMsg && (
															<Box
																sx={{ background: '#F3F1FF' }}
																borderRadius='32px'
																display='flex'
																justifyContent='center'
															>
																<Box
																	fontFamily='Open Sans'
																	fontStyle='normal'
																	fontWeight='600'
																	fontSize={{ sm: '0.625rem', xs: '0.594rem' }}
																	lineHeight='1.9em'
																	sx={{ color: '#8F7EF3' }}
																	textAlign='center'
																	display='flex'
																>
																	Limited messages only
																</Box>
															</Box>
														)}
														<Box
															margin='auto 0'
															sx={{
																fontWeight: '300',
																fontSize: '0.625rem',
																lineHeight: '19px',
																letterSpacing: '0.01em',
																color: '#1A191E',
																textAlign: 'center',
															}}
														>
															{lastMsgg(data).dateString === dateString()
																? `Today, ${lastMsgg(data).time}`
																: `${lastMsgg(data).dateString}, ${lastMsgg(data).time}`}
														</Box>
													</Grid>
												</Grid>
											</Box>
										</Grid>
									</Grid>
									<Divider />
								</Box>
							))}
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Box height='68vh' className='classlists' sx={{ overflowY: 'scroll' }}>
						{chatListConfirmed.map((data, index) => (
							<Box
								onClick={() => getIndexOfConfirmed(data.id)}
								sx={{ cursor: 'pointer' }}
								key={index}
							>
								<Grid container style={{ padding: '15px 0' }}>
									<Grid item xs={3}>
										<Box
											borderRadius='50%'
											width='65%'
											margin='0 auto'
											display='flex'
											sx={{ aspectRatio: '1' }}
										>
											<img
												style={{
													margin: 'auto',
													objectFit: 'contain',
													width: '100%',
												}}
												src={data.img}
												alt=''
											/>
										</Box>
									</Grid>
									<Grid item xs={9}>
										<Box display='flex' height='100%'>
											<Grid container margin='auto'>
												<Grid
													item
													xs={7}
													sx={{
														fontFamily: 'Open Sans',
														fontStyle: 'normal',
													}}
												>
													<Box
														sx={{
															fontWeight: '700',
															fontSize: '0.875rem',
															lineHeight: '22px',
															color: '#000000',
														}}
													>
														{data.name}
													</Box>
													<Box
														sx={{
															fontWeight: '400',
															fontSize: '0.75rem',
															lineHeight: '20px',
															color: '#1A191E',
														}}
													>
														{lastMsgg(data)?.sender.includes(' ')
															? lastMsgg(data)?.sender.substring(
																	0,
																	lastMsgg(data)?.sender.indexOf(' ')
															  )
															: lastMsgg(data)?.sender}
														: &nbsp;
														{lastMsgg(data)?.msg.length > 15
															? `${lastMsgg(data)?.msg.slice(0, 15)}...`
															: lastMsgg(data)?.msg}
													</Box>
												</Grid>
												<Grid item xs={5} display='flex' flexDirection='column'>
													{data.limitedMsg && (
														<Box
															sx={{ background: '#F3F1FF' }}
															borderRadius='32px'
															display='flex'
															justifyContent='center'
														>
															<Box
																fontFamily='Open Sans'
																fontStyle='normal'
																fontWeight='600'
																fontSize={{ sm: '0.625rem', xs: '0.594rem' }}
																lineHeight='1.4em'
																sx={{ color: '#8F7EF3' }}
																textAlign='center'
																display='flex'
															>
																Limited messages only
															</Box>
														</Box>
													)}
													<Box
														margin='auto 0'
														sx={{
															fontWeight: '300',
															fontSize: '0.625rem',
															lineHeight: '19px',
															letterSpacing: '0.01em',
															color: '#1A191E',
															textAlign: 'center',
														}}
													>
														{lastMsgg(data).dateString === dateString()
															? `Today, ${lastMsgg(data).time}`
															: `${lastMsgg(data).month}, ${lastMsgg(data).dateDigit}, ${
																	lastMsgg(data).time
															  }`}
													</Box>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
								<Divider />
							</Box>
						))}
					</Box>
				</TabPanel>
			</Box>
			<Box
				position='absolute'
				display='flex'
				alignItems='center'
				height='25px'
				width='25px'
				justifyContent='center'
				bottom={{ xl: '-5%', xs: '2%' }}
				right='-1.5%'
				color='#FFFFFF'
				borderRadius='50%'
				padding='0.938rem'
				fontWeight='600'
				lineHeight='1.4em'
				fontSize='2.5rem'
				sx={{
					background: '#8F7EF3',
					boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.14)',
					aspectRatio: '1',
					cursor: 'pointer',
				}}
			>
				+
			</Box>
		</Box>
	);
};

export default ChatList;
