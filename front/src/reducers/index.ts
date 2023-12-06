import alert from './alert';
import appSettings from './appSettings';
import booking from './booking';
import details from './details';
import enquiry from './enquiry';
import guestAuth from './guestAuth';
import landing from './landing';
import main from './main';
import payment from './payment';
import profile from './profile';
import register from './register';
import schedule from './schedule';
import search from './search';
import dateChanger from "./dateChanger"
import cart from './cart'
import googleData from './googleData'
import { combineReducers } from 'redux';

export default combineReducers({
	alert,
	landing,
	register,
	guestAuth,
	profile,
	search,
	main,
	details,
	enquiry,
	booking,
	payment,
	schedule,
	appSettings,
	dateChanger,
	cart,
	googleData
});
