import { PrismaPg } from "@prisma/adapter-pg";
import { appConfig } from "@/lib/config.js";
import { nextDemoConfig } from "../config.js";
import { PrismaClient } from "../definitions/prisma/client.js";

const adapter = new PrismaPg({ connectionString: nextDemoConfig.db.url });

// Extend the global object type to include prisma
const globalForNextDemoApiPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use the existing global instance or create a new one
export const prisma =
  globalForNextDemoApiPrisma.prisma || new PrismaClient({ adapter });

// In development, attach the instance to the global object
if (appConfig.nodeEnv !== "production") {
  globalForNextDemoApiPrisma.prisma = prisma;
}
