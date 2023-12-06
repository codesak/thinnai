const calAmount=async(bookingsArray:any)=>{
    let weekEarnings = 0;

    let weekHostedHours = 0;

    let weekDeductions = 0;
    let cancellationCharge = 0;
    let approximateLocationUrl;

    //const booking =await Booking.find({}).lean() as IBooking

    bookingsArray.map((booking:any)=>{

        weekDeductions=booking?.cancellationCharge
        let guestPaidWithoutServiceCharge=0
        let hostBookingEarning=0
        if (
            booking?.bookingStatus==="confirmed"
          ) {
            //weekEarnings=booking?.totalPayment?.totalAmount
            guestPaidWithoutServiceCharge = booking?.totalPayment?.totalAmount - booking?.inquiry?.priceBreakdown?.serviceCharge - booking?.inquiry?.priceBreakdown?.gstAmount
            hostBookingEarning = guestPaidWithoutServiceCharge - (guestPaidWithoutServiceCharge*0.095) - (guestPaidWithoutServiceCharge*0.095* 0.18)
            weekEarnings+=hostBookingEarning
            weekHostedHours+= Math.abs(booking.bookingTo?.getTime() - booking.bookingFrom?.getTime()) / (1000 * 60 * 60);
            }
         
        else if (
            booking?.bookingStatus==="cancelled"
            &&
            booking?.cancelledBy?.host===false
          ) {
            cancellationCharge+=weekDeductions
          }
          
    })

    let returnData={}

    if(bookingsArray?.today){
        const hostPayout =weekEarnings-weekDeductions
        
        returnData={
            weekEarnings:weekEarnings,
            weekHostedHours:weekHostedHours,
            weekDeductions:weekDeductions,
            cancellationCharge:cancellationCharge,
            hostPayout:hostPayout
        }
    }else {
        const hostPayout =weekEarnings-weekDeductions

        returnData={
            weekEarnings:weekEarnings,
            weekHostedHours:weekHostedHours,
            weekDeductions:weekDeductions,
            cancellationCharge:cancellationCharge,
            hostPayout:hostPayout,
            approxLocationURL:approximateLocationUrl
        }
    }
      return returnData

}

export default calAmount