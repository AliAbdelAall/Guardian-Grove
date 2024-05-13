import { Request, Response } from "express";
import { prismaClient } from "..";
import fs from "fs/promises";

export const checkRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const user = await prismaClient.user.findFirst({
			where: { id },
			include: {
				role: true,
			},
		});

		if (user?.roleId === 3) {
			const psychologist = await prismaClient.profile.findFirst({
				where: { userId: user.id },
				include: {
					Psychologist: {
						include: {
							Reviews: true,
							Conversation: { include: { Message: true } },
						},
					},
				},
			});

			const reviews = await prismaClient.review.findMany({
				where: { psychologistId: psychologist?.Psychologist?.id },
			});

			const schedules = await prismaClient.scheduledMeeting.findMany({
				where: { psychologistId: psychologist?.Psychologist?.id },
			});

			return res.status(200).json({
				userRole: user?.role.name,
				profile: { ...psychologist, roleId: user.roleId },
				reviews,
				schedules,
				conversations: psychologist?.Psychologist?.Conversation,
			});
		}
		if (user?.roleId === 2) {
			const teacher = await prismaClient.profile.findFirst({
				where: { userId: user.id },
				include: {
					Teacher: {
						include: {
							School: { select: { name: true } },
							Conversation: { include: { Message: true } },
						},
					},
				},
			});
			return res.status(200).json({
				userRole: user?.role.name,
				profile: { ...teacher, roleId: user.roleId },
				conversations: teacher?.Teacher?.Conversation,
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const UpdateUserProfilePic = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const user = await prismaClient.user.findFirst({
			where: { id },
			include: { profile: true },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const newProfilePic = req.file.filename;
		const newProfilePicPath = req.file.path;

		if (user.profile && user.profile.profilePic !== "default-profile.png") {
			await fs.unlink(
				`public/profile-pictures/${user.profile.profilePic}`
			);
		}

		await prismaClient.profile.update({
			where: { id: user.profile!.id },
			data: { profilePic: newProfilePic },
		});

		return res.status(200).json({
			message: "Profile picture updated successfully",
			profilePic: newProfilePic,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const editDob = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { newDob } = req.body;

		console.log(newDob);

		await prismaClient.profile.update({
			where: { userId: id },
			data: { dob: newDob },
		});
		return res.status(200).json({
			message: "Date of Birth updated successfully",
			dob: newDob,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
