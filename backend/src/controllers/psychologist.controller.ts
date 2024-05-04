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

		return res.status(200).json({
			clients,
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
