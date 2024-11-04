/* eslint-disable @cspell/spellchecker */
import cspellConfigs from "@cspell/eslint-plugin/recommended";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("plugin:astro/recommended"),
  ...tseslint.configs.recommended,
  cspellConfigs,
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        tsconfigRootDir: ".",
      },
    },
  },
  {
    rules: {
      "@cspell/spellchecker": [
        "error",
        {
          configFile: new URL(
            "./cspell.config.yaml",
            import.meta.url
          ).toString(),
        },
      ],
    },
  },
  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },

    rules: {},
  },
  {
    // Lint JavaScript and TypeScript files
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        tsconfigRootDir: ".",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Add any rules specific to these files here
    },
  },
  {
    ignores: ["src/env.d.ts"],
  },
];
