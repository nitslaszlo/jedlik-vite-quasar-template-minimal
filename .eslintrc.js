// If you change the settings you will need to restart the ESLint server or VSCode
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
    "cypress/globals": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:cypress/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint", "cypress"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    // "sort-imports": ["error", { ignoreCase: true }],
    "vue/attributes-order": ["error", { alphabetical: true }],
    // "no-console": "error",
    // "cypress/no-assigning-return-values": "error",
    // "cypress/no-unnecessary-waiting": "error",
    // "cypress/assertion-before-screenshot": "warn",
    // "cypress/no-force": "warn",
    // "cypress/no-async-tests": "error",
    // "cypress/no-pause": "error"
  },
  ignorePatterns: ["coverage", "dist", "node_modules"],
};
