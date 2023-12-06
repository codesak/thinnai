import checkAccess from '../../middleware/checkAccess';
import userAuth from '../../middleware/userAuth';
import AppSettings from '../../models/AppSettings';
import Booking from '../../models/Booking';
import GuestUserData from '../../models/GuestUserData';
import HostUserData from '../../models/HostUserData';
import Inquiry from '../../models/Inquiry';
import Property from '../../models/Property';
import Report from '../../models/Report';
import Section from '../../models/Section';
import ThinnaiDetail from '../../models/ThinnaiDetail';
import User from '../../models/User';
import UserData from '../../models/UserData';
import { ErrorCode, errorWrapper } from '../../utils/consts';
import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { Types } from 'mongoose';

const router = Router();


router.get(
	'/getall/bookings',
	/* userAuth,
	checkAccess('admin'), */
	async(req:Request,res:Response)=>{
		try{
			/* if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			} */
			const bookings=await Inquiry.find({isConfirmed:true}).
			populate(
				'guest','firstName lastName phone'
			).populate('property','propertyName locality')
			.populate('guestUserData','profession dateOfBirth')
			res.status(200).send(bookings)	

		}catch(e:any){
			console.log(e)
		}
	}
	)

// @route       GET api/admin/user/:userType/:userId
// @desc        Get Data for a user
// @access      Private
router.get(
	'/user/:userType/:userId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { userType, userId } = req.params;
			if (userType === 'host') {
				const hostUsersDb = await HostUserData.findById(userId)
					.populate('user')
					.select('-user.password');
				res.json(hostUsersDb?.toJSON());
			}
		} catch (err) {
			console.error(`Err loadUsers:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/updateUserData/:userTpe/:userId
// @desc        Update User Data by Admin
// @access      Private
router.patch(
	'/updateUserData/:userType/:userId',
	userAuth,
	checkAccess('admin'),
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const updatedData = req.body;
			const { userId, userType } = req.params;
			const { profileImage } = updatedData;
			if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			}

			//Temp hack
			if (updatedData.gender == '') {
				updatedData.gender = undefined;
			}
			if (updatedData.dateOfBirth === null) {
				updatedData.dateOfBirth = undefined;
			}

			let updatedUserData;
			if (userType === 'host') {
				updatedUserData = await HostUserData.findByIdAndUpdate(
					new Types.ObjectId(userId),
					updatedData,
					{
						new: true,
					}
				)
					.populate('user', 'firstName lastName email phone altPhone avatar profileImage')
					.populate(
						'properties.property',
						'propertyPictures propertyThumbnails propertyName showProperty propertyDescription approvalStatus'
					)
					.slice('wallet', 1);
				if (profileImage != null && updatedUserData) {
					updatedUserData.user.profileImage = profileImage;
					await updatedUserData.save();
				}
			} else if (userType === 'guest') {
				updatedUserData = await GuestUserData.findOneAndUpdate(
					{ user: new Types.ObjectId(userId) },
					updatedData,
					{
						new: true,
					}
				).populate('user', 'name email avatar profileImage');
			}

			if (!updatedUserData) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Profile Not Found'));
			}

			res.json({
				message: 'User Data Updated Successfully',
				userData: {
					...updatedUserData.toObject(),
					profileImage: updatedUserData.user.profileImage,
				},
			});
		} catch (err) {
			console.error(`Err updateUserData:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/updateProperty/:propertyId
// @desc        Update a Property by Admin
// @access      Private
router.patch(
	'/updateProperty/:propertyId',
	userAuth,
	checkAccess('admin'),
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
		check('slugString').optional().trim(),
		check('parkingType.*').optional().trim(),
		check('services.*').optional().trim(),
		check('alcoholAllowedFor.*').optional().trim(),
		check('maxGuestCount')
			.optional()
			.isNumeric()
			.withMessage('Max Guest Count must be numeric'),
		check('directBooking').optional().trim(),
		check('houseRules.*').optional().trim(),
		check('minDuration').optional().isNumeric().withMessage('Min Duration must be numeric'),
		check('visibility').optional().isNumeric().withMessage('Visibility must be numeric'),
		check('foodJoints.*.restaurantName').optional().trim(),
		check('foodJoints.*.cuisineType').optional().trim(),
		check('foodJoints.*.foodSuggestions').optional().trim(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { propertyId } = req.params;
			const updateData = req.body;
			if (propertyId === undefined || propertyId === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Property ID'));
			}

			const updatedProperty = await Property.findOneAndUpdate(
				{ _id: propertyId },
				updateData,
				{
					new: true,
				}
			);

			if (!updatedProperty) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property not found'));
			}

			res.json({
				message: 'Property Updated Successfully',
				property: updatedProperty,
			});
		} catch (err) {
			console.error(`Err updateProperty:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/section/add
// @desc        Add a section
// @access      Private
router.post(
	'/section/add',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('sectionHeading', 'Section Heading is required').trim().not().isEmpty(),
		check('page.*.pageName').optional().trim(),
		check('page.*.pageId').optional().trim(),
		check('page.*.content').optional().trim(),
		check('page.*.checkbox').optional().trim(),
		check('page.*.buttons').optional().trim(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { sectionHeading, page } = req.body;
			const newSection = new Section({
				sectionHeading,
				page,
			});
			await newSection.save();
			res.json({ message: 'Successfully added section', newSection });
		} catch (err) {
			console.error(`Err addPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/sections/
// @desc        Get all sections
// @access      Private
router.get('/sections/', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const sections = await Section.find().select('sectionHeading page.pageName');
		if (!sections)
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('No sections found'));
		res.json(sections);
	} catch (err) {
		console.error(`Err getSections:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/admin/section/page/add/:sectionId
// @desc        Add a Page
// @access      Private
router.post(
	'/section/page/add/:sectionId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('pageName', 'Page Name is required').trim().not().isEmpty(),
		check('content').optional().trim(),
		check('checkbox').optional().trim(),
		check('buttons').optional().trim(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { sectionId } = req.params;
			const { page, content, checkbox, buttons } = req.body;
			const updatedSection = await Section.findOneAndUpdate(
				{ _id: sectionId },
				{
					$push: {
						page: {
							pageName: page.pageName,
							content: content,
							checkbox: checkbox,
							buttons: buttons,
						},
					},
				},
				{ new: true }
			);
			if (!updatedSection) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Section not found'));
			}
			res.json({ message: 'Successfully added page', updatedSection });
		} catch (err) {
			console.error(`Err addPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/section/section/page/:sectionId/:pageId
// @desc        Get a page
// @access      Private
router.get(
	'/section/page/:sectionId/:pageId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { sectionId, pageId } = req.params;
			const page = await Section.findOne(
				{ _id: sectionId },
				{ page: { $elemMatch: { _id: pageId } } }
			);
			if (!page) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Page not found'));
			}
			res.json(page);
		} catch (err) {
			console.error(`Err getPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin//section/page/update/:sectionId/:pageId
// @desc        Update a Page
// @access      Private
router.patch(
	'/section/page/update/:sectionId/:pageId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[check('page.*', 'Page is required').trim().not().isEmpty()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { sectionId, pageId } = req.params;
			const updatedPage = req.body;
			const updatedSection = await Section.findOneAndUpdate(
				{ _id: sectionId },
				{
					$set: {
						'page.$[page]': updatedPage,
					},
				},
				{
					new: true,
					arrayFilters: [{ 'page._id': pageId }],
				}
			);
			if (!updatedSection)
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Section not found'));
			res.json({ message: 'Successfully updated page', updatedSection });
		} catch (err) {
			console.error(`Err updatePage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/city/add
// @desc        Add a city
// @access      Private
router.post(
	'/city/add',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('name', 'Name is required').trim().not().isEmpty(),
		check('thumbnail', 'Thumbnail is required').trim().not().isEmpty(),
		check('images.*', 'Images is required').trim().not().isEmpty(),
		check('landmarks.*').trim().optional(),
		check('description', 'Description is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { name, thumbnail, images, landmarks, description } = req.body;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$push: {
						cities: {
							name,
							thumbnail,
							images,
							landmarks,
							description,
						},
					},
				},
				{ new: true }
			).select('cities');
			res.json({ message: 'Successfully added city', cities });
		} catch (err) {
			console.error(`Err addCity:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/cities/
// @desc        Get all cities
// @access      Private
router.get('/cities/', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const cities = await AppSettings.find().select('cities');
		res.json(cities);
	} catch (err) {
		console.error(`Err getCities:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       PATCH api/admin/city/update/:cityId
// @desc        Update a city
// @access      Private
router.patch(
	'/city/update/:cityId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('name', 'Name is required').trim().not().isEmpty(),
		check('thumbnail', 'Thumbnail is required').trim().not().isEmpty(),
		check('images.*', 'Images is required').trim().not().isEmpty(),
		check('landmarks.*').trim().optional(),
		check('description', 'Description is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { cityId } = req.params;
			const updateBody = req.body;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						'cities.$[city]': updateBody,
					},
				},
				{
					new: true,
					arrayFilters: [{ 'city._id': cityId }],
				}
			).select('cities');
			res.json({ message: 'Successfully updated city', cities });
		} catch (err) {
			console.error(`Err updateCity:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/city/delete/:cityId
// @desc        Delete a city
// @access      Private
router.delete(
	'/city/delete/:cityId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { cityId } = req.params;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						cities: { _id: cityId },
					},
				},
				{ new: true }
			).select('cities');
			res.json({ message: 'Successfully deleted city', cities });
		} catch (err) {
			console.error(`Err deleteCity:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/city/landmark/add/:cityId
// @desc        Add a landmark
// @access      Private
router.post(
	'/city/landmark/add/:cityId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[check('landmark.*', 'Landmark is required').trim().not().isEmpty()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { cityId } = req.params;
			const { landmark } = req.body;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$push: {
						'cities.$[city].landmarks': landmark,
					},
				},
				{
					new: true,
					arrayFilters: [{ 'city._id': cityId }],
				}
			).select('cities');
			res.json({ message: 'Successfully added landmark', cities });
		} catch (err) {
			console.error(`Err addLandmark:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/city/landmark/delete/:cityId/:landmarkId
// @desc        Delete a landmark
// @access      Private
router.delete(
	'/city/landmark/delete/:cityId/:landmarkId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { cityId, landmarkId } = req.params;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						'cities.$[city].landmarks': { _id: landmarkId },
					},
				},
				{
					new: true,
					arrayFilters: [{ 'city._id': cityId }],
				}
			).select('cities');
			res.json({ message: 'Successfully deleted landmark', cities });
		} catch (err) {
			console.error(`Err deleteLandmark:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/fFoodJoint/add/:cityId/:landmarkId
// @desc        Add a food joint
// @access      Private
router.post(
	'/foodJoint/add/:cityId/:landmarkId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('name', 'name is required').trim().not().isEmpty(),
		check('cuisine', 'cuisine is required').trim().not().isEmpty(),
		check('recommendation.*', 'recommendation is required').trim().not().isEmpty(),
		check('review', 'review is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { cityId, landmarkId } = req.params;
			const { name, cuisine, recommendation, review } = req.body;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$push: {
						'cities.$[city].landmarks.$[landmark].foodJoints': {
							name,
							cuisine,
							recommendation,
							review,
						},
					},
				},
				{
					new: true,
					arrayFilters: [{ 'city._id': cityId }, { 'landmark._id': landmarkId }],
				}
			).select('cities');
			res.json({ message: 'Successfully added food joint', cities });
		} catch (err) {
			console.error(`Err addFoodJoint:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/foodJoint/update/:cityId/:landmarkId/:foodJointId
// @desc        Update a food joint
// @access      Private
router.patch(
	'/foodJoint/update/:cityId/:landmarkId/:foodJointId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('name').trim().optional(),
		check('cuisine').trim().optional(),
		check('recommendation.*').trim().optional(),
		check('review').trim().optional(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { cityId, landmarkId, foodJointId } = req.params;
			const updateBody = req.body;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						'cities.$[city].landmarks.$[landmark].foodJoints.$[foodJoint]': updateBody,
					},
				},
				{
					new: true,
					arrayFilters: [
						{ 'city._id': cityId },
						{ 'landmark._id': landmarkId },
						{ 'foodJoint._id': foodJointId },
					],
				}
			).select('cities');
			res.json({ message: 'Successfully updated food joint', cities });
		} catch (err) {
			console.error(`Err updateFoodJoint:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/foodJoint/delete/:cityId/:landmarkId/:foodJointId
// @desc        Delete a food joint
// @access      Private
router.delete(
	'/foodJoint/delete/:cityId/:landmarkId/:foodJointId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { cityId, landmarkId, foodJointId } = req.params;
			const cities = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						'cities.$[city].landmarks.$[landmark].foodJoints': { _id: foodJointId },
					},
				},
				{
					new: true,
					arrayFilters: [
						{ 'city._id': cityId },
						{ 'landmark._id': landmarkId },
						{ 'foodJoint._id': foodJointId },
					],
				}
			).select('cities');
			res.json({ message: 'Successfully deleted food joint', cities });
		} catch (err) {
			console.error(`Err deleteFoodJoint:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/pricing/add
// @desc        Add pricing
// @access      Private
router.post(
	'/pricing/add',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('spaceType', 'space type is required').trim().not().isEmpty(),
		check('typeOfHour.*', 'type of hour is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { spaceType, typeOfHour } = req.body;
			const pricing = await AppSettings.findOneAndUpdate(
				{},
				{
					$push: {
						pricing: {
							spaceType,
							typeOfHour,
						},
					},
				},
				{
					new: true,
				}
			).select('pricing');
			res.json({ message: 'Successfully added pricing', pricing });
		} catch (err) {
			console.error(`Err addPricing:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/updateFoodJoint/:foodJointId
// @desc        Update a food joint
// @access      Private
router.patch(
	'/pricing/update/:pricingId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[check('spaceType').trim().optional(), check('typeOfHour.*').trim().optional()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { pricingId } = req.params;
			const updateBody = req.body;
			const pricing = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						'pricing.$[pricing]': {
							...updateBody,
						},
					},
				},
				{
					new: true,
					arrayFilters: [{ 'pricing._id': pricingId }],
				}
			).select('pricing');
			res.json({ message: 'Successfully updated pricing', pricing });
		} catch (err) {
			console.error(`Err updatePricing:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/pricing/delete/:pricingId
// @desc        Delete a foodJoint
// @access      Private
router.delete(
	'/pricing/delete/:pricingId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { pricingId } = req.params;
			const pricing = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						pricing: { _id: pricingId },
					},
				},
				{
					new: true,
				}
			).select('pricing');
			res.json({ message: 'Successfully deleted pricing', pricing });
		} catch (err) {
			console.error(`Err deletePricing:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/thinnaiDetails/update
// @desc        Update thinnaiDetails
// @access      Private
router.post(
	'/thinnaiDetails/update',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('element', 'Element is required').trim().not().isEmpty(),
		check('updateData.*', 'Update data is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { element, updateData } = req.body;
			const details = await ThinnaiDetail.findOneAndUpdate(
				{},
				{
					$set: {
						[element]: updateData,
					},
				},
				{
					new: true,
				}
			);
			res.json({ message: 'Successfully updated thinnai details', details });
		} catch (err) {
			console.error(`Err updateThinnaiDetail:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/thinnaiDetails/
// @desc        Get thinnai details
// @access      Private
router.get(
	'/thinnaiDetails/',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const thinnaiDetail = await ThinnaiDetail.find({});
			res.json(thinnaiDetail);
		} catch (err) {
			console.error(`Err getThinnaiDetails:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/guestLanding/update
// @desc        Add guest landing page details
// @access      Private
router.post(
	'/guestLanding/add',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('pinnedPropertyId').trim().optional(),
		check('blog.*').trim().optional(),
		check('testimonial.*').trim().optional(),
		check('featuredOn.*').trim().optional(),
		check('faq.*').trim().optional(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { pinnedPropertyId, blog, testimonial, featuredOn, faq } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						guestLandingPage: {
							pinnedPropertyId,
							blog,
							testimonial,
							featuredOn,
							faq,
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully added guest landing page details', details });
		} catch (err) {
			console.error(`Err addGuestLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/guestLanding/update
// @desc        Update guest landing page details
// @access      Private
router.patch(
	'/guestLanding/update',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('element', 'Element is required').trim().not().isEmpty(),
		check('updateData.*', 'Update data is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { element, updateData } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						guestLandingPage: {
							[element]: updateData,
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully updated guest landing page details', details });
		} catch (err) {
			console.error(`Err updateGuestLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/guestLanding/update
// @desc        Delete guest landing page details
// @access      Private
router.delete(
	'/guestLanding/delete',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('element', 'Element is required').trim().not().isEmpty(),
		check('elementId', 'Element ID is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { element, elementId } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						guestLandingPage: {
							[element]: { _id: elementId },
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully deleted guest landing page details', details });
		} catch (err) {
			console.error(`Err updateGuestLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/hostLanding/update
// @desc        Add host landing page details
// @access      Private
router.post(
	'/hostLanding/add',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('blog.*').trim().optional(),
		check('featuredOn.*').trim().optional(),
		check('faq.*').trim().optional(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { blog, featuredOn, faq } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						hostLandingPage: {
							blog,
							featuredOn,
							faq,
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully added host landing page details', details });
		} catch (err) {
			console.error(`Err addHostLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       PATCH api/admin/hostLanding/update
// @desc        Update host landing page details
// @access      Private
router.patch(
	'/hostLanding/update',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('element', 'Element is required').trim().not().isEmpty(),
		check('updateData.*', 'Update data is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { element, updateData } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$set: {
						hostLandingPage: {
							[element]: updateData,
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully updated host landing page details', details });
		} catch (err) {
			console.error(`Err updateHostLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       DELETE api/admin/hostLanding/update
// @desc        Delete host landing page details
// @access      Private
router.delete(
	'/hostLanding/delete',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('element', 'Element is required').trim().not().isEmpty(),
		check('elementId', 'Element ID is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { element, elementId } = req.body;
			const details = await AppSettings.findOneAndUpdate(
				{},
				{
					$pull: {
						hostLandingPage: {
							[element]: { _id: elementId },
						},
					},
				},
				{ new: true }
			);
			if (!details) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('App settings not found'));
			}
			res.json({ message: 'Successfully deleted host landing page details', details });
		} catch (err) {
			console.error(`Err updateHostLandingPage:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/userAccess/update
// @desc        Update user access
// @access      Private
router.post(
	'/userAccess/update',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('email', 'Email is required').trim().not().isEmpty(),
		check('accessType', 'Access Type is required').trim().not().isEmpty(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { email, accessType } = req.body;
			const accessList = await User.findOneAndUpdate(
				{ email },
				{
					$set: {
						userType: accessType,
					},
				},
				{
					new: true,
				}
			);
			if (!accessList) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Email not found'));
			}
			res.json(accessList);
		} catch (err) {
			console.error(`Err updateUserAccess:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/properties
// @desc        Get all Properties for Admin
// @access      Private
router.get(
	'/properties/:location/:spaceStatus',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { location, spaceStatus } = req.params;
			const properties = await Property.find({ city: location, isActive: spaceStatus })
				.populate('user', ['firstName', 'lastName', 'email', 'profileImage', 'avatar'])
				.select('propertyName city state isActive user');

			res.json(properties);
		} catch (err) {
			console.error(`Err loadUsers:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/property/:propertyId
// @desc        Get a Property for Admin
// @access      Private
router.get(
	'/property/:propertyId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { propertyId } = req.params;

			const property = await Property.findOne({ _id: propertyId })
				.populate({
					path: 'userData',
					select: 'aboutYourself guestsHosted ratings user',
				})
				.populate({
					path: 'user',
					select: 'firstName lastName profileImage avatar',
				})
				.populate({
					path: 'reviews.reviewer',
					select: 'firstName profileImage avatar',
				});
			if (!property) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property Not Found'));
			}

			const reviewCount = property.reviews.length;

			const cleanlinessRatings = property.reviews.reduce(
				(acc, review) => {
					if (review.cleanliness === 'good') {
						acc.good++;
					} else if (review.cleanliness === 'neutral') {
						acc.neutral++;
					} else {
						acc.bad++;
					}
					return acc;
				},
				{ good: 0, neutral: 0, bad: 0 }
			);

			const checkInRatings = property.reviews.reduce(
				(acc, review) => {
					if (review.checkIn === 'good') {
						acc.good++;
					} else if (review.checkIn === 'neutral') {
						acc.neutral++;
					} else {
						acc.bad++;
					}
					return acc;
				},
				{ good: 0, neutral: 0, bad: 0 }
			);

			if (reviewCount > 0) {
				property.reviews = property.reviews.slice(0, 10);
			}

			res.json({ property, reviewCount, cleanlinessRatings, checkInRatings });
		} catch (err) {
			console.error(`Err loadUsers:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/property/review/status/:propertyId/:reviewId
// @desc        Get all Properties for Admin
// @access      Private
router.post(
	'/property/review/status/:propertyId/:reviewId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[check('status', 'Status is required').trim().not().isEmpty()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { propertyId, reviewId } = req.params;
			const { status } = req.body;

			await Property.findOneAndUpdate(
				{ _id: propertyId },
				{
					$set: {
						'reviews.$[review].status': status,
					},
				},
				{
					new: true,
					arrayFilters: [{ 'review._id': reviewId }],
				}
			);

			res.json({ message: 'Review Status Updated' });
		} catch (err) {
			console.error(`Err loadUsers:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/properties
// @desc        Get all Properties for Admin
// @access      Private
router.get('/guests', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const properties = await User.find({ userType: 'guest' }).select(
			'firstName lastName email phone profileImage avatar'
		);

		res.json(properties);
	} catch (err) {
		console.error(`Err loadUsers:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/admin/guest/:guestId
// @desc        Get a guest for Admin
// @access      Private
router.get(
	'/guest/:guestId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { guestId } = req.params;
			const guest = await UserData.find({ user: guestId })
			.populate({
				path: 'friendList',
				select: 'firstName lastName email phone profileImage avatar',
			})
			.select(
				'firstName lastName email phone profileImage avatar'
			);

			const totalEnquiries = await Inquiry.find({ guest: guestId }).countDocuments();

			const bookings: any = await Booking.find({ guest: guestId })
				.populate('property', ['propertyName'])
				.populate({
					path: 'reviews',
					populate: {
						path: 'hostReview',
						select: 'propertyName',
					},
				});

			const totalBookings = bookings.filter(
				(booking: any) => booking.bookingStatus !== 'cancelled'
			).length;
			const totalCancelledBookings = bookings.filter(
				(booking: any) => booking.bookingStatus !== 'cancelled'
			).length;
			const totalRescheduledBookings = bookings.filter(
				(booking: any) => booking.rescheduledByGuest === true
			).length;

			const bookingHistory = bookings.map((booking: any) => {
				const { property, bookingStatus, bookingFrom, checkIn, invitedGuests } = booking;
				return {
					property,
					bookingStatus,
					bookingFrom,
					checkIn,
					invitedGuests: invitedGuests.length + 1,
				};
			});

			const reportsByGuest = await Report.find({ userId: guestId })
				.populate({
					path: 'bookingId',
					populate: {
						path: 'property',
						select: 'propertyName',
					},
				})
				.select('bookingId category status');
			const totalReportsByGuest = reportsByGuest.length;
			const reportsForGuest = await Report.find({ reportedUserId: guestId })
				.populate({
					path: 'bookingId',
					populate: {
						path: 'property',
						select: 'propertyName',
					},
				})
				.select('bookingId category status');
			const totalReportsForGuest = reportsForGuest.length;
			const totalActiveReports = await Report.find({
				userId: guestId,
				reportStatus: 'active',
			}).countDocuments();

			const totalReviewsForGuest = bookings.reviews.hostReview.length;
			const totalReviewsForHost = bookings.reviews.guestReview.length;
			const totalReviewsForSpace = bookings.reviews.propertyReview.length;

			const reviewsForGuest = bookings.reviews.hostReview.map((review: any) => {
				const reviewData = UserData.aggregate(
					[
						{
							$unwind: '$reviews',
						},
						{
							$match: {
								'reviews._id': review._id,
							},
						},
						{
							$project: {
								reviews: {
									$filter: {
										input: '$reviews',
										as: 'review',
										cond: {
											$eq: ['$$review._id', review._id],
										},
									},
								},
							},
						},
					],
					(err: any, result: any) => {
						if (err) {
							console.log(err);
						} else {
							return result;
						}
					}
				);

				return {
					reviewData,
				};
			});

			const reviewsForHost = bookings.reviews.guestReview.map((review: any) => {
				const reviewData = UserData.aggregate(
					[
						{
							$unwind: '$reviews',
						},
						{
							$match: {
								'reviews._id': review._id,
							},
						},
						{
							$project: {
								reviews: {
									$filter: {
										input: '$reviews',
										as: 'review',
										cond: {
											$eq: ['$$review._id', review._id],
										},
									},
								},
							},
						},
					],
					(err: any, result: any) => {
						if (err) {
							console.log(err);
						} else {
							return result;
						}
					}
				);

				return {
					reviewData,
				};
			});

			res.json({
				guest,
				totalEnquiries,
				totalBookings,
				totalCancelledBookings,
				totalRescheduledBookings,
				bookingHistory,
				reportsByGuest,
				totalReportsByGuest,
				reportsForGuest,
				totalReportsForGuest,
				totalActiveReports,
				totalReviewsForGuest,
				totalReviewsForHost,
				totalReviewsForSpace,
				reviewsForGuest,
				reviewsForHost,
			});
		} catch (err) {
			console.error(`Err loadUsers:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
