import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "coverage/**",
      ".git/**"
    ]
  },

  {
    files: [
      "src/**/*.{js,mjs,jsx}",
      "api/**/*.{js,mjs,jsx}",
      "frontend/src/**/*.{js,mjs,jsx}"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-jsx"]
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/react-in-jsx-scope": "off"
    }
  },

  {
    files: [
      "backend/**/*.cjs",
      "server/**/*.cjs"
    ],
    languageOptions: {
      sourceType: "script",
      globals: globals.node
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },

  {
    files: ["tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ["@babel/plugin-syntax-jsx"]
        }
      },
      globals: {
        ...globals.jest,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    }
  },

  {
    files: ["tests/**/*.cjs"],
    languageOptions: {
      sourceType: "script",
      globals: globals.node
    }
  }
];