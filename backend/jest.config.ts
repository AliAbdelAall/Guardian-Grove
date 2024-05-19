import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["./jest.setup.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testMatch: ["<rootDir>/tests/**/*.test.ts"],
};

export default config;
