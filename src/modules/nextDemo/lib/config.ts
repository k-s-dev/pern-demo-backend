import { cleanSlashes, extractArrayfromString } from "#/src/lib/utils/index.js";
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

const trustedOrigins = extractArrayfromString(
  process.env.NEXT_DEMO_AUTH_TRUSTED_ORIGINS as string,
);

const verifyEmailPath = cleanSlashes(
  process.env.NEXT_DEMO_AUTH_FRONTEND_VERIFY_EMAIL_PATH as string,
);

const resetPasswordPath = cleanSlashes(
  process.env.NEXT_DEMO_AUTH_FRONTEND_RESET_PASSWORD_PATH as string,
);

export const nextDemoConfig = {
  name: process.env.NEXT_DEMO_APP_NAME as string,
  frontendUrl: process.env.NEXT_DEMO_FRONTEND_URL as string,
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
    frontend: {
      verifyEmailPath,
      resetPasswordPath,
    },
  },
  email: {
    id: process.env.NEXT_DEMO_EMAIL_ID as string,
    password: process.env.NEXT_DEMO_EMAIL_PASSWORD as string,
  },
};
