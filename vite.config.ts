import { defineConfig } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";

function graphqlPlugin() {
  return {
    name: "vite-plugin-graphql",
    transform(src: string, id: string) {
      if (id.endsWith(".graphql")) {
        const content = readFileSync(id, "utf-8");
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [graphqlPlugin()],
  build: {
    target: "es2020",
    outDir: "dist",
    minify: false,
    rollupOptions: {
      external: ["@octokit/graphql", "@octokit/graphql-schema", "dotenv"],
    },
  },
});
