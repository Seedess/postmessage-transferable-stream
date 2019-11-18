module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "roots": [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest"
  },
  "setupFiles": [
    "./jest.setup.js"
  ]
};