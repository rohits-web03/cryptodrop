import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		ignores: ['dist', 'node_modules', 'build'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
			globals: { ...globals.browser, ...globals.node },
		},
		settings: {
			react: { version: 'detect' },
		},
		plugins: {
			js,
			react: pluginReact,
			'@typescript-eslint': tseslint.plugin,
		},
		extends: ['js/recommended'],
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // avoid unused vars noise
			'react/react-in-jsx-scope': 'off',
			'react/jsx-key': 'warn', // catch missing keys in lists
			'react/self-closing-comp': 'warn', // prefer self-closing tags when no children
			eqeqeq: 'error', // always use ===
			'no-console': 'warn', // warn on console.log
		},
	},
	{
		files: ['**/*.json'],
		plugins: { json },
		language: 'json/json',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.jsonc'],
		plugins: { json },
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.json5'],
		plugins: { json },
		language: 'json/json5',
		extends: ['json/recommended'],
	},
	{ files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
]);
