import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
	const mockPrismaClient = {
		user: {
			findMany: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
		profile: {
			findMany: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},

		$disconnect: jest.fn(),
	};

	return {
		PrismaClient: jest.fn(() => mockPrismaClient),
	};
});

afterEach(() => {
	jest.clearAllMocks();
});
