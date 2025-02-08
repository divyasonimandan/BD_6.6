
/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ]
};
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js"],
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
