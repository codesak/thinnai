import {
  ADDONSERVICES_REQUESTED,
  CLEANING_CHARGES,
  SERVICE_REQUESTED,
} from '../utils/requestNames'
import { Schema, Types, model } from 'mongoose'

export interface IInquiry {
  _id: Types.ObjectId
  property: Types.ObjectId
  host: Types.ObjectId
  guest: Types.ObjectId
  guestUserData: Types.ObjectId
  createdAt: Date
  originalAmount: number
  isConfirmed:boolean
  amount: number
  guestCount: number
  bookingFrom: Date
  bookingTo: Date
  groupType: string
  servicesRequested: string[] // "Alcohol", "Hookah"
  addOnServicesRequested: string[] // "Candle Light Dinner", "Movie Screening", "Decorations"
  // paidServicesRequested: string //
  cleaningCharges: string[] //"Cake","Table Decorations", "Floor Decorations"
  plateGlassCutlery: boolean
  additionalNotes: string
  inquiryStatus: string
  paymentStatus: string
  cancelledBy: { host: boolean; guest: boolean }
  hostRescheduleRequests: { bookingFrom: Date; bookingTo: Date }[]
  statusUpdateReason: string
  statusUpdatedAt: Date
  multipleInquiriesMade: boolean
  propertyBookingType: string
  order: Types.ObjectId
  pricingHourType: string
  priceBreakdown: {
    nominalPrice: number
    cleaningPrice: number
    addOnServicePrice: number
    cutleryDiscount: number
    totalPrice: number
    serviceCharge: number
    gstAmount: number
  }
  bookingRequestData: Types.ObjectId
  bookingRequestPriceDifference: {
    nominalPrice: number
    cleaningPrice: number
    addOnServicePrice: number
    cutleryDiscount: number
    totalPrice: number
    serviceCharge: number
    gstAmount: number
  }
  changesRequested: boolean
}

const InquirySchema = new Schema<IInquiry>({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'property',
    required: true,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  guestUserData: {
    type: Schema.Types.ObjectId,
    ref: 'userData',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  originalAmount: {
    type: Number,
    required: true,
  },
  isConfirmed:{
    type:Boolean,
    default:false,
  },
  amount: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  bookingFrom: {
    type: Date,
    required: true,
  },
  bookingTo: {
    type: Date,
    required: true,
  },
  groupType: {
    type: String,
    required: true,
    trim: true,
  },
  servicesRequested: [
    {
      type: String,
      trim: true,
      enum: SERVICE_REQUESTED,
      nullable: true,
    },
  ],
  addOnServicesRequested: [
    {
      type: String,
      trim: true,
      enum: ADDONSERVICES_REQUESTED,
      nullable: true,
    },
  ],
  cleaningCharges: [
    {
      type: String,
      trim: true,
      enum: CLEANING_CHARGES,
      nullable: true,
    },
  ],
  plateGlassCutlery: {
    type: Boolean,
    required: true,
  },
  additionalNotes: {
    type: String,
    trim: true,
  },
  hostRescheduleRequests: [
    {
      bookingFrom: {
        type: Date,
        required: true,
      },
      bookingTo: {
        type: Date,
        required: true,
      },
    },
  ],
  inquiryStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['unpaid', 'pending', 'paid', 'cancelled'],
    default: 'unpaid',
  },
  cancelledBy: {
    host: {
      type: Boolean,
    },
    guest: {
      type: Boolean,
    },
  },
  statusUpdateReason: {
    type: String,
    trim: true,
  },
  statusUpdatedAt: {
    type: Date,
  },
  multipleInquiriesMade: {
    type: Boolean,
    default: false,
  },
  propertyBookingType: {
    type: String,
    required: true,
    trim: true,
    enum: ['instant', 'request'],
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'order',
  },
  pricingHourType: {
    type: String,
    required: true,
    trim: true,
    enum: ['joy', 'gala'],
    default: 'gala',
  },
  priceBreakdown: {
    nominalPrice: {
      type: Number,
      required: true,
    },
    cleaningPrice: {
      type: Number,
      required: true,
    },
    addOnServicePrice: {
      type: Number,
      required: true,
    },
    cutleryDiscount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    serviceCharge: {
      type: Number,
      required: true,
    },
    gstAmount: {
      type: Number,
      required: true,
    },
  },
  bookingRequestData: {
    type: Schema.Types.ObjectId,
    ref: 'bookingRequest',
  },
  bookingRequestPriceDifference: {
    nominalPrice: Number,
    cleaningPrice: Number,
    addOnServicePrice: Number,
    cutleryDiscount: Number,
    totalPrice: Number,
    serviceCharge: Number,
    gstAmount: Number,
  },
  changesRequested: Boolean,
})

InquirySchema.path('hostRescheduleRequests').validate(
  (value: Array<{ bookingFrom: Date; bookingTo: Date }>) => {
    if (value.length > 3) {
      throw new Error('There can only be 3 reschedules')
    }
  }
)

export default model<IInquiry>('inquiry', InquirySchema)
