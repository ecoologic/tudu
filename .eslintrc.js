/* globals module */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'], // Apply to test files
      rules: {
        // Add any test-specific rules here if needed
      },
    },
  ],
};
