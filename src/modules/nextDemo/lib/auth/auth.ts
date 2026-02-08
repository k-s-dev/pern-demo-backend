import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./password.js";
import { prisma } from "../db/service.js";
import { nextDemoConfig } from "../config.js";
import { USER_ROLE } from "../../prisma/generated/enums.js";
import { sendVerificationEmail } from "./verification.email.service.js";
import { logger } from "#/src/lib/logger/service.js";
import { appConfig } from "#/src/lib/config.js";

export const nextDemoAuth = betterAuth({
  secret: nextDemoConfig.auth.secret,
  baseURL: nextDemoConfig.auth.url,
  basePath: "/next-demo/api/auth",
  // REVIEW
  trustedOrigins: ["http://192.168.1.5:3000"],
  advanced: {
    // disableOriginCheck: true,
    // useSecureCookies: appConfig.nodeEnv === "production" ? true : false,
    // crossSubDomainCookies: {
    //   enabled: true,
    //   domain: "192.168.1.5",
    // },
    // defaultCookieAttributes: {
    //   httpOnly: true,
    //   secure: false,
    // },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: nextDemoConfig.auth.socialProviders.google.id,
      clientSecret: nextDemoConfig.auth.socialProviders.google.secret,
      mapProfileToUser: (profile) => ({ name: profile.name }),
    },
    github: {
      clientId: nextDemoConfig.auth.socialProviders.github.id,
      clientSecret: nextDemoConfig.auth.socialProviders.github.secret,
      mapProfileToUser: (profile) => ({ name: profile.name }),
    },
  },
  emailAndPassword: {
    enabled: true,
    password: { hash: hashPassword, verify: verifyPassword },
    sendResetPassword: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url, "RESET_PASSWORD");
      logger.info(`Reset password url for ${user}: ${url}`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url, "EMAIL_VERIFICATION");
      logger.info(`Email verification url for ${user}: ${url}`);
    },
  },
  user: {
    additionalFields: {
      role: {
        type: Object.values(USER_ROLE),
        required: false,
        defaultValue: USER_ROLE.USER,
        input: false, // don't allow user to set role
      },
    },
  },
});
