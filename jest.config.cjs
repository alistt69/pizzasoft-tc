module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest', // Ensure Babel is used for transforming JS/TS files
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Add this line to treat TypeScript files as ESM
};