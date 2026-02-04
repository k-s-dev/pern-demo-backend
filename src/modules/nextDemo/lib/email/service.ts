import * as nodemailer from "nodemailer";
import { nextDemoConfig } from "../config.js";
import { appConfig } from "#/src/lib/config.js";
import { logger } from "#/src/lib/logger/service.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: nextDemoConfig.email.id,
    pass: nextDemoConfig.email.password,
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
    dataIn.from = `${nextDemoConfig.name} <${nextDemoConfig.email.id}>`;
  }

  if (appConfig.nodeEnv === "production") {
    await transporter.sendMail(dataIn);
  } else {
    logger.info(dataIn.html);
    logger.info(`send email: ${dataIn.to}, ${dataIn.subject}`);
  }
}
