import type { Session, User } from "better-auth";
import type { USER_ROLE } from "../../prisma/generated/enums.js";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TSessionUser = User & {
  role: TUserRole;
};

export type TSessionData = {
  session: Session;
  user: TSessionUser;
};
