import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
	
	const config={
		apiKey : "AIzaSyBjwD-hwNi7gSR3dfJ-VWZJtDf4Q3iPfcs" , 
  authDomain : "notifications-b9e2b.firebaseapp.com" , 
  projectId : "notifications-b9e2b" , 
  storageBucket : "notifications-b9e2b.appspot.com" , 
  messagingSenderId : "1089026176633" , 
  appId : "1:1089026176633:web:b7f8e5e072b6dd2fa786a8" , 
  measurementId : "G-H230MHQDS5"
	}
	
firebase.initializeApp(config);
export default firebase
