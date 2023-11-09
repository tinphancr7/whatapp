import getPrismaInstance from "../utils/PrismaClient.js";

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
