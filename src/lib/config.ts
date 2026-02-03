import dotenvx from "@dotenvx/dotenvx";
import { APP_REQUIRED_ENV_VARIABLES } from "./constants.js";
import { nextDemoConfig } from "../modules/nextDemo/lib/config.js";

/**
 * load environment
 * requires NODE_ENV to be set
 * currently set using cross-env in `package.json` scripts
 */
dotenvx.config({ convention: "nextjs" });

APP_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new Error();
  }
});

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  nextDemo: nextDemoConfig,
};
