import{PRICING_HOUR_TYPE_JOY ,PRICING_HOUR_TYPE_GALA, SERVICE_CHARGE_GUEST, GST_GUEST } from "../../utils/consts";

const guestRefund = async (booking: any, dateObject: Date) => {
  //CONSTANT FILE
  try {
    const pricingHourTypeJoy =PRICING_HOUR_TYPE_JOY
    const pricingHourTypeGala = PRICING_HOUR_TYPE_GALA
    const serviceChargeGuest = SERVICE_CHARGE_GUEST;
    //const serviceChargeHost = SERVICE_CHARGE_HOST;
    const GSTGuest = GST_GUEST;
    //const GSTHost = 0.18;

    //SERVICE FILE
    let refundAmount = 0;
    let cancellationChargeonGuest = 0;

    let bookingFrom = new Date(booking.requestData.bookingFrom) as Date;
    const timeDifferenceInMillisec:number = Math.abs(bookingFrom.getTime() - dateObject.getTime());
    const differenceInHours = (timeDifferenceInMillisec / 1000) * 60 * 60;

    // Guest cancels within 2 hours to check-in and pricingType = JOY

    if (
      differenceInHours <= 2 &&
      booking.inquiry.pricingHourType === pricingHourTypeJoy
    ) {
      refundAmount = 0;
      cancellationChargeonGuest = booking.totalPayment.totalAmount;
    }

    // Guest cancels within 5 hours to check-in and pricingType = GALA
    else if (
      differenceInHours <= 5 &&
      booking.inquiry.pricingHourType === pricingHourTypeGala
    ) {
      refundAmount = 0;
      cancellationChargeonGuest = booking.totalPayment.totalAmount;
    }
    // Guest cancels within 12 hours to check-in
    else if (differenceInHours <= 12) {
      refundAmount =
        booking.totalPayment.totalAmount - serviceChargeGuest - GSTGuest;
      const extraCharge = booking.priceBreakdown.nominalPrice * 0.1;
      refundAmount = refundAmount - extraCharge;
      cancellationChargeonGuest = serviceChargeGuest + GSTGuest + extraCharge;
    }
    // Guest cancels outside the specified time ranges
    else {
      refundAmount =
        booking.totalPayment.totalAmount - serviceChargeGuest - GSTGuest;
      cancellationChargeonGuest = serviceChargeGuest + GSTGuest;
    }

    const returnData = {
      refundAmount,
      cancellationChargeonGuest,
    };
    return returnData;
  } catch (err) {
    console.error("Error in hostRefund:", err);
    throw new Error("Server Error");
  }
};

export default guestRefund;