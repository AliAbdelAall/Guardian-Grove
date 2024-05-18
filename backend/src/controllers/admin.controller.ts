import { Request, Response } from "express";
import { prismaClient } from "..";
import { differenceInYears, isBefore } from "date-fns";

export const loadData = async (req: Request, res: Response) => {
	try {
		const parents = await prismaClient.user.findMany({
			where: { roleId: 1 },
			include: {
				profile: {
					include: {
						parent: { include: { children: true, Review: true } },
					},
				},
			},
		});

		const teachers = await prismaClient.user.findMany({
			where: { roleId: 2 },
			include: {
				profile: {
					include: {
						Teacher: {
							include: {
								School: { select: { name: true } },
							},
						},
					},
				},
			},
		});

		const psychologists = await prismaClient.user.findMany({
			where: { roleId: 3 },
			include: {
				profile: {
					include: {
						Psychologist: {
							include: { Reviews: { select: { rating: true } } },
						},
					},
				},
			},
		});

		const children = await prismaClient.child.findMany();

		const formattedParents = parents.map((parent) => {
			const childrenNames = parent.profile?.parent?.children.map(
				(child) => child.name
			);
			return {
				id: parent.id,
				name: `${parent.profile?.firstName} ${parent.profile?.lastName}`,
				email: parent.profile?.email,
				children: childrenNames,
			};
		});

		const formattedTeachers = teachers.map((teacher) => {
			return {
				id: teacher.id,
				name: `${teacher.profile?.firstName} ${teacher.profile?.lastName}`,
				email: teacher.profile?.email,
				speciality: teacher.profile?.Teacher?.speciality,
				school: teacher.profile?.Teacher?.School?.name,
			};
		});

		const formattedPsychologists = psychologists.map((psychologist) => {
			let ratingCount = 0;
			let totalRatings = 0;
			psychologist.profile?.Psychologist?.Reviews?.forEach((review) => {
				ratingCount += 1;
				totalRatings += review.rating ?? 0;
			});
			const avarageRating = totalRatings / ratingCount;

			return {
				id: psychologist.id,
				name: `${psychologist.profile?.firstName} ${psychologist.profile?.lastName}`,
				email: psychologist.profile?.email,
				speciality: psychologist.profile?.Psychologist?.speciality,
				rating: avarageRating,
			};
		});

		const childrenCountPerAge = () => {
			let age1_3 = 0;
			let age3_6 = 0;
			let age6_12 = 0;
			let age12_18 = 0;

			children.forEach((child) => {
				const dob = new Date(child.dob);
				const now = new Date();
				let age = differenceInYears(now, dob);
				const birthdayThisYear = new Date(
					now.getFullYear(),
					dob.getMonth(),
					dob.getDate()
				);

				if (isBefore(now, birthdayThisYear)) {
					age -= 1;
				}

				if (age >= 1 && age <= 3) age1_3 += 1;
				else if (age > 3 && age <= 6) age3_6 += 1;
				else if (age > 6 && age <= 12) age6_12 += 1;
				else if (age > 12 && age <= 18) age12_18 += 1;
			});

			return {
				age1_3,
				age3_6,
				age6_12,
				age12_18,
			};
		};

		const reviews = await prismaClient.review.findMany({
			where: { status: "Pending" },
		});

		return res.status(200).json({
			parents: formattedParents,
			teachers: formattedTeachers,
			psychologists: formattedPsychologists,
			reviews,
			childrenCount: childrenCountPerAge(),
		});
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
};
