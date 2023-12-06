import { AlertPayload } from '../../../reducers/alert';
import { RootState } from '../../../store';
import { REMOVE_ALERT } from '../../../utils/consts';
import Alert from '@mui/material/Alert';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Alerts = () => {
	const alerts = useSelector<RootState, AlertPayload[]>(state => state.alert);
	const dispatch = useDispatch();
	

	return (
		<div>
			<Fragment >
				{alerts &&
					alerts.length > 0 &&
					alerts.map(alert => (
						<Alert
							className='fade error-alert slide-in-top'
							onClose={() =>
								dispatch({
									type: REMOVE_ALERT,
									payload: alert.alertId,
								})
							}
							sx={{ position: 'relative', zIndex: 199, width:{xs:'17rem',md:'30rem'},left:{xs:'15%',md:'35%'},opacity:'1!important' }}
							severity={alert.alertType ?? 'info'}
							key={alert.alertId}
						>
							{alert.msg===undefined? 'Enter valid mobile number' :alert.msg}
						</Alert>
					))}
			</Fragment>
		</div>
	);
};

export default Alerts;
