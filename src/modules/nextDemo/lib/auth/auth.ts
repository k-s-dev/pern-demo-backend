import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./password.js";
import { prisma } from "../db/service.js";
import { nextDemoConfig } from "../config.js";
import { sendVerificationEmail } from "./verification.email.service.js";
import { logger } from "#/src/lib/logger/service.js";
import { createAuthMiddleware, openAPI } from "better-auth/plugins";
import { USER_ROLE } from "../definitions/prisma/enums.js";

export const nextDemoAuth = betterAuth({
  secret: nextDemoConfig.auth.secret,
  baseURL: nextDemoConfig.auth.baseUrl,
  basePath: nextDemoConfig.auth.basePath,
  // REVIEW
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
    sendResetPassword: async ({ user, token }) => {
      const frontendUrl = nextDemoConfig.auth.frontend.baseUrl;
      const resetPasswordPath = nextDemoConfig.auth.frontend.resetPasswordPath;
      const url = `${frontendUrl}/${resetPasswordPath}/?token=${token}`;
      await sendVerificationEmail(user.email, url, "RESET_PASSWORD");
      logger.info(`Reset password url for ${user.name}: ${url}`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, token }) => {
      if (!user.emailVerified) {
        const frontendUrl = nextDemoConfig.auth.frontend.baseUrl;
        const verifyEmailPath = nextDemoConfig.auth.frontend.verifyEmailPath;
        const url = `${frontendUrl}/${verifyEmailPath}/?token=${token}`;
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
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path.includes("/sign-in/email") ||
        ctx.path.includes("/sign-in/social") ||
        ctx.path.includes("/next-demo/api/auth/callback")
      ) {
        return ctx.json({
          original: ctx.context.returned,
          setCookie: ctx.context.responseHeaders?.get("set-cookie"),
          // TODO: remove cookie if not needed
          cookie: {
            name: ctx.context.authCookies.sessionToken.name,
            options: ctx.context.authCookies.sessionToken.attributes,
            expiresIn: ctx.context.options.session?.expiresIn,
            updateAge: ctx.context.options.session?.updateAge,
          },
        });
      }
    }),
  },
  plugins: [openAPI()],
});
