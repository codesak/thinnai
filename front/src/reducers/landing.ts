import { LANDING_PLACES_LOAD_SUCCESS, RESET_LANDING, Action } from '../utils/consts';

const initialState = {
	spaces: [],
	loading: false,
};

const landingReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case LANDING_PLACES_LOAD_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_LANDING:
			return { ...initialState };
		default:
			return state;
	}
};

export default landingReducer;
