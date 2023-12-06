import client from '../../config/redis'
import localPassportLogin from '../../middleware/localPassprtLogin'
import userAuth from '../../middleware/userAuth'
// import Booking from '../../models/Booking'
import GuestUserData from '../../models/GuestUserData'
import HostUserData from '../../models/HostUserData'
import User from '../../models/User'
import UserData from '../../models/UserData'
import { ErrorCode, errorWrapper } from '../../utils/consts'
import sendMail from '../../utils/mail/sendMail'
import { forgot } from '../../utils/mail/templateMail'
// import { confirm, forgot } from '../../utils/mail/templateMail'
import { genSalt, hash } from 'bcryptjs'
import crypto from 'crypto'
import { NextFunction, Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'
import passport from 'passport'

const router = Router()

const config = require('config')

// @route       POST api/auth/user/register
// @desc        Create/Add a new user
// @access      Public

router.get('/user/login', async (req: Request, res: Response) => {
  res.status(200).send('it is here again..')
})

// @route       POST api/auth/user/login
// @desc        Login/ Get auth token
// @access      Public
router.post(
  '/user/login',
  //**********************************Validations**********************************/
  [
    check('email', 'Please input valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper(errors.array()[0].msg))
    }
    next()
  },
  localPassportLogin,
  (req: any, res: Response) => {
    try {
      const user = req.user

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Credentials'))
      }

      const payload = {
        user: {
          id: user.id,
          verified: false,
        },
        roles: [] as string[],
      }

      if (user.userType === 'host') {
        payload.roles = ['host']
      } else if (user.userType === 'admin') {
        payload.roles = ['admin', 'host']
      }

      sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(`Err login:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

router.post(
  '/user/register/host',
  //**********************************Validations**********************************/
  [
    check('firstName', 'First name is required').not().isEmpty().trim(),
    check('lastName', 'Last name is required').not().isEmpty().trim(),
    check('email', 'Please input valid email')
      .toLowerCase()
      .trim()
      .isEmail()
      .normalizeEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({
        min: 6,
      })
      .trim(),
    check('phone', 'Please input valid phone number')
      .notEmpty()
      .isMobilePhone('en-IN')
      .trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      const { firstName, lastName, email, password, phone } = req.body
      // const { userType } = req.params
      let user = await User.findOne({
        email: email,
        userType: 'host',
      })
      let userWithSamePhone = await User.findOne({
        phone: phone,
        userType: 'host',
      })
      const salt = await genSalt(10)

      if (user || userWithSamePhone) {
        return res
          .status(ErrorCode.HTTP_CONFLICT)
          .json(errorWrapper('User Already Exists'))
      }

      const avatar = config.get('avatarBaseURI') + `${firstName}+${lastName}`
      const verificationToken = crypto.randomBytes(128).toString('hex')
      const verificationValid = Date.now() + 43200000

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        phone,
        avatar,
        verificationToken,
        verificationValid,
        userType: 'host',
      }

      user = new User(newUser)

      user.password = await hash(password, salt)

      await user.save()

      // sendMail(email, confirm(verificationToken))

      const payload = {
        user: {
          id: user.id,
          verified: false,
        },
        roles: [] as string[],
      }

      payload.roles = ['host']
      const newUserData = new HostUserData({
        user: user._id,
        approvalStatus: 'pending',
      })
      await newUserData.save()

      sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(`Err register:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/auth/user/test/register
// @desc        Create/Add a new user
// @access      Public

router.post(
  '/user/register/guest',
  //**********************************Validations**********************************/
  [
    check('firstName', 'First name is required').not().isEmpty().trim(),
    check('lastName', 'Last name is required').not().isEmpty().trim(),
   check('email', 'Please input valid email').isEmail().normalizeEmail(),
   check('profession', 'Please input valid profession').not().isEmpty().trim(),
   check('idProofType', 'Please input valid ID Proof Type')
      .not()
      .isEmpty()
      .trim(),
   check('idProofNumber', 'Please input valid ID Proof Number')
      .not()
      .isEmpty()
      .trim(),
   check('gender').optional().trim(),
    check('dateOfBirth').optional(),
   check('idProofFront').optional().trim(),
   check('idProofBack').optional().trim(),
    check('password', 'Please enter a password with 6 or more characters')
      .optional()
      .isLength({
        min: 6,
      })
      .trim(),
    // check('phone', 'Please input valid phone number')
    //   .isMobilePhone('en-IN')
    //   .trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() })
    }

    //**********************************Handler Code**********************************/
    try {
      // Register User Schema ********************************************************************/

      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        profileImage
      } = req.body
      // const { userType } = req.params
      let user = await User.findOne({ email: email, userType:'guest'})
      const salt = await genSalt(10)

      if (user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('User Already Exists'))
      }

      const existingUserEmailCheck = await User.findOne({
        email: email,
        userType: 'guest',
      })

      if (existingUserEmailCheck) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Email Already In Use'))
      }

      const avatar = config.get('avatarBaseURI') + `${firstName}+${lastName}`
      const verificationToken = crypto.randomBytes(128).toString('hex')
      const verificationValid = Date.now() + 43200000

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        phone,
        avatar,
        verificationToken,
        verificationValid,
        profileImage,
        registered: true,
        registeredOn: Date.now(),
        userType: 'guest',
        emailVerified: false,
      }

      user = new User(newUser)

      if (password) {
        user.password = await hash(password, salt)
      }

      await user.save()
      // Register UserData Schema ********************************************************************/

      // Required Fields:
      /**
       * user: Schema.Types.ObjectId
       * gender: enum | String
       * profession: String
       * dateOfBirth: Date
       * idProofType: String
       * idProofNumber: String
       * idUploadDate: String
       * idProofFront: s3-URL
       * idProofBack: s3-URL
       */

      const {
        gender,
        profession,
        dateOfBirth,
        idProofType,
        idProofNumber,
        idProofFront,
        idProofBack,
      } = req.body

      const updatedData = {
        user: new Types.ObjectId(user.id),
        gender,
        profession,
        dateOfBirth,
        idProofType,
        idProofNumber,
        idUploadDate: Date.now(),
        idProofFront,
        idProofBack,
      }
      //Temp hack
      if (updatedData.gender == '') {
        updatedData.gender = undefined
      }
      if (updatedData.dateOfBirth === null) {
        updatedData.dateOfBirth = undefined
      }

      // TODO: move this duplicate email check above before user.save()
      const existingUserCheck = await UserData.findOne({
        user: new Types.ObjectId(user.id),
      })

      if (existingUserCheck) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Email Already In Use'))
      }

      const newGuest = new GuestUserData(updatedData)

      await newGuest.save()

      const payload = {
        user: {
          id: user.id,
          verified: false,
        },
        roles: ['guest'],
      }

      sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(`Err register:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/auth/host/login
// @desc        Login/ Get auth token
// @access      Public
router.post(
  '/host/login',
  //**********************************Validations**********************************/
  [
    check('email', 'Please input valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper(errors.array()[0].msg))
    }
    next()
  },
  localPassportLogin,
  (req: any, res: Response) => {
    try {
      const user = req.user
      console.log('🚀 ~ file: auth.ts:407 ~ user:', user)

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Credentials'))
      }

      const payload = {
        user: {
          id: user.id,
          verified: false,
        },
        roles: [] as string[],
      }

      if (user.userType === 'host') {
        payload.roles = ['host']
      } else if (user.userType === 'admin') {
        payload.roles = ['admin', 'host']
      }

      sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(`Err login:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET /api/auth/register/google/:userType
// @desc        Frontend calls this route for google authentication
// @access      Public
router.get('/register/google/:userType', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: req.params.userType,
  })(req, res, next)
})

// @route       GET /api/auth/google/callback
// @desc        endpoint is called from Google after authentication
// @access      Public

router.get(
  '/google/callback',
  // passport.authenticate('google', {
  //   successReturnToOrRedirect: 'http://localhost:3000/login',
  //   failureRedirect: '/login',
  // }
  passport.authenticate('google', { session: false }),

  async (req, res) => {
    const encodedData = encodeURIComponent(JSON.stringify(req.user));
    
    res.redirect(`https://preprod.bookmythinnai.com/googleverification?data=${encodedData}`)
    //email=${req.user?.emails[0].value}
}

  // async (req, res) => {
  //   try {
  //     if (!req.user) {
  //       return res
  //         .status(ErrorCode.HTTP_BAD_REQ)
  //         .json(errorWrapper('Invalid Credentials'))
  //     }

  //     const user = req.user as any as IUser
  //     const userId = user._id
  //     const userType = user.userType

  //     const payload = {
  //       user: {
  //         id: userId,
  //         verified: false,
  //       },
  //       roles: [] as string[],
  //     }

  //     if (userType === 'host') {
  //       payload.roles = ['host']
  //     } else if (userType === 'admin') {
  //       payload.roles = ['admin', 'host']
  //     }

  //     sign(
  //       payload,
  //       config.get('jwtSecret'),
  //       { expiresIn: '30d' },
  //       (err, token) => {
  //         if (err) throw err
  //         res.json({ token })
  //       }
  //     )
  //   } catch (err) {
  //     return res
  //       .status(500)
  //       .json({ msg: 'Something went wrong, please try again later.', err })
  //   }
  // }
)

// @route       POST api/auth/user/forgot
// @desc        Forgot password mail trigger
// @access      Public
router.post(
  '/user/forgot',
  //**********************************Validations**********************************/
  [check('email', 'Please input valid email').isEmail().normalizeEmail()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper(errors.array()[0].msg))
    }

    //**********************************Handler Code**********************************/
    try {
      const { email } = req.body
      // const modifiedEmail = email.replace(/\./g, '').replace(/(@.*$)/, '$1');
      const user = await User.findOne({ email })

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Email Not Found'))
      }

      await sendMail(email, forgot(user.verificationToken))
      await user.save()

      res.json({ success: 'Email Sent!' })
    } catch (err) {
      console.error(`Err forgot:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

router.post(
  '/reset-password/:id',
  async (req: Request, res: Response) => {
    try {
       const { email,password} = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Email Not Found'))
      }

      if (user.verificationToken !== req.params.id) {
        return res.status(400).json({ message: 'Invalid verification token' });
      }
      const salt = await genSalt(10)
      user.password = await hash(password, salt)
      await user.save();
    
      res.json({ message: 'Password reset successfully' });
    } catch (err) {
      console.error(`Err forgot:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)
// @route       POST api/auth/guest/login
// @desc        Login/Register guest user
// @access      Public
router.post(
  '/guest/login',
  //**********************************Validations**********************************/
  [
    check('phone', 'Please input valid phone number')
      .not()
      .isEmpty()
      .isMobilePhone('en-IN')
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
      const { phone } = req.body
      //let user = await User.findOne({ phone: phone, userType: 'guest' }).exec()
      const OTP = Math.floor(Math.random() * (10000 - 1000) + 1000).toString()

      await client
        .multi()
        .set(phone, OTP)
        .set(`${phone}:time`, Date.now())
        .exec()

       /* if (!user) {
         const newUser = {
           phone,
           userType: 'guest',
         }

         user = new User(newUser)
       }
       console.log(user)
       console.log(phone)
       user.OTP = OTP
       user.verificationValid = new Date(Date.now() + 60000)
       await user.save() */
       //sendSMS(phone, OTP);
      res.json({
        message: 'OTP sent',
        user: {
          //id: user._id,
          //phone: user.phone,
          //registered: user.registered,
          otp: OTP,
        },
      })
    } catch (err) {
      console.error(`Err guestLogin:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       POST api/auth/guest/googleverification
// @desc        Login/Register guest user
// @access      Public
router.post('/guest/googleverification',async (req: Request, res: Response) =>{
  try{
    const { mail} = req.body
    const user = await User.findOne({ email: mail, userType: 'guest' })
    if (user) {
      const payload = {
        user: {
          id: user._id,
          verified: true,
        },
        roles: ['guest'],
      }
      sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          return res.json({
            message: 'Authentication SuccessFull',
            token,
          })
        }
      )
    } else {
      return res
        .status(ErrorCode.HTTP_NOT_FOUND)
        .json(errorWrapper('Please Sign Up'))}
  }
  catch (err) {
    console.error(`Err:`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

// @route       GET api/auth/guest/verifyOTP
// @desc        OTP Verification
// @access      Public
router.post(
  '/guest/verifyOTP',
  //**********************************Validations**********************************/
  [
    check('phone', 'Please input valid phone number')
      .isMobilePhone('en-IN')
      .trim(),
    check('otpString', 'Please input valid OTP').not().isEmpty().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(ErrorCode.HTTP_BAD_REQ)
        .json(errorWrapper(errors.array()[0].msg))
    }
    //**********************************Handler Code**********************************/
    try {
      const { phone, otpString } = req.body

      // if (!user) {
      //   return res
      //     .status(ErrorCode.HTTP_BAD_REQ)
      //     .json(errorWrapper('User Not Found'))
      // }

      const clearOTP = async () => {
        await client.multi().del(phone).del(`${phone}:time`).exec()
      }

      const [OTP, timeValue] = await client
        .multi()
        .get(phone)
        .get(`${phone}:time`)
        .exec()

      const time = timeValue as number

      const now = Date.now()
      const createdOn = time ? time : Date.now()

      const timeRemaining = Math.abs(now - createdOn) / 1000

      const VALIDITY_IN_SECONDS = 60
      if (timeRemaining > VALIDITY_IN_SECONDS) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('OTP Expired'))
      }

      if (OTP !== otpString) {
        return res
          .status(ErrorCode.HTTP_FORBIDDEN)
          .json(errorWrapper('Invalid OTP'))
      }

      //const user = await User.findOne({ phone })
      const user = await User.findOne({ phone: phone, userType: 'guest' })

      if (user) {
        clearOTP()

        const payload = {
          user: {
            id: user._id,
            verified: true,
          },
          roles: ['guest'],
        }

        sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '30d' },
          (err, token) => {
            if (err) throw err
            clearOTP()
            return res.json({
              message: 'OTP Verified',
              token,
            })
          }
        )
      } else {
        return res
          .status(ErrorCode.HTTP_NOT_FOUND)
          .json(errorWrapper('Please Sign Up'))
      }
      // const existingGuest = await GuestUserData.findOne({ user: user._id })

      // if (!existingGuest) {
      //   const newGuest = new GuestUserData({
      //     user: user._id,
      //   })

      //   await newGuest.save()
      //   if (bookingId) {
      //     const booking = await Booking.findOne({ _id: bookingId })

      //     if (!booking) {
      //       return res
      //         .status(ErrorCode.HTTP_BAD_REQ)
      //         .json(errorWrapper('Booking Not Found'))
      //     }

      //     const invitedGuest = booking.invitedGuests.find(
      //       (guest) => guest.guest.toString() === newGuest._id.toString()
      //     )

      //     newGuest.bookingsInvitedTo.push(bookingId)
      //     await newGuest.save()

      //     if (!invitedGuest) {
      //       booking.invitedGuests.push({
      //         guest: newGuest._id,
      //         idProofStatus: 'pending',
      //       })
      //       await booking.save()
      //     }
      //   }
      // }
    } catch (err) {
      console.error(`Err verifyOTP:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/auth/user/confirm/:verificationToken
// @desc        Confirmation for verification and reset password
// @access      Public
router.get(
  '/user/confirm/:verificationToken',
  userAuth,
  async (req: Request, res: Response) => {
    //**********************************Handler Code**********************************/
    try {
      const { verificationToken } = req.params
      if (
        !req.userData ||
        req.userData.id === undefined ||
        req.userData.id === null
      ) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('Invalid Token'))
      }

      const user = await User.findById(req.userData.id)

      if (!user) {
        return res
          .status(ErrorCode.HTTP_BAD_REQ)
          .json(errorWrapper('User Not Found'))
      }

      if (Date.now() - Date.parse(user.verificationValid!.toString()) > 0) {
        user.verificationToken = ''
        user.verificationValid = undefined
        await user.save()
        return res
          .status(ErrorCode.HTTP_FORBIDDEN)
          .json(errorWrapper('Verification Token Expired'))
      }

      if (user.verificationToken !== verificationToken) {
        return res
          .status(ErrorCode.HTTP_FORBIDDEN)
          .json(errorWrapper('Invalid Verification Token'))
      }

      user.verificationToken = ''
      user.verificationValid = undefined
      user.emailVerified = true
      await user.save()

      return res.json('Token Verified')
    } catch (err) {
      console.error(`Err confirm:`, err)
      res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
    }
  }
)

// @route       GET api/auth/user/
// @desc        Get user details
// @access      Public
router.get('/user/', userAuth, async (req: Request, res: Response) => {
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
    const user = await User.findById(new Types.ObjectId(req.userData.id))
    console.log(user);
    
    if (user && user.userType === 'host') {
      const userData = await HostUserData.findOne({
        user: req.userData.id,
      }).select('approvalStatus')
      return res.json({
        ...user.toObject(),
        approvalStatus: userData?.approvalStatus,
      })
    } else if (user && user.userType === 'guest') {
      const userData = await GuestUserData.findOne({ user: req.userData.id })
      return res.json({ user, userData })
    }
    res.json({ user })
  } catch (err) {
    console.error(`Err loadUser:`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})
// @route       GET api/auth/user/
// @desc        Get user details
// @access      Public
router.get('/user/host', userAuth, async (req: Request, res: Response) => {
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
    const user = await User.findById(new Types.ObjectId(req.userData.id))

    if (user && user.userType === 'host') {
      const userData = await HostUserData.findOne({
        user: req.userData.id,
      }).select('approvalStatus')

      return res.json({
        ...user.toObject(),
        approvalStatus: userData?.approvalStatus,
      })
    } else {
      return res
        .status(ErrorCode.HTTP_NOT_FOUND)
        .json(errorWrapper('User Not Found'))
    }
  } catch (err) {
    console.error(`Err loadUser:`, err)
    res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'))
  }
})

export default router
