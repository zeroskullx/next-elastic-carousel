module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
}
