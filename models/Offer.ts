import { Schema, model } from 'mongoose';

export interface IOffer {
	offer: {
		offerName: string;
		offerDescription: string;
		offerImg: string;
		offerDiscount: number;
		offerDiscountFrom: Date;
		offerDiscountTo: Date;
		startTimeMtoF: Date;
		endTimeMtoF: Date;
		startTimeStoS: Date;
		endTimeStoS: Date;
	}[];
}

const OfferSchema = new Schema<IOffer>({
	offer: [
		{
			offerName: {
				type: String,
			},
			offerDescription: {
				type: String,
			},
			offerImg: {
				type: String,
			},
			offerDiscount: {
				type: Number,
			},
			offerDiscountFrom: {
				type: Date,
			},
			offerDiscountTo: {
				type: Date,
			},
			startTimeMtoF: {
				type: Date,
			},
			endTimeMtoF: {
				type: Date,
			},
			startTimeStoS: {
				type: Date,
			},
			endTimeStoS: {
				type: Date,
			},
		},
	],
});

export default model<IOffer>('offer', OfferSchema);
