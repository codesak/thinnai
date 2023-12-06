import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import ContactRequest from '../../models/ContactRequest';
import RichDocumnets from '../../models/RichDocumnets';
const router = Router();
import { ErrorCode, errorWrapper } from '../../utils/consts';

// @route       GET api/public/docs/:documentId
// @desc        Get a doc content
// @access      Public
router.get('/docs/:documentId', async (req: Request, res: Response) => {
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

//@route        POST api/public/createContactRequest
// @desc        Create/Add a new Contact Request
// @access      Public
router.post(
	'/addContactRequest',
	//**********************************Validations**********************************/
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please input valid email').isEmail(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(ErrorCode.HTTP_BAD_REQ).json({ errors: errors.array() });
		}

		try {
			//**********************************Handler Code**********************************/

			const { name, email, message } = req.body;

			const newContactRequest = new ContactRequest({
				name,
				email,
				message,
			});

			await newContactRequest.save();

			res.json({ newContactRequest });
		} catch (err) {
			console.error(`Err register:`, err);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	}
);

export default router;
