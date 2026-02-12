import type { Session } from "../prisma/client.js";
import type { TSessionUser } from "./user.js";

export type TSessionData = {
  session: Session;
  user: TSessionUser;
};

export type TOKEN_TYPE = "EMAIL_VERIFICATION" | "RESET_PASSWORD";
