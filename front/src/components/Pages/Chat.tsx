import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ChatList from '../elements/Chat/ChatList';
import ChatView from '../elements/Chat/ChatView';
import '../styles/Chat/chat.scss';
import { ROUTES } from '../../utils/routing/routes';
import {useNavigate } from 'react-router-dom';
import ResponsiveMenu from '../elements/Explore/subElements/ResponsiveMenu';

const Chat = () => {
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
	const [msgList, setMsgList] = useState<msgDataInterface[]>([
		{
			chatName: 'Thinnai guest 1',
			msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			sender: 'Thinnai  guest 1',
			time: '8:20 pm',
			dateString: 'Sun, 3 Jul',
			dateDigit: 3,
			day: 'Sun',
			month: 'Jul',
			year: 2022,
		},
		{
			chatName: 'Thinnai guest 2',
			msg: 'Lorem Lorem ipsum dolor',
			sender: 'Thinnai  guest 2',
			time: '8:20 pm',
			dateString: 'Sun, 3 Jul',
			dateDigit: 3,
			day: 'Mon',
			month: 'Jul',
			year: 2022,
		},
		{
			chatName: 'Thinnai guest 1',
			msg: 'Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			sender: 'Thinnai  guest 1',
			time: '8:20 pm',
			dateString: 'Mon, 1 Aug',
			dateDigit: 1,
			day: 'Mon',
			month: 'Aug',
			year: 2022,
		},
		{
			chatName: 'Thinnai guest 1',
			msg: 'Lorem Lorem ipsum dolor sit amet',
			sender: 'Thinnai  guest 1',
			time: '8:20 pm',
			dateString: 'Mon, 1 Aug',
			dateDigit: 1,
			day: 'Mon',
			month: 'Aug',
			year: 2022,
		},
		{
			chatName: 'Thinnai guest 2',
			msg: 'Lorem ipsum dolor',
			sender: 'You',
			time: '8:20 pm',
			dateString: 'Mon, 1 Aug',
			dateDigit: 1,
			day: 'Mon',
			month: 'Aug',
			year: 2022,
		},
	]);
	const [chatList, setChatList] = useState([
		{
			id: 1,
			img: '/assets/images/chat/avtar.svg',
			name: 'Thinnai guest 1',
			lastSeen: '2.02pm',
			limitedMsg: true,
		},
		{
			id: 2,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.04pm',
			limitedMsg: true,
		},
		{
			id: 3,
			img: '/assets/images/chat/avtar.svg',
			name: 'Thinnai guest 1',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
		{
			id: 4,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.04pm',
			limitedMsg: false,
		},
		{
			id: 5,
			img: '/assets/images/chat/avtar.svg',
			name: 'Thinnai guest 1',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
		{
			id: 6,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
	]);
	const [chatListConfirmed, setChatListConfirmed] = useState([
		{
			id: 1,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
		{
			id: 2,
			img: '/assets/images/chat/avtar.svg',
			name: 'Thinnai guest 1',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
		{
			id: 3,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.02pm',
			limitedMsg: false,
		},
		{
			id: 4,
			img: '/assets/images/chat/avtar.svg',
			name: 'Thinnai guest 1',
			lastSeen: '2.04pm',
			limitedMsg: true,
		},
		{
			id: 5,
			img: '/assets/images/chat/avtar2.svg',
			name: 'Thinnai guest 2',
			lastSeen: '2.04pm',
			limitedMsg: true,
		},
	]);
	const navigate = useNavigate();

	const [openChat, setOpenChat] = useState<number>(1);
	const [showChat, setShowChat] = useState(false);
	const [confirmedSelected, setConfirmedSelected] = useState(false);
	const [openedChat, setOpenedChat] = useState<{
		id: number;
		img: string;
		name: string;
		lastSeen: string;
		limitedMsg: boolean;
	}>({
		id: 0,
		img: '',
		name: '',
		lastSeen: '',
		limitedMsg: false,
	});
	const openSelectedChat = () => {
		if (confirmedSelected) {
			setOpenedChat(chatListConfirmed.filter(item => item.id === openChat)[0]);
		
		} else {
			setOpenedChat(chatList.filter(item => item.id === openChat)[0]);
			
		}
	};
	useEffect(() => {
		openSelectedChat();
	}, [openChat, confirmedSelected]);

	//ResponsiveMenu
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

	const [bookSelected, setBookSelected] = useState(false);
	const bookClick = () => {
		if (!bookSelected) {
			setHomeSelected(false);
			setBookSelected(true);
			setChatSelected(false);
			setAccountOpen(false);
		}
		navigate(ROUTES.CONFIRMED);
	};

	const [chatSelected, setChatSelected] = useState(true);
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

	return (
		<Box fontFamily='Montserrat' padding={{ md: '1.875rem', xs: '0px' }} overflow='hidden'>
			<Grid container>
				<Grid item md={4} xs={12} display={{ md: 'block', xs: !showChat ? 'block' : 'none' }}>
					<ChatList
						openSelectedChat={openSelectedChat}
						confirmedSelected={confirmedSelected}
						setConfirmedSelected={setConfirmedSelected}
						chatListConfirmed={chatListConfirmed}
						chatList={chatList}
						setOpenChat={setOpenChat}
						setShowChat={setShowChat}
						msgList={msgList}
						setMsgList={setMsgList}
					/>
				</Grid>
				<Grid item md={8} xs={12} display={{ md: 'block', xs: showChat ? 'block' : 'none' }}>
					<ChatView
						openSelectedChat={openSelectedChat}
						confirmedSelected={confirmedSelected}
						chatListConfirmed={openedChat}
						chatList={openedChat}
						setShowChat={setShowChat}
						openChat={openChat}
						msgList={msgList}
						setMsgList={setMsgList}
					/>
				</Grid>
			</Grid>
			<ResponsiveMenu
			homeSelected={homeSelected}
			bookSelected={bookSelected}
			chatSelected={chatSelected}
			accountOpen={accountOpen}
			homeClick={homeClick}
			bookClick={bookClick}
			chatClick={chatClick}
			accountClick={accountClick}/>
		</Box>
	);
};

export default Chat;
