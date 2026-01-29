import { PrismaClient } from "@/prisma/generated/client.js";
import { config } from "../config.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: config.db.url });

// Extend the global object type to include prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use the existing global instance or create a new one
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// In development, attach the instance to the global object
if (config.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}
