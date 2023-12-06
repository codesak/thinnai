import { PROPERTY_LOAD_SUCCESS, RESET_DETAILS, Action, LOADING_DETAILS } from '../utils/consts';

const initialState = {
	property: {},
	offers: [],
	reviewCount: 0,
	duration: 0,
	cutlery: false,
	additions: [],
	loading: false,
};

const detailsReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case PROPERTY_LOAD_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_DETAILS:
			return {
				...initialState,
			};
		case LOADING_DETAILS:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default detailsReducer;
