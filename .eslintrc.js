module.exports = {
  extends: ['standard-with-typescript', 'next/core-web-vitals', 'prettier'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/features/*/*'],
      },
    ],
    // 現在のモダンブラウザでは不要
    'react/jsx-no-target-blank': 'off',
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
