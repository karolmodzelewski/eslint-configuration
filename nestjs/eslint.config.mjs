import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import globals from 'globals';
import _import from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(compat.extends(
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
    )),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            'unused-imports': unusedImports,
            import: fixupPluginRules(_import),
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
            },
        },

        settings: {
            'import/internal-regex': '@nestjs/',
            'import/external-module-folders': ['node_modules'],
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts'],
            },
            'import/resolver': {
                alias: true,
                typescript: {
                    alwaysTryTypes: true,
                    project: 'tsconfig.json',
                },
                node: {
                    extensions: ['.ts'],
                },
            },
        },

        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/semi': ['off', null],
            '@typescript-eslint/type-annotation-spacing': 'off',
            '@typescript-eslint/adjacent-overload-signatures': 'off',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-deprecated': 'error',
            '@typescript-eslint/no-unnecessary-type-arguments': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-redundant-type-constituents': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-extraneous-class': [
                'error',
                {
                    allowWithDecorator: true,
                    allowStaticOnly: true
                },
            ],
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowTernary: true,
                    allowShortCircuit: true,
                },
            ],
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: {
                        constructors: 'off',
                    },
                },
            ],
            '@typescript-eslint/member-delimiter-style': [
                'off',
                {
                    multiline: {
                        delimiter: 'none',
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },
                },
            ],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'property',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: [
                        // Index signature
                        'signature',

                        // Fields
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',

                        /* Decorated setters (start) */
                        'public-decorated-set',
                        'protected-decorated-set',
                        'private-decorated-set',
                        /* Decorated setters (end) */

                        /* Decorated getters (start) */
                        'public-decorated-get',
                        'protected-decorated-get',
                        'private-decorated-get',
                        /* Decorated getters (end) */

                        'public-decorated-field',
                        'protected-decorated-field',
                        'private-decorated-field',

                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',

                        'public-abstract-field',
                        'protected-abstract-field',

                        'public-field',
                        'protected-field',
                        'private-field',

                        // Setters
                        'public-static-set',
                        'protected-static-set',
                        'private-static-set',

                        'public-instance-set',
                        'protected-instance-set',
                        'private-instance-set',

                        'public-abstract-set',
                        'protected-abstract-set',

                        'public-set',
                        'protected-set',
                        'private-set',

                        // Getters
                        'public-static-get',
                        'protected-static-get',
                        'private-static-get',

                        'public-instance-get',
                        'protected-instance-get',
                        'private-instance-get',

                        'public-abstract-get',
                        'protected-abstract-get',

                        'public-get',
                        'protected-get',
                        'private-get',

                        // Constructors
                        'constructor',

                        // Methods
                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',

                        'public-decorated-method',
                        'protected-decorated-method',
                        'private-decorated-method',

                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method',

                        'public-abstract-method',
                        'protected-abstract-method',

                        'public-method',
                        'protected-method',
                        'private-method',
                    ],
                },
            ],
            'unused-imports/no-unused-imports': 'error',
            'prefer-const': 'error',
            'arrow-parens': ['off', 'always'],
            'arrow-body-style': 'error',
            'brace-style': ['off', 'off'],
            'eol-last': 'off',
            'id-blacklist': 'off',
            'id-denylist': ['error', 'err', 'e', 'cb', 'ev'],
            'no-underscore-dangle': 'error',
            'linebreak-style': 'off',
            'max-classes-per-file': ['error', 1],
            'new-parens': 'off',
            'newline-per-chained-call': 'off',
            'no-extra-semi': 'off',
            'no-irregular-whitespace': 'off',
            'no-trailing-spaces': 'off',
            'space-before-function-paren': 'off',
            'max-len': 'off',
            'space-in-parens': ['off', 'never'],
            'import/named': 'error',
            'import/no-cycle': 'error',
            'import/no-unresolved': 'error',
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: ['internal', 'unknown', 'external', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: 'rxjs',
                            group: 'unknown',
                        },
                        {
                            pattern: 'rxjs/**',
                            group: 'unknown',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'type', 'object'],
                },
            ],
        },
    },
];