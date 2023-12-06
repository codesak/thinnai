import { Request, Response, Router } from 'express';
const router = Router();
import { check, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import Property from '../../models/Property';
import Inquiry from '../../models/Inquiry';
import Booking from '../../models/Booking';
import HostUserData from '../../models/HostUserData';
import userAuth from '../../middleware/userAuth';
import checkAccess from '../../middleware/checkAccess';
import { ErrorCode, errorWrapper } from '../../utils/consts';

// @route       GET api/dashboard
// @desc        Get Dashboard
// @access      Public
router.get('/', userAuth, checkAccess('host'), async (req: Request, res: Response) => {
	try {
		if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}
		const userData = await HostUserData.findOne({ user: req.userData.id })
			.populate('user', 'firstName lastName avatar profileImage')
			.populate('properties.property', ' propertyName');
		if (!userData) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('User Data not found'));
		}
		res.json({
			properties: userData.properties,
			profileImage: userData.user.profileImage,
			avatar: userData.user.avatar,
			userId: userData.user._id,
		});
	} catch (err) {
		console.error(`Err loadDashboard:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/dashboard/data
// @desc        Get Dashboard
// @access      Public
router.get(
	'/data/:propertyId',
	userAuth,
	checkAccess('host'),
	//**********************************Validations**********************************/
	[
		check('from', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
		check('to', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
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
			const fromDate: string = req.query.from as string;
			const toDate: string = req.query.to as string;
		  
			// Parse the date strings into Date objects
			const from: Date = new Date(fromDate);
			const to: Date = new Date(toDate);
			if (isNaN(from.getTime()) || isNaN(to.getTime())) {
				res.status(400).json({ error: 'Invalid date values' });
				return;
			  }

			if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			}

			const property = await Property.findOne({ _id: propertyId });
			if (!property) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property not found'));
			}

			const userData = await HostUserData.findOne({ user: req.userData.id });
			if (!userData) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('User Data not found'));
			}

			const dashboardOverview = await Booking.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
					},
				},
				{
					$lookup: {
						from: 'inquiries',
						localField: 'inquiry',
						foreignField: '_id',
						as: 'inquirys',
					},
				},
				{
					$unwind: '$inquirys',
				},
				{
					$facet: {
						totalRevenue: [
							{
								$match: { bookingStatus: { $not: { $eq: 'cancelled' } } },
							},
							{
								$group: {
									_id: null,
									totalEarning: { $sum: '$inquirys.amount' },
								},
							},
						],
						totalBookings: [
							{
								$match: { bookingStatus: { $not: { $eq: 'cancelled' } } },
							},
							{ $count: 'totalBookings' },
						],
						overallRating: [
							{
								$match: {
									bookingStatus: 'completed',
								},
							},
							{
								$group: {
									_id: null,
									overallRating: { $avg: '$reviews.guestReview.rating' },
								},
							},
						],
						happyCustomers: [
							{
								$match: {
									bookingStatus: 'completed',
								},
							},
							{
								$group: {
									_id: null,
									count: {
										$sum: { $size: '$inquirys.invitedGuests' },
									},
								},
							},
						],
						totalReviews: [
							{
								$match: {
									bookingStatus: 'completed',
									'reviews.guestReview.review': { $exists: true, $nin: [''] },
									bookingConfirmedAt: {
										$gte: new Date(from),
										$lte: new Date(to),
									},
								},
							},
							{ $count: 'totalReviews' },
						],
						totalBookingsBetween: [
							{
								$match: {
									bookingStatus: { $not: { $eq: 'cancelled' } },
									bookingConfirmedAt: {
										$gte: new Date(from),
										$lte: new Date(to),
									},
								},
							},
							{ $count: 'totalBookingsBetween' },
						],
						totalRevenueBetween: [
							{
								$match: {
									bookingStatus: { $not: { $eq: 'cancelled' } },
									bookingConfirmedAt: {
										$gte: new Date(from),
										$lte: new Date(to),
									},
								},
							},
							{
								$group: {
									_id: null,
									totalRevenueBetween: { $sum: '$inquirys.amount' },
								},
							},
						],
					},
				},
				{
					$project: {
						totalRevenue: { $arrayElemAt: ['$totalRevenue.totalRevenue', 0] },
						totalBookings: {
							$arrayElemAt: ['$totalBookings.totalBookings', 0],
						},
						overallRating: { $arrayElemAt: ['$overallRating.overallRating', 0] },
						happyCustomers: { $arrayElemAt: ['$happyCustomers.count', 0] },
						totalReviews: { $arrayElemAt: ['$totalReviews.totalReviews', 0] },
						totalBookingsBetween: {
							$arrayElemAt: ['$totalBookingsBetween.totalBookingsBetween', 0],
						},
						totalRevenueBetween: {
							$arrayElemAt: ['$totalRevenueBetween.totalRevenueBetween', 0],
						},
					},
				},
			]);

			const dashboardRates = await Inquiry.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
						createdAt: { $gte: new Date(from), $lte: new Date(to) },
					},
				},
				{
					$facet: {
						totalInquiries: [{ $count: 'totalInquiries' }],
						acceptedInquiries: [
							{
								$match: {
									$or: [
										{
											inquiryStatus: 'confirmed',
										},
										{
											inquiryStatus: 'completed',
										},
									],
								},
							},
							{
								$count: 'acceptedInquiries',
							},
						],
						revenueLost: [
							{
								$match: { inquiryStatus: 'cancelled' },
							},
							{
								$group: {
									_id: null,
									revenueLost: { $sum: '$amount' },
								},
							},
						],
					},
				},
				{
					$project: {
						cancellationRate: { $literal: 60 },
						acceptanceRate: {
							$multiply: [
								{
									$divide: [
										{
											$arrayElemAt: ['$acceptedInquiries.acceptedInquiries', 0],
										},
										{
											$arrayElemAt: ['$totalInquiries.totalInquiries', 0],
										},
									],
								},
								100,
							],
						},
						avgResponseTime: { $literal: 60 },
						revenueLost: { $arrayElemAt: ['$revenueLost.revenueLost', 0] },
					},
				},
			]);

			property.totalBookings = dashboardOverview[0].totalBookings;
			property.happyCustomers = dashboardOverview[0].happyCustomers;
			property.totalReviews = dashboardOverview[0].totalReviews;
			property.save();

			userData.acceptanceRate = dashboardRates[0].acceptanceRate;
			userData.cancellationRate = dashboardRates[0].cancellationRate;
			userData.avgResponseTime = dashboardRates[0].avgResponseTime;
			userData.save();

			res.json({
				dashboardOverview: dashboardOverview[0],
				dashboardRates: dashboardRates[0],
			});
		} catch (err) {
			console.error(`Err loadDashboardData:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/dashboard/reviews
// @desc        Get Reviews Overview
// @access      Public
router.get(
	'/reviews/:propertyId',
	userAuth,
	checkAccess('host'),
	//**********************************Validations**********************************/
	[
		check('from', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
		check('to', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
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
			const fromDate: string = req.query.from as string;
			const toDate: string = req.query.to as string;
		  
			// Parse the date strings into Date objects
			const from: Date = new Date(fromDate);
			const to: Date = new Date(toDate);
			if (isNaN(from.getTime()) || isNaN(to.getTime())) {
				res.status(400).json({ error: 'Invalid date values' });
				return;
			  }

			if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			}

			const property = await Property.findOne({ _id: propertyId });
			if (!property) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property not found'));
			}

			const reviewOverview = await Booking.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
						bookingConfirmedAt: { $gte: new Date(from), $lte: new Date(to) },
						bookingStatus: 'completed',
					},
				},
				{
					$facet: {
						overallRating: [
							{
								$match: {
									'reviews.guestReview.rating': { $exists: true, $nin: [''] },
								},
							},
							{
								$group: {
									_id: null,
									overallRating: { $avg: '$reviews.guestReview.rating' },
								},
							},
						],
						totalReviews: [
							{
								$match: {
									'reviews.guestReview.review': { $exists: true, $nin: [''] },
								},
							},
							{ $count: 'totalReviews' },
						],
						photoRelevance: [
							{
								$match: {
									'reviews.guestReview.photoRelevance': {
										$exists: true,
										$in: [true, false],
									},
								},
							},
							{
								$group: {
									_id: null,
									positive: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.photoRelevance', true] }, 1, 0],
										},
									},
									negative: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.photoRelevance', false] }, 1, 0],
										},
									},
								},
							},
						],
						cleanliness: [
							{
								$match: {
									'reviews.guestReview.cleanliness': {
										$exists: true,
										$in: [true, false],
									},
								},
							},
							{
								$group: {
									_id: null,
									positive: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.cleanliness', true] }, 1, 0],
										},
									},
									negative: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.cleanliness', false] }, 1, 0],
										},
									},
								},
							},
						],
						checkIn: [
							{
								$match: {
									'reviews.guestReview.checkIn': {
										$exists: true,
										$in: [true, false],
									},
								},
							},
							{
								$group: {
									_id: null,
									positive: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.checkIn', true] }, 1, 0],
										},
									},
									negative: {
										$sum: {
											$cond: [{ $eq: ['$reviews.guestReview.checkIn', false] }, 1, 0],
										},
									},
								},
							},
						],
						review: [
							{
								$lookup: {
									from: 'inquiries',
									localField: 'inquiry',
									foreignField: '_id',
									as: 'inquirys',
								},
							},
							{
								$unwind: '$inquirys',
							},
							{
								$match: {
									'reviews.guestReview.review': { $exists: true, $nin: [''] },
								},
							},
							{
								$lookup: {
									from: 'users',
									localField: 'inquirys.guest',
									foreignField: '_id',
									as: 'inquirys.guest',
								},
							},
							{
								$group: {
									_id: { guest: '$inquirys.guest._id' },
									name: { $first: '$inquirys.guest.name' },
									avatar: { $first: '$inquirys.guest.avatar' },
									profileImage: { $first: '$inquirys.guest.profileImage' },
									review: { $first: '$reviews.guestReview.review' },
									reviewedAt: { $first: '$reviews.guestReview.reviewedAt' },
									post: { $first: '$reviews.guestReview.post' },
									hostReply: { $first: '$reviews.hostReply.reply' },
									hostReplyAt: { $first: '$reviews.hostReplyAt.repliedAt' },
								},
							},
							{
								$sort: {
									reviewedAt: -1,
								},
							},
							{
								$project: {
									_id: 0,
									guest: { $arrayElemAt: ['$_id.guest', 0] },
									name: { $arrayElemAt: ['$name', 0] },
									avatar: { $arrayElemAt: ['$avatar', 0] },
									profileImage: { $arrayElemAt: ['$profileImage', 0] },
									review: '$review',
									reviewedAt: '$reviewedAt',
									post: '$post',
									hostReply: '$hostReply',
									hostReplyAt: '$hostReplyAt',
								},
							},
							{
								$limit: 15,
							},
						],
					},
				},
				{
					$project: {
						overallRating: {
							$arrayElemAt: ['$overallRating.overallRating', 0],
						},
						totalReviews: { $arrayElemAt: ['$totalReviews.totalReviews', 0] },
						photoRelevance: {
							$arrayElemAt: ['$photoRelevance', 0],
						},
						cleanliness: {
							$arrayElemAt: ['$cleanliness', 0],
						},
						checkIn: {
							$arrayElemAt: ['$checkIn', 0],
						},
						review: '$review',
					},
				},
			]);

			res.json({
				reviewOverview: reviewOverview[0],
			});
		} catch (err) {
			console.error(`Err loadReviews:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/dashboard/bookings
// @desc        Get Bookings Overview
// @access      Public
router.get(
	'/bookings/:propertyId',
	userAuth,
	checkAccess('host'),
	//**********************************Validations**********************************/
	[
		check('from', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
		check('to', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
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
			const fromDate: string = req.query.from as string;
			const toDate: string = req.query.to as string;
		  
			// Parse the date strings into Date objects
			const from: Date = new Date(fromDate);
			const to: Date = new Date(toDate);
			if (isNaN(from.getTime()) || isNaN(to.getTime())) {
				res.status(400).json({ error: 'Invalid date values' });
				return;
			  }

			if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			}

			const property = await Property.findOne({ _id: propertyId });
			if (!property) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property not found'));
			}

			const bookingsOverview = await Booking.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
						bookingConfirmedAt: { $gte: new Date(from), $lte: new Date(to) },
					},
				},
				{
					$lookup: {
						from: 'inquiries',
						localField: 'inquiry',
						foreignField: '_id',
						as: 'inquirys',
					},
				},
				{
					$unwind: '$inquirys',
				},
				{
					$facet: {
						totalBookings: [
							{
								$match: { bookingStatus: { $not: { $eq: 'cancelled' } } },
							},
							{ $count: 'totalBookings' },
						],
						cancelledByHost: [
							{
								$match: {
									bookingStatus: 'cancelled',
									'cancelledBy.host': { $exists: true, $in: [true] },
								},
							},
							{ $count: 'cancelledByHost' },
						],
						cancelledByGuest: [
							{
								$match: {
									bookingStatus: 'cancelled',
									'cancelledBy.guest': { $exists: true, $in: [true] },
								},
							},
							{ $count: 'cancelledByGuest' },
						],
						totalBookingsGraph: [
							{
								$match: { bookingStatus: { $not: { $eq: 'cancelled' } } },
							},
							{
								$group: {
									_id: {
										$dateToString: {
											format: '%d-%m-%Y',
											date: '$bookingConfirmedAt',
										},
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						cancelledByHostGraph: [
							{
								$match: {
									bookingStatus: 'cancelled',
									'cancelledBy.host': { $exists: true, $in: [true] },
								},
							},
							{
								$group: {
									_id: {
										$dateToString: {
											format: '%d-%m-%Y',
											date: '$bookingConfirmedAt',
										},
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						cancelledByGuestGraph: [
							{
								$match: {
									bookingStatus: 'cancelled',
									'cancelledBy.guest': { $exists: true, $in: [true] },
								},
							},
							{
								$group: {
									_id: {
										$dateToString: {
											format: '%d-%m-%Y',
											date: '$bookingConfirmedAt',
										},
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						eighteenTwentyFive: [
							{
								$unwind: '$inquirys.invitedGuests',
							},
							{
								$match: {
									'inquirys.invitedGuests.age': { $gte: 18, $lte: 25 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '18-25' },
									count: { $sum: 1 },
								},
							},
						],
						twentySixThirtyThree: [
							{
								$unwind: '$inquirys.invitedGuests',
							},
							{
								$match: {
									'inquirys.invitedGuests.age': { $gte: 26, $lte: 33 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '26-33' },
									count: { $sum: 1 },
								},
							},
						],
						thirtyFourFortyFive: [
							{
								$unwind: '$inquirys.invitedGuests',
							},
							{
								$match: {
									'inquirys.invitedGuests.age': { $gte: 34, $lte: 45 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '34-45' },
									count: { $sum: 1 },
								},
							},
						],
						fortyFivePlus: [
							{
								$unwind: '$inquirys.invitedGuests',
							},
							{
								$match: {
									'inquirys.invitedGuests.age': { $gte: 46 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '45+' },
									count: { $sum: 1 },
								},
							},
						],
						FriendsGroup: [
							{
								$match: {
									'inquirys.groupType': 'Friends',
								},
							},
							{
								$count: 'count',
							},
						],
						FamilyGroup: [
							{
								$match: {
									'inquirys.groupType': 'Family',
								},
							},
							{
								$count: 'count',
							},
						],
						guestCountOne: [
							{
								$match: {
									'inquirys.guestCount': 1,
								},
							},
							{
								$group: {
									_id: { guestCount: '1' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountTwo: [
							{
								$match: {
									'inquirys.guestCount': 2,
								},
							},
							{
								$group: {
									_id: { guestCount: '2' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountThreeToFive: [
							{
								$match: {
									'inquirys.guestCount': { $gte: 3, $lte: 5 },
								},
							},
							{
								$group: {
									_id: { guestCount: '3-5' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountFivePlus: [
							{
								$match: {
									'inquirys.guestCount': { $gte: 5 },
								},
							},
							{
								$group: {
									_id: { guestCount: '5+' },
									count: { $sum: 1 },
								},
							},
						],
					},
				},
				{
					$project: {
						totalBookings: {
							$arrayElemAt: ['$totalBookings.totalBookings', 0],
						},
						cancelledByHost: {
							$arrayElemAt: ['$cancelledByHost.cancelledByHost', 0],
						},
						cancelledByGuest: {
							$arrayElemAt: ['$cancelledByGuest.cancelledByGuest', 0],
						},
						totalBookingsGraph: '$totalBookingsGraph',
						cancelledByHostGraph: '$cancelledByHostGraph',
						cancelledByGuestGraph: '$cancelledByGuestGraph',
						ageGroup: {
							eighteenTwentyFive: {
								$arrayElemAt: ['$eighteenTwentyFive.count', 0],
							},
							twentySixThirtyThree: {
								$arrayElemAt: ['$twentySixThirtyThree.count', 0],
							},
							thirtyFourFortyFive: {
								$arrayElemAt: ['$thirtyFourFortyFive.count', 0],
							},
							fortyFivePlus: { $arrayElemAt: ['$fortyFivePlus.count', 0] },
						},
						groupType: {
							FriendsGroup: { $arrayElemAt: ['$FriendsGroup.count', 0] },
							FamilyGroup: { $arrayElemAt: ['$FamilyGroup.count', 0] },
						},
						guestCount: {
							guestCountOne: { $arrayElemAt: ['$guestCountOne.count', 0] },
							guestCountTwo: { $arrayElemAt: ['$guestCountTwo.count', 0] },
							guestCountThreeToFive: {
								$arrayElemAt: ['$guestCountThreeToFive.count', 0],
							},
							guestCountFivePlus: {
								$arrayElemAt: ['$guestCountFivePlus.count', 0],
							},
						},
					},
				},
			]);

			res.json({
				bookingsOverview: bookingsOverview[0],
			});
		} catch (err) {
			console.error(`Err loadDashboardBookings:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/dashboard/revenue
// @desc        Get revenue overview
// @access      Public
router.get(
	'/revenue/:propertyId',
	userAuth,
	checkAccess('host'),
	//**********************************Validations**********************************/
	[
		check('from', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
		check('to', 'time from is required')
			.not()
			.isEmpty()
			.isISO8601()
			.withMessage('Booking From is not a valid date'),
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
			const fromDate: string = req.query.from as string;
			const toDate: string = req.query.to as string;
		  
			// Parse the date strings into Date objects
			const from: Date = new Date(fromDate);
			const to: Date = new Date(toDate);
			if (isNaN(from.getTime()) || isNaN(to.getTime())) {
				res.status(400).json({ error: 'Invalid date values' });
				return;
			  }

			if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
			}

			const property = await Property.findById(propertyId);
			if (!property) {
				return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Property Not Found'));
			}

			const revenue = await Booking.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
						bookingConfirmedAt: { $gte: new Date(from), $lte: new Date(to) },
					},
				},
				{
					$lookup: {
						from: 'inquiries',
						localField: 'inquiry',
						foreignField: '_id',
						as: 'inquirys',
					},
				},
				{
					$unwind: '$inquirys',
				},
				{
					$facet: {
						totalRevenue: [
							{
								$match: { bookingStatus: { $not: { $eq: 'cancelled' } } },
							},
							{
								$group: {
									_id: null,
									totalRevenue: { $sum: '$inquirys.amount' },
								},
							},
						],
					},
				},
				{
					$project: {
						totalRevenue: { $arrayElemAt: ['$totalRevenue.totalRevenue', 0] },
					},
				},
			]);

			const inquiryCount = await Inquiry.aggregate([
				{
					$match: {
						property: new Types.ObjectId(propertyId),
						createdAt: { $gte: new Date(from), $lte: new Date(to) },
					},
				},
				{
					$facet: {
						totalInquiries: [
							{
								$group: {
									_id: {
										$dateToString: { format: '%d-%m-%Y', date: '$createdAt' },
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						convertedInquiries: [
							{
								$match: {
									$or: [
										{
											inquiryStatus: 'confirmed',
										},
										{
											inquiryStatus: 'completed',
										},
									],
								},
							},
							{
								$group: {
									_id: {
										$dateToString: { format: '%d-%m-%Y', date: '$createdAt' },
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						cancelledInquiries: [
							{
								$match: { inquiryStatus: 'cancelled' },
							},
							{
								$group: {
									_id: {
										$dateToString: { format: '%d-%m-%Y', date: '$createdAt' },
									},
									count: { $sum: 1 },
								},
							},
							{ $sort: { _id: 1 } },
						],
						eighteenTwentyFive: [
							{ $unwind: '$invitedGuests' },
							{
								$match: {
									'invitedGuests.age': { $gte: 18, $lte: 25 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '18-25' },
									count: { $sum: 1 },
								},
							},
						],
						twentySixThirtyThree: [
							{ $unwind: '$invitedGuests' },
							{
								$match: {
									'invitedGuests.age': { $gte: 26, $lte: 33 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '26-33' },
									count: { $sum: 1 },
								},
							},
						],
						thirtyFourFortyFive: [
							{ $unwind: '$invitedGuests' },
							{
								$match: {
									'invitedGuests.age': { $gte: 34, $lte: 45 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '34-45' },
									count: { $sum: 1 },
								},
							},
						],
						fortyFivePlus: [
							{ $unwind: '$invitedGuests' },
							{
								$match: {
									'invitedGuests.age': { $gte: 46 },
								},
							},
							{
								$group: {
									_id: { ageGroup: '45+' },
									count: { $sum: 1 },
								},
							},
						],
						FriendsGroup: [
							{
								$match: {
									groupType: 'Friends',
								},
							},
							{
								$group: {
									_id: { groupType: 'Friends' },
									count: { $sum: 1 },
								},
							},
						],
						FamilyGroup: [
							{
								$match: {
									groupType: 'Family',
								},
							},
							{
								$group: {
									_id: { groupType: 'Family' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountOne: [
							{
								$match: {
									guestCount: 1,
								},
							},
							{
								$group: {
									_id: { guestCount: '1' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountTwo: [
							{
								$match: {
									guestCount: 2,
								},
							},
							{
								$group: {
									_id: { guestCount: '2' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountThreeToFive: [
							{
								$match: {
									guestCount: { $gte: 3, $lte: 5 },
								},
							},
							{
								$group: {
									_id: { guestCount: '3-5' },
									count: { $sum: 1 },
								},
							},
						],
						guestCountFivePlus: [
							{
								$match: {
									guestCount: { $gte: 5 },
								},
							},
							{
								$group: {
									_id: { guestCount: '5+' },
									count: { $sum: 1 },
								},
							},
						],
						revenueLost: [
							{
								$match: { inquiryStatus: 'cancelled' },
							},
							{
								$group: {
									_id: null,
									revenueLost: { $sum: '$amount' },
								},
							},
						],
					},
				},
				{
					$project: {
						totalInquiries: '$totalInquiries',
						convertedInquiries: '$convertedInquiries',
						cancelledInquiries: '$cancelledInquiries',
						ageGroup: {
							eighteenTwentyFive: {
								$arrayElemAt: ['$eighteenTwentyFive.count', 0],
							},
							twentySixThirtyThree: {
								$arrayElemAt: ['$twentySixThirtyThree.count', 0],
							},
							thirtyFourFortyFive: {
								$arrayElemAt: ['$thirtyFourFortyFive.count', 0],
							},
							fortyFivePlus: { $arrayElemAt: ['$fortyFivePlus.count', 0] },
						},
						groupType: {
							FriendsGroup: { $arrayElemAt: ['$FriendsGroup.count', 0] },
							FamilyGroup: { $arrayElemAt: ['$FamilyGroup.count', 0] },
						},
						guestCount: {
							guestCountOne: { $arrayElemAt: ['$guestCountOne.count', 0] },
							guestCountTwo: { $arrayElemAt: ['$guestCountTwo.count', 0] },
							guestCountThreeToFive: {
								$arrayElemAt: ['$guestCountThreeToFive.count', 0],
							},
							guestCountFivePlus: {
								$arrayElemAt: ['$guestCountFivePlus.count', 0],
							},
						},
						revenueLost: {
							$arrayElemAt: ['$revenueLost.revenueLost', 0],
						},
					},
				},
			]);

			res.json({
				revenue: revenue[0],
				inquiryCount: inquiryCount[0],
			});
		} catch (err) {
			console.error(`Err loadDashboardInquiries:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
