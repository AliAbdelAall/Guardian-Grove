import { Server } from "socket.io";

export const socketConnection = (server: any) => {
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
		socket.on("test", (num, str, obj) => {
			console.log(num, str, obj);
		});
		socket.on("send-message", (message) => {
			console.log(message);
		});
	});
};
