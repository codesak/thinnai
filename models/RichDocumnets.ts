import { Schema, Types, model } from 'mongoose';

export interface IRichDocuments {
	_id: Types.ObjectId;
	id: String;
	title: String;
	content: String;
}

const RichDocumentSchema = new Schema<IRichDocuments>({
	id: { type: String },
	title: {
		type: String,
	},
	content: {
		type: Object,
	},
});

export default model<IRichDocuments>('richdoc', RichDocumentSchema);
