/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    // Allow console for debugging  
    'no-console': 'warn',
    // Basic TypeScript rules
    'no-unused-vars': 'off', // Let TypeScript handle this
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  overrides: [
    {
      // E2E test files - more lenient rules
      files: ['e2e/**/*.ts', 'playwright.config.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-console': 'off'
      }
    }
  ]
}