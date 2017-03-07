module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  rules: {
    'flowtype/boolean-style': 'error',
    'flowtype/define-flow-type': 'error',
    'flowtype/delimiter-dangle': ['error', 'always-multiline'],
    'flowtype/generic-spacing': 'error',
    'flowtype/no-dupe-keys': 'error',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-weak-types': 'error',
    'flowtype/object-type-delimiter': 'error',
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': 'off',
    'flowtype/require-valid-file-annotation': 'error',
    'flowtype/require-variable-type': 'off',
    'flowtype/semi': 'error',
    'flowtype/sort-keys': 'error',
    'flowtype/space-after-type-colon': 'error',
    'flowtype/space-before-generic-bracket': 'error',
    'flowtype/space-before-type-colon': 'error',
    'flowtype/type-id-match': ['error', '^[A-Z][a-z]+(?:[A-Z][a-z]+)*$'],
    'flowtype/union-intersection-spacing': 'error',
    'flowtype/use-flow-type': 'error',
    'flowtype/valid-syntax': 'error',
    'max-len': ['error', {code: 80}],
    'no-console': 'error',
    'object-curly-spacing': ['error', 'never'],
  },
};