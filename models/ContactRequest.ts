import { model, Schema, Types } from 'mongoose';

export interface IContactRequest {
	_id: Types.ObjectId;
	name: String;
	email: String;
	message: String;
	status: String;
}

const ContactRequestSchema = new Schema<IContactRequest>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		message: { type: String },
		status: {
			type: String,
			enum: ['raised', 'processing', 'completed'],
			default: 'raised',
		},
	},
	{ timestamps: true }
);

export default model<IContactRequest>('contactrequest', ContactRequestSchema);
