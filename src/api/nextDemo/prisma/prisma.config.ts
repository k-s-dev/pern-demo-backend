import { defineConfig } from "prisma/config";
import { nextDemoApiConfig } from "../lib/config.js";

export default defineConfig({
  schema: "src/api/nextDemo/prisma",
  migrations: {
    path: "src/api/nextDemo/prisma/migrations",
  },
  datasource: {
    url: nextDemoApiConfig.db.url,
  },
});
