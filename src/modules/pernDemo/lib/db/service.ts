import { PrismaPg } from "@prisma/adapter-pg";
import { appConfig } from "@/lib/config.js";
import { pernDemoConfig } from "../config.js";
import { PrismaClient } from "../definitions/prisma/client.js";

const adapter = new PrismaPg({ connectionString: pernDemoConfig.db.url });

// Extend the global object type to include prisma
const globalForPernDemoApiPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use the existing global instance or create a new one
export const prisma =
  globalForPernDemoApiPrisma.prisma || new PrismaClient({ adapter });

// In development, attach the instance to the global object
if (appConfig.nodeEnv !== "production") {
  globalForPernDemoApiPrisma.prisma = prisma;
}
