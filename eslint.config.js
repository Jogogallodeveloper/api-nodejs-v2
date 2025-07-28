import js from "@eslint/js";
import jsonPlugin from "eslint-plugin-json";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,json}"], // Inclui também JSON

    languageOptions: {
      ecmaVersion: "latest", // Última versão ECMAScript
      sourceType: "module", // Para usar import/export
      globals: {
        ...globals.node, // Apenas ambiente Node
      },
    },

    plugins: {
      js,
      json: jsonPlugin, // Plugin para JSON
    },

    extends: [
      "eslint:recommended", // Regras base
      "plugin:json/recommended", // Regras para JSON
    ],

    rules: {
      // ----- Ajustes para API Node -----
      "no-console": "off", // Permitir console.log (útil em API)
      "no-unused-vars": ["warn"], // Avisar variáveis não usadas
      "indent": ["error", 2], // 2 espaços
      "quotes": ["error", "double"], // Aspas duplas
      "semi": ["error", "always"], // Sempre ponto e vírgula
    },
  },
]);
