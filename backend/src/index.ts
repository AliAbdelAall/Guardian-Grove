import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./Routes/root.routes";
import cors from "cors";
import http from "http";
import { socketConnection } from "./socket/connection";

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

server.listen(port, () => {
	socketConnection(server);
	console.log(`app is working on port ${port}`);
});
