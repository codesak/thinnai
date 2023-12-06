import { Action, APP_SETTINGS_LOAD_SUCCESS, RESET_APP_SETTINGS } from '../utils/consts';

export interface IAddOnServices {
	addOnServiceTitle: string;
	addOnDescription: string;
	maxPrice: number;
	addOnPrice: number;
	addOnServiceIcon: string;
	uniqueServiceId: string;
}

export interface ICitySettings {
	id: string;
	name: string;
	thumbnail: string;
	landmarks: string[];
}

const initialState = {
	spaces: [],
	amenitiesMap: {},
	activityTypeMap: {},
	allowedActivitiesMap: {},
	citiesMap: {},
	loading: true,
};

const appSettingsReducer = (state = initialState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		case APP_SETTINGS_LOAD_SUCCESS:
			let amenitiesMapUpdated: any = {};
			let activityTypeMapUpdated: any = {};
			let allowedActivitiesMapUpdated: any = {};
			let citiesMapUpdated: any = {};
			payload.settings.amenities.forEach(
				(amenity: any) => (amenitiesMapUpdated[amenity.id] = amenity)
			);
			payload.settings.activityTypes.forEach(
				(activity: any) => (activityTypeMapUpdated[activity.id] = activity)
			);
			payload.settings.allowedActivities.forEach(
				(allowedActivity: any) =>
					(allowedActivitiesMapUpdated[allowedActivity.id] = allowedActivity)
			);
			payload.settings.cities.forEach((city: any) => (citiesMapUpdated[city.id] = city));
			return {
				...state,
				...payload.settings,
				amenitiesMap: amenitiesMapUpdated,
				activityTypeMap: activityTypeMapUpdated,
				allowedActivitiesMap: allowedActivitiesMapUpdated,
				citiesMap: citiesMapUpdated,
				loading: false,
			};
		case RESET_APP_SETTINGS:
			return { ...initialState };
		default:
			return state;
	}
};

export default appSettingsReducer;
