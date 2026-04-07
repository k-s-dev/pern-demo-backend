import { extractArrayfromString } from "#/src/lib/utils/index.js";
import dotenvx from "@dotenvx/dotenvx";
import { PERN_DEMO_REQUIRED_ENV_VARIABLES } from "./definitions/constants.js";

dotenvx.config({ convention: "nextjs" });

PERN_DEMO_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new Error();
  }
});

const trustedOrigins = extractArrayfromString(
  process.env.PERN_DEMO_AUTH_TRUSTED_ORIGINS as string,
);

export const pernDemoConfig = {
  name: process.env.PERN_DEMO_APP_NAME as string,
  db: {
    url: process.env.PERN_DEMO_DATABASE_URL as string,
  },
  auth: {
    secret: process.env.PERN_DEMO_AUTH_SECRET as string,
    baseUrl: process.env.PERN_DEMO_AUTH_BASE_URL as string,
    basePath: process.env.PERN_DEMO_AUTH_BASE_PATH as string,
    trustedOrigins: trustedOrigins,
    socialProviders: {
      google: {
        id: process.env.PERN_DEMO_AUTH_GOOGLE_ID as string,
        secret: process.env.PERN_DEMO_AUTH_GOOGLE_SECRET as string,
      },
      github: {
        id: process.env.PERN_DEMO_AUTH_GITHUB_ID as string,
        secret: process.env.PERN_DEMO_AUTH_GITHUB_SECRET as string,
      },
    },
  },
  email: {
    id: process.env.PERN_DEMO_EMAIL_ID as string,
    password: process.env.PERN_DEMO_EMAIL_PASSWORD as string,
  },
};
