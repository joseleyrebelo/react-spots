import path from "path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import pkgJson from "./package.json";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    minify: true,
		target: "modules",
    reportCompressedSize: true,
    lib: {
      name: "react-spots",
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
				...Object.keys(pkgJson.dependencies),
				...Object.keys(pkgJson.peerDependencies),
				// Must stated since `react-jsx-runtime` is interpreted as unique 
				// and added to the bundle, although it is just the react module	
				'react/jsx-runtime' 
			]
    },
  },
});
