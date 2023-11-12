import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {Server} from "socket.io";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/uploads/images", express.static("uploads/images"));
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);
const server = app.listen(process.env.PORT || 3005, () => {
	console.log(`Server is running on port ${process.env.PORT || 3005}`);
});

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
	console.log("User Connected", socket.id);
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});
	socket.on("send-msg", (data) => {
		console.log(" onlineUsers", onlineUsers);
		const sendUserSocket = onlineUsers.get(data?.to);

		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", {
				message: data?.message,
				from: data?.from,
			});
		}
	});

	socket.on("outgoing-voice-call", (data) => {
		const sendUserSocket = onlineUsers.get(data?.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("incoming-voice-call", {
				from: data?.from,
				roomId: data?.roomId,
				callType: data?.callType,
			});
		}
	});
	socket.on("outgoing-video-call", (data) => {
		const sendUserSocket = onlineUsers.get(data?.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("incoming-video-call", {
				from: data?.from,
				roomId: data?.roomId,
				callType: data?.callType,
			});
		}
	});
	socket.on("reject-voice-call", (data) => {
		const sendUserSocket = onlineUsers.get(data?.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("voice-call-reject");
		}
	});
	socket.on("reject-video-call", (data) => {
		const sendUserSocket = onlineUsers.get(data?.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("video-call-reject");
		}
	});
	socket.on("accept-incoming-call", ({id}) => {
		const sendUserSocket = onlineUsers.get(id);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("accept-call");
		}
	});

	socket.on("disconnect", () => {
		onlineUsers.forEach((userId, socketId) => {
			if (socketId === socket.id) {
				onlineUsers.delete(userId);
			}
		});
	});
});
