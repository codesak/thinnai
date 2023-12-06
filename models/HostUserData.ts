import { Schema, Types } from 'mongoose';
import UserData, { IUserData } from './UserData';

let options = { discriminatorKey: 'userType' };

export interface IHostUserData extends IUserData {
	approvalStatus: string;
	aboutYourself: string;
	interests: string;
	address: string;
	city: string;
	state: string;
	zipCode: number;
	languagesKnown: string;
	suggestions: string;
	anythingElse: string;
	anythingWeShouldKnow: string;
	accApproval: string;
	detailsApproval: string;
	accHolder: string;
	accNumber: string;
	IFSC: string;
	guestsHosted: number;
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
	properties: { property: Types.ObjectId }[];
	updateReuests: { originalPropertyId: Types.ObjectId; property: Types.ObjectId }[];
	wallet: { balance: number; month: string; year: number }[];
	callbackRequests: {
		_id: Types.ObjectId | undefined;
		date: Date | undefined;
		status: string | undefined;
		resolutions:
			| {
					resolutionDate: Date;
					resolutionComment: string;
			  }[]
			| undefined;
	}[];
	acceptanceRate: number;
	avgResponseTime: number;
	cancellationRate: number;
	addBalance: (month: string, year: number, amount: number) => void;
	deductBalance: (month: string, year: number, amount: number) => void;
}

const HostUserDataSchema = new Schema<IHostUserData>(
	{
		approvalStatus: {
			type: String,
			trim: true,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		aboutYourself: {
			type: String,
			trim: true,
		},
		interests: {
			type: String,
			trim: true,
		},
		address: {
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
			type: Number,
			minLength: 6,
			maxLength: 6,
		},
		languagesKnown: {
			type: String,
			trim: true,
		},
		accApproval: {
			type: String,
			trim: true,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		detailsApproval: {
			type: String,
			trim: true,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		accHolder: {
			type: String,
			trim: true,
		},
		accNumber: {
			type: String,
		},
		IFSC: {
			type: String,
			trim: true,
		},
		guestsHosted: {
			type: Number,
			default: 0,
		},
		suggestions: {
			type: String,
			trim: true,
		},
		anythingElse: {
			type: String,
			trim: true,
		},
		anythingWeShouldKnow: {
			type: String,
			trim: true,
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
		properties: [
			{
				property: {
					type: Schema.Types.ObjectId,
					ref: 'property',
					required: true,
				},
			},
		],
		updateReuests: [
			{
				originalPropertyId: {
					type: Schema.Types.ObjectId,
					ref: 'property',
					required: true,
				},
				property: {
					type: Schema.Types.ObjectId,
					ref: 'updatepropertyrequest',
					required: true,
				},
			},
		],
		wallet: [
			{
				balance: {
					type: Number,
					required: true,
					default: 0,
				},
				month: {
					type: String,
					required: true,
					trim: true,
				},
				year: {
					type: Number,
					required: true,
					min: 2022,
					max: 2100,
				},
			},
		],
		callbackRequests: [
			{
				date: {
					type: Date,
					default: Date.now,
				},
				status: {
					type: String,
					trim: true,
					enum: ['raised', 'ongoing', 'closed'],
					default: 'raised',
				},
				resolutions: [
					{
						resolutionDate: Date,
						resolutionComment: String,
					},
				],
			},
		],
		acceptanceRate: {
			type: Number,
			default: 0,
		},
		avgResponseTime: {
			type: Number,
			default: 0,
		},
		cancellationRate: {
			type: Number,
			default: 0,
		},
	},
	options
);

HostUserDataSchema.methods.addBalance = function (month: string, year: number, balance: number) {
	const wallet = this.wallet.find(
		(w: { month: string; year: number; balance: number }) => w.month === month && w.year === year
	);
	if (wallet) {
		wallet.balance += balance;
	} else {
		this.wallet.unshift({
			balance,
			month,
			year,
		});
	}
	this.save();
};

HostUserDataSchema.methods.deductBalance = function (month: string, year: number, balance: number) {
	const wallet = this.wallet.find(
		(w: { month: string; year: number; balance: number }) => w.month === month && w.year === year
	);
	wallet.balance -= balance;
	this.save();
};

export default UserData.discriminator<IHostUserData>('hostData', HostUserDataSchema);
