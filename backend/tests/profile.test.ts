import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Profile Model", () => {
	it("should create a new profile", async () => {
		(prisma.profile.create as jest.Mock).mockResolvedValue({
			id: 99,
			firstName: "John",
			lastName: "Doe",
			profilePic: "default-profile.png",
			email: "john@example.com",
			dob: new Date("1990-01-01"),
			userId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const newProfile = await prisma.profile.create({
			data: {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				dob: new Date("1990-01-01"),
				userId: 1,
			},
		});

		expect(newProfile).toBeDefined();
		expect(newProfile.firstName).toEqual("John");
		expect(newProfile.lastName).toEqual("Doe");
		expect(newProfile.email).toEqual("john@example.com");
		expect(newProfile.dob).toEqual(new Date("1990-01-01"));
		expect(newProfile.profilePic).toEqual("default-profile.png");
	});

	it("should update an existing profile", async () => {
		(prisma.profile.update as jest.Mock).mockResolvedValue({
			id: 99,
			firstName: "Jane",
			lastName: "Doe",
			profilePic: "updated-profile.png",
			email: "jane@example.com",
			dob: new Date("1995-01-01"),
			userId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const updatedProfile = await prisma.profile.update({
			where: { id: 99 },
			data: {
				firstName: "Jane",
				profilePic: "updated-profile.png",
				email: "jane@example.com",
				dob: new Date("1995-01-01"),
			},
		});

		expect(updatedProfile).toBeDefined();
		expect(updatedProfile.firstName).toEqual("Jane");
		expect(updatedProfile.lastName).toEqual("Doe");
		expect(updatedProfile.email).toEqual("jane@example.com");
		expect(updatedProfile.dob).toEqual(new Date("1995-01-01"));
		expect(updatedProfile.profilePic).toEqual("updated-profile.png");
	});

	it("should delete an existing profile", async () => {
		(prisma.profile.delete as jest.Mock).mockResolvedValue({
			id: 1,
			firstName: "John",
			lastName: "Doe",
			profilePic: "default-profile.png",
			email: "john@example.com",
			dob: new Date("1990-01-01"),
			userId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const deletedProfile = await prisma.profile.delete({
			where: { id: 99 },
		});

		expect(deletedProfile).toBeDefined();
		expect(deletedProfile.firstName).toEqual("John");
		expect(deletedProfile.lastName).toEqual("Doe");
		expect(deletedProfile.email).toEqual("john@example.com");
		expect(deletedProfile.dob).toEqual(new Date("1990-01-01"));
		expect(deletedProfile.profilePic).toEqual("default-profile.png");
	});
});
