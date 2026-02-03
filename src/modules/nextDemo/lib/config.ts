import {
  DEFAULT_PASSWORD_HASH_COST,
  NEXT_DEMO_REQUIRED_ENV_VARIABLES,
} from "./constants.js";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config({ convention: "nextjs" });

NEXT_DEMO_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new Error();
  }
});

export const nextDemoConfig = {
  db: {
    url: process.env.NEXT_DEMO_DATABASE_URL as string,
  },
  auth: {
    secret: process.env.NEXT_DEMO_AUTH_SECRET as string,
    url: process.env.NEXT_DEMO_AUTH_URL as string,
    socialProviders: {
      google: {
        id: process.env.NEXT_DEMO_AUTH_GOOGLE_ID as string,
        secret: process.env.NEXT_DEMO_AUTH_GOOGLE_SECRET as string,
      },
      github: {
        id: process.env.NEXT_DEMO_AUTH_GITHUB_ID as string,
        secret: process.env.NEXT_DEMO_AUTH_GITHUB_SECRET as string,
      },
    },
  },
};
