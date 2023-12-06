import {  Action ,UPDATED_SS,CURRENT_DATE} from '../utils/consts';
import { calculate_future_time } from '../utils/helperTimeFunctions';

const initialState = {
	dateChanger: calculate_future_time().getDate(),
	currentDate: calculate_future_time()
};

const dateChangerReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
    
	switch (type) {
		case UPDATED_SS:
			return {
				...state,
				dateChanger:payload
            }
		case CURRENT_DATE:
			return {
				...state,
			currentDate: payload
			}	
		
			
		default:
			return state;
	}
};

export default dateChangerReducer;
