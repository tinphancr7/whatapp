import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createServer} from "http";
import {Server} from "socket.io";
import {on} from "events";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});
	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data?.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("receive-msg", {
				message: data?.message,
				from: data?.from,
			});
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
