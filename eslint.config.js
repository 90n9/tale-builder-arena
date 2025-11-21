import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const nextRecommendedRules = nextPlugin.configs.recommended?.rules ?? {};
const nextCoreWebVitalsRules = {
  ...nextRecommendedRules,
  "@next/next/no-html-link-for-pages": "error",
  "@next/next/no-sync-scripts": "error",
};

export default tseslint.config(
  { ignores: ["dist", ".next"] },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...nextCoreWebVitalsRules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);
