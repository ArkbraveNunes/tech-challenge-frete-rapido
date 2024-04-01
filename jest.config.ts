export default {
  displayName: 'tech-challenge-frete-rapido',
  clearMocks: true,
  rootDir: '.',
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@common(.*)$': '<rootDir>/src/common/$1',
    '^@application(.*)$': '<rootDir>/src/application/$1',
    '^@domain(.*)$': '<rootDir>/src/domain/$1',
    '^@infra(.*)$': '<rootDir>/src/infra/$1',
    '^@test(.*)$': '<rootDir>/src/test/$1',
  },
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
