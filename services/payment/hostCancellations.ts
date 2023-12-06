const hostRefund = async (booking: any, dateObject: Date) => {
    try {
      let bookingFrom = new Date(booking.requestData.bookingFrom) as Date;
      const timeDifferenceInMillisec:number = Math.abs(bookingFrom.getTime() - dateObject.getTime());
      const differenceInHours = (timeDifferenceInMillisec / 1000) * 60 * 60;
  
      let refundAmount = 0;
      let cancellationChargeHost = 0;
  
      if (differenceInHours > 12) {
        cancellationChargeHost = 0;
        refundAmount = booking.totalPayment.totalAmount;
      } else {
        cancellationChargeHost = 0.1121 * booking.priceBreakdown.nominalPrice;
        refundAmount = booking.totalPayment.totalAmount;
      }
      const returnData = {
        refundAmount,
        cancellationChargeHost,
      };
      return returnData;
    } catch (err) {
      console.error("Error in hostRefund:", err);
      throw new Error("Server Error");
    }
  };
  
  export default hostRefund;