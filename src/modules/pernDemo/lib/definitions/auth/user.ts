import * as v from "valibot";
import type { USER_ROLE } from "../prisma/enums.js";
import { USER_ROLE as EUserRole } from "../prisma/enums.js";
import type { User } from "../prisma/client.js";
import { SDbId, SEmail, SImageUrl, SName, SPassword } from "../generic.js";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TSessionUser = User;

/**
 * Generic User form related schemas and types
 * may include extra fields, e.g. "confirmPassword", relation fields, ...
 */
export const SUserFull = v.partial(
  v.object({
    id: SDbId,
    email: SEmail,
    name: SName,
    emailVerified: v.boolean(),
    role: v.enum(EUserRole),
    image: SImageUrl,
    sessions: v.array(SDbId),
    accounts: v.array(SDbId),
    password: SPassword,
    confirmPassword: SPassword,
  }),
);

export const SUserServer = v.required(v.omit(SUserFull, ["confirmPassword"]), [
  "id",
  "email",
  "role",
]);

export const SUserUi = v.required(
  v.pick(SUserServer, [
    "id",
    "email",
    "name",
    "role",
    "image",
    "emailVerified",
  ]),
  ["id", "email", "role"],
);

// full object for use in server
export type TUserServer = v.InferInput<typeof SUserServer>;

// partial object for use in ui
export type TUserUi = v.InferInput<typeof SUserUi>;
