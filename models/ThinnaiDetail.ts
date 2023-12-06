import { Schema, model } from 'mongoose';

export interface IThinnaiDetail {
	thinnaiTypes: {
		icon: String;
		title: String;
	}[];
	amenities: {
		icon: String;
		title: String;
	}[];
	bestSuitedFor: {
		icon: String;
		title: String;
	}[];
	guestsAllowedToBring: {
		icon: String;
		title: String;
	}[];
	additionalServices: {
		title: String;
		description: String;
		priceRange: String;
	}[];
	serviceCharges: {
		chargeType: String;
		percentage: String;
	}[];
	cleaningCharges: {
		chargeType: String;
		price: String;
	}[];
	discounts: {
		chargeType: String;
		price: String;
	}[];
	houseRules: {
		index: String;
		rule: String;
	}[];
	faq: {
		question: String;
		answer: String;
	}[];
	maxGuestAllowed: {
		spaceType: String;
		guestCount: String;
	}[];
}

const ThinnaiDetailSchema = new Schema<IThinnaiDetail>({
	thinnaiTypes: [
		{
			icon: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	amenities: [
		{
			icon: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	bestSuitedFor: [
		{
			icon: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	guestsAllowedToBring: [
		{
			icon: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	additionalServices: [
		{
			title: {
				type: String,
			},
			description: {
				type: String,
			},
			priceRange: {
				type: String,
			},
		},
	],
	serviceCharges: [
		{
			chargeType: {
				type: String,
			},
			percentage: {
				type: String,
			},
		},
	],
	cleaningCharges: [
		{
			chargeType: {
				type: String,
			},
			price: {
				type: String,
			},
		},
	],
	discounts: [
		{
			chargeType: {
				type: String,
			},
			price: {
				type: String,
			},
		},
	],
	houseRules: [
		{
			index: {
				type: String,
			},
			rule: {
				type: String,
			},
		},
	],
	faq: [
		{
			question: {
				type: String,
			},
			answer: {
				type: String,
			},
		},
	],
	maxGuestAllowed: [
		{
			spaceType: {
				type: String,
			},
			guestCount: {
				type: String,
			},
		},
	],
});

export default model<IThinnaiDetail>('thinnaidetail', ThinnaiDetailSchema);
