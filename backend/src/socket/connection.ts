import { Server } from "socket.io";
import { prismaClient } from "..";

export const socketConnection = async (server: any) => {
	const io = new Server(server, {
		cors: {
			origin: [
				process.env.SOCKET_WEB_SERVER_URL!,
				process.env.SOCKET_MOBILE_SERVER_URL!,
			],
			methods: ["GET", "POST", "PUT", "DELETE"],
		},
	});

	io.on("connection", (socket) => {
		const token = socket.handshake.auth;
		console.log("User Connected: ", socket.id);
		console.log("User token: ", token);
		socket.on("disconnect", () => {
			console.log("User disconnected: ", socket.id);
		});
		socket.on("join-conversation", (conversationId: string, cb) => {
			socket.join(conversationId);
			cb(conversationId);
		});
		socket.on("send-message", async (message) => {
			try {
				const savedMessage = await prismaClient.message.create({
					data: {
						conversationId: message.conversationId,
						text: message.text,
						senderId: message.senderId,
						createdAt: new Date(message.createdAt),
					},
				});
				console.log("saved Message: ", savedMessage);

				io.to(message.conversationId.toString()).emit(
					"receive-message",
					savedMessage
				);
			} catch (error) {
				console.log(error);
			}
		});
	});
};
