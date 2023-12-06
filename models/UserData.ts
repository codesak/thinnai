import { Schema, Types, model } from 'mongoose';

let options = {
	discriminatorKey: 'userType',
	toObject: {
		virtuals: true,
	},
	toJSON: {
		virtuals: true,
	},
};

export interface IUserData {
	_id: Types.ObjectId;
	user: Types.ObjectId | any;
	profession: string;
	gender: string;
	dateOfBirth: Date;
	idProofFront: string;
	idProofBack: string;
	idProofType: string;
	idUploadDate: Date;
	idProofNumber: string;
	bookingsInvitedTo: Types.ObjectId[];
	fcmToken: string;
	notifications: {
		typeId: Types.ObjectId;
		timeStamp: Date;
		status: string;
	}[];
	testimonial: {
		type: string;
		bookingId: Types.ObjectId;
		text: string;
	}[];
}

const UserDataSchema = new Schema<IUserData>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		profession: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			enum: ['Male', 'Female', 'Transgender'],
			trim: true,
		},
		dateOfBirth: {
			type: Date,
			validate: {
				validator: (d: Date) => d?.getFullYear() > 1900,
				message: '{VALUE} is not a valid birth date',
			},
		},
		idProofFront: {
			type: String,
			trim: true,
		},
		idProofBack: {
			type: String,
			trim: true,
		},
		idProofType: {
			type: String,
			trim: true,
		},
		idProofNumber: {
			type: String,
			trim: true,
		},
		idUploadDate: {
			type: Date,
		},
		bookingsInvitedTo: [
			{
				type: Schema.Types.ObjectId,
				ref: 'booking',
			},
		],
		fcmToken: {
			type: String,
			trim: true,
		},
		notifications: [
			{
				typeId: {
					type: Schema.Types.ObjectId,
					ref: 'notification',
				},
				timeStamp: {
					type: Date,
					default: Date.now,
				},
				status: {
					type: String,
					enum: ['sent', 'pending'],
					default: 'pending',
				},
			},
		],
		testimonial: [
			{
				type: {
					type: String,
					enum: ['host', 'guest'],
				},
				bookingId: {
					type: Schema.Types.ObjectId,
					ref: 'booking',
				},
				text: {
					type: String,
					trim: true,
				},
			},
		],
	},
	options
);

UserDataSchema.virtual('age').get(function (this: { dateOfBirth: Date }) {
	const today = new Date();
	const dateOfBirth = new Date(this.dateOfBirth);
	let age = today.getFullYear() - dateOfBirth.getFullYear();
	const month = today.getMonth() - dateOfBirth.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
		age--;
	}
	return age;
});

export default model<IUserData>('userData', UserDataSchema);
