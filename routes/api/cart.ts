import checkAccess from "../../middleware/checkAccess";
import userAuth from "../../middleware/userAuth";
import Cart from "../../models/Cart";
import Inquiry from "../../models/Inquiry";
import { ErrorCode, errorWrapper } from "../../utils/consts";
import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { Types } from "mongoose";

const router = Router();

router.get(
  "/getCart",
  userAuth,
  checkAccess("guest"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json({ errors: errors.array() });
    }

    //**********************************Handler Code**********************************/

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
      const guest = new Types.ObjectId(req.userData.id);
      //return cart with enquiries and property details populated

      const cart = await Cart.findOne({ guest })
        .populate({
          path: "enquiries",
          populate: {
            path: "property",
            model: "property",
            populate:{
              path: 'userData',
              select: 'aboutYourself guestsHosted ratings user',
              populate: {
                path: 'user',
                select: 'firstName lastName profileImage avatar',
              },
            },
            select: {
              _id: 1,
              propertyName: 1,
              propertyPictures: 1,
              city: 1,
              state: 1,
              pricing: 1,
              addOnServices: 1,
              approximateLocationUrl: 1,
              amenities: 1,
              preferredGuests: 1,
              area:1,
              activities: 1,
              parkingType: 1,
              services: 1,
              alcoholAllowedFor: 1,
              maxGuestCount:1,
              houseRules:1,
              faqs:1
              
            },
          },
          select: {
            cleaningCharges: 1,
            servicesRequested: 1,
            addOnServicesRequested: 1,
            plateGlassCutlery: 1,
            guestCount: 1,
            bookingFrom: 1,
            bookingTo: 1,
            pricingHourType: 1,
            priceBreakdown: 1,
            groupType:1
          },
        })
        .exec();

      // const cart = await Cart.findOne({ guest }).populate('enquiries').exec()
      if (!cart) {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json({ msg: "Cart not found" });
      }

      return res.json(cart);
    } catch (err: any) {
      console.error(err.message);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);
// POSt /api/cart/addToCart
router.post(
  "/addToCart",
  userAuth,
  checkAccess("guest"),
  //**********************************Validations**********************************/
  [
    check("enquiries", "Need at least one inquiry")
      .not()
      .isEmpty()
      .isArray()
      // .isLength({ min: 1, max: 3 })
      .withMessage("Need at least one inquiry and no more than three"),
    check("bookingType", "Booking type is required")
      .not()
      .isEmpty()
      .isString()
      .isIn(["instant", "request"])
      .withMessage("Booking type is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json({ errors: errors.array() });
    }

    //**********************************Handler Code**********************************/

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

      const { bookingType, enquiries } = req.body;
      console.log("🚀 ~ file: cart.ts:92 ~ enquiries:", enquiries);
      console.log("🚀 ~ file: cart.ts:92 ~ bookingType:", bookingType);

      if (bookingType === "instant") {
        const guest = new Types.ObjectId(req.userData.id);
        const cart = await Cart.findOne({ guest });

        if (cart) {
          await cart.remove();
        }
        const enquiriesData = enquiries.map(
          (e: string) => new Types.ObjectId(e)
        );

        const totalAmount = 0; // TODO: call pricing service to get total amount
        const newCart = new Cart({
          guest,
          enquiries: enquiriesData,
          amount: totalAmount,
          bookingType,
        });
        await newCart.save();
        await newCart.populate({
          path: "enquiries",
          populate: {
            path: "property",
            model: "property",
            select: {
              _id: 1,
              propertyName: 1,
              propertyPictures: 1,
              city: 1,
              state: 1,
              pricing: 1,
            },
          },
          select: {
            cleaningCharges: 1,
            servicesRequested: 1,
            addOnServicesRequested: 1,
            plateGlassCutlery: 1,
            guestCount: 1,
            bookingFrom: 1,
            bookingTo: 1,
            pricingHourType: 1,
            priceBreakdown: 1,
          },
        });

        const cartResponse = newCart; // TODO: populate enquiries
        return res.json(cartResponse);
      } else {
        const guest = new Types.ObjectId(req.userData.id);
        // if cart doesn't exist, create one else update it
        const totalAmount = 0; // TODO: call pricing service to get total amount
        const cart = await Cart.findOne({
          guest,
        }).exec();

        if (!cart || (cart && cart.bookingType === "instant")) {
          if (cart) {
            await cart.remove();
          }
          const newCart = new Cart({
            guest,
            enquiries,
            amount: totalAmount,
            bookingType: "request",
          });
          await newCart.save();
          await newCart.populate({
            path: "enquiries",
            populate: {
              path: "property",
              model: "property",
              select: {
                _id: 1,
                propertyName: 1,
                propertyPictures: 1,
                city: 1,
                state: 1,
                pricing: 1,
              },
            },
            select: {
              cleaningCharges: 1,
              servicesRequested: 1,
              addOnServicesRequested: 1,
              plateGlassCutlery: 1,
              guestCount: 1,
              bookingFrom: 1,
              bookingTo: 1,
              pricingHourType: 1,
              priceBreakdown: 1,
            },
          });

          const cartResponse = newCart; // TODO: populate enquiries
          return res.json(cartResponse);
        } else {
          // if cart doesn't exist, create one else update it

          // check if the enquiries from req.body already exists in the cart.enquiries
          const cartEnquiries = cart.enquiries.map((e) => e.toString());
          const existingEnquiries = cartEnquiries.filter((enquiry) => {
            return enquiries.some((e: any) => e === enquiry);
          });
          if (existingEnquiries.length > 0) {
            return res
              .status(ErrorCode.HTTP_BAD_REQ)
              .json(errorWrapper(`Enquiry already exists in cart`));
          }

          // if total enquiries are less than 3 the push the new enquiries else throw error
          if (cart.enquiries.length < 3) {
            cart.enquiries.push(...enquiries);
            await cart.save();
            await cart.populate({
              path: "enquiries",
              populate: {
                path: "property",
                model: "property",
                select: {
                  _id: 1,
                  propertyName: 1,
                  propertyPictures: 1,
                  city: 1,
                  state: 1,
                  pricing: 1,
                },
              },
              select: {
                cleaningCharges: 1,
                servicesRequested: 1,
                addOnServicesRequested: 1,
                plateGlassCutlery: 1,
                guestCount: 1,
                bookingFrom: 1,
                bookingTo: 1,
                pricingHourType: 1,
                priceBreakdown: 1,
              },
            });

            const cartResponse = cart; // TODO: populate enquiries
            return res.json(cartResponse);
          } else {
            return res
              .status(ErrorCode.HTTP_BAD_REQ)
              .json(errorWrapper("Maximum 3 enquiries allowed"));
          }
        }
      }
    } catch (err: any) {
      // Delete enquiries passed in the request body
      try {
        const { enquiries } = req.body;
        if (!enquiries) throw new Error("No enquiries in request body");
        await Inquiry.deleteMany({ _id: { $in: enquiries } });
        console.log("AddToCart Error: Deleted enquiries from request body");
      } catch (deleteErr) {
        console.error(
          "AddToCart Error: Failed to delete enquiries from request body",
          deleteErr
        );
      }
      console.error(err.message);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);

router.delete(
  "/",
  userAuth,
  checkAccess("guest"),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/

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

      const guest = new Types.ObjectId(req.userData.id);
      const cart = await Cart.findOne({ guest });
      if (!cart) {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json({ msg: "Cart not found" });
      }

      await cart.remove();
      return res.json({ msg: "Cart deleted" });
    } catch (err: any) {
      console.error(err.message);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);

router.delete(
  "/removeEnquiry/:enquiryId",
  userAuth,
  checkAccess("guest"),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/

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

      const { enquiryId } = req.params;
      const guest = new Types.ObjectId(req.userData.id);

      // remove enquiry from cart
      const updatedCart = await Cart.findOneAndUpdate(
        { guest },
        { $pull: { enquiries: enquiryId } },
        { new: true }
      );

      if (!updatedCart) {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json({ msg: "Cart not found" });
      }

      return res.json(updatedCart);
    } catch (err: any) {
      console.error("Error in '/removeEnquiry/:enquiryId':", err.message);
      res
        .status(ErrorCode.HTTP_SERVER_ERROR)
        .json(errorWrapper("Server Error"));
    }
  }
);

export default router;
