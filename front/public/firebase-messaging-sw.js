/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');


/* apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId:process.env.REACT_APP_MEASUREMENT_ID */
	firebase.initializeApp({
		apiKey : "AIzaSyBjwD-hwNi7gSR3dfJ-VWZJtDf4Q3iPfcs" , 
  authDomain : "notifications-b9e2b.firebaseapp.com" , 
  projectId : "notifications-b9e2b" , 
  storageBucket : "notifications-b9e2b.appspot.com" , 
  messagingSenderId : "1089026176633" , 
  appId : "1:1089026176633:web:b7f8e5e072b6dd2fa786a8" , 
  measurementId : "G-H230MHQDS5"
	})
	

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

/* apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId:process.env.REACT_APP_MEASUREMENT_ID */

/* const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
}); */
