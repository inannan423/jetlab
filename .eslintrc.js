module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended'
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react'
  ],
  rules: {
    'brace-style': 'off',
    'block-spacing': 'off',
    'padded-blocks': 'off',
    'react/jsx-curly-brace-presence': 'off',
    indent: 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react/prop-types': 'off',
  //   @typescript-eslint/prefer-ts-expect-error
    '@typescript-eslint/prefer-ts-expect-error': 'off',
  //   react/no-children-prop
    'react/no-children-prop': 'off',
  //   @typescript-eslint/ban-ts-comment
    '@typescript-eslint/ban-ts-comment': 'off'
  },
  settings: {
    'mdx/code-blocks': false,
    // optional, if you want to disable language mapper, set it to `false`
    // if you want to override the default language mapper inside, you can provide your own
    'mdx/language-mapper': {}
  }
}
