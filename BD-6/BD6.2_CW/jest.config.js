
/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ['js'],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true
}
