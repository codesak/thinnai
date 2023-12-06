import axios from 'axios';
import { Dispatch } from 'react';
import { SCHEDULE_LOAD_SUCCESS, SCHEDULE_LOAD_FAIL, ALERT_TYPE } from '../utils/consts';
import { setAlert } from './alert';

export const loadSchedule =
	(propertyId: string, from: Date, to: Date) => async (dispatch: Dispatch<any>) => {
		try {
			const res = await axios.get(`/api/schedule/getSchedule/${propertyId}`, {
				params: { from, to },
			});
			const unavailableDatesByDay: string[] = [];
			const unavailableDatesByHours: { unavailableFrom: Date; unavailableTo: Date }[] = [];
			res.data.personal[0]?.hostSchedule?.forEach(
				(date: { unavailableFrom: string; unavailableTo: string }) => {
					const unavailableFrom = new Date(date.unavailableFrom);
					const unavailableTo = new Date(date.unavailableTo);
					const diff = Math.abs(unavailableFrom.getTime() - unavailableTo.getTime());
					const diffHours = diff / (1000 * 60 * 60);
					if (diffHours > 1) {
						unavailableDatesByDay.push(unavailableFrom.toISOString());
					} else {
						unavailableDatesByHours.push({ unavailableFrom, unavailableTo });
					}
				}
			);
			dispatch({
				type: SCHEDULE_LOAD_SUCCESS,
				payload: { unavailableDatesByDay, unavailableDatesByHours },
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
