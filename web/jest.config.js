module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)$': '@swc/jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  setupFilesAfterEnv: ['<rootDir>setupTestFramework.js'],
};
