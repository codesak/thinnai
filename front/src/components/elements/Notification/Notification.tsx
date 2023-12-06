//import React, { useState, useEffect } from 'react';
//import { requestForToken, onMessageListener } from '../../../utils/push-notification';

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
	/* const [notification, setNotification] = useState({ title: '', body: '' });
	requestForToken();
	const notify = () => toast(<ToastDisplay />);

	function ToastDisplay() {
		return (
			<div>
				<h2 style={{ fontSize: '1em' }}>
					<b>{notification?.title}</b>
				</h2>
				<p style={{ fontSize: '0.7em' }}>{notification?.body}</p>
			</div>
		);
	}

	useEffect(() => {
		if (notification?.title) {
			notify();
		}
	}, [notification]);

	onMessageListener()
		.then((payload: any) => {
			setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
		})
		.catch((err: any) => console.log('failed: ', err));

	return <ToastContainer theme='dark' />;*/
	return <div> </div>
	
}; 

export default Notification; 
