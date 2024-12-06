import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

export default createJestConfig(config)

// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': [
//       'babel-jest',
//       {
//         presets: ['@babel/preset-env', '@babel/preset-react'],
//       },
//     ],
//   },
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
// }
