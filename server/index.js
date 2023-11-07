import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createServer} from "http";
import {Server} from "socket.io";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);

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
app.listen(process.env.PORT || 3005, () => {
	console.log(`Server is running on port ${process.env.PORT || 3005}`);
});
