import type { USER_ROLE } from "../prisma/enums.js";
import type { Session, User } from "../prisma/client.js";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TSessionUser = User;
export type TSessionData = {
  session: Session;
  user: TSessionUser;
};

export type TOKEN_TYPE = "EMAIL_VERIFICATION" | "RESET_PASSWORD";
