import { Schema, Types, model } from 'mongoose';

export interface INotification {
	_id: Types.ObjectId;
	msgType: String;
	msgTitle: String;
	msg: String;
	msgImg: String;
	redirectURL: String;
	version: Number;
}

const NotificationSchema = new Schema<INotification>({
	msgType: {
		type: String,
		required: true,
	},
	msgTitle: {
		type: String,
		trim: true,
		required: true,
	},
	msg: {
		type: String,
		trim: true,
		required: true,
	},
	msgImg: {
		type: String,
	},
	redirectURL: {
		type: String,
	},
	version: {
		type: Number,
		default: 1,
	},
});

export default model<INotification>('notification', NotificationSchema);
