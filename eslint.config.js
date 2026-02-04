import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      // React 17+ / Vite
      "react/react-in-jsx-scope": "off",

      // THIS fixes the "defined but never used" for JSX components
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z]" }],

      // optional sanity
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // ✅ apply base JS recommended rules correctly
  js.configs.recommended,
]);

// console.log(`\n------------------------`);

// import globals from "globals";
// import react from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   {
//     files: ["**/*.{js,jsx,mjs,cjs}"],
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",
//       globals: globals.browser,
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       react,
//     },
//     rules: {
//       // ✅ REQUIRED for Vite / React 17+
//       "react/react-in-jsx-scope": "off",

//       // sane defaults
//       "react/prop-types": "off",
//       "no-unused-vars": "warn",
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
// ]);
