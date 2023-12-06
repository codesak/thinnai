import { Request, Response, Router } from 'express';
const router = Router();
import Conversation from '../../models/Conversation';
import User from '../../models/User';

import userAuth from '../../middleware/userAuth';
import { ErrorCode, errorWrapper } from '../../utils/consts';
import { Types } from 'mongoose';

//test change push 

// @route       GET api/chat/
// @desc        Get all conversations
// @access      Public
router.get('/', userAuth, async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}

		const conversations = await Conversation.aggregate([
			{
				$match: {
					participants: { $in: [new Types.ObjectId(req.userData.id)] },
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'participants',
					foreignField: '_id',
					as: 'participants',
				},
			},
			{
				$unwind: '$messages',
			},
			{
				$sort: { 'messages.sentAt': -1 },
			},
			{
				$group: {
					_id: '$_id',
					participants: { $first: '$participants' },
					messages: {
						$push: {
							sentTo: '$messages.sentTo',
							message: '$messages.message',
							sentAt: '$messages.sentAt',
							messageStatus: '$messages.messageStatus',
						},
					},
				},
			},
			{
				$project: {
					_id: 1,
					participants: {
						_id: 1,
						firstName: 1,
						lastName: req.roles?.includes('admin') ? 1 : 0,
						fullName: req.roles?.includes('admin') ? 1 : 0,
						avatar: 1,
						profileImage: 1,
						userType: 1,
					},
					lastMessage: {
						$arrayElemAt: ['$messages', 0],
					},
				},
			},
		]);

		if (!conversations) {
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No conversations found'));
		}

		return res.json(conversations);
	} catch (err) {
		console.error(`Err loadChats:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       GET api/chat/messages
// @desc        Get all messages for a chat
// @access      Public
router.get('/messages/:conversationId', userAuth, async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		const { conversationId } = req.params;
		if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}

		const conversation = await Conversation.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(conversationId),
				},
			},
			{
				$unwind: '$messages',
			},
			{
				$sort: { 'messages.sentAt': -1 },
			},
			{
				$group: {
					_id: '$_id',
					messages: {
						$push: {
							sentTo: '$messages.sentTo',
							message: '$messages.message',
							sentAt: '$messages.sentAt',
							messageStatus: '$messages.messageStatus',
						},
					},
				},
			},
			{
				$project: {
					_id: 1,
					messages: 1,
				},
			},
		]);

		if (!conversation) {
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No messages found'));
		}

		return res.json(conversation);
	} catch (err) {
		console.error(`Err loadMessages:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});

// @route       POST api/chat/fetchAdminChat
// @desc        Get or create an admin conversation
// @access      Public
router.post('/fetchAdminChat', userAuth, async (req: Request, res: Response) => {
	//**********************************Handler Code**********************************/
	try {
		if (!req.userData || req.userData.id === undefined || req.userData.id === null || !req.roles) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}

		const { userId } = req.body;

		const conversation = req.roles.includes('admin')
			? await Conversation.findOne({
					participants: { $in: [userId] },
			  }).populate('participants', 'firstName lastName profileImage _id avatar')
			: await Conversation.findOne({
					participants: { $in: [new Types.ObjectId(req.userData.id)] },
			  }).populate('participants', 'firstName profileImage _id avatar');
		if (!conversation) {
			const admins = await User.find({ userType: 'admin' });
			const toSeachUserId = req.roles.includes('admin') ? userId : req.userData.id;
			const user = await User.findById(toSeachUserId);
			if (!user) {
				return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No User Found'));
			}
			const newConversaiton = new Conversation({
				participants: [...admins, toSeachUserId],
			});
			await newConversaiton.save();

			await newConversaiton.populate(
				'participants',
				'firstName profileImage _id avatar' + req.roles.includes('admin') ? 'lastName' : ''
			);
			return res.json(newConversaiton);
		}
		return res.json(conversation);
	} catch (err) {
		console.error(`Err loadMessages:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});


router.post('/messages', userAuth, async (req: Request, res: Response) => {
	try {
	  const { conversationId, message, sentTo } = req.body;
  
	  if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
		return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
	  }
  
	  let conversation = null;
	  if (conversationId) {
		conversation = await Conversation.findById(conversationId);
  
		if (!conversation) {
		  return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('Conversation not found'));
		}
	  } else {
		const hosts = await User.find({ userType: 'host' });
		const toSeachUserId = sentTo || req.userData.id;
		const user = await User.findById(toSeachUserId);
		if (!user) {
		  return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('User not found'));
		}
		conversation = new Conversation({
		  participants: [...hosts, toSeachUserId],
		});
		await conversation.save();
	  }
  
	  const messageObj = {
		sentTo,
		sentBy: new Types.ObjectId(req.userData.id),
		message,
		msgType: 'text',
		sentAt: new Date(),
		messageStatus: 'sent',
	  };
	  conversation.messages.push(messageObj);
	  await conversation.save();
  
	  return res.json(conversation);
	} catch (err) {
	  console.error(`Err sendMessages:`, err);
	  res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
  });
  

  router.get('/conversations', userAuth, async (req: Request, res: Response) => {
	try {
		if (!req.userData || req.userData.id === undefined || req.userData.id === null) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Invalid Token'));
		}

		// const conversations = await Conversation.aggregate([
		// 	{
		// 		$match: {
		// 			members: new Types.ObjectId(req.userData.id),
		// 		},
		// 	},
		// 	{
		// 		$unwind: '$messages',
		// 	},
		// 	{
		// 		$sort: { 'messages.sentAt': -1 },
		// 	},
		// 	{
		// 		$group: {
		// 			_id: '$_id',
		// 			messages: {
		// 				$push: {
		// 					sentTo: '$messages.sentTo',
		// 					message: '$messages.message',
		// 					sentAt: '$messages.sentAt',
		// 					messageStatus: '$messages.messageStatus',
		// 				},
		// 			},
		// 		},
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 1,
		// 			messages: 1,
		// 		},
		// 	},
		// ]);

		// if (!conversations) {
		// 	return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No conversations found'));
		// }

		// return res.json(conversations);
		const conversations = await Conversation.find({ members: req.userData.id }, { _id: 1 });

		if (!conversations) {
			return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No conversations found'));
		}

		const conversationIds = conversations.map((conversation) => conversation._id);

		return res.json(conversationIds);
		// const conversations = await Conversation.aggregate([
		// 	{
		// 		$match: {
		// 			members: new Types.ObjectId(req.userData.id),
		// 		},
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: 'users',
		// 			localField: 'members',
		// 			foreignField: '_id',
		// 			as: 'participants',
		// 		},
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 1,
		// 			participants: {
		// 				$filter: {
		// 					input: '$participants',
		// 					as: 'participant',
		// 					cond: {
		// 						$ne: ['$$participant._id', new Types.ObjectId(req.userData.id)],
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// ]);

		// if (!conversations) {
		// 	return res.status(ErrorCode.HTTP_NOT_FOUND).json(errorWrapper('No conversations found'));
		// }

		// return res.json(conversations);
	} catch (err) {
		console.error(`Err loadConversations:`, err);
		res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
	}
});


export default router;
