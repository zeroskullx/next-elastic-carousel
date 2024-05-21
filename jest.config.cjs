module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
};
