
  // jest.config.js

module.exports = {
  "bail": 1,
  "verbose": true,
    globalSetup: "./jest.setup.js",
    moduleNameMapper: {
      "^@/(.*)$": "$1",
      "^~/(.*)$": "$1",
      "^vue$": "vue/dist/vue.common.js",
    },
    testMatch: ['<rootDir>/test/**'],
    moduleFileExtensions: ["js", "vue", "json"],
    transform: {
      "^.+\\.js$": "babel-jest",
      ".*\\.(vue)$": "vue-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: [
      "components/**/*.vue",
      "pages/**/*.vue",
    ],
  };