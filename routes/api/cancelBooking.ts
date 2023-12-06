import checkAccess from "../../middleware/checkAccess";
import userAuth from "../../middleware/userAuth";
import Booking from "../../models/Booking";
// import Inquiry from "../../models/Inquiry";
// import Order from "../../models/Order";
// import ccavenue from "../../services/payment/ccAvenue";
import GuestCancellation from "../../services/payment/guestCancellations";
import HostCancellation from "../../services/payment/hostCancellations";
import { ErrorCode, errorWrapper } from "../../utils/consts";
// import axios from "axios";
// import { randomUUID } from "crypto";
// import { scheduleBookingCompletionCron } from '../../utils/scheduleBookingCompletionCron'
//import { createNotification } from '../../utils/notification'
import { Router } from "express";
//import refund from "services/payment/refund";

require("dotenv").config();

const config = require("config");
const redirectURL = config.get("redirectURL");
const cancelURL = config.get("cancelURL");
const frontendRedirectURL = config.get("frontendRedirectURL");
const repaymentRedirectURL = config.get("repaymentRedirectURL");

//Put in the 32-Bit key shared by CCAvenues.
const CCAVENUE_API_ACCESS_CODE = process.env.CCAVENUE_API_ACCESS_CODE;
const CCAVENUE_MERCHANT_ID = process.env.CCAVENUE_MERCHANT_ID;
// const CCAVENUE_API_WORKING_KEY = process.env.CCAVENUE_API_WORKING_KEY;
// const CCAVENUE_API_URL =
//   process.env.CCAVENUE_API_URL ?? `https://apitest.ccavenue.com`;
export const CCAVENUE_REQUEST_URL = `${process.env.CCAVENUE_REQUEST_BASE_URL}/transaction/transaction.do?command=initiateTransaction&merchant_id=${CCAVENUE_MERCHANT_ID}&encRequest=:encRequest&access_code=${CCAVENUE_API_ACCESS_CODE}`;
export const CCAVENUE_REDIRECT_URL = redirectURL;
export const CCAVENUE_REPAYMENT_REDIRECT_URL =
  process.env.CCAVENUE_REPAYMENT_REDIRECT_URL ?? repaymentRedirectURL;
export const CCAVENUE_CANCEL_URL = cancelURL;

export const CCAVENUE_FRONTEND_REDIRECT_URL = frontendRedirectURL;

const router = Router();

router.post(
  "/byguest/:bookingId",
  userAuth,
  checkAccess("guest"),
  async (req, res) => {
    try {
      const { bookingId } = req.params;
      const {cancellationReason}=req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper("Invalid Token"));
      }

      const booking = await Booking.findOne({ _id: bookingId });

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper("Booking Not Found"));
      }
      let now = new Date();
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const returnData = GuestCancellation(booking, utcNow);

      const updatedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            bookingStatus: "cancelled",
            bookingCancellationDate: utcNow,
            cancelledBy: {
              guest: true,
            },
            refundAmount: (await returnData).refundAmount,
            cancellationCharge: (await returnData).cancellationChargeonGuest,
            cancellationReason:cancellationReason
          },
        },
        { new: true }
      );
      return res.json({
        message: "Booking has been cancelled by Guest.",
        updatedBooking: updatedBooking,
      });
    } catch (err) {
      console.error("Error in cancelBooking:", err);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);


router.post(
  "/byhost/:bookingId",
  userAuth,
  checkAccess("host"),

  async (req, res) => {
    try {
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper("Invalid Token"));
      }

      const { bookingId } = req.params;
      const { cancellationReason }=req.body


      const booking = await Booking.findOne({ _id: bookingId });

      if (!booking) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper("Booking Not Found"));
      }
  

      let timenow = new Date();
      const utcNow = new Date(timenow.getTime() + timenow.getTimezoneOffset() * 60000);
      const returnDataHost = HostCancellation(booking, utcNow);

      // const inquiry = await Inquiry.findOne({ _id: booking.inquiry._id });
      // if (!inquiry) {
      //   return res
      //     .status(ErrorCode.HTTP_BAD_REQ)
      //     .json(errorWrapper("Inquiry Not Found"));
      // }

      const updatedBooking = await Booking.findOneAndUpdate(
        { _id: bookingId },
        {
          $set: {
            bookingStatus: "cancelled",
            bookingCancellationDate: utcNow,
            cancelledBy: {
              host: true,
            },
            refundAmount: (await returnDataHost).refundAmount,
            cancellationCharge: (await returnDataHost).cancellationChargeHost,
            cancellationReason:cancellationReason
          },
        },
        { new: true }
      );
      return res.json({
        message: "Booking has been cancelled by host.",
        updatedBooking: updatedBooking,
      });
  

      // const deductionAmount =
      //   (booking.totalPayment.totalAmount * cancellationPercentage) / 100;

      // const totalAmount = inquiry.amount - deductionAmount;

      // check if booking is already refunded
      // if (booking.refundStatus === "refunded") {
      //   throw new Error("Booking is already refunded");
      // }

      // const refundAmount = totalAmount;

      // const orderAmount = inquiry.amount;
      // check if refund amount is less than or equal to booking amount
      // if (refundAmount > orderAmount) {
      //   throw new Error("Refund amount cannot be greater than booking amount");
      // }

      // check if booking is already refunded
      // if (booking.refundStatus === "refunded") {
      //   throw new Error("Booking is already refunded");
      // }

      // const refundDto = {
      //   reference_no: order.trackingId,
      //   refund_amount: "100",
      //   refund_ref_no: `${randomUUID().replace(/-/gi, "")}`,
      // };
      // console.log("🚀 ~ file: cancelBooking.ts:211 ~ refundDto:", refundDto);

      // const genericParams = {
      //   access_code: CCAVENUE_API_ACCESS_CODE ?? "",
      //   workingKey: CCAVENUE_API_WORKING_KEY ?? "",
      //   command: "refundOrder",
      //   request_type: "JSON",
      //   response_type: "JSON",
      //   version: "1.1",
      //   dataToBeEnCrypted: refundDto,
      // };
      // console.log(
      //   "🚀 ~ file: cancelBooking.ts:222 ~ genericParams:",
      //   genericParams
      // );
      // const encRequest = ccavenue.Configure.getEncryptedParams(genericParams);
      // console.log("🚀 ~ file: cancelBooking.ts:224 ~ encRequest:", encRequest);

      // call ccavenue refund api
      //const refund = await axios.post<string>(
      //   `${CCAVENUE_API_URL}/apis/servlet/DoWebTrans?${encRequest}`,
      //   {},
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   }
      // );
      // console.log("🚀 ~ file: ccAvenuePayment.ts:331 ~ refund:", refund);

      // const result = refund.data;
      // const information = result.split("&");
      // const status1 = information[0].split("=");
      // const status2 = information[1].split("=");
      // let status3: any = [];
      // if (information[2]) {
      //   status3 = information[2].split("=");
      // }
      // const encResposneData = status2[1].slice(0, -2);
      // if (status1[1] === "1") {
      //   const recorddata = status2[1];
      //   const error = `${recorddata} Error Code:${status3[1]}`;
      //   console.log("🚀 ~ file: ccAvenuePayment.ts:343 ~ error:", error);
      //   throw new Error(error);
      // } else {
      //   const response = ccavenue.Configure.decryptAndConvertToJSON(
      //     encResposneData,
      //     genericParams.workingKey
      //   );
      //   console.log(
      //     "🚀 ~ file: cancelBooking.ts:257 ~ decrypted whole response:",
      //     response
      //   );
      //   const data = ccavenue.Configure.decryption(
      //     status2[1],
      //     genericParams.workingKey
      //   );
      //   console.log(
      //     "🚀 ~ file: ccAvenuePayment.ts:353 ~ decrypted data:",
      //     data
      //   );
      // }

      // update refund status of Booking
      // booking.refundStatus = "refunded";
      // booking.bookingStatus = "cancelled";
      // booking.refundAmount = +totalAmount;
      // await booking.save();

      // update payment status of Order

      // order.paymentStatus = "refunded";
      // await order.save();

      // return res.json({ message: "Refund Success" });
    } catch (err) {
      console.error("=============> Error in cancelBooking:", err);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);

export default router;
