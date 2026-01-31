import { PrismaPg } from "@prisma/adapter-pg";
import { nextDemoApiConfig } from "../config.js";
import { appConfig } from "@/lib/config.js";
import { PrismaClient } from "../../prisma/generated/client.js";

const adapter = new PrismaPg({ connectionString: nextDemoApiConfig.db.url });

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
