import { NEXT_DEMO_REQUIRED_ENV_VARIABLES } from "./constants.js";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config({ convention: "nextjs" });

NEXT_DEMO_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new Error();
  }
});

const trustedOrigins = process.env.NEXT_DEMO_AUTH_TRUSTED_ORIGINS?.replace(
  /,\s*$/,
  "",
).split(",");

export const nextDemoConfig = {
  name: process.env.NEXT_DEMO_APP_NAME as string,
  db: {
    url: process.env.NEXT_DEMO_DATABASE_URL as string,
  },
  auth: {
    secret: process.env.NEXT_DEMO_AUTH_SECRET as string,
    baseUrl: process.env.NEXT_DEMO_AUTH_BASE_URL as string,
    basePath: process.env.NEXT_DEMO_AUTH_BASE_PATH as string,
    trustedOrigins: trustedOrigins,
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
  email: {
    id: process.env.NEXT_DEMO_EMAIL_ID as string,
    password: process.env.NEXT_DEMO_EMAIL_PASSWORD as string,
  },
};
