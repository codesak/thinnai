import {
  ADDONSERVICES_REQUESTED,
  CLEANING_CHARGES,
  SERVICE_REQUESTED,
} from '../utils/requestNames'
import { Schema, Types } from 'mongoose'

export interface IRequestData {
  bookingFrom: Date
  bookingTo: Date
  guestCount: number
  servicesRequested: string[]
  addOnServicesRequested: string[]
  cleaningCharges: string[]
  plateGlassCutlery: boolean
}
export interface IRequestDataItem extends IRequestData {
  _id: Types.ObjectId
  bookingId: Types.ObjectId
  inquiryId: Types.ObjectId
  orderId: Types.ObjectId
}

export const BookingRequestSchema = new Schema<IRequestDataItem>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  inquiryId: {
    type: Schema.Types.ObjectId,
    ref: 'inquiry',
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'order',
  },
  bookingFrom: {
    type: Date,
  },
  bookingTo: {
    type: Date,
  },
  guestCount: {
    type: Number,
  },
  servicesRequested: [
    {
      type: String,
      trim: true,
      enum: SERVICE_REQUESTED,
    },
  ],
  addOnServicesRequested: [
    {
      type: String,
      trim: true,
      enum: ADDONSERVICES_REQUESTED,
    },
  ],
  cleaningCharges: [
    {
      type: String,
      trim: true,
      enum: CLEANING_CHARGES,
    },
  ],
  plateGlassCutlery: {
    type: Boolean,
    required: true,
  },
})
