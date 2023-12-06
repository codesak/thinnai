import {
  ADDONSERVICES_REQUESTED,
  CLEANING_CHARGES,
  SERVICE_REQUESTED,
} from '../utils/requestNames'
import { Schema, Types, model } from 'mongoose'

export interface IBooking {
  _id: Types.ObjectId
  property: Types.ObjectId
  host: any
  guest: any
  guestIdStatus: string
  invitedGuests: {
    guest: Types.ObjectId
    idProofStatus: string
  }[]
  inquiry: Types.ObjectId

  bookingStatus: string
  bookingConfirmedAt: Date
  cancelledBy: { host: Boolean; guest: Boolean }
  cancellationReason: string
  bookingCancellationDate: Date
  cancellationCharge: number
  refundStatus: string
  refundAmount: number
  reschedule: {
    bookingDate: Date
    bookingFrom: Date
    bookingTo: Date
    requestedBy: string
  }[]
  rescheduledByGuest: boolean
  rescheduleRequestedOn: Date
  rescheduleAcceptedOn: Date
  checkOut: { extend: boolean; checkOutAt: Date }
  checkIn: { extend: boolean; checkInAt: Date }
  messageFromHost: string
  reviews: {
    hostReview: Types.ObjectId
    guestReview: Types.ObjectId
    propertyReview: Types.ObjectId
  }
  requestData: {
    bookingFrom: Date
    bookingTo: Date
    guestCount: number
    servicesRequested: string[]
    addOnServicesRequested: string[]
    cleaningCharges: string[]
    plateGlassCutlery: boolean
  }
  priceBreakdown: {
    nominalPrice: number
    cleaningPrice: number
    addOnServicePrice: number
    cutleryDiscount: number
    totalPrice: number
    serviceCharge: number
    gstAmount: number
  }
  changesRequested: boolean
  changeData: Types.ObjectId[]
  order: Types.ObjectId
  changeOrders: Types.ObjectId[]
  totalPayment: {
    totalAmount: number // THis is including service charges and GST
  }
  paymentRetries: Types.ObjectId[]
}

const BookingSchema = new Schema<IBooking>({
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
  guestIdStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ['verificationRequested', 'verified', 'reuploadRequested'],
    default: 'verificationRequested',
  },
  priceBreakdown: {
    nominalPrice: {
      type: Number,
    },
    cleaningPrice: {
      type: Number,
    },
    addOnServicePrice: {
      type: Number,
    },
    cutleryDiscount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    serviceCharge: {
      type: Number,
    },
    gstAmount: {
      type: Number,
    },
  },
  invitedGuests: [
    {
      guest: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required: true,
      },
      idProofStatus: {
        type: String,
        required: true,
        trim: true,
        enum: [
          'pending',
          'verificationRequested',
          'verified',
          'reuploadRequested',
        ],
        default: 'pending',
      },
    },
  ],
  inquiry: {
    type: Schema.Types.ObjectId,
    ref: 'inquiry',
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'pending',
      'confirmed',
      'completed',
      'cancelled',
      'checkedin',
      'rescheduleRequested',
    ],
    default: 'pending',
  },
  bookingConfirmedAt: {
    type: Date,
    required: true,
  },
  cancelledBy: {
    host: {
      type: Boolean,
    },
    guest: {
      type: Boolean,
    },
  },
  cancellationReason: {
    type: String,
    trim: true,
  },
  cancellationCharge: {
    type: Number,
  },
  bookingCancellationDate: {
    type: Date,
  },
  refundStatus: {
    type: String,
    trim: true,
    enum: ['pending', 'refunded'],
  },
  refundAmount: {
    type: Number,
  },
  reschedule: [
    //Array because both the guest and host can send requests!
    {
      bookingDate: {
        type: Date,
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
      requestedBy: {
        type: String,
        required: true,
        enum: ['host', 'guest'],
      },
    },
  ],
  rescheduledByGuest: {
    type: Boolean,
  },
  rescheduleRequestedOn: {
    type: Date,
  },
  rescheduleAcceptedOn: {
    type: Date,
  },
  checkIn: {
    extend: {
      type: Boolean,
    },
    checkInAt: {
      type: Date,
    },
  },
  checkOut: {
    extend: {
      type: Boolean,
    },
    checkOutAt: {
      type: Date,
    },
  },
  messageFromHost: {
    type: String,
  },
  reviews: {
    hostReview: {
      type: Schema.Types.ObjectId,
    },
    guestReview: {
      type: Schema.Types.ObjectId,
    },
    propertyReview: {
      type: Schema.Types.ObjectId,
    },
  },
  requestData: {
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
  },

  changesRequested: {
    type: Boolean,
    default: false,
  },
  changeData: [
    {
      type: Schema.Types.ObjectId,
      ref: 'bookingRequest',
    },
  ],
  order: {
    type: Schema.Types.ObjectId,
    ref: 'order',
  },
  changeOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order',
    },
  ],
  totalPayment: {
    totalAmount: Number,
  },
  paymentRetries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order',
    },
  ],
})

BookingSchema.path('reschedule').validate(
  (value: Array<{ bookingFrom: Date; bookingTo: Date }>) => {
    if (value.length > 3) {
      throw new Error('There can only be 3 reschedules')
    }
  }
)

export default model<IBooking>('booking', BookingSchema)
