import UserData, { IUserData } from './UserData';
import { Schema, Types } from 'mongoose';

let options = {
	discriminatorKey: 'userType',
};

export interface IGuestUserData extends IUserData {
	friends: Types.ObjectId[];
	wallet: number;
	ratings: { good: number; neutral: number; bad: number };
	reviews: {
		_id: Types.ObjectId;
		showReview: boolean;
		rating: string;
		reviewer: Types.ObjectId;
		review: string;
		reviewedOn: Date;
		helpful: number;
	}[];
	paymentMethods: {
		UPI: [
			{
				upiId: string;
			}
		];
		cards: [
			{
				cardType: string;
				cardIssuer: string;
				bank: string;
				cardNumber: string;
				cardHolderName: string;
				expiryDate: string;
				secured: boolean;
			}
		];
		bankAccounts: [
			{
				bankName: string;
				accountNumber: string;
				accountHolderName: string;
				IFSC: string;
			}
		];
	};
}

const GuestUserDataSchema = new Schema<IGuestUserData>(
	{
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
				required: true,
			},
		],
		wallet: {
			type: Number,
			default: 0,
		},
		ratings: {
			good: {
				type: Number,
				default: 0,
			},
			neutral: {
				type: Number,
				default: 0,
			},
			bad: {
				type: Number,
				default: 0,
			},
		},
		reviews: [
			{
				showReview: {
					type: Boolean,
					default: true,
				},
				reviewer: {
					type: Schema.Types.ObjectId,
					ref: 'user',
					required: true,
				},
				review: {
					type: String,
					trim: true,
				},
				rating: {
					type: String,
					required: true,
				},
				reviewedOn: {
					type: Date,
					required: true,
				},
				helpful: {
					type: Number,
					default: 0,
				},
			},
		],
		paymentMethods: {
			UPI: [
				{
					upiId: {
						type: String,
						required: true,
					},
				},
			],
			cards: [
				{
					cardType: {
						type: String,
						required: true,
					},
					cardIssuer: {
						type: String,
						required: true,
					},
					bank: {
						type: String,
						required: true,
					},
					cardNumber: {
						type: String,
						required: true,
					},
					cardHolderName: {
						type: String,
						required: true,
					},
					expiryDate: {
						type: String,
						required: true,
					},
					secured: {
						type: Boolean,
						default: false,
					},
				},
			],
			bankAccounts: [
				{
					bankName: {
						type: String,
						required: true,
					},
					accountNumber: {
						type: String,
						required: true,
					},
					accountHolderName: {
						type: String,
						required: true,
					},
					IFSC: {
						type: String,
						required: true,
					},
				},
			],
		},
	},
	options
);

export default UserData.discriminator<IGuestUserData>('guestData', GuestUserDataSchema);
