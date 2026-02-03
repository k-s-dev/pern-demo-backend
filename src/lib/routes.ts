import { Router } from "express";
import { ApiValidationError } from "./error/definitions.js";
import { nextDemoRouter } from "../modules/nextDemo/lib/routes.js";
import { sendMail } from "../modules/nextDemo/lib/email/service.js";

export const appRouter = Router();

// check app route
appRouter.get("/", (_req, res) => {
  res.json("Welcome to express app.");
});

// check error handler route
appRouter.get("/error", () => {
  throw new ApiValidationError({ path: "/error", log: { data: { id: 1 } } });
});

// check api route
appRouter.use("/next-demo", nextDemoRouter);

// check email
appRouter.get("/check-email", async (req, res) => {
  const to = req.query.email as string;
  await sendMail({
    to,
    html: "<h1>Test email.</h1>",
    text: "Test email.",
    subject: "Test email."
  })
  res.status(200).json("Sent email")
})
