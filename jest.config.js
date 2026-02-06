export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^../../services/api$': '<rootDir>/src/__mocks__/api.js',
    '^../services/api$': '<rootDir>/src/__mocks__/api.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],
  testMatch: ['**/__tests__/**/*.test.(js|jsx)', '**/*.test.(js|jsx)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/vite-env.d.ts',
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx', 'json'],
};
