import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./utils/password.js";
import { sendVerificationEmail } from "./utils/verification.email.service.js";
import { prisma } from "../db/service.js";
import { nextDemoConfig } from "../config.js";
import { logger } from "#/src/lib/logger/service.js";
import { openAPI } from "better-auth/plugins";
import { USER_ROLE } from "../definitions/prisma/enums.js";
import { nextCookies } from "better-auth/next-js";

export const nextDemoAuth = betterAuth({
  secret: nextDemoConfig.auth.secret,
  baseURL: nextDemoConfig.auth.baseUrl,
  basePath: nextDemoConfig.auth.basePath,
  trustedOrigins: nextDemoConfig.auth.trustedOrigins,
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
    requireEmailVerification: true,
    password: { hash: hashPassword, verify: verifyPassword },
    sendResetPassword: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url, "RESET_PASSWORD");
      logger.info(`Reset password url for ${user.name}: ${url}`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }) => {
      if (!user.emailVerified) {
        await sendVerificationEmail(user.email, url, "EMAIL_VERIFICATION");
        logger.info(`Email verification url for ${user.email}: ${url}`);
      } else {
        logger.info(`${user.email} already verified.`);
      }
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
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      partitioned: false,
    },
  },
  onAPIError: {
    errorURL: nextDemoConfig.auth.frontend.baseUrl + "/auth-error",
  },
  plugins: [
    openAPI(),
    // next has to be last
    nextCookies(),
  ],
});
