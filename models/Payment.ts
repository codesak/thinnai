import { Schema, model, Types } from 'mongoose';

export interface IPAYMENT {
	user: Types.ObjectId;
	payments: [
		{
			host: Types.ObjectId;
			paymentDate: Date;
			paymentAmount: number;
			paymentMode: string;
			paymentType: string;
			paymentDescription: string;
		}
	];
}

const PaymentSchema = new Schema<IPAYMENT>({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	payments: [
		{
			host: { type: Schema.Types.ObjectId, ref: 'user', required: true },
			paymentDate: { type: Date, required: true },
			paymentAmount: { type: Number, required: true },
			paymentMode: { type: String, required: true, enum: ['Wallet', 'Bank', 'Wallet+Bank'] },
			paymentType: { type: String, required: true, enum: ['Credited', 'Debited'] },
			paymentDescription: { type: String, trim: true },
		},
	],
});

export default model<IPAYMENT>('payment', PaymentSchema);
