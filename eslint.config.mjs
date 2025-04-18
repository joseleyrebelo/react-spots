 import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";


export default  [
	{ ignores: ["dist/**/*"] },
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		ignores: ["dist/**/*"],
		...reactRecommended,
   	settings: {
			react: { version: "detect" }
		},
    languageOptions: {
				...reactRecommended.languageOptions,
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
            ...globals.browser,
        },
    },
		plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
}];
