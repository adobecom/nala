module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: { browser: true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    // allow reassigning param
    'no-console': 'off',
    'no-param-reassign': [2, { props: false }],
    'linebreak-style': ['error', 'unix'],
    'import/extensions': ['error', { js: 'always' }],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 6 },
      ObjectPattern: { multiline: true, minProperties: 6 },
      ImportDeclaration: { multiline: true, minProperties: 6 },
      ExportDeclaration: { multiline: true, minProperties: 6 },
    }],
    'max-len': ['error', 140],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'import/named': 'off',
    'no-underscore-dangle': 'off',
  },
  ignorePatterns: [],
};
