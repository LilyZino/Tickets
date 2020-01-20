module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'no-console': 'off',
    indent: ['error', 4],
    'eol-last': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-indent': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    "arrow-body-style": "off",
    'react/jsx-indent-props': "off",
    'no-underscore-dangle': 'off',
    'react/jsx-one-expression-per-line': 'off'
  }
};
