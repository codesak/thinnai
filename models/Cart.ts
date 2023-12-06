import { Schema, model, Types } from 'mongoose'

export interface ICart {
  _id: Types.ObjectId
  guest: Types.ObjectId
  enquiries: Types.ObjectId[]
  amount: number
  bookingType: string
}

const CartSchema = new Schema<ICart>(
  {
    guest: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    enquiries: [
      { type: Schema.Types.ObjectId, ref: 'inquiry', required: true, max: 3 },
    ],
    amount: { type: Number, nullable: true },
    bookingType: { type: String, required: true, enum: ['instant', 'request'] },
  },
  { timestamps: true }
)

// add constraint to ensure that there is only one cart per guest
// CartSchema.index({ guest: 1 }, { unique: true })

export default model<ICart>('cart', CartSchema)
