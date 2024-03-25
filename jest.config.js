module.exports = {
  displayName: 'tech-challenge-frete-rapido',
  clearMocks: true,
  rootDir: './src',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {},
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './reports/test-report.html',
        pageTitle: 'Tests Report',
        includeFailureMsg: true,
        openReport: true,
        expand: true,
      },
    ],
  ],
};
