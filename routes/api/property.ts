import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import HostUserData from '../../models/HostUserData'
import Offer from '../../models/Offer'
import Property from '../../models/Property'
import UpdatePropertyRequests from '../../models/UpdatePropertyRequests'
import { cleanMap, ErrorCode, errorWrapper } from '../../utils/consts'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'

const router = Router()

// @route       POST api/property/addProperty
// @desc        Create/Add New Property
// @access      Public
router.post(
  '/addProperty',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('propertyPictures.*').trim(),
    check('propertyThumbnails.*').trim(),
    check('propertyName', 'Property Name is required').not().isEmpty().trim(),
    check('propertyDescription').optional().trim(),
    check('houseNumber').optional().trim(),
    check('tower').optional().trim(),
    check('street').optional().trim(),
    check('locality').optional().trim(),
    check('landmark').optional().trim(),
    check('city').optional().trim(),
    check('state').optional().trim(),
    check('zipCode').optional().trim(),
    check('thinnaiLocationUrl').optional().trim(),
    check('geoLocation').optional().trim(),
    check('directions.*').optional().trim(),
    check('propertyType').optional().trim(),
    check('propertyOwnership').optional().trim(),
    check('thinnaiLocation.*').trim(),
    check('amenities.*').trim(),
    check('preferredGuests.*').trim(),
    check('activities.*').trim(),
    check('services.*').trim(),
    check('alcoholAllowedFor.*').trim(),
    check('maxGuestCount')
      .optional()
      .isNumeric()
      .withMessage('Max Guest Count must be numeric'),
    check('houseRules.*').trim(),
    //TODO: Add new validations starting from addon service
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const {
        propertyPictures,
        propertyThumbnails,
        propertyName,
        propertyDescription,
        houseNumber,
        tower,
        street,
        locality,
        landmark,
        city,
        state,
        zipCode,
        thinnaiLocationUrl,
        geoLocation,
        directions,
        propertyType,
        propertyOwnership,
        thinnaiLocation,
        amenities,
        preferredGuests,
        activities,
        parkingType,
        services,
        alcoholAllowedFor,
        maxGuestCount,
        houseRules,
        addOnServices,
        properties,
        nearbyMetro,
        nearbyBusStop,
        happyCustomers,
        faqs,
        residentialSpaceIn30m,
      } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const userData = await HostUserData.findOne({ user: req.userData.id })

      if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }

      const property = await Property.findOne({
        propertyName: req.body.propertyName,
      })

      if (property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Already Exists'))
      }

      const newProperty = new Property({
        userData: userData._id,
        user: req.userData.id,
        propertyPictures,
        propertyThumbnails,
        propertyName,
        propertyDescription,
        houseNumber,
        tower,
        street,
        locality,
        landmark,
        city,
        state,
        zipCode,
        thinnaiLocationUrl,
        geoLocation,
        directions,
        propertyType,
        propertyOwnership,
        thinnaiLocation,
        amenities,
        preferredGuests,
        activities,
        parkingType,
        services,
        alcoholAllowedFor,
        maxGuestCount,
        houseRules,
        happyCustomers,
        addOnServices,
        properties,
        nearbyMetro,
        nearbyBusStop,
        faqs,
        residentialSpaceIn30m,
      })

      const createdProperty = await newProperty.save()

      userData.properties.push({
        property: createdProperty._id,
      })

      userData.save()

      res.json({
        message: 'Property Added Successfully',
        property: createdProperty,
      })
    } catch (err) {
      console.error(`Err addProperty:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/property/properties
// @desc        Get all Properties of an User
// @access      Public
router.get(
  '/host/properties',
  userAuth,
  checkAccess('host'),
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
          .json(errorWrapper('Invalid Token'))
      }

      const properties = await HostUserData.find({ user: req.userData.id })
        .populate('properties.property')
        .select('properties')
      if (!properties) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Properties Found'))
      }

      res.json(properties)
    } catch (err) {
      console.error(`Err loadProperty`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/property/guest/properties
// @desc        POST all Properties of an User
// @access      Public
router.post('/guest/properties', async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
	}
	//**********************************Handler Code**********************************/
	try {
		const { city, groupType, guestCount, directBooking, services, amenities,subAreas,addOnServices,area,landmark,latitude,longitude} = req.body;
      const matchBlock: any = {
        isActive: true,
        approvalStatus: 'approved',
        showProperty: true,
      };
     
      if(landmark){
        matchBlock['landmark']=landmark;
      }
      if (city) {
        matchBlock['city'] = city;
      }
      if (groupType && groupType !== "all") {
        matchBlock['preferredGuests'] ={ $in: [groupType] };
      }
      if (area) {
        matchBlock['$or'] = [
          { area: area },
          { nearbyArea: area }
        ];
      }  
      
      if (guestCount) {
        matchBlock['maxGuestCount'] = { $gte: guestCount };
      }
      if (directBooking !== false) {
        matchBlock['directBooking'] = directBooking ? true : false;
      }
      if (services && services.length > 0) {
        matchBlock['services'] = { $all: services };
      }
      if (amenities && amenities.length > 0) {
        matchBlock['amenities'] = { $all: amenities };
      }
      if (subAreas && subAreas.length > 0) {
        matchBlock['subAreas'] = { $all: subAreas };
      }
      if (addOnServices && addOnServices.length > 0) {
        matchBlock['addOnServices.addOnServiceTitle'] = { $in: addOnServices };
      }
      if(latitude && longitude){
      const properties = await Property.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            distanceField: "distance",
            spherical: true,
            key:"geoLocation"
          }
        },
        
        {
          $sort: {
            distance: 1,
            
          }
        },
        {
          $match: matchBlock,
        },
        {
          $project: {
            _id: 1,
            propertyPictures: 1,
            propertyThumbnails: 1,
            slugString: 1,
            propertyName: 1,
            maxGuestCount: 1,
            minDuration: 1,
            area:1,
            city: 1,
            state: 1,
            subAreas: 1,
            geolocation:1,
            price: { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
            directBooking: 1,
            happyCustomers: 1,
            originalPrice: {
              $add: [
                { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
                { $multiply: [{ $first: '$pricing.joyHour.withoutAlcohol.oneHour' }, 0.2] },
              ],
            },
            discount: { $literal: 20 },
          },
        },
  {
    $limit: 20 // add this stage to limit to 20 closest properties
  },
      ]);
      
      if (!properties) {
        return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('No Properties Found'));
      }
      
      res.json(properties);}
      else{
        const properties = await Property.aggregate([
          {
            $match: matchBlock,
          },
          {
            $project: {
              _id: 1,
              propertyPictures: 1,
              propertyThumbnails: 1,
              slugString: 1,
              propertyName: 1,
              maxGuestCount: 1,
              minDuration: 1,
              city: 1,
              state: 1,
              area:1,
              subAreas: 1,
              geolocation:1,
              price: { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
              directBooking: 1,
              happyCustomers: 1,
              originalPrice: {
                $add: [
                  { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
                  { $multiply: [{ $first: '$pricing.joyHour.withoutAlcohol.oneHour' }, 0.2] },
                ],
              },
              discount: { $literal: 20 },
            },
          },
          {
            $addFields: {
              sortingField: {
                $cond: {
                  if: { $eq: ['$area', area] },
                  then: 1,
                  else: {
                    $cond: {
                      if: { $eq: ['$nearbyArea', area] },
                      then: 2,
                      else: 3,
                    },
                  },
                },
              },
            },
          },
          {
            $sort: {
              sortingField:1,
              directBooking: -1,
            },
          },
        ]);
        
        if (!properties) {
          return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('No Properties Found'));
        }
        
        res.json(properties);
      }
	} catch (err) {
		console.error(`Err loadProperty`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/property/properties
// @desc        GET 10 properties for landing page
// @access      Public
router.get('/properties', async (req: Request, res: Response) => {
  //**********************************Handler Code**********************************/
  try {
    const properties = await Property.aggregate([
      {
        $match: {
          approvalStatus: 'approved',
        },
      },
      {
        $project: {
          _id: 1,
          propertyPictures: 1,
          propertyThumbnails: 1,
          slugString: 1,
          propertyName: 1,
          city: 1,
          state: 1,
          area:1,
          happyCustomers:1, 
          maxGuestCount:1, 
          minDuration:1, 
          originalPrice: {
            $add: [
              { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
              { $multiply: [{ $first: '$pricing.joyHour.withoutAlcohol.oneHour' }, 0.2] },
            ],
          },
          discount: { $literal: 20 },
          price: { $first: '$pricing.joyHour.withoutAlcohol.oneHour' },
        },
      },
      {
        $limit: 10,
      },
    ])

    if (!properties) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('No Properties Found'))
    }

    res.json({ spaces: properties })
  } catch (err) {
    console.error(`Err loadProperty`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

// @route       GET api/property/properties/:key
// @desc        filter property by area and nearbyArea
// @access      Public
router.get('/properties/:key', async (req: Request, res: Response) => {
  try {
    const filters = req.params.key

    const filteredProperties = await Property.find({
      $or: [{ area: filters }, { nearbyArea: { $in: [filters] } }],
    })

    if (filteredProperties.length === 0) {
      return res.status(ErrorCode.HTTP_NOT_FOUND).json({
        message: 'No Properties Found',
      })
    }

    res.json({ spaces: filteredProperties })
  } catch (error) {
    console.error(`Error in loading properties`, error)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json({
      message: 'Server Error',
    })
  }
})

// @route       GET api/property/host/:propertyId
// @desc        Get One Property Detail
// @access      Public
router.get(
  '/host/:propertyId',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params

      const property = await Property.findOne({ _id: propertyId })
      if (!property) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }
      res.json(property)
    } catch (err) {
      console.error(`Err loadOneProperty`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       PATCH api/property/updateProperty/:propertyId
// @desc        Update a Property
// @access      Public
router.patch(
  '/updateProperty/:propertyId',
  userAuth,
  checkAccess('host'),
  //**********************************Validations**********************************/
  [
    check('propertyPictures.*').trim(),
    check('propertyThumbnails.*').trim(),
    check('propertyName').optional().trim(),
    check('propertyDescription').optional().trim(),
    check('houseNumber').optional().trim(),
    check('tower').optional().trim(),
    check('street').optional().trim(),
    check('locality').optional().trim(),
    check('landmark').optional().trim(),
    check('city').optional().trim(),
    check('state').optional().trim(),
    check('zipCode').optional().trim(),
    check('thinnaiLocationUrl').optional().trim(),
    check('geoLocation').optional().trim(),
    check('directions.*').optional().trim(),
    check('propertyType').optional().trim(),
    check('propertyOwnership').optional().trim(),
    check('thinnaiLocation.*').optional().trim(),
    check('amenities.*').optional().trim(),
    check('preferredGuests.*').optional().trim(),
    check('activities.*').optional().trim(),
    check('parkingType.*').optional().trim(),
    check('services.*').optional().trim(),
    check('alcoholAllowedFor.*').optional().trim(),
    check('maxGuestCount')
      .optional()
      .isNumeric()
      .withMessage('Max Guest Count must be numeric'),
    check('directBooking').optional().trim(),
    check('houseRules.*').optional().trim(),
    check('minDuration')
      .optional()
      .isNumeric()
      .withMessage('Min Duration must be numeric'),
    check('visibility')
      .optional()
      .isNumeric()
      .withMessage('Visibility must be numeric'),
    check('foodJoints.*.restaurantName').optional().trim(),
    check('foodJoints.*.cuisineType').optional().trim(),
    check('foodJoints.*.foodSuggestions').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const updateData = req.body
      if (propertyId === undefined || propertyId === null) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Property ID'))
      }

      const { approvalStatus } = updateData
      //Todo: approval flow for property!
      if (approvalStatus === 'approved' && false) {
        cleanMap(updateData)
        const updatePropertyElement =
          await UpdatePropertyRequests.findOneAndUpdate(
            {
              originalProperty: propertyId,
            },
            updateData,
            { new: true, upsert: true }
          )
        res.json({
          message: 'Property Updated Request Logged',
          property: updatePropertyElement,
        })
      } else {
        const updatedProperty = await Property.findOneAndUpdate(
          { _id: propertyId },
          updateData,
          {
            new: true,
          }
        )

        if (!updatedProperty) {
          return res
            .status(ErrorCode.HTTP_BAD_REQ)
            .json(errorWrapper('Property not found'))
        }

        res.json({
          message: 'Property Updated Successfully',
          property: updatedProperty,
        })
      }
    } catch (err) {
      console.error(`Err updateProperty:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

router.post(
  '/updateProperty/directBooking/:propertyId',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { directBooking } = req.body
      if (propertyId === undefined || propertyId === null) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Property ID'))
      }

      const updatedProperty = await Property.findOneAndUpdate(
        { _id: propertyId },
        { $set: { directBooking } },
        {
          new: true,
        }
      )

      if (!updatedProperty) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property not found'))
      }
      res.json({
        message: 'Property Direct Booking Updated Successfully',
      })
    } catch (err) {
      console.error(`Err updateProperty:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       PATCH api/property/addSubArea/:propertyId
// @desc        Update a Property
// @access      Admin
// body will be subAreas:["subarea1","subarea2"]
router.patch(
  '/addSubAreas/:propertyId',
  userAuth,
  checkAccess('admin'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      const { subAreas } = req.body
      if (propertyId === undefined || propertyId === null) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Property ID'))
      }

      const updatedProperty = await Property.findOneAndUpdate(
        { _id: propertyId },
        { $push: { subAreas } },
        {
          new: true,
        }
      )

      if (!updatedProperty) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property not found'))
      }
      res.json({
        message: 'Property Sub Areas Updated Successfully',
      })
    } catch (err) {
      console.error(`Err updateProperty:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       DELETE api/profile/deleteProperty
// @desc        Delete Property
// @access      Public
router.delete(
  '/deleteProperty/:propertyId',
  userAuth,
  checkAccess('host'),
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { propertyId } = req.params
      if (propertyId === undefined || propertyId === null) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Property ID'))
      }

      const deletedProperty = await Property.findOneAndUpdate(
        {
          _id: propertyId,
        },
        { isActive: false },
        {
          new: true,
        }
      )

      if (!deletedProperty) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Property Not Found'))
      }

      await HostUserData.findOneAndUpdate(
        {
          _id: deletedProperty.userData._id,
        },
        {
          $pull: {
            properties: { property: propertyId },
          },
        },
        { new: true }
      )

      res.json({
        message: 'Property Deleted Successfully',
        property: deletedProperty,
      })
    } catch (err) {
      console.error(`Err deleteProperty:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/property/:propertyId
// @desc        Get One Property Detail
// @access      Public
router.get('/:propertyId', async (req: Request, res: Response) => {
  //**********************************Handler Code**********************************/
  try {
    const { propertyId } = req.params

    const property = await Property.findOne({ _id: propertyId })
      .populate({
        path: 'userData',
        select: 'aboutYourself guestsHosted ratings user',
        populate: {
          path: 'user',
          select: 'firstName profileImage avatar',
        },
      })
      .populate({
        path: 'reviews.reviewer',
        select: 'firstName profileImage avatar',
      })
      .select({
        directions: 0,
        houseNumber: 0,
        tower: 0,
        street: 0,
        foodJoints: 0,
        nearbyMetro: 0,
        nearbyBusStop: 0,
        locality: 0,
        landmark:0,
        nearbyArea:0,
        thinnaiLocationUrl:0
      })
      .exec()
    if (!property) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('Property Not Found'))
    }

    const reviewCount = property.reviews.length

    if (reviewCount > 0) {
      property.reviews = property.reviews.slice(0, 10)
    }

    const offers = await Offer.find()

    res.json({ property, reviewCount, offers })
  } catch (err) {
    console.error(`Err loadOneProperty`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

// @route       GET api/property/:propertyId
// @desc        Get One Property Detail using slug string
// @access      Public
router.get('/slug/:propertySlug', async (req: Request, res: Response) => {
  //**********************************Handler Code**********************************/
  try {
    const { propertySlug } = req.params

    const property = await Property.findOne({ slugString: propertySlug })
      .populate({
        path: 'userData',
        select: 'aboutYourself guestsHosted ratings user',
        populate: {
          path: 'user',
          select: 'firstName profileImage avatar',
        },
      })
      .populate({
        path: 'reviews.reviewer',
        select: 'firstName profileImage avatar',
      })

    if (!property) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper('Property Not Found'))
    }

    const reviewCount = property.reviews.length

    if (reviewCount > 0) {
      property.reviews = property.reviews.slice(0, 10)
    }

    const offers = await Offer.find()

    res.json({ property, reviewCount, offers })
  } catch (err) {
    console.error(`Err loadOneProperty`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

export default router
