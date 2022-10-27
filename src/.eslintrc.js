module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 9,
    sourceType: 'module',
  },
  rules: {
    // 'object-shorthand': ['error', 'never'],
    'prettier/prettier': ['error'],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
  },
};
