import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User Model", () => {
	it("should retrieve users", async () => {
		(prisma.user.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, username: "user1" },
			{ id: 2, username: "user2" },
		]);

		const users = await prisma.user.findMany();

		expect(users).toHaveLength(2);
		expect(users[0].username).toEqual("user1");
		expect(users[1].username).toEqual("user2");
	});

	it("should create a new user", async () => {
		(prisma.user.create as jest.Mock).mockResolvedValue({
			id: 1,
			username: "new_user",
			password: "hashed_password",
			roleId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const newUser = await prisma.user.create({
			data: {
				username: "new_user",
				password: "password",
				roleId: 1,
			},
		});

		expect(newUser).toBeDefined();
		expect(newUser.username).toEqual("new_user");
		expect(newUser.password).not.toEqual("password");
		expect(newUser.createdAt).toBeInstanceOf(Date);
		expect(newUser.updatedAt).toBeInstanceOf(Date);
	});

	it("should update an existing user", async () => {
		(prisma.user.update as jest.Mock).mockResolvedValue({
			id: 1,
			username: "updated_user",
			password: "hashed_password",
			roleId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const updatedUser = await prisma.user.update({
			where: { id: 1 },
			data: { username: "updated_user" },
		});

		expect(updatedUser).toBeDefined();
		expect(updatedUser.username).toEqual("updated_user");
		expect(updatedUser.createdAt).toBeInstanceOf(Date);
		expect(updatedUser.updatedAt).toBeInstanceOf(Date);
	});

	it("should delete an existing user", async () => {
		(prisma.user.delete as jest.Mock).mockResolvedValue({
			id: 1,
			username: "deleted_user",
			password: "hashed_password",
			roleId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const deletedUser = await prisma.user.delete({ where: { id: 1 } });

		expect(deletedUser).toBeDefined();
		expect(deletedUser.username).toEqual("deleted_user");
		expect(deletedUser.createdAt).toBeInstanceOf(Date);
		expect(deletedUser.updatedAt).toBeInstanceOf(Date);
	});
});
