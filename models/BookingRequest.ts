import { BookingRequestSchema, IRequestDataItem } from './BookingRequestSchema'
import { model } from 'mongoose'

export default model<IRequestDataItem>('bookingRequest', BookingRequestSchema)
