module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'  // Add Prettier last
    ],
    plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error', // Prettier rules
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  