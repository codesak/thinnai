import { Request, Response, Router } from 'express';
import { ErrorCode, errorWrapper } from '../../utils/consts';
const router = Router();
import AppSettings from '../../models/AppSettings';
import userAuth from '../../middleware/userAuth';
import checkAccess from '../../middleware/checkAccess';
import RichDocumnets from '../../models/RichDocumnets';

// @route       GET api/appSettings
// @desc        Get latest app settings
// @access      Public
router.get('/', async (req: Request, res: Response) => {
	try {
		const settings = await AppSettings.findOne({}).sort({ _id: -1 });
		res.json({
			message: 'Settings Fetched',
			settings,
		});
	} catch (err) {
		console.error(`Err requestChange:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/appSettings/set
// @desc        Push latest app setting
// @access      Public
router.post('/set', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	try {
		const {
			propertyTypes,
			propertOwnerships,
			thinnaiLocations,
			amenities,
			preferredGuests,
			activityTypes,
			allowedActivities,
			alcoholAllowedFor,
			cities,
			version,
			addOnServices,
			cleaningChargeCake,
			cleaningTableDecor,
			cleaningFloorDecor,
			staticAssetPath,
		} = req.body;
		const newSetting = new AppSettings({
			propertyTypes,
			propertOwnerships,
			thinnaiLocations,
			amenities,
			preferredGuests,
			activityTypes,
			allowedActivities,
			alcoholAllowedFor,
			cities,
			addOnServices,
			cleaningChargeCake,
			cleaningTableDecor,
			cleaningFloorDecor,
			staticAssetPath,
			version,
		});
		await newSetting.save();
		res.json({
			message: 'Settings Fetched',
			settings: newSetting,
		});
	} catch (err) {
		console.error(`Err requestChange:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/appsetting/richdoc/add
// @desc        Add a new rich document
// @access      Private
router.post('/richdoc/add', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	try {
		const { id, title, content } = req.body;
		const newDocument = new RichDocumnets({
			id,
			title,
			content,
		});
		await newDocument.save();
		res.json({
			message: 'Document Added',
			document: newDocument,
		});
	} catch (err) {
		console.error(`Err requestChange:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/appsetting/richdoc/update
// @desc        Update a rich document
// @access      Private
router.post(
	'/richdoc/update',
	userAuth,
	checkAccess('admin'),
	async (req: Request, res: Response) => {
		try {
			const { id, title, content, documentId } = req.body;
			const updateBlock = { id, title, content };
			const upadtedDoc = await RichDocumnets.findByIdAndUpdate(
				documentId,
				{ $set: updateBlock },
				{ new: true }
			);
			if (!upadtedDoc) {
				return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No Document'));
			}
			res.json({
				message: 'Updated Document',
				document: upadtedDoc,
			});
		} catch (err) {
			console.error(`Err requestChange:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

// @route       GET api/appsetting/richdoc/all
// @desc        Get all docs for admin
// @access      Public
router.get('/richdoc/all', userAuth, checkAccess('admin'), async (req: Request, res: Response) => {
	try {
		const richDocuments = await RichDocumnets.find().select('title id');
		if (!richDocuments) {
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('Error'));
		}
		res.json({
			message: 'Document Fetched',
			documents: richDocuments,
		});
	} catch (err) {
		console.error(`Err requestChange:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/appsetting/richdoc/:documentId
// @desc        Get a doc content
// @access      Public
router.get('/richdoc/:documentId', async (req: Request, res: Response) => {
	try {
		const { documentId } = req.params;
		const richDocument = await RichDocumnets.findOne({ id: documentId }).select('title content');
		if (!richDocument) {
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No Document'));
		}
		res.json({
			message: 'Document Fetched',
			document: richDocument,
		});
	} catch (err) {
		console.error(`Err requestChange:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

export default router;
