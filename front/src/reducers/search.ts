import {
	SET_CITY,
	SET_LANDMARK,
	SET_BOOKING_DATE,
	SET_GUEST_COUNT,
	SET_GROUP_TYPE,
	SET_DIRECT_BOOKING,
	SET_AMENITIES_FILTERS,
	SET_SERVICES_FILTERS,
	SET_SORT,
	RESET_SEARCH,
	Action,
	SET_RESET_STATE,
	SET_ADD_ON_SERVICES,
	SET_LATITUDE,
	SET_LONGITUDE,
	SET_AREA
} from '../utils/consts';


const initialState = {
	city: 'Bangalore',
	landmark: '',
	bookingDate: new Date(),
	guestCount: 1,
	groupType: '',
	directBooking: false,
	amenities: [],
	services: [],
	addOnServices:[],
	sortBy: 'acceptanceRate',
	latitude:'',
	longitude:'',
	area:''
};

const searchReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_CITY:
		case SET_LANDMARK:
		case SET_BOOKING_DATE:
		case SET_GUEST_COUNT:
		case SET_GROUP_TYPE:
		case SET_AMENITIES_FILTERS:
		case SET_SERVICES_FILTERS:
		case SET_DIRECT_BOOKING:
		case SET_ADD_ON_SERVICES:
		case SET_SORT:
		case SET_LATITUDE:
	    case SET_LONGITUDE:
		case SET_AREA:	
			return {
				...state,
				...payload,
			};
		case SET_RESET_STATE:
			return {...initialState}
		default:
			return state;
	}
};

export default searchReducer;
