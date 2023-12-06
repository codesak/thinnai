import checkAccess from '../../middleware/checkAccess'
import userAuth from '../../middleware/userAuth'
import Booking from '../../models/Booking'
import GuestUserData from '../../models/GuestUserData'
import HostUserData, { IHostUserData } from '../../models/HostUserData'
import Payment from '../../models/Payment'
import Property from '../../models/Property'
import User from '../../models/User'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import config from 'config'
import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Types } from 'mongoose'

const router = Router()

// @route       PATCH api/profile/updateUserData
// @desc        Update User Data
// @access      Public
router.patch(
  '/updateUserData',
  userAuth,
  //**********************************Validations**********************************/
  [
    check('aboutYourself').optional().trim(),
    check('interests').optional().trim(),
    check('address').optional().trim(),
    check('city').optional().trim(),
    check('state').optional().trim(),
    check('zipCode')
      .isNumeric()
      .withMessage('Zip Code must be numeric')
      .trim()
      .optional({ nullable: true }),
    check('profession').optional().trim(),
    check('gender').optional().trim(),
    check('dateOfBirth').optional(),
    check('languagesKnown').optional().trim(),
    check('idProofFront').optional().trim(),
    check('idProofBack').optional().trim(),
    check('idProofType').optional().trim(),
    check('idProofNumber').optional().trim(),
    check('suggestion').optional().trim(),
    check('anythingElse').optional().trim(),
    check('anythingWeShouldKnow').optional().trim(),
    check('accHolder').optional().trim(),
    check('accNumber')
      .matches('^[0-9]*$')
      .withMessage('Account Number must be numeric')
      .optional(),
    check('IFSC').optional().trim(),
    check('profileImage').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const updatedData = req.body
      const {
        profileImage,
        firstName,
        lastName,
        email,
        avatar,
        phone,
        isMyBooking,
        isRegistrationForBooking,
        bookingId,
      } = updatedData
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      //Temp hack
      if (updatedData.gender == '') {
        updatedData.gender = undefined
      }
      if (updatedData.dateOfBirth === null) {
        updatedData.dateOfBirth = undefined
      }

      let updatedUserData

      const existingUserCheck = await User.findOne({ email })
      if (existingUserCheck && email && existingUserCheck.email != email) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Email Already In Use'))
      }

      if (profileImage != null) {
        let avatarToKeep = avatar
        if (updatedData.firstName || updatedData.lastName) {
          avatarToKeep =
            config.get('avatarBaseURI') +
            `${updatedData.firstName}+${updatedData.lastName}`
        }
        await User.findByIdAndUpdate(new Types.ObjectId(req.userData.id), {
          $set: {
            profileImage,
            firstName,
            lastName,
            email,
            phone,
            avatar: avatarToKeep,
            registered: true,
          },
        })
      }

      if (req.roles!.includes('host')) {
        updatedUserData = await HostUserData.findOneAndUpdate(
          { user: req.userData.id },
          updatedData,
          {
            new: true,
          }
        )
          .populate(
            'user',
            'firstName lastName email phone altPhone avatar profileImage'
          )
          .populate(
            'properties.property',
            'propertyPictures propertyThumbnails propertyName showProperty propertyDescription approvalStatus'
          )
          .slice('wallet', 1)
      } else if (req.roles!.includes('guest')) {
        updatedUserData = await GuestUserData.findOneAndUpdate(
          { user: req.userData.id },
          updatedData,
          {
            new: true,
          }
        ).populate('user', 'name email avatar profileImage')

        if (!updatedUserData) {
          return res
            .status(ErrorCode.HTTP_NOT_FOUND)
            .json(errorWrapper('User Data Not found'))
        }

        if (isRegistrationForBooking && !isMyBooking) {
          let booking = await Booking.findOneAndUpdate(
            {
              _id: bookingId,
              'invitedGuests.guest': updatedUserData._id,
            },
            {
              $set: {
                'invitedGuests.$.idProofStatus': 'verificationRequested',
              },
            },
            { new: true }
          )
          if (!booking) {
            return res
              .status(ErrorCode.HTTP_NOT_FOUND)
              .json(errorWrapper('Booking Not found'))
          }
        } else if (isRegistrationForBooking) {
          let booking = await Booking.findOneAndUpdate(
            {
              _id: bookingId,
            },
            { $set: { guestIdStatus: 'verificationRequested' } },
            { new: true }
          )
          if (!booking) {
            return res
              .status(ErrorCode.HTTP_NOT_FOUND)
              .json(errorWrapper('Booking Not found'))
          }
        }
      }

      if (!updatedUserData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }

      res.json({
        message: 'User Data Updated Successfully',
        userData: {
          ...updatedUserData.toObject(),
          profileImage: updatedUserData.user.profileImage,
        },
      })
    } catch (err) {
      console.error(`Err updateUserData:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/
// @desc        Get User Data
// @access      Public
router.get('/', userAuth, async (req: Request, res: Response) => {
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

    let userData

    if (req.roles!.includes('host')) {
      userData = await HostUserData.findOne({ user: req.userData.id })
        .populate(
          'user',
          'firstName lastName email phone altPhone avatar profileImage'
        )
        .populate(
          'properties.property',
          'propertyPictures propertyThumbnails propertyName showProperty propertyDescription approvalStatus directBooking'
        )
        .slice('wallet', 1)
    } else if (req.roles!.includes('guest')) {
      userData = await GuestUserData.findOne({
        user: req.userData.id,
      }).populate(
        'user',
        'firstName lastName email  avatar profileImage '
      ).select('-idProofBack -idProofFront -idProofType -idProofNumber ')
    }

    if (!userData) {
      return res
        .status(ErrorCode.HTTP_NOT_FOUND)
        .json(errorWrapper('Profile Not Found'))
    }

    res.json({
      ...userData.toObject(),
      profileImage: userData.user.profileImage,
    })
  } catch (err) {
    console.error(`Err loadUserData:`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

// @route       POST api/profile/recordPayment
// @desc        Record Payment for Guest User
// @access      Public
router.post(
  '/recordPayment',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [
    check('paymentDate')
      .isISO8601()
      .withMessage('Date of Birth must be a Date'),
    check('paymentAmount', 'Payment Amount is required')
      .not()
      .isEmpty()
      .trim()
      .isNumeric()
      .withMessage('Payment Amount must be numeric'),
    check('paymentMode', 'Payment Mode is required').not().isEmpty().trim(),
    check('paymentType', 'Payment Type is required').not().isEmpty().trim(),
    check('paymentDescription', 'Payment Description is required')
      .optional()
      .trim(),
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
        host,
        paymentDate,
        paymentAmount,
        paymentMode,
        paymentType,
        paymentDescription,
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

      let payments = await Payment.findOne({ user: req.userData.id })

      if (!payments) {
        payments = new Payment({
          user: req.userData.id,
        })

        await payments.save()
      }

      payments.payments.push({
        host,
        paymentDate,
        paymentAmount,
        paymentMode,
        paymentType,
        paymentDescription,
      })

      await payments.save()

      if (paymentMode === 'Wallet' && paymentType === 'Debited') {
        await GuestUserData.findByIdAndUpdate(
          req.userData.id,
          {
            $inc: {
              wallet: -paymentAmount,
            },
          },
          {
            new: true,
          }
        )
      }

      res.json({
        message: 'Payment Recorded Successfully',
        payments,
      })
    } catch (err) {
      console.error(`Err recordPayment:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/payments
// @desc        Get all payments of guest user
// @access      Public
router.get(
  '/payments',
  userAuth,
  checkAccess('guest'),
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

      const payments = await Payment.findOne({
        user: req.userData.id,
      }).populate('payments.host', 'firstName avatar profileImage')

      if (!payments) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('No Payment Records Found'))
      }

      res.json({ payments })
    } catch (err) {
      console.error(`Err loadPayments`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/getRegistrationStatus
// @desc        Get Host Registration Status
// @access      Public
router.get(
  '/registrationStatus',
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

      const property = await Property.findOne({ user: req.userData.id })
      var propertyId: string | null = null

      const thinnaiDetails = () => {
        let count = 0
        if (property) {
          propertyId = property._id.toHexString()
          if (property.propertyPictures.length) count++
          if (property.propertyName) count++
          if (property.propertyDescription) count++
          if (property.houseNumber) count++
          if (property.tower) count++
          if (property.street) count++
          if (property.locality) count++
          if (property.landmark) count++
          if (property.city) count++
          if (property.state) count++
          if (property.zipCode) count++
          if (property.thinnaiLocationUrl) count++
          // if (property.directions) count++
          if (property.propertyType && property.propertyType.length) count++
          if (property.propertyOwnership) count++
          if (property.thinnaiLocation.length) count++
          if (property.amenities.length) count++
          if (property.preferredGuests.length) count++
          if (property.activities.length) count++
          if (property.services.length) count++
          // if (property.alcoholAllowedFor.length) count++
          if (property.maxGuestCount) count++
          if (property.houseRules.length) count++
        }
        return (count / 21) * 100
      }

      const userData = (await HostUserData.findOne({
        user: req.userData.id,
      }).populate('user', 'profileImage')) as IHostUserData

      if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('User Data Not Found'))
      }

      const accDetails = () => {
        let count = 0
        if (userData.accHolder) count++
        if (userData.accNumber) count++
        if (userData.IFSC) count++
        if (userData.idProofFront) count++
        if (userData.idProofBack) count++
        if (userData.idProofType) count++
        if (userData.idProofNumber) count++

        return (count / 7) * 100
      }

      const myDetails = () => {
        let count = 0
        if (userData.user.profileImage) count++
        if (userData.aboutYourself) count++
        if (userData.interests) count++
        if (userData.address) count++
        if (userData.city) count++
        if (userData.state) count++
        if (userData.zipCode) count++
        if (userData.profession) count++
        if (userData.gender) count++
        if (userData.dateOfBirth) count++
        if (userData.languagesKnown) count++

        return (count / 11) * 100
      }

      res.json({
        thinnaiDetails: thinnaiDetails(),
        accDetails: accDetails(),
        myDetails: myDetails(),
        thinnaiDetailsApproval: property?.approvalStatus ?? 'pending',
        myDetailsApproval: userData.detailsApproval,
        accDetailsApproval: userData.accApproval,
        propertyId,
        userId: req.userData.id,
        approvalStatus: userData.approvalStatus,
      })
    } catch (err) {
      console.error(`Err loadRegistrationStatus`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/Reviews
// @desc        Get Reviews for Host/Guest
// @access      Public
router.get(
  '/reviews/:userId',
  userAuth,
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { userId } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      let reviews
      if (req.roles!.includes('host')) {
        reviews = await HostUserData.findOne({ user: userId })
          .populate('reviews.reviewer', 'name avatar profileImage')
          .slice('reviews', 15)
          .select('reviews')
      } else if (req.roles!.includes('guest')) {
        reviews = await GuestUserData.findOne({ user: userId })
          .populate('reviews.reviewer', 'name avatar profileImage')
          .slice('reviews', 15)
          .select('reviews')
      }

      res.json(reviews)
    } catch (err) {
      console.error(`Err getReviews`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/getWallet
// @desc        Get Wallet
// @access      Public
router.get(
  '/wallet',
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

      const userData = await HostUserData.findOne({
        user: req.userData.id,
      }).slice('wallet', 6)

      if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }

      res.json(userData.wallet)
    } catch (err) {
      console.error(`Err loadWallet:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/profile/friends
// @desc        Get Friends
// @access      Public
router.get(
  '/friends',
  userAuth,
  checkAccess('guest'),
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

      const userData = await GuestUserData.findOne({
        user: req.userData.id,
      }).select('friends')

      if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }

      const friends: any = []

      userData.friends.forEach(async (friendId: Types.ObjectId) => {
        const friend = await GuestUserData.findOne({ user: friendId })
          .populate('user', 'firstName lastName avatar profileImage')
          .select('user bookingsInvitedTo')
        friends.push(friend)
      })

      res.json(userData.friends)
    } catch (err) {
      console.error(`Err loadFriendList:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/profile/removeFriend
// @desc        POST remove friend
// @access      Public
router.post(
  '/removeFriend',
  userAuth,
  checkAccess('guest'),
  //**********************************Validations**********************************/
  [check('friendId').not().isEmpty().withMessage('Friend ID is required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { friendId } = req.body
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const userData = await GuestUserData.findOne({ user: req.userData.id })

      if (!userData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }

      const friendIndex = userData.friends.indexOf(friendId)
      if (friendIndex === -1) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Friend Not Found'))
      }

      userData.friends.splice(friendIndex, 1)
      await userData.save()

      const friends: any = []

      userData.friends.forEach(async (friendId: Types.ObjectId) => {
        const friend = await GuestUserData.findOne({ user: friendId })
          .populate('user', 'firstName lastName avatar profileImage')
          .select('user bookingsInvitedTo')
        friends.push(friend)
      })

      res.json({ friends })
    } catch (err) {
      console.error(`Err loadFriendList:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/profile/host/requestCall
// @desc        Create a call request for host
// @access      Private
router.post(
  '/host/requestCall',
  userAuth,
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

      let updatedUserData
      updatedUserData = await HostUserData.findOne({ user: req.userData.id })

      if (!updatedUserData) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Profile Not Found'))
      }
      let isActiveRequestPresent = false
      var activeCallbackRequest: IHostUserData = new HostUserData()

      var indexOfActiveRequest = updatedUserData.callbackRequests.findIndex(
        (callbackRequest) =>
          callbackRequest.status === 'ongoing' ||
          callbackRequest.status === 'raised'
      )
      if (indexOfActiveRequest !== -1) {
        isActiveRequestPresent = true
        activeCallbackRequest.callbackRequests = [
          updatedUserData.callbackRequests[indexOfActiveRequest],
        ]
      }
      if (isActiveRequestPresent) {
        res.json({
          success: false,
          message: `Call Request Already ${activeCallbackRequest.callbackRequests[0].status}!`,
        })
      } else {
        updatedUserData.callbackRequests.push({
          resolutions: [],
          _id: undefined,
          date: undefined,
          status: undefined,
        })
        await updatedUserData.save()
        res.json({
          success: true,
          message: 'Call Request Added Successfully!',
          userData: updatedUserData,
        })
      }
    } catch (err) {
      console.error(`Err updateUserData:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

export default router
