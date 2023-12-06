import {
	LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS,
	LOAD_BOOKING_ENQUIRY_STATUS_FAILURE,
	LOAD_BOOKING_SUCCESS,
	LOAD_BOOKING_ONGOING_SUCCESS,
	LOAD_BOOKING_ENQUIRY_SUCCESS,
	LOAD_BOOKING_CONFIRMED_SUCCESS,
	LOAD_BOOKING_CANCELLED_SUCCESS,
	RESCHEDULE_BOOKING_SUCCESS,
	RESET_BOOKING,
	Action,
	LOADING_BOOKING,
	LOAD_BOOKING_RESCHEDULED_SUCCESS,
	CANCEL_ENQUIRY_SUCCESS,
	LOAD_BOOKING_INVITED_SUCCESS,
	LOAD_BOOKING_ONGOING_FAIL,
} from '../utils/consts';
import _ from 'lodash';

const initialState = {
	booking: {},
	ongoing: [],
	enquiry: [],
	enquiryStatus: [],
	unpaid:[],
	confirmed: [],
	cancelled: [],
	invitedTo: [],
	reschedules: {},
	loading: true,
};

const enquiryReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS:
		case LOAD_BOOKING_ENQUIRY_STATUS_FAILURE:
		case LOAD_BOOKING_SUCCESS:
		case LOAD_BOOKING_ONGOING_SUCCESS:
		case LOAD_BOOKING_ENQUIRY_SUCCESS:
		case LOAD_BOOKING_CONFIRMED_SUCCESS:
		case LOAD_BOOKING_CANCELLED_SUCCESS:
		case RESCHEDULE_BOOKING_SUCCESS:
		case LOAD_BOOKING_RESCHEDULED_SUCCESS:
		case CANCEL_ENQUIRY_SUCCESS:
		case LOAD_BOOKING_INVITED_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case LOAD_BOOKING_ONGOING_FAIL:
			return {
				...state,
				loading: false,
			};
		case RESET_BOOKING:
			return { ...initialState };
		case LOADING_BOOKING:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default enquiryReducer;
