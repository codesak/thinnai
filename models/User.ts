import { Schema, Types, model } from 'mongoose';

let options = {
	toObject: {
		virtuals: true,
	},
	toJSON: {
		virtuals: true,
	},
};

export interface IUser {
	_id: Types.ObjectId;
	email: string;
	password: string;
	phone: string;
	altPhone: string;
	firstName: string;
	lastName: string;
	avatar: string;
	profileImage: string;
	OTP: string | undefined;
	verificationToken: string;
	verificationValid: Date | undefined;
	emailVerified: Boolean;
	registered: boolean;
	registeredOn: Date;
	userType: string;
}

const UserSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			sparse: true,
			trim: true,
		},
		password: {
			type: String,
			trim: true,
			minlength: 6,
		},
		phone: {
			type: String,
		},
		altPhone: {
			type: String,
			sparse: true,
		},
		firstName: {
			type: String,
			trim: true,
			minlength: 2,
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 2,
		},
		avatar: {
			type: String,
		},
		profileImage: {
			type: String,
			trim: true,
		},
		OTP: {
			type: String,
			trim: true,
		},
		verificationToken: {
			type: String,
		},
		verificationValid: {
			type: Date,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		registered: {
			type: Boolean,
			default: false,
		},
		userType: {
			type: String,
			enum: ['admin', 'host', 'guest'],
		},
	},
	options
);

// pair of email and userType should be unique
//UserSchema.index({ email: 1, userType: 1 }, { unique: true });
// pair of phone and userType should be unique
//UserSchema.index({ phone: 1, userType: 1 }, { unique: true });

UserSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`;
});

export default model<IUser>('user', UserSchema);
