'use strict';

module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest for tsx
  // using babel-jest for js es modules
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // For 3rd party modules published as untranspiled.
  // Since all files inside node_modules are not transformed by default,
  // Jest will not understand the code in these modules, resulting in syntax errors.
  transformIgnorePatterns: [],
  // Coverage settings
  collectCoverageFrom: ['**/*.{ts, tsx}', '!**/node_modules/**', '!**/*/*.d.ts'],
  coverageDirectory: './tests/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', './src/index.ts'],
  // Alias for @src
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '\\.(css|scss|svg|png)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['__mocks__', '__fixtures__'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
