import { nextDemoAuth } from "./auth.js";
import * as fs from "node:fs";

const openApiSchema = await nextDemoAuth.api.generateOpenAPISchema();

fs.writeFileSync(
  ".rough/openApiSchema.json",
  JSON.stringify(openApiSchema.paths),
);

let paths = new Map();
Object.keys(openApiSchema.paths).forEach((k) => {
  paths.set(k, k);
});
paths = Object.fromEntries(paths);
fs.writeFileSync(".rough/authEndpoints.json", JSON.stringify(paths));
