// @ts-check
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import security from "eslint-plugin-security";

export default tseslint.config([
  // Ignore files
  {
    ignores: [
      "dist",
      "node_modules",
      "eslint.config.mjs",
    ],
  },

  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,

  // Security plugin
  {
    plugins: {
      security,
    },
  },

  // Project-specific language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Custom NestJS rules
  {
    rules: {
      // === TypeScript Essential Rules ===
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      // NestJS decorators & DI compatibility
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Allow empty methods for NestJS lifecycle hooks
      "no-empty-function": [
        "error",
        { allow: ["constructors", "methods"] },
      ],

      // Security rules
      "security/detect-object-injection": "off", // thường gây false positive
      "security/detect-non-literal-fs-filename": "warn",

      // Prettier integration
      "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
    },
  },
]);