import {
	CREATE_PROFILE_SUCCESS,
	PROFILE_LOAD_SUCCESS,
	REVIEWS_LOAD_SUCCESS,
	FRIENDS_LOAD_SUCCESS,
	REMOVE_FRIEND_SUCCESS,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPLOAD_UPDATED,
	RESET_PROFILE,
	LOADING_PROFILE,
	Action,
	PROFILE_PENDING,
} from '../utils/consts';

const initialState = {
	userData: {},
	reviews: [],
	friends: [],
	loading: true,
	isPending: false,
	uploadPercentage: null,
};

const profileReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_PROFILE_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
		case PROFILE_LOAD_SUCCESS:
		case REVIEWS_LOAD_SUCCESS:
		case FRIENDS_LOAD_SUCCESS:
		case REMOVE_FRIEND_SUCCESS:
			return {
				...state,
				...payload,
				loading: false,
			};
		case PROFILE_PENDING:
			return {
				...state,
				isPending: true,
				loading: false,
			};
		case UPLOAD_UPDATED:
			return {
				...state,
				uploadPercentage: payload,
			};
		case UPDATE_PROFILE_FAIL:
			return { ...state, loading: false };
		case RESET_PROFILE:
			return { ...initialState };
		case LOADING_PROFILE:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default profileReducer;
