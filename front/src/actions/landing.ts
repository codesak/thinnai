import axios from 'axios';
import { Dispatch } from 'react';
import { LANDING_PLACES_LOAD_SUCCESS, LANDING_PLACES_LOAD_FAIL, ALERT_TYPE } from '../utils/consts';
import { setAlert } from './alert';

export const loadLandingProperty = () => async (dispatch: Dispatch<any>) => {
	try {
		const res = await axios.get(`/api/property/properties`);
		dispatch({
			type: LANDING_PLACES_LOAD_SUCCESS,
			payload: res.data,
		});
	} catch (err: any) {
		if (!err.response.data.errors) {
			dispatch(setAlert('Server Not Running', ALERT_TYPE.DANGER));
		} else {
			if (err.response.status === 401) return;
			dispatch(setAlert(err.response.data.errors.message, ALERT_TYPE.DANGER));
		}
	}
};
