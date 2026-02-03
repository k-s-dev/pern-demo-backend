// src/lib/index.d.ts

import type { Session, User } from "better-auth";

declare global {
  namespace Express {
    interface Locals {
      session?: Session;
      user?: User;
    }
  }
}
