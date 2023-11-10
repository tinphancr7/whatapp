import getPrismaInstance from "../utils/PrismaClient.js";
import {renameSync} from "fs";

export const addMessage = async (req, res, next) => {
	try {
		const prisma = getPrismaInstance();
		const {message, from, to} = req.body;
		console.log("message", message, from, to);
		const getUser = onlineUsers.get(to);
		if (message && from && to) {
			const newMessage = await prisma.messages.create({
				data: {
					message,
					sender: {connect: {id: parselnt(from)}},
					reciever: {connect: {id: parselnt(to)}},
					messageStatus: getUser ? "delivered" : "sent",
				},
				include: {
					sender: true,
					reciever: true,
				},
			});
			return res.json({msg: "Success", status: true, message: newMessage});
		}
		return res.json({msg: "Failed", status: false});
	} catch (err) {
		console.log("err", err);
		next(err);
	}
};
export const getMessages = async (req, res, next) => {
	try {
		const prisma = getPrismaInstance();
		const {from, to} = req.body;
		if (from && to) {
			const messages = await prisma.messages.findMany({
				where: {
					OR: [
						{senderId: parselnt(from), recieverId: parselnt(to)},
						{senderId: parselnt(to), recieverId: parselnt(from)},
					],
				},
				orderBy: {createdAt: "asc"},
				include: {
					sender: true,
					reciever: true,
				},
			});

			const unreadMessages = [];
			messages.forEach = async (message, index) => {
				if (
					message.messageStatus !== "read" &&
					message.senderId === parselnt(to)
				) {
					messages[index].messageStatus = "read";

					unreadMessages.push(message.id);
				}
				await prisma.messages.updateMany({
					where: {
						id: {
							in: unreadMessages,
						},
					},
					data: {
						messageStatus: "read",
					},
				});
			};
			return res.json({msg: "Success", status: true, messages});
		}
		return res.json({msg: "Failed", status: false});
	} catch (err) {
		next(err);
	}
};
export const addImageMessage = async (req, res, next) => {
	try {
		if (req.file) {
			const date = new Date();
			let fileName = "uploads/images/" + date.getTime() + req.file.originalname;
			renameSync(req.file.path, fileName);
			const prisma = getPrismaInstance();
			const {from, to} = req.body;
			const getUser = onlineUsers.get(to);
			const newMessage = await prisma.messages.create({
				data: {
					message: fileName,
					sender: {connect: {id: parseInt(from)}},
					reciever: {connect: {id: parseInt(to)}},
					messageStatus: getUser ? "delivered" : "sent",
					type: "image",
				},
			});
			return res
				.status(201)
				.json({msg: "Success", status: true, message: newMessage});
		}
	} catch (error) {}
};
export const getInitialContactsWithMessages = async (req, res) => {
	try {
		const userId = parseInt(req.params.from);
		const prisma = getPrismaInstance();
		const user = await prisma.users.findUnique({
			where: {
				id: userId,
			},
			include: {
				sentMessages: {
					include: {
						reciever: true,
						sender: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				},
				recievedMessages: {
					include: {
						reciever: true,
						sender: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});
		const messages = [...user.sentMessages, ...user.recievedMess];
		messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		const users = new Map();
		const messageStatusChange = [];
		messages.forEach((msg) => {
			const isSender = msg.senderId === userId;
			const calculatedId = isSender ? msg.recievedId : msg.senderId;
			if (msg.messageStatus === "sent") {
				messageStatusChange.push(msg.id);
			}
			if (!user.get(calculatedId)) {
				const {
					id,
					type,
					message,
					messageStatus,
					createdAt,
					senderId,
					recieverId,
				} = msg;
				let user = {
					messageId: id,
					type,
					message,
					messageStatus,
					createdAt,
					senderId,
					recieverId,
				};
				if (isSender) {
					user = {
						...user,
						...msg.reciever,
						totalUnreadMessages: 0,
					};
				} else {
					user = {
						...user,
						...msg.sender,
						totalUnreadMessages: messageStatus !== "read" ? 1 : 0,
					};
				}
				users.set(calculatedId, {
					...user,
				});
			} else if (messageStatus !== "read" && !isSender) {
				const user = users.get(calculatedId);
				user.set(calculatedId, {
					...user,
					totalUnreadMessages: user.totalUnreadMessages + 1,
				});
			}
		});
		if (messageStatusChange.length) {
			await prisma.messages.updateMany({
				where: {
					id: {in: messageStatusChange},
				},
				data: {
					messageStatus: "delivered",
				},
			});
		}

		return res.status(200).json({
			user: Array.from(users.values()),
			onlineUsers: Array.from(onlineUsers.keys()),
		});
	} catch (error) {
		next(error);
	}
};
