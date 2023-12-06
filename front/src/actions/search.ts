import { Dispatch } from 'react';
import {
	SET_AMENITIES_FILTERS,
	SET_BOOKING_DATE,
	SET_CITY,
	SET_DIRECT_BOOKING,
	SET_GROUP_TYPE,
	SET_GUEST_COUNT,
	SET_LANDMARK,
	SET_SERVICES_FILTERS,
	SET_SORT,
	SET_RESET_STATE,
	SET_ADD_ON_SERVICES,
	SET_LATITUDE,
	SET_LONGITUDE,
	SET_AREA,
} from '../utils/consts';

export const setCity = (city: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_CITY,
		payload: city,
	});
};

export const setLandmark = (landmark: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_LANDMARK,
		payload: landmark,
	});
};

export const setBookingDate = (date: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_BOOKING_DATE,
		payload: date,
	});
};

export const setGuestCount = (guestCount: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_GUEST_COUNT,
		payload: guestCount,
	});
};

export const setGroupType = (groupType: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_GROUP_TYPE,
		payload: groupType,
	});
};

export const setDirectBooking = (directBooking: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_DIRECT_BOOKING,
		payload: directBooking,
	});
};

export const setAmenitiesFilter = (amenities: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_AMENITIES_FILTERS,
		payload: amenities,
	});
};

export const setServicesFilter = (services: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_SERVICES_FILTERS,
		payload: services,
	});
};

export const setSort = (sortBy: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_SORT,
		payload: sortBy,
	});
};
export const SetReset = () => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_RESET_STATE,
		
	});
};
export const setAddOnServices = (addOnServices: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_ADD_ON_SERVICES,
		payload: addOnServices,
	});
};
export const setLatitude = (latitude: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_LATITUDE,
		payload: latitude,
	});
};
export const setLongitude = (longitude: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_LONGITUDE,
		payload: longitude,
	});
};
export const setArea = (area: object) => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: SET_AREA,
		payload: area,
	});
};
