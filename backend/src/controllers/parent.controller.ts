import { Request, Response } from "express";
import { prismaClient } from "..";
import fs from "fs/promises";

export const connectParentPsychologist = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.user!;
		const { psychologistId } = req.body;

		const parent = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { parent: true },
		});

		const psychologist = await prismaClient.profile.findFirst({
			where: { id: psychologistId },
			include: { Psychologist: true },
		});
		if (!psychologist) {
			return res.status(400).json({ message: "Invalid psychologist!" });
		}

		await prismaClient.parent.update({
			where: { profileId: parent!.id },
			data: {
				psychologists: {
					connect: { id: psychologist.Psychologist?.id },
				},
			},
		});

		await prismaClient.psychologist.update({
			where: { profileId: psychologist.id },
			data: { clients: { connect: { id: parent?.parent?.id } } },
		});

		const updatedParent = await prismaClient.parent.findFirst({
			where: { profileId: parent!.id },
			include: { psychologists: true },
		});
		const updatedPsychologist = await prismaClient.psychologist.findFirst({
			where: { profileId: psychologist.id },
			include: { clients: true },
		});
		return res.status(200).json({
			parent: updatedParent,
			psychologist: updatedPsychologist,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const getPsychologistsAndTeachers = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.user!;
		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: {
				parent: {
					include: {
						psychologists: { select: { profileId: true } },
						children: true,
					},
				},
			},
		});

		const userProfile = {
			id: user?.parent?.id,
			profileId: user?.id,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			profilePic: user?.profilePic,
			dob: user?.dob,
		};

		const children = user?.parent?.children;
		const childrentIds = children?.map((child) => child.id);

		const psychologists = await prismaClient.psychologist.findMany({
			include: {
				profile: true,
				Reviews: {
					select: {
						parentId: true,
						rating: true,
						review: true,
					},
				},
			},
		});

		const psychologistsWithAvgRating = psychologists.map((psychologist) => {
			const totalRatings = psychologist.Reviews.length;
			const sumOfRatings = psychologist.Reviews.reduce(
				(sum, review) => sum + review.rating!,
				0
			);
			const averageRating =
				totalRatings > 0 ? sumOfRatings / totalRatings : 0;

			return {
				id: psychologist.id,
				profileId: psychologist.profile.id,
				firstName: psychologist.profile.firstName,
				lastName: psychologist.profile.lastName,
				email: psychologist.profile.email,
				profilePic: psychologist.profile.profilePic,
				dob: psychologist.profile.dob,
				speciality: psychologist.speciality,
				yearsOfExperience: psychologist.yearsOfExperience,
				rating: averageRating,
			};
		});

		const teachers = await prismaClient.teacher.findMany({
			include: { profile: true, School: true },
		});

		const teachersWithCustomProfiles = teachers.map((teacher) => ({
			id: teacher.id,
			profileId: teacher.profile.id,
			firstName: teacher.profile.firstName,
			lastName: teacher.profile.lastName,
			email: teacher.profile.email,
			profilePic: teacher.profile.profilePic,
			dob: teacher.profile.dob,
			speciality: teacher.speciality,
			school: teacher.School?.name ?? null,
		}));

		const schools = await prismaClient.school.findMany();

		const reports = await prismaClient.teacherReport.findMany({
			orderBy: { createdAt: "desc" },
		});
		const filtereReports = reports.filter((report) =>
			childrentIds?.includes(report.childId)
		);

		const instructions = await prismaClient.instruction.findMany({
			orderBy: { createdAt: "desc" },
		});
		const filtereInstructions = instructions.filter((instruction) =>
			childrentIds?.includes(instruction.childId)
		);

		const schedules = await prismaClient.scheduledMeeting.findMany({
			where: { parent: null },
		});

		const filteredSchedules = schedules.filter(
			(schedule) => schedule.start > new Date()
		);

		return res.status(200).json({
			user: userProfile,
			children,
			psychologists: psychologistsWithAvgRating,
			teachers: teachersWithCustomProfiles,
			schools,
			reports: filtereReports,
			instructions: filtereInstructions,
			schedules: filteredSchedules,
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const ratePsychologist = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		const { psychologistId, rating, review } = req.body;

		const parent = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { parent: { include: { psychologists: true } } },
		});

		const existingReview = await prismaClient.review.findFirst({
			where: { parentId: parent?.parent?.id, psychologistId },
		});
		if (existingReview) {
			return res
				.status(400)
				.json({ error: "Psychologist already rated by you!" });
		}
		const found = parent?.parent?.psychologists.find(
			(psychologist) => psychologist.id === psychologistId
		);
		if (!found) {
			return res.status(400).json({ error: "invalid psychologist!" });
		}
		await prismaClient.review.create({
			data: {
				parentId: parent!.parent!.id,
				psychologistId: psychologistId,
				rating,
				review,
			},
		});

		return res.status(201).json({ error: "Review sent successfully!" });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const updateUserDob = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { dob } = req.body;
		if (!dob) {
			return res.status(400).json({ error: "dob is empty" });
		}

		await prismaClient.profile.update({
			where: { userId: id },
			data: { dob: dob },
		});

		return res
			.status(200)
			.json({ message: "Date Of Birth updated succefully" });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const UpdateProfilePic = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const newProfilePic = req.file.filename;
		const newProfilePicPath = req.file.path;

		if (user.profilePic !== "default-profile.png") {
			await fs.unlink(`public/profile-pictures/${user.profilePic}`);
		}

		await prismaClient.profile.update({
			where: { id: user.id },
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

export const bookMeeting = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { slotId } = req.body;
		const parent = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { parent: true },
		});
		const slot = await prismaClient.scheduledMeeting.findFirst({
			where: { id: slotId },
		});
		await prismaClient.scheduledMeeting.update({
			where: { id: slotId },
			data: {
				parentId: parent?.parent?.id,
				title: `Meeting With ${parent?.firstName} ${parent?.lastName}`,
			},
		});
		await prismaClient.parent.update({
			where: { profileId: parent!.id },
			data: {
				psychologists: {
					connect: { id: slot?.psychologistId },
				},
			},
		});

		return res.status(200).json({
			message: "Meeting booked successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const createConversationWithTeacher = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.user!;
		const { teacherId } = req.body;

		if (!teacherId || typeof teacherId !== "number") {
			return res.status(400).json({ message: "Invalid teacherId" });
		}

		const parent = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { parent: true },
		});

		const coversation = await prismaClient.conversation.create({
			data: {
				parentId: parent!.parent!.id,
				teacherId,
			},
		});

		return res
			.status(201)
			.json({ message: "Conversation created succssfully", coversation });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
