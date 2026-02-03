import * as nodemailer from "nodemailer";
import { nextDemoConfig } from "../config.js";
import { appConfig } from "#/src/lib/config.js";
import { logger } from "#/src/lib/logger/service.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: nextDemoConfig.email.id,
    clientId: nextDemoConfig.email.clientId,
    clientSecret: nextDemoConfig.email.secret,
    refreshToken: nextDemoConfig.email.refreshToken,
  },
});

export async function sendMail(dataIn: {
  to: string;
  html: string;
  text: string;
  from?: string;
  subject?: string;
}) {
  if (!dataIn.from) {
    dataIn.from = nextDemoConfig.email.from;
  }

  if (appConfig.nodeEnv === "production") {
    await transporter.sendMail(dataIn);
  } else {
    logger.info(`send email: ${dataIn.to}, ${dataIn.subject}`);
    logger.info(dataIn.html);
  }
}
