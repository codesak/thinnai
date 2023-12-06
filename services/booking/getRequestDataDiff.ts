import { IBooking } from '../../models/Booking'
import { IRequestDataItem } from '../../models/BookingRequestSchema'

async function getRequestDataDiff(
  booking: IBooking,
  newRequestData: IRequestDataItem
): Promise<Partial<IRequestDataItem>> {
  const currentRequestData = booking.requestData

  const diff: Partial<IRequestDataItem> = {}

  if (newRequestData.bookingFrom !== undefined) {
    diff.bookingFrom = newRequestData.bookingFrom
  }

  if (newRequestData.bookingTo !== undefined) {
    diff.bookingTo = newRequestData.bookingTo
  }

  if (newRequestData.guestCount !== undefined) {
    diff.guestCount = +newRequestData.guestCount - currentRequestData.guestCount
  }

  if (newRequestData.servicesRequested !== undefined) {
    diff.servicesRequested = newRequestData.servicesRequested.filter(
      (service: string) =>
        !currentRequestData.servicesRequested.includes(service)
    )
  }

  if (newRequestData.addOnServicesRequested !== undefined) {
    diff.addOnServicesRequested = newRequestData.addOnServicesRequested.filter(
      (service: string) =>
        !currentRequestData.addOnServicesRequested.includes(service)
    )
  }

  if (newRequestData.cleaningCharges !== undefined) {
    diff.cleaningCharges = newRequestData.cleaningCharges.filter(
      (charge: string) => !currentRequestData.cleaningCharges.includes(charge)
    )
  }

  if (newRequestData.plateGlassCutlery === true) {
    diff.plateGlassCutlery = newRequestData.plateGlassCutlery
  }

  return diff
}
export default getRequestDataDiff

/**
 * 
 * More generic version:
 * 


async function getRequestDataDiff(
  booking: IBooking,
  newRequestData: IRequestDataItem
): Promise<Partial<IRequestDataItem>> {
  const currentRequestData = booking.requestData

  const diffFuncs: {
    [K in keyof IRequestDataItem]?: (oldVal: any, newVal: any) => any;
  } = {
    guestCount: (oldVal, newVal) => newVal - oldVal,
    servicesRequested: (oldVal, newVal) => newVal.filter(
      (service: string) => !oldVal.includes(service)
    ),
    addOnServicesRequested: (oldVal, newVal) => newVal.filter(
      (service: string) => !oldVal.includes(service)
    ),
    cleaningCharges: (oldVal, newVal) => newVal.filter(
      (charge: string) => !oldVal.includes(charge)
    )
  };

  const diff: Partial<IRequestDataItem> = {};

  for (const field in diffFuncs) {
    if (newRequestData[field] !== undefined) {
      diff[field] = diffFuncs[field](currentRequestData[field], newRequestData[field]);
    }
  }

  return diff;
}
export default getRequestDataDiff;

 */
