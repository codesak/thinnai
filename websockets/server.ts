import Conversation from '../models/Conversation';
//import { createNotification } from '../utils/notification';
import { verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import url from 'node:url';
import WebSocket, { WebSocketServer } from 'ws';

const config = require('config');

export default async (expressServer: any) => {
	const wss = new WebSocketServer({ noServer: true, path: '/websockets' });

	expressServer.on('upgrade', (req: any, socket: any, head: any) => {
		try {
			const [_path] = req?.url?.split('?');
			const token = url.parse(req.url, true).query.token as string;
			if (token) {
				verify(token, config.get('jwtSecret'), (error: any, decoded: any) => {
					if (error) {
						socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
						socket.destroy();
						return;
					} else {
						req.userId = decoded.user.id;
						wss.handleUpgrade(req, socket, head, ws => {
							wss.emit('connection', ws, req);
						});
					}
				});
			} else {
				socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
				socket.destroy();
				return;
			}
		} catch (error) {
			socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
			socket.destroy();
		}
	});

	const clients = new Map<String, ExtWebSocket>();

	interface ExtWebSocket extends WebSocket {
		userId: Types.ObjectId;
		isAlive: boolean;
	}

	function heartbeat(this: ExtWebSocket) {
		this.isAlive = true;
	}

	const filterMessage = (message: string) => {
		let cleansedMessage: string = message;

		//TODO: filter message

		return cleansedMessage;
	};

	wss.on('connection', (ws: ExtWebSocket, req: any) => {
		try {
			ws.send('Connected Successfully!');

			console.log(`New connection from ${req.userId}`);
			ws.userId = req.userId;
			ws.isAlive = true;

			console.log('User Connected');
			clients.set(ws.userId.toString(), ws);

			ws.on('pong', () => heartbeat.call(ws));

			ws.on('message', async (data: Buffer | string, isBinary: boolean) => {
				try {
					const msgObj = isBinary ? (data as string) : JSON.parse(data.toString());

					if (!msgObj) {
						return ws.send('Invalid message');
					}

					let conversation = await Conversation.findOne({
						participants: { $all: [ws.userId, msgObj.sentTo] },
					});

					if (!conversation) {
						conversation = new Conversation({
							participants: [ws.userId, msgObj.sentTo],
						});
					}

					const newMessage = {
						sentTo: msgObj.sentTo,
						msgType: msgObj.msgType,
						message: filterMessage(msgObj.message),
						messageStatus: 'pending',
						sentAt: new Date(),
						sentBy: ws.userId,
					};

					const extClient = clients.get(newMessage.sentTo);
					if (extClient?.readyState === WebSocket.OPEN) {
						extClient.send(JSON.stringify(newMessage), { binary: isBinary });
						newMessage.messageStatus = 'sent';
						console.log(`Server: Message sent to client ${extClient.userId}`);
					}

					conversation.messages.push(newMessage);
					await conversation.save();
					ws.send(JSON.stringify(newMessage), { binary: isBinary });
					console.log(`Server: Message received from client ${ws.userId}`);

					let notificationType: string = '';
					if (msgObj.msgType === 'MSG_FROM_HOST') {
						notificationType = 'RECEIVED_CHAT_FROM_HOST';
					} else if (msgObj.msgType === 'MSG_FROM_GUEST') {
						notificationType = 'RECEIVED_CHAT_FROM_GUEST';
					} else if (msgObj.msgType === 'ONGOING_BOOKING_MSG_FROM_GUEST') {
						notificationType = 'RECEIVED_ONGOING_BOOKING_CHAT_FROM_GUEST';
					} else if (msgObj.msgType === 'ENQUIRY_FROM_GUEST') {
						notificationType = 'RECEIVED_ENQUIRY_FROM_GUEST';
					}
					console.log(notificationType)
					//createNotification(notificationType, newMessage.sentTo);
				} catch (err) {
					ws.send('Invalid unhandled');
					console.log(err);
				}
			});

			ws.on('close', (code: number, data: Buffer) => {
				clients.delete(ws.userId.toString());
				const reason: string = data.toString();
				console.log(`${ws.userId}: Connection closed! Code: ${code} Reason: ${reason}`);
			});
		} catch (error) {
			console.log(error);
		}
	});

	const interval = setInterval(() => {
		wss.clients.forEach(function each(ws: WebSocket) {
			const extWs = ws as ExtWebSocket;
			if (extWs.isAlive === false) return ws.terminate();
			extWs.isAlive = false;
			ws.ping();
		});
	}, 30000);

	wss.on('close', (code: number, data: Buffer) => {
		clearInterval(interval);
		for (const ws of wss.clients) {
			ws.terminate();
		}
		const reason: string = data.toString();
		console.log(`Server: Connection closed! Code: ${code} Reason: ${reason}`);
	});

	return wss;
};
