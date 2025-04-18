import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'tailwind.config.js'] },
  {
    extends: [js.configs.recommended],
    files: ['**/*.{js,ts,tsx}']
  },
  {
    extends: [...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json'
      },
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
      'eol-last': ['warn', 'always']
    }
  },
  {
    files: ['*.config.{js,ts}'],
    extends: [js.configs.recommended]
  }
)
