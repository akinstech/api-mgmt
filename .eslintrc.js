module.exports = {
  extends: 'airbnb-base',
  //"extends": "eslint:recommended",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    mocha: true,
  },
  rules: {
//     // enable additional rules
//     indent: ['error', 2],
//     'linebreak-style': ['error', 'unix'],
//     quotes: ['error', 'double'],
//     semi: ['error', 'always'],
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'class-methods-use-this': 'off',
    'no-lonely-if': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    'object-curly-newline': 'off',
//     // override default options for rules from base configurations
//     'comma-dangle': ['error', 'always'],
//     'no-cond-assign': ['error', 'always'],

//     // disable rules from base configurations
//     'no-console': 'off',
  }
};
