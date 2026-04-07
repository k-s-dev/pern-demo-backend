import { defineConfig } from "prisma/config";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config({ convention: "nextjs" });

export default defineConfig({
  schema: "./",
  migrations: {
    path: "./migrations",
  },
  datasource: {
    url: process.env.PERN_DEMO_DATABASE_URL as string,
  },
});
