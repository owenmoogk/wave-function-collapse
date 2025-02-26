import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import globals from "globals"

export default [
    js.configs.recommended,
    {
        ignores: ["**/node_modules/", "**/build/", "**/dist/", "**/*d.ts"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            import: importPlugin,
        },

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.browser,
                __dirname: "readonly",
            },
        },

        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },

        rules: {
            "prettier/prettier": "error",

            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/member-ordering": "error",
            "@typescript-eslint/method-signature-style": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-implied-eval": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/return-await": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",

            "react/no-unescaped-entities": "off",
            "react/jsx-closing-bracket-location": ["error", { location: "line-aligned" }],
            "react/jsx-first-prop-new-line": ["error", "multiline"],
            "react/jsx-fragments": "error",
            "react/jsx-no-useless-fragment": "error",
            "react/jsx-pascal-case": ["error", { allowAllCaps: true, allowNamespace: true }],
            "react/jsx-props-no-multi-spaces": "error",
            "react/jsx-tag-spacing": ["error", { beforeClosing: "never" }],
            "react/self-closing-comp": "error",

            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",

            // Import rules
            "import/order": [
                "error",
                {
                    groups: [["builtin", "external"], ["internal", "sibling", "parent", "index", "object"]],
                    pathGroups: [
                        { pattern: "react", group: "builtin", position: "before" },
                        { pattern: "**/*.json", group: "object", position: "after" },
                    ],
                    alphabetize: { order: "asc", caseInsensitive: true },
                    "newlines-between": "always",
                    warnOnUnassignedImports: true,
                }
            ],
            "import/no-named-as-default": "error",

            // General ESLint rules
            "no-useless-return": "error",
            "eqeqeq": "error",
            "no-unused-vars": "off", // https://github.com/eslint/eslint/issues/17039
            "no-console": "warn",
            "no-var": "error",
            "prefer-const": "error",
            "prefer-promise-reject-errors": "error",
            "prefer-regex-literals": "error",
            radix: "error",
        },
    },
];