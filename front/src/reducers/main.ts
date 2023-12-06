import {
	LOCATIONS_LOAD_SUCCESS,
	PLACES_LOAD_SUCCESS,
	RESET_MAIN,
	Action,
	LOADING_MAIN,
} from '../utils/consts';

const initialState = {
	locations: [],
	properties: [],
	loading: true,
};

const mainReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case LOCATIONS_LOAD_SUCCESS:
		case PLACES_LOAD_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_MAIN:
			return { ...initialState };
		case LOADING_MAIN:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default mainReducer;
