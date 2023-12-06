import checkAccess from '../../middleware/checkAccess';
import userAuth from '../../middleware/userAuth';
import Report from '../../models/Report';
import { ErrorCode, errorWrapper } from '../../utils/consts';
import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';

const router = Router();

// @route       GET api/report/reports/:userType/:status/:reportDate
// @desc        Get all reports
// @access      Private
router.get(
	'/reports/:userType/:status/:reportDate',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		//**********************************Handler Code**********************************/
		try {
			const { userType, status, reportDate } = req.params;
			const reports = await Report.find({
				status,
				userType,
				reportedOn: {
					$gte: new Date(reportDate),
					$lt: new Date(new Date(reportDate).setDate(new Date(reportDate).getDate() + 1)),
				},
			}).populate({
				path: 'userId',
				select: 'firstName lastName email phone userType profileImage avatar',
			});
			if (!reports)
				return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No reports found'));
			res.send(reports);
		} catch (err) {
			console.error(`Err getReports:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/admin/report/:reportId
// @desc        Get a report
// @access      Private
router.get('/:reportId', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const { reportId } = req.params;
		const report = await Report.find({ _id: reportId })
			.populate({
				path: 'bookingId',
				populate: {
					path: 'propertyId guest host',
					select: 'propertyName city state firstName lastName email phone profileImage avatar',
				},
			})
		if (!report)
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No reports found'));
		res.send(report);
	} catch (err) {
		console.error(`Err getReports:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/admin/report/update/:reportId
// @desc        Update a report
// @access      Private
router.post(
	'/report/update/:reportId',
	userAuth,
	checkAccess('admin'),
	//**********************************Validations**********************************/
	[
		check('priority').optional().trim(),
		check('status').optional().trim(),
		check('action').optional().trim(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		//**********************************Handler Code**********************************/
		try {
			const { priority, status, action } = req.body;
			const report = await Report.findOneAndUpdate(
				{ _id: req.params.reportId },
				{ priority, status, action },
				{ new: true }
			);
			if (!report)
				return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No report found'));
			res.send(report);
		} catch (err) {
			console.error(`Err updateReport:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
