import * as nodemailer from "nodemailer";
import { pernDemoConfig } from "../config.js";
import { appConfig } from "#/src/lib/config.js";
import { logger } from "#/src/lib/logger/service.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: pernDemoConfig.email.id,
    pass: pernDemoConfig.email.password,
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
    dataIn.from = `${pernDemoConfig.name} <${pernDemoConfig.email.id}>`;
  }

  if (appConfig.nodeEnv === "production") {
    await transporter.sendMail(dataIn);
  } else {
    logger.info(dataIn.html);
    logger.info(`send email: ${dataIn.to}, ${dataIn.subject}`);
  }
}
