import { Request, Response } from "express";
import { prismaClient } from "..";

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
			id: user?.id,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			profilePic: user?.profilePic,
			dob: user?.dob,
		};

		const children = user?.parent?.children;

		const psychologists = await prismaClient.psychologist.findMany({
			include: {
				profile: true,
				Review: {
					select: {
						parentId: true,
						rating: true,
						review: true,
					},
				},
			},
		});

		const psychologistsWithAvgRating = psychologists.map((psychologist) => {
			const totalRatings = psychologist.Review.length;
			const sumOfRatings = psychologist.Review.reduce(
				(sum, review) => sum + review.rating!,
				0
			);
			const averageRating =
				totalRatings > 0 ? sumOfRatings / totalRatings : 0;

			return {
				id: psychologist.id,
				firstName: psychologist.profile.firstName,
				lastName: psychologist.profile.lastName,
				email: psychologist.profile.email,
				profilePic: psychologist.profile.profilePic,
				dob: psychologist.profile.dob,
				speciality: psychologist.speciality,
				yearsOfExperience: psychologist.yearsOfExperience,
				Rating: averageRating,
			};
		});

		const teachers = await prismaClient.teacher.findMany({
			include: { profile: true },
		});

		const teachersWithCustomProfiles = teachers.map((teacher) => ({
			id: teacher.id,
			firstName: teacher.profile.firstName,
			lastName: teacher.profile.lastName,
			email: teacher.profile.email,
			profilePic: teacher.profile.profilePic,
			dob: teacher.profile.dob,
			speciality: teacher.speciality,
			school: teacher.school,
		}));

		return res.status(200).json({
			user: userProfile,
			children,
			psychologists: psychologistsWithAvgRating,
			teachers: teachersWithCustomProfiles,
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
