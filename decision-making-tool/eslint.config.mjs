import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/*config.js'],
    },
    ...compat.extends(
        'eslint:recommendedTypeChecked ',
        'plugin:@typescript-eslint/recommendedTypeChecked',
        'tseslint.configs.recommendedTypeChecked'
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 5,
            sourceType: 'script',

            parserOptions: {
                project: './tsconfig.json',
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            'no-plusplus': 'off',
            'no-console': 'warn',

            'max-len': [
                'warn',
                {
                    code: 120,
                },
            ],

            indent: [
                'warn',
                2,
                {
                    SwitchCase: 1,
                },
            ],

            'import/prefer-default-export': 'off',

            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],
            noInlineConfig: 'true',
            reportUnusedDisableDirectives: 'true',

            '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                { accessibility: 'explicit', overrides: { constructors: 'off' } },
            ],
            '@typescript-eslint/member-ordering': 'error',
            'class-methods-use-this': 'error',
        },
    },
    eslintPluginUnicorn.configs.recommended,
    {
        rules: {
            'unicorn/better-regex': 'warn',
        },
    },
];
