import Notification from '../models/Notification';
import UserData from '../models/UserData';
import { Types } from 'mongoose';

const admin = require('firebase-admin');
// const serviceAccount = require('../service-account-file.json');

// export const startFCM = () => {
// 	try {
// 		admin.initializeApp({
// 			credential: admin.credential.cert(serviceAccount),
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const createNotification = async (notificationType: string, userId: Types.ObjectId) => {
	const notification: any = Notification.findOne({
		type: notificationType,
	});

	if (!notification) {
		console.log('Notification type not found');
		return;
	}

	await UserData.findOneAndUpdate(
		{ user: userId },
		{
			$push: {
				notifications: {
					typeId: notification._id,
				},
			},
		}
	);

	sendNotification(userId);
};

const getNotification = (notificationId: Types.ObjectId) => {
	const notification = Notification.findOne(
		{ _id: notificationId },
		{ _id: 0, __v: 0, version: 0 }
	);
	return notification;
};

export const sendNotification = async (userId: Types.ObjectId) => {
	try {
		const userData: any = await UserData.findOne({ user: userId });
		const registrationToken = userData.fcmToken;

		userData.notifications.forEach(async (notification: any) => {
			const msgData: any = getNotification(notification.typeId);
			const message: any = {
				notification: {
					title: msgData.title,
					body: msgData.body,
				},
				token: registrationToken,
			};

			if (msgData.redirectURL) message.webpush.fcmOptions.link = msgData.redirectURL;
			//temp hack to avoid crashes
			if (registrationToken) {
				const response = await admin.messaging().send(message);
				console.log('Successfully sent message:', response);
			}

			await UserData.findOneAndUpdate(
				{ user: userId, 'notifications._id': notification._id },
				{
					$set: {
						'notifications.$.status': 'sent',
					},
				}
			);
		});
	} catch (error) {
		console.log('Error sending message:', error);
	}
};
