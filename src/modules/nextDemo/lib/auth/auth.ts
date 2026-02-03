import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./password.js";
import { prisma } from "../db/service.js";
import { config } from "@/lib/config.js";

export const nextDemoAuth = betterAuth({
  secret: config.nextDemo.auth.secret,
  baseURL: config.nextDemo.auth.url,
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
      clientId: config.nextDemo.auth.socialProviders.google.id,
      clientSecret: config.nextDemo.auth.socialProviders.google.secret,
    },
    github: {
      clientId: config.nextDemo.auth.socialProviders.github.id,
      clientSecret: config.nextDemo.auth.socialProviders.github.secret,
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
