import dotenvx from "@dotenvx/dotenvx";

/**
 * load environment
 * requires NODE_ENV to be set
 * currently set using cross-env in `package.json` scripts
 */
dotenvx.config({ convention: "nextjs" });

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    url: process.env.DATABASE_URL,
  },
};
