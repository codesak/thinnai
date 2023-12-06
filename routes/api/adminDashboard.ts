import { Request, Response, Router } from 'express';
const router = Router();
import HostUserData, { IHostUserData } from '../../models/HostUserData';
import GuestUserData from '../../models/GuestUserData';
import Property from '../../models/Property';
import Booking from '../../models/Booking';
import userAuth from '../../middleware/userAuth';
import checkAccess from '../../middleware/checkAccess';
import { ErrorCode, errorWrapper } from '../../utils/consts';
import ContactRequest from '../../models/ContactRequest';

// @route       GET api/adminDashboard/
// @desc        Get Admin Dashboard
// @access      Public
router.get('/', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const recentBookings = await Booking.find({ bookingStatus: 'confirmed' })
			.sort('-bookingConfirmedAt')
			.limit(3);
		const topPerformingHosts = await Property.find().sort('-totalBookings').limit(3);
		const bestHosts = await HostUserData.find().sort('-ratings.good').limit(3);
		const worstHosts = await HostUserData.find().sort('-ratings.bad').limit(3);

		res.json({ recentBookings, topPerformingHosts, bestHosts, worstHosts });
	} catch (err) {
		console.error(`Err getDashboard:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/adminDashboard/users
// @desc        Get all Registered Users
// @access      Private
router.get('/users', /* userAuth, checkAccess('admin'), */ async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const hostUsersDb = await HostUserData.find().populate('user').populate('properties.property')
        .select('properties')
			/* .populate('user properties.property')
			.select('-user.password') */
		const guestUsers = await GuestUserData.find().populate('user').select('-password');
		const newHostUsers: IHostUserData[] = [];
		const approvedHostUsers: IHostUserData[] = [];
		hostUsersDb.forEach(hostUser => {
			hostUser.approvalStatus !== 'approved'
				? newHostUsers.push(hostUser)
				: approvedHostUsers.push(hostUser);
		});
		res.json({
			hostUsers: {
				newHostUsers,
				approvedHostUsers,
			},
			guestUsers,
		});
	} catch (err) {
		console.error(`Err loadUsers:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/adminDashboard/properties
// @desc        Get all Properties for Admin
// @access      Private
router.get('/properties', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const properties = await Property.find({}).populate({
			path: 'user',
			select:
			  'firstName lastName',
			
		  })

		res.json({
			message: 'Success',
			properties,
		});
	} catch (err) {
		console.error(`Err loadUsers:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/admin/publicFormData
// @desc        Get All Data for Public Forms
// @access      Public
router.get('/publicFormData', async (req: Request, res: Response) => {
	try {
		//**********************************Handler Code**********************************/

		const contactRequests = await ContactRequest.find();

		res.json({ contactRequests });
	} catch (err) {
		console.error(`Err register:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/admin/updateStatus/:changeType
// @desc        Update Public Form Status
// @access      Public
router.post(
	'/updateStatus/:changeType',
	//**********************************Validations**********************************/
	userAuth,
	async (req: Request, res: Response) => {
		try {
			//**********************************Handler Code**********************************/
			const { changeType } = req.params;
			const { contactRequestId, status } = req.body;

			if (changeType === 'contactRequest') {
				const updatedContactRequest = await ContactRequest.findByIdAndUpdate(
					contactRequestId,
					{
						$set: { status },
					},
					{ new: true }
				);
				res.json({ updatedContactRequest });
			}
		} catch (err) {
			console.error(`Err register:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
