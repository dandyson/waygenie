module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Add Prettier last
  ],
  plugins: ["react", "jsx-a11y", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error", // Prettier rules
    "react/no-unescaped-entities": "off", // Turned this off so I dont have to escape my apostrophes in any text I write in the components (I dont feel I need this rule in)
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx"],
      env: {
        jest: true,
      },
    },
  ],
};
