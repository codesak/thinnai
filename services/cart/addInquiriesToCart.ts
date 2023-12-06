import Cart from '../../models/Cart'
import { Types } from 'mongoose'

const addInquiriesToCart = async (
  bookingType: string,
  enquiries: string[] | Types.ObjectId[],
  userId: Types.ObjectId
) => {
  // check if each item in enquiries is of type Types.ObjectId if not then convert it
  const enquiriesData = enquiries.map((e: string | Types.ObjectId) =>
    typeof e === 'string' ? new Types.ObjectId(e) : e
  )

  if (bookingType === 'instant') {
    const guest = new Types.ObjectId(userId)
    const cart = await Cart.findOne({ guest })

    if (cart) {
      await cart.remove()
    }

    const totalAmount = 0 // TODO: call pricing service to get total amount
    const newCart = new Cart({
      guest,
      enquiries: enquiriesData,
      amount: totalAmount,
      bookingType,
    })
    await newCart.save()
    await newCart.populate({
      path: 'enquiries',
      populate: {
        path: 'property',
        model: 'property',
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
    })

    const cartResponse = newCart // TODO: populate enquiries
    return cartResponse
  } else {
    const guest = new Types.ObjectId(userId)
    // if cart doesn't exist, create one else update it
    const totalAmount = 0 // TODO: call pricing service to get total amount
    const cart = await Cart.findOne({
      guest,
    }).exec()

    if (!cart || (cart && cart.bookingType === 'instant')) {
      if (cart) {
        await cart.remove()
      }
      const newCart = new Cart({
        guest,
        enquiries,
        amount: totalAmount,
        bookingType: 'request',
      })
      await newCart.save()
      await newCart.populate({
        path: 'enquiries',
        populate: {
          path: 'property',
          model: 'property',
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
      })

      const cartResponse = newCart // TODO: populate enquiries
      return cartResponse
    } else {
      // if cart doesn't exist, create one else update it

      // check if the enquiries from req.body already exists in the cart.enquiries
      const cartEnquiries = cart.enquiries.map((e) => e.toString())
      const existingEnquiries = cartEnquiries.filter((enquiry) => {
        return enquiries.some((e: any) => e === enquiry)
      })
      if (existingEnquiries.length > 0) {
        throw new Error(`Enquiry already exists in cart`)
      }

      // if total enquiries are less than 3 the push the new enquiries else throw error
      if (cart.enquiries.length < 3) {
        cart.enquiries.push(...enquiriesData)
        await cart.save()
        await cart.populate({
          path: 'enquiries',
          populate: {
            path: 'property',
            model: 'property',
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
        })

        const cartResponse = cart // TODO: populate enquiries
        return cartResponse
      } else {
        throw new Error('Maximum 3 enquiries allowed')
      }
    }
  }
}

export default addInquiriesToCart
