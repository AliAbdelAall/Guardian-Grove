import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./Routes/root.routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app: Express = express();

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);
app.use(express.static("public"));

export const prismaClient = new PrismaClient({
	log: ["query"],
});

const server = http.createServer(app);
if (
	!process.env.SOCKET_WEB_SERVER_URL ||
	!process.env.SOCKET_MOBILE_SERVER_URL
) {
	console.log("ENV NOT CONNECTED!");
} else {
	console.log(process.env.SOCKET_WEB_SERVER_URL);
	console.log(process.env.SOCKET_MOBILE_SERVER_URL);
}
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
	console.log("User Connected: ", socket.id);
	socket.on("disconnect", () => {
		console.log("User disconnected: ", socket.id);
	});
});

server.listen(port, () => {
	console.log(`app is working on port ${port}`);
});
