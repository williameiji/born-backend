/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	maxWorkers: 1,
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},

	coveragePathIgnorePatterns: [
		"node_modules",
		"test-config",
		"interfaces",
		"repositories",
		"jestGlobalMocks.ts",
		"<rootDir>/src/server.ts",
		"<rootDir>/src/utils",
		"<rootDir>/src/config",
		"<rootDir>/tests/factories",
		"<rootDir>/src/controllers/e2eController.ts",
		"<rootDir>/src/services/e2eService.ts",
		"<rootDir>/src/databases/mongo.ts",
	],
};
