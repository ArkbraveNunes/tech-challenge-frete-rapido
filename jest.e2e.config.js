module.exports = {
  displayName: 'tech-challenge-frete-rapido',
  clearMocks: true,
  rootDir: './src',
  testRegex: '\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {},
  testEnvironment: 'node',
};
