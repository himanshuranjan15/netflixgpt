/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle CSS imports (if you have CSS modules or direct CSS imports)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/components/__tests__/__mocks__/fileMock.js",
    // Alias for utils if needed, assuming it's relative to src
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    // Mock constants
    "../utils/constants": "<rootDir>/src/components/__tests__/__mocks__/constantsMock.js",
    "../utils/languageConstant": "<rootDir>/src/components/__tests__/__mocks__/languageConstantMock.js",
    "../utils/openai": "<rootDir>/src/components/__tests__/__mocks__/openaiMock.js",
    "../utils/reduxHooks": "<rootDir>/src/components/__tests__/__mocks__/reduxHooksMock.js",


  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/components/**/*.{ts,tsx}", "!src/components/**/index.{ts,tsx}", "!src/**/*.d.ts"],
};
