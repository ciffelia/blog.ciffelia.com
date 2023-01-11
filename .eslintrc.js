module.exports = {
  extends: ['standard-with-typescript', 'next/core-web-vitals', 'prettier'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/features/*/*'],
      },
    ],
  },
  overrides: [
    {
      files: ['./src/pages/**/*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};
