import { Request, Response } from "express";
import { prismaClient } from "..";

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { conversationId, text } = req.body;

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});
		if (!user) {
			return res.status(400).json({ error: "invalid user" });
		}

		const newMessage = await prismaClient.message.create({
			data: {
				text,
				conversationId,
				senderId: user.id,
			},
		});

		return res
			.status(201)
			.json({ message: "message sent successfylly", newMessage });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
