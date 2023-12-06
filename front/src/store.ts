import rootReducer from './reducers';
import { createStore, applyMiddleware, Store, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

interface Action {
	type: string;
	payload: any;
}

const store: Store<
	{
		alert: any;
		appSettings: any;
		landing: any;
		register: any;
		profile: any;
		guestAuth: any;
		search: any;
		main: any;
		details: any;
		enquiry: any;
		booking: any;
		payment: any;
		schedule: any;
		dateChanger:any;
		cart:any;
		googleData:any;
	},
	any
> & {
	dispatch: Dispatch<Action>;
} = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
export type RootState = ReturnType<typeof store.getState>;
