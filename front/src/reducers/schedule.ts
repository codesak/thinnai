import { SCHEDULE_LOAD_SUCCESS, RESET_SCHEDULE, Action } from '../utils/consts';

const initialState = {
	unavailableDatesByDay: [],
	unavailableDatesByHours: [],
	loading: false,
};

const scheduleReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case SCHEDULE_LOAD_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_SCHEDULE:
			return { ...initialState };
		default:
			return state;
	}
};

export default scheduleReducer;
