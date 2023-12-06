import BookingRequest from '../../models/BookingRequest'
import { IRequestDataItem } from '../../models/BookingRequestSchema'

// given the changeRequestData with type Partial<IRequestDataItem> create a BookingRequest document in mongoose.js
const createBookingRequest = async (
  changeRequestData: Partial<IRequestDataItem>
) => {
  if (!changeRequestData.inquiryId) {
    throw new Error('inquiryId is required')
  }
  return await BookingRequest.create(changeRequestData)
}

export default createBookingRequest
