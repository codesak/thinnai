import checkAccess from '../../middleware/checkAccess';
import userAuth from '../../middleware/userAuth';
import HostUserData from '../../models/HostUserData';
import Property from '../../models/Property';
import UpdatePropertyRequests from '../../models/UpdatePropertyRequests';
import { ErrorCode, errorWrapper } from '../../utils/consts';
//import { createNotification } from '../../utils/notification';
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';

const router = Router();

// @route       POST api/approve/pricing
// @desc        Host Approving pricing for completing onboarding flow
// @access      Public

router.get('/gethost/:id',async(req,res)=>{
	const {id}=req.params
	const data=await HostUserData.findById(id)
	res.status(200).send(data)
})

router.post('/pricing', userAuth, checkAccess('host'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/

	try {
		if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}
		const approvedHostData = await HostUserData.findOneAndUpdate(
			{ user: new Types.ObjectId(req.userData.id) },
			{ approvalStatus: 'approved' },
			{
				new: true,
			}
		);

		if (!approvedHostData) {
			return res.status(404).json({ msg: 'Host User Data not found' });
		}

		//createNotification('PRICE_APPROVED', new Types.ObjectId(req.userData.id));

		res.json({ message: 'Pricing Approved', HostUserData: approvedHostData });
	} catch (err) {
		console.error(`Err approvePricing:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/auth/admin/hostData
// @desc        Approve Host User
// @access      Public
router.post(
	'/hostData/:hostId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		const {hostId}  = req.params;

		const { accApproval, detailsApproval } = req.body;

		try {
			if (accApproval) {
				const approvedHostData = await HostUserData.findByIdAndUpdate(
					new Types.ObjectId(hostId),
					{ accApproval: 'approved' },
					{
						new: true,
					}
				);
				if (!approvedHostData) {
					return res.status(404).json({ msg: 'Host User Data not found' });
				}
				//createNotification('HOST_ACCOUNT_APPROVED', new Types.ObjectId(hostId));
				res.json({ message: 'Account Details Approved', HostUserData: approvedHostData });
			} else if (detailsApproval) {
				const approvedHostData = await HostUserData.findByIdAndUpdate(
					new Types.ObjectId(hostId),
					{ detailsApproval: 'approved' },
					{
						new: true,
					}
				);
				if (!approvedHostData) {
					return res.status(404).json({ msg: 'Host User Data not found' });
				}
				//createNotification('HOST_DETAILS_APPROVED', new Types.ObjectId(hostId));
				res.json({ message: 'Personal Details Approved', HostUserData: approvedHostData });
			}
		} catch (err) {
			console.error(`Err approveProperty:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/approveProperty/:propertyId
// @desc        Approve Property
// @access      Public
router.post(
	'/approveProperty/:propertyId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		const { propertyId } = req.params;

		try {
			const approvedProperty = await Property.findOneAndUpdate(
				{ _id: propertyId },
				{ approvalStatus: 'approved' },
				{
					new: true,
				}
			);

			if (!approvedProperty) {
				return res.status(400).json({ msg: 'Property not found' });
			}

			//createNotification('PROPERTY_APPROVED', approvedProperty.user);

			res.json({ message: 'Property Approved', property: approvedProperty });
		} catch (err) {
			console.error(`Err approveProperty:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       POST api/admin/approvePropertyElement/:propertyId
// @desc        Approve Property
// @access      Public
router.post(
	'/approvePropertyElement/:propertyId',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		const { propertyId } = req.params;

		const { fieldToApprove, approvalRequestId, updatedData } = req.body;

		if (propertyId === undefined || propertyId === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Property ID'));
		} else if (approvalRequestId === undefined || approvalRequestId === null) {
			return res
				.status(ErrorCode.HTTP_BAD_REQ)
				.json(errorWrapper('Invalid Property Update Request ID'));
		}

		try {
			const updateElement = await UpdatePropertyRequests.findByIdAndUpdate(approvalRequestId, {
				$set: { [fieldToApprove]: undefined },
			});
			if (!updateElement) {
				return res
					.status(ErrorCode.HTTP_BAD_REQ)
					.json(errorWrapper('Property Update Request not found'));
			}
			const approvedProperty = await Property.findOneAndUpdate(
				{ _id: propertyId },
				{ $set: { [fieldToApprove]: updatedData } },
				{
					new: true,
				}
			);
			if (!approvedProperty) {
				return res.status(400).json({ msg: 'Property not found' });
			}

			//createNotification('PROPERTY_LISTING_UPDATE_APPROVED', approvedProperty.user);

			res.json({ message: 'Property Update Request Approved', property: approvedProperty });
		} catch (err) {
			console.error(`Err approveProperty:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
