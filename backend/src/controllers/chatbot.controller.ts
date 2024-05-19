import { Request, Response } from "express";
import { prismaClient } from "..";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateResponse = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		const { prompt } = req.body;

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
			select: {
				firstName: true,
				lastName: true,
				email: true,
				dob: true,
				parent: {
					select: {
						children: {
							include: {
								Instruction: { orderBy: { createdAt: "desc" } },
								TeacherReport: {
									orderBy: { createdAt: "desc" },
								},
							},
						},
					},
				},
			},
		});
		const childrenData = user?.parent?.children.map((child) => {
			return {
				name: child.name,
				dob: child.dob,
				latestInstruction: child.Instruction[0]?.Instruction || "None",
				latestTeacherReport: child.TeacherReport[0]?.report || "None",
			};
		});

		const childInfo = childrenData
			? childrenData
					.map((child) => {
						return `- ${child.name} (DOB: ${child.dob}): 
                Latest Instruction: ${child.latestInstruction}
                Latest Teacher Report: ${child.latestTeacherReport}`;
					})
					.join("\n")
			: "None";

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "user",
					content: `Act as a psychologist to assist the parent with their request. We have collected data on the parent, including their profile, their children, psychologist instructions, and teacher reports. Make the response friendly and conversational, as if talking to a friend, but maintain a professional tone. Keep the response short, ensuring it directly addresses the parent's request. Make every word count, and remember that this is a chat.

					If the parent asks for something unrelated to your role as a psychologist, politely inform them that it is outside your expertise and gently steer the conversation back to how you can help as a psychologist.

          Parent Data:
          - Name: ${user!.firstName} ${user!.lastName}
          - Email: ${user!.email}
          - Children: ${childInfo}
    
          The parent's request: ${prompt}`,
				},
			],
			model: "gpt-3.5-turbo",
		});
		const generatedText = completion.choices[0].message.content;
		return res.status(200).json({ generatedText });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
