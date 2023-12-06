import { Action, GOOGLE_DATA } from './../utils/consts';

const initialState = {
    googleData:{}
};

const googleDataReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case GOOGLE_DATA:
			return {
				...state,
				googleData:payload,
			};
		
		default:
			return state;
	}
};

export default googleDataReducer;