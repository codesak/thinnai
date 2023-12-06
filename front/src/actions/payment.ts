import axios from 'axios';
import { Dispatch } from 'react';
import {
	PAYMENT_LOAD_SUCCESS,
	PAYMENT_LOAD_FAIL,
	RECORD_PAYMENT_SUCCESS,
	RECORD_PAYMENT_FAIL,
	ALERT_TYPE,
} from '../utils/consts';
import { setAlert } from './alert';

export const loadPayments = () => async (dispatch: Dispatch<any>) => {
	try {
		const res = await axios.get(`/api/profile/payments`);
		dispatch({
			type: PAYMENT_LOAD_SUCCESS,
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

export const recordPayment = (paymentData: object) => async (dispatch: Dispatch<any>) => {
	try {
		const res = await axios.post(
			'/api/profile/recordPayment',
			{ ...paymentData, paymentDate: new Date(), paymentType: 'Debited', paymentMode: 'Wallet' },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		dispatch({
			type: RECORD_PAYMENT_SUCCESS,
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
