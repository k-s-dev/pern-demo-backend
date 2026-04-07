// src/lib/index.d.ts

import type { TSessionUser } from "#/src/modules/pernDemo/lib/definitions/auth/user.ts";
import type { Session } from "better-auth";

declare global {
  namespace Express {
    interface Locals {
      session?: Session;
      user?: TSessionUser;
    }
  }
}
