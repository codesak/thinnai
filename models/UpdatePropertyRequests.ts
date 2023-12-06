import { Schema, model } from 'mongoose';
import { IProperties } from './Property';

interface IUpdateProperty extends IProperties {
	originalProperty: Schema.Types.ObjectId;
}

const UpdatePropertyRequestsSchema = new Schema<IUpdateProperty>({
	originalProperty: {
		type: Schema.Types.ObjectId,
		ref: 'property',
		required: true,
	},
	propertyPictures: [
		{
			type: String,
			trim: true,
		},
	],
	propertyThumbnails: [
		{
			type: String,
			trim: true,
		},
	],
	propertyDescription: {
		type: String,
		trim: true,
	},
	houseNumber: {
		type: String,
		trim: true,
	},
	tower: {
		type: String,
		trim: true,
	},
	street: {
		type: String,
		trim: true,
	},
	locality: {
		type: String,
		trim: true,
	},
	landmark: {
		type: String,
		trim: true,
	},
	city: {
		type: String,
		trim: true,
	},
	state: {
		type: String,
		trim: true,
	},
	zipCode: {
		type: String,
		trim: true,
	},
	thinnaiLocationUrl: {
		type: String,
		trim: true,
	},
	approximateLocationUrl: {
		type: String,
		trim: true,
	},
	directions: [
		{
			type: String,
			trim: true,
		},
	],
	thinnaiLocation: [
		{
			type: String,
			trim: true,
		},
	],
	houseRules: [
		{
			type: String,
			trim: true,
		},
	],

	foodJoints: [
		{
			restaurantName: {
				type: String,
				trim: true,
			},
			restaurantImage: {
				type: String,
				trim: true,
			},
			cuisineType: {
				type: String,
				trim: true,
			},
			foodSuggestions: {
				type: String,
				trim: true,
			},
		},
	],
	addOnServices: [
		{
			addOnThumbnail: {
				type: String,
			},
			addOnServiceTitle: {
				type: String,
			},
			addOnDescription: {
				type: String,
			},
			addOnHostDescription: {
				type: String,
			},
			addOnPrice: {
				type: Number,
				default: 0,
			},
		},
	],
	nearbyMetro: {
		metroName: {
			type: String,
		},
		distance: {
			type: Number,
		},
	},
	nearbyBusStop: {
		busStopName: {
			type: String,
		},
		distance: {
			type: Number,
		},
	},
});

export { UpdatePropertyRequestsSchema };

export default model<IUpdateProperty>('updatepropertyrequest', UpdatePropertyRequestsSchema);
