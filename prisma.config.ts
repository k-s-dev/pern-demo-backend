import { defineConfig } from "prisma/config";
import { config } from "./src/common/config";

export default defineConfig({
  schema: "src/prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: config.db.url,
  },
});
