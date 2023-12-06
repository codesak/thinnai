import {
	PAYMENT_LOAD_SUCCESS,
	RECORD_PAYMENT_SUCCESS,
	RESET_PAYMENT,
	Action,
} from '../utils/consts';

const initialState = {
	payments: [],
	loading: false,
};

const paymentReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case PAYMENT_LOAD_SUCCESS:
		case RECORD_PAYMENT_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_PAYMENT:
			return { ...initialState };
		default:
			return state;
	}
};

export default paymentReducer;
