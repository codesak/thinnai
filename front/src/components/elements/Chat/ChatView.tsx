import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from 'react';

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

interface chatViewProps {
	chatList: {
		id: number;
		img: string;
		name: string;
		lastSeen: string;
		limitedMsg: boolean;
	};
	chatListConfirmed: {
		id: number;
		img: string;
		name: string;
		lastSeen: string;
		limitedMsg: boolean;
	};
	msgList: msgDataInterface[];
	setMsgList: (value: msgDataInterface[]) => void;
	openChat: number;
	setShowChat: (value: boolean) => void;
	confirmedSelected: boolean;
	openSelectedChat: () => void;
}
const ChatView = ({
	chatList,
	setMsgList,
	msgList,
	openChat,
	setShowChat,
	chatListConfirmed,
	confirmedSelected,
	openSelectedChat,
}: chatViewProps) => {
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	const date = new Date();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const hr = () => {
		const h = hour > 12 ? hour - 12 : hour;
		const hrr = h === 0 ? '12' : h;
		const min = minute < 10 ? '0' + minute : minute;
		const ampm = hour >= 12 ? 'pm' : 'am';
		const time = `${hrr}:${min} ${ampm}`;
		return time;
	};
	const dayDigit = date.getDay();
	const dateDigit = date.getDate();
	const monthDight = date.getMonth();
	const year = date.getFullYear();
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

	const [chatNameChats, setChatNameChats] = useState<msgDataInterface[]>([]);
	useEffect(() => {
		if (confirmedSelected) {
			setChatNameChats(
				msgList.filter(item => !item.chatName.localeCompare(chatListConfirmed?.name))
			);
		} else {
			setChatNameChats(msgList.filter(item => !item.chatName.localeCompare(chatList?.name)));
		}
	}, [openChat, confirmedSelected, openSelectedChat]);

	const sendMsg = () => {
		if (input !== '') {
			setChatNameChats([
				...chatNameChats,
				{
					chatName: confirmedSelected ? chatListConfirmed.name : chatList.name,
					msg: input,
					sender: 'You',
					time: hr(),
					dateString: dateString(),
					dateDigit: dateDigit,
					day: day,
					month: month,
					year: year,
				},
			]);
			setInput('');
			setMsgList([
				...msgList,
				{
					chatName: confirmedSelected ? chatListConfirmed.name : chatList.name,
					msg: input,
					sender: 'You',
					time: hr(),
					dateString: dateString(),
					dateDigit: dateDigit,
					day: day,
					month: month,
					year: year,
				},
			]);
		}
	};
	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
	};
	const chatRef = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		if (chatRef.current !== null) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chatNameChats]);

	let find = chatNameChats?.find(o => o.sender === 'You');
	const booleanAlert = find ? true : false;

	return (
		<Box
			height={{ md: '91vh', xs: '100vh' }}
			className='chatView'
			display='flex'
			fontFamily='Open Sans'
			fontStyle='normal'
		>
			<Box
				width={{ md: '95%', xs: '100%' }}
				height='100%'
				margin='auto'
				display='flex'
				borderRadius={{ md: '25px', xs: '0px' }}
				boxShadow={{ md: '0px 4px 7px 2px rgba(0, 0, 0, 0.06)', xs: 'none' }}
				position='relative'
			>
				<Box
					position='absolute'
					top='0'
					width='100%'
					borderRadius='25px 25px 0px 0px'
					boxShadow='0px 2px 7px 1px rgba(0, 0, 0, 0.06)'
				>
					<Box
						display='flex'
						justifyContent='space-between'
						width={{ sm: '90%', xs: '95%' }}
						height='86px'
						margin='auto'
					>
						<Box display='flex' alignItems='center' gap={1}>
							<Box display={{ md: 'none', xs: 'flex' }}>
								<Box height='100%'>
									<Button
										style={{ height: '100%', minWidth: '10px' }}
										onClick={() => setShowChat?.(false)}
									>
										<img src='/assets/images/detail/arrowBack.svg' alt='' />
									</Button>
								</Box>
							</Box>
							<Box
								borderRadius='50%'
								height='65%'
								display='flex'
								style={{ aspectRatio: '1', overflow: 'hidden' }}
							>
								<img
									style={{
										margin: 'auto',
										objectFit: 'contain',
										height: '100%',
									}}
									src={confirmedSelected ? chatListConfirmed?.img : chatList?.img}
									alt=''
								/>
							</Box>
							<Box
								sx={{
									fontFamily: 'Open Sans',
									fontStyle: 'normal',
								}}
							>
								<Box
									sx={{
										fontWeight: '600',
										fontSize: '1.05rem',
										lineHeight: '22px',
										color: '#1A191E',
									}}
								>
									{confirmedSelected ? chatListConfirmed?.name : chatList?.name}
								</Box>
								<Box
									sx={{
										fontWeight: '300',
										fontSize: '0.68rem',
										lineHeight: '19px',
										color: '#1A191E',
									}}
								>
									Last seen, {confirmedSelected ? chatListConfirmed?.lastSeen : chatList?.lastSeen}
								</Box>
							</Box>
						</Box>
						<Box
							display='flex'
							alignItems='center'
							gap={{ md: 5, xs: 3 }}
							sx={{ background: '#FFFFFF' }}
						>
							<Box height='29%' sx={{ aspectRatio: '1', cursor: 'pointer' }}>
								<img
									style={{
										margin: 'auto',
										objectFit: 'contain',
										height: '100%',
									}}
									src='/assets/images/chat/call.svg'
									alt=''
								/>
							</Box>
							<Box height='26%' sx={{ cursor: 'pointer' }}>
								<img
									style={{
										margin: 'auto',
										objectFit: 'contain',
										height: '100%',
									}}
									src='/assets/images/chat/vcall.svg'
									alt=''
								/>
							</Box>
							<Button sx={{ display: 'flex', minWidth: '20px', width: '28px' }}>
								<MoreVertIcon sx={{ fontSize: '1.875rem', color: 'black' }} />
							</Button>
						</Box>
					</Box>
				</Box>
				<Box width='100%' display='flex' flexDirection='column'>
					<Box minHeight={90} height={90} />
					<Box
						ref={chatRef}
						className='chats'
						sx={{ overflowY: 'scroll' }}
						width={{ sm: '92%', xs: '88%' }}
						flexGrow='1'
						margin='auto'
					>
						{chatNameChats?.length > 0 &&
							chatNameChats?.map((data, index) => {
								var prev = chatNameChats[index - 1];
								var item = prev?.dateString;
								return (
									<Box key={index}>
										<Box
											textAlign='center'
											display={!data.dateString.localeCompare(item) ? 'none' : 'block'}
											sx={{
												fontWeight: '300',
												fontSize: '0.688rem',
												lineHeight: '19px',
												color: '#1A191E',
											}}
										>
											{data.dateString}
											<Box height={25} />
										</Box>
										{booleanAlert &&
											index === 0 &&
											(!confirmedSelected ? chatList.limitedMsg : chatListConfirmed.limitedMsg) && (
												<>
													<Box display='flex' width='100%'>
														<Box
															display='flex'
															width={{ md: '60%', sm: '70%', xs: '95%' }}
															margin='0 auto'
															padding='0.938rem'
															sx={{
																background: '#F3F1FF',
																borderRadius: '12px',
															}}
														>
															<Grid container margin={{ sm: '0 0.938rem', xs: '0 0.375rem' }}>
																<Grid item xs={2.5} sm={2} display='flex'>
																	<Box margin='auto' height='70%'>
																		<img
																			style={{
																				height: '100%',
																				objectFit: 'contain',
																			}}
																			src='/assets/images/chat/alert.svg'
																			alt=''
																		/>
																	</Box>
																</Grid>
																<Grid item xs={9.5} sm={10} display='flex'>
																	<Box
																		margin='auto 0'
																		sx={{
																			fontWeight: '400',
																			fontSize: '0.781rem',
																			lineHeight: '20px',
																			color: '#1A191E',
																		}}
																	>
																		You can only send two messages to the host! To chat further,
																		please wait for the host to confirm your booking.
																	</Box>
																</Grid>
															</Grid>
														</Box>
													</Box>
													<Box height={30} />
												</>
											)}
										<Box
											display='flex'
											width='100%'
											justifyContent={data.sender === 'You' ? 'flex-end' : 'flex-start'}
										>
											<Box
												width={{ md: '40%', sm: '50%', xs: '68%' }}
												display='flex'
												flexDirection='column'
												justifyContent='flex-end'
											>
												<>
													<Box
														display='flex'
														padding={{
															sm: '1.25rem 1.875rem 1.563rem 1.625rem',
															xs: '0.938rem 1.125rem 0.938rem 1.438rem',
														}}
														borderRadius={
															data.sender === 'You'
																? `${
																		data.dateString === chatNameChats[index - 1]?.dateString &&
																		data.time === chatNameChats[index - 1]?.time
																			? '18px 4px 26px 18px'
																			: '18px 26px 4px 18px'
																  }`
																: `${
																		data.dateString === chatNameChats[index - 1]?.dateString &&
																		data.time === chatNameChats[index - 1]?.time
																			? '4px 18px 18px 24px'
																			: '24px 18px 18px 4px'
																  }`
														}
														fontSize={{ sm: '0.938rem', xs: '0.844rem' }}
														lineHeight='1.5em'
														sx={{
															background: data.sender === 'You' ? '#8F7EF3' : '#F4F4F4',
															fontWeight: '400',
															color: data.sender === 'You' ? '#FFFFFF' : '#1A191E',
														}}
													>
														{data.msg}
													</Box>
												</>
												<Box
													display={
														data.dateString === chatNameChats[index + 1]?.dateString &&
														data.time === chatNameChats[index + 1]?.time
															? 'none'
															: 'flex'
													}
													justifyContent={data.sender === 'You' ? 'flex-end' : 'flex-start'}
													gap={0.5}
													fontSize={{ sm: '0.75rem', xs: '0.719rem' }}
													sx={{
														fontWeight: '300',
														lineHeight: '21px',
														letterSpacing: '0.05em',
														color: '#1A191E',
													}}
												>
													{data.dateString === dateString() ? 'Today,' : ''} {data.time}
													{data.sender === 'You' && !loading && (
														<Box display='flex'>
															<CheckCircleOutlineIcon
																sx={{
																	fontSize: '0.875rem',
																	margin: 'auto',
																	color: 'green',
																}}
															/>
														</Box>
													)}
												</Box>
												<Box height={4} />
											</Box>
										</Box>
									</Box>
								);
							})}
					</Box>
					<Box minHeight={87} height={87} />
				</Box>
				<Box
					position='absolute'
					bottom='0'
					display='flex'
					flexGrow='1'
					width='100%'
					borderRadius='0px 0px 25px 25px'
					sx={{ background: '#FFFFFF' }}
				>
					<Box
						display='flex'
						width='100%'
						padding={{
							sm: '0.625rem 1.875rem 1.563rem 1.875rem',
							xs: '0.625rem 0.938rem 1.875rem 0.938rem',
						}}
					>
						<Box
							flexGrow='1'
							border='1px solid #DEDEDE'
							sx={{ background: '#FFFFFF' }}
							borderRadius='6px'
							height='50px'
							display='flex'
						>
							<input
								id='msg'
								value={input}
								style={{
									border: 'none',
									outline: 'none',
									margin: 'auto 0.625rem',
									height: '80%',
									flexGrow: '1',
								}}
								placeholder='Type your message here...'
								type='text'
								onChange={handleChange}
								onKeyDown={e => {
									e.key === 'Enter' && sendMsg();
								}}
							/>
							<Box display='flex' height='100%' marginRight='2.2%' gap={2}>
								<Box display={{ sm: 'flex', xs: 'none' }} height='100%'>
									<Box
										margin='auto 0'
										fontSize='0.68rem'
										lineHeight='1.8em'
										padding='2px 0.938rem'
										borderRadius='32px'
										sx={{
											background: '#F3F1FF',
											color: '#8F7EF3',
											fontWeight: '600',
										}}
									>
										Request call back
									</Box>
								</Box>
								<Box display='flex' height='100%'>
									<Box display='flex' height='40%' margin='auto 0'>
										<img
											style={{ objectFit: 'contain', height: '100%' }}
											src='/assets/images/chat/emoji.svg'
											alt=''
										/>
									</Box>
								</Box>
							</Box>
						</Box>
						<Box
							sx={{ bgcolor: '#8F7EF3', aspectRatio: '1' }}
							borderRadius='50%'
							height='100%'
							margin='0 0 0 4%'
							display='flex'
							onClick={sendMsg}
						>
							<img
								style={{
									objectFit: 'contain',
									height: '50%',
									margin: 'auto',
									position: 'relative',
									top: '3.5%',
									right: '2%',
								}}
								src='/assets/images/chat/send.svg'
								alt=''
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatView;
