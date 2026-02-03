import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./password.js";
import { prisma } from "../db/service.js";
import { nextDemoConfig } from "../config.js";

export const nextDemoAuth = betterAuth({
  secret: nextDemoConfig.auth.secret,
  baseURL: nextDemoConfig.auth.url,
  basePath: "/next-demo/api/auth",
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
      clientId: nextDemoConfig.auth.socialProviders.google.id,
      clientSecret: nextDemoConfig.auth.socialProviders.google.secret,
    },
    github: {
      clientId: nextDemoConfig.auth.socialProviders.github.id,
      clientSecret: nextDemoConfig.auth.socialProviders.github.secret,
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
