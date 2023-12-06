import _ from 'lodash';
import {
	ADD_ENQUIRY,
	UPDATE_ENQUIRY,
	DELETE_ENQUIRY,
	SET_LOAD_ENQUIRY_DATA,
	SET_ADD_MORE_ENQUIRY,
	SET_ENQUIRY_INDEX,
	ENQUIRY_PLACES_LOAD_SUCCESS,
	SEND_ENQUIRY_SUCCESS,
	CANCEL_ENQUIRY_SUCCESS,
	RESET_ENQUIRY,
	Action,
} from '../utils/consts';

const initialState = {
	loadEnquiryData: false,
	addMoreEnquiry: false,
	enquiryId: undefined,
	enquiries: [],
	properties: [],
	loading: false,
};

const enquiryReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_ENQUIRY:
		case UPDATE_ENQUIRY:
		case DELETE_ENQUIRY:
		case SET_LOAD_ENQUIRY_DATA:
		case SET_ADD_MORE_ENQUIRY:
		case SET_ENQUIRY_INDEX:
		case ENQUIRY_PLACES_LOAD_SUCCESS:
		case SEND_ENQUIRY_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case RESET_ENQUIRY:
			return { ...initialState };
		default:
			return state;
	}
};

export default enquiryReducer;
