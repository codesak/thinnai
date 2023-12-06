import { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IReport {
	category: string;
	userId: Types.ObjectId;
	againstUserId: Types.ObjectId;
	description: string;
	priority: string;
	bookingId: Types.ObjectId;
	images: string[];
	reportedOn: Date;
	status: string;
	action: string;
	contact: {
		email: string;
		phone: string;
	};
}

const ReportSchema = new Schema<IReport>({
	category: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	againstUserId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true,
	},
	bookingId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	images: {
		type: [String],
	},
	reportedOn: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		required: true,
	},
	action: {
		type: String,
		required: true,
	},
	contact: {
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
	},
});

export default model<IReport>('report', ReportSchema);
