import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextDemoApiConfig } from "../config.js";
import { hashPassword, verifyPassword } from "./password.js";
import { prisma } from "../db/service.js";

export const nextDemoApiAuth = betterAuth({
  secret: nextDemoApiConfig.auth.secret,
  baseURL: nextDemoApiConfig.auth.url,
  // REVIEW
  trustedOrigins: ["*"],
  advanced: {
    disableOriginCheck: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    // sendVerificationEmail: async ({ user, url, token }, request) => {
    // await sendVerificationEmail(user.email, url, "EMAIL_VERIFICATION");
    // },
  },
  socialProviders: {
    google: {
      clientId: nextDemoApiConfig.auth.socialProviders.google.id,
      clientSecret: nextDemoApiConfig.auth.socialProviders.google.secret,
    },
    github: {
      clientId: nextDemoApiConfig.auth.socialProviders.github.id,
      clientSecret: nextDemoApiConfig.auth.socialProviders.github.secret,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: { hash: hashPassword, verify: verifyPassword },
    // TODO: add email verification
    // requireEmailVerification: true,
    // sendResetPassword: async ({ user, url, token }, request) => {
    //   await sendVerificationEmail(user.email, url, "RESET_PASSWORD");
    // },
  },
});
