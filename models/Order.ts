// Booking order with id, guest and enquiries
import { Schema, model, Types } from 'mongoose'

export interface IORDER {
  _id: Types.ObjectId
  uniqueId: string
  guest: Types.ObjectId
  enquiries: Types.ObjectId[]
  bookingId: Types.ObjectId
  amount: number
  paymentStatus: string
  trackingId: string
  ccAvenueResponse?: {
    orderStatus: String
    paymentMode: String
    statusCode: String
    statusMessage: String
    responseCode: String
    transactionDate: String
    amountPaid: String
  }
  bookingRequestData: Types.ObjectId
  paymentBreakdown: {
    nominalPrice: number
    cleaningPrice: number
    addOnServicePrice: number
    cutleryDiscount: number
    totalPrice: number
    serviceCharge: number
    gstAmount: number
  }
}

const OrderSchema = new Schema<IORDER>(
  {
    uniqueId: { type: String, required: true, unique: true },
    guest: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    enquiries: [
      { type: Schema.Types.ObjectId, ref: 'inquiry', required: true },
    ],
    bookingId: { type: Schema.Types.ObjectId, ref: 'booking' },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
    },
    trackingId: { type: String, trim: true, nullable: true },
    ccAvenueResponse: {
      orderStatus: { type: String },
      paymentMode: { type: String },
      statusCode: { type: String },
      statusMessage: { type: String },
      responseCode: { type: String },
      transactionDate: { type: String },
      amountPaid: { type: String },
    },
    bookingRequestData: {
      type: Schema.Types.ObjectId,
      ref: 'bookingRequest',
    },
    paymentBreakdown: {
      nominalPrice: Number,
      cleaningPrice: Number,
      addOnServicePrice: Number,
      cutleryDiscount: Number,
      totalPrice: Number,
      serviceCharge: Number,
      gstAmount: Number,
    },
  },
  { timestamps: true }
)

export default model<IORDER>('order', OrderSchema)
