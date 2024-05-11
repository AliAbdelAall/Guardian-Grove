import { Request, Response } from "express";
import { prismaClient } from "..";

export const getClients = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const profile = await prismaClient.profile.findFirst({
			where: {
				userId: id,
			},
			include: {
				Psychologist: {
					include: {
						clients: {
							include: {
								profile: true,
								children: true,
							},
						},
					},
				},
			},
		});
		if (!profile || !profile.Psychologist) {
			return res.status(400).json({ error: "Unauthenticated" });
		}
		const clients = profile.Psychologist.clients;

		const schools = await prismaClient.school.findMany();
		const instructions = await prismaClient.instruction.findMany({
			where: { psychologistId: profile.Psychologist.id },
		});

		return res.status(200).json({
			clients,
			schools,
			instructions,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const updateSpeciality = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { speciality } = req.body;

		if (
			!speciality ||
			(speciality !== "Family" && speciality !== "Development")
		) {
			return res.status(400).json({ error: "Invalid speciality" });
		}

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});

		await prismaClient.psychologist.update({
			where: { profileId: user?.id },
			data: { speciality },
		});

		return res.status(200).json({
			message: "speciality updated successfully",
			speciality,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const updateYearsOfExperience = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { yoe } = req.body;

		if (!yoe || yoe > 35 || yoe < 0) {
			return res.status(400).json({ error: "Invalid yoe input" });
		}

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});

		await prismaClient.psychologist.update({
			where: { profileId: user?.id },
			data: { yearsOfExperience: yoe },
		});

		return res.status(200).json({
			message: "Years Of Experience updated successfully",
			yoe,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const sendInstruction = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		const { instruction, childId } = req.body;
		const Psychologist = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { Psychologist: true },
		});
		const newInstruction = await prismaClient.instruction.create({
			data: {
				childId,
				instruction,
				psychologistId: Psychologist!.Psychologist!.id,
			},
		});

		return res.status(201).json({
			message: "instruction created successfully",
			instruction: newInstruction,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const addSlots = async (req: Request, res: Response) => {
	try {
		const { schedules } = req.body;

		await prismaClient.scheduledMeeting.createMany({
			data: schedules,
		});
		const newSlots = schedules.map((schedule: any) => ({
			...schedule,
			parentId: null,
		}));
		console.log(newSlots);

		return res.status(201).json({
			message: "Slots created successfully",
			schedules: newSlots,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
