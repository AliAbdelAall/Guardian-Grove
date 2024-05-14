import { Request, Response } from "express";
import { prismaClient } from "..";

export const addStudent = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { childId } = req.body;

		const teacher = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { Teacher: true },
		});

		await prismaClient.child.update({
			where: { id: childId },
			data: { teacherId: teacher?.Teacher?.id },
		});

		await prismaClient.teacher.update({
			where: { profileId: teacher?.id },
			data: { students: { connect: { id: childId } } },
		});

		const updatedTeacher = await prismaClient.teacher.findFirst({
			where: { profileId: teacher!.id },
			include: { students: true },
		});
		const updatedStudent = await prismaClient.child.findFirst({
			where: { id: childId },
			include: { parent: { include: { profile: true } } },
		});

		return res.status(200).json({
			message: "student added successfuly",
			teacher: updatedTeacher,
			student: updatedStudent,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const getStudents = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const teacher = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: {
				Teacher: true,
			},
		});
		const children = await prismaClient.child.findMany({
			where: { schoolId: teacher?.Teacher?.schoolId },
			include: { parent: { include: { profile: true } } },
		});
		const schools = await prismaClient.school.findMany();

		const reports = await prismaClient.teacherReport.findMany({
			where: { teacherId: teacher?.Teacher?.id },
		});

		return res.status(200).json({ students: children, schools, reports });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const updateSpeciality = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { speciality } = req.body;

		if (!speciality) {
			return res.status(400).json({ error: "Invalid speciality" });
		}

		const specialityFormat =
			speciality.slice(0, 1).toUpperCase() +
			speciality.slice(1).toLowerCase();

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});

		await prismaClient.teacher.update({
			where: { profileId: user?.id },
			data: { speciality: specialityFormat },
		});

		return res.status(200).json({
			message: "speciality updated successfully",
			speciality: specialityFormat,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const updateSchool = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;

		const { schoolId } = req.body;

		const school = await prismaClient.school.findFirst({
			where: { id: schoolId },
		});
		if (!school) {
			return res.status(400).json({ error: "Invalid School" });
		}

		const user = await prismaClient.profile.findFirst({
			where: { userId: id },
		});

		await prismaClient.teacher.update({
			where: { profileId: user?.id },
			data: { schoolId: school.id },
		});

		return res.status(200).json({
			message: "School updated successfully",
			school: school,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const sendReport = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		const { report, childId } = req.body;
		const teacher = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { Teacher: true },
		});
		const newReport = await prismaClient.teacherReport.create({
			data: {
				childId,
				report,
				teacherId: teacher!.Teacher!.id,
			},
		});

		await prismaClient.child.update({
			where: { id: childId },
			data: { teacherId: teacher?.Teacher?.id },
		});

		return res.status(201).json({
			message: "report created successfully",
			report: newReport,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};

export const createConversation = async (req: Request, res: Response) => {
	try {
		const { id } = req.user!;
		const { parentId } = req.body;

		const teacher = await prismaClient.profile.findFirst({
			where: { userId: id },
			include: { Teacher: true },
		});

		const conversation = await prismaClient.conversation.findFirst({
			where: { parentId, teacherId: teacher?.Teacher?.id },
		});
		if (conversation) {
			return res
				.status(400)
				.json({ message: "Conversation already exists" });
		}

		const newConversation = await prismaClient.conversation.create({
			data: { parentId, teacherId: teacher?.Teacher?.id },
		});

		return res
			.status(201)
			.json({
				message: "Conversation created succssfully",
				conversation: newConversation,
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
