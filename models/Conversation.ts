import { Schema, Types, model } from 'mongoose';

export interface IConversation {
	_id: Types.ObjectId;
	participants: [Types.ObjectId];
	guestUser: Types.ObjectId;
	messages: {
		sentTo: Types.ObjectId;
		sentBy: Types.ObjectId;
		msgType: string;
		message: string;
		sentAt: Date;
		messageStatus: string;
	}[];
}

const ConversationSchema = new Schema<IConversation>({
	participants: {
		type: [Types.ObjectId],
		ref: 'user',
	},
	messages: [
		{
			sentTo: {
				type: Schema.Types.ObjectId,
				ref: 'user',
				required: true,
			},
			sentBy: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			msgType: {
				type: String,
				trim: true,
			},
			message: {
				type: String,
				trim: true,
				required: true,
			},
			sentAt: {
				type: Date,
				required: true,
			},
			messageStatus: {
				type: String,
				enum: ['pending', 'sent', 'read'],
				required: true,
			},
		},
	],
});

export default model<IConversation>('conversation', ConversationSchema);
