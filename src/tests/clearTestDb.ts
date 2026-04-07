import { prisma } from "../modules/pernDemo/lib/db/service.js";

export async function clearTestDb() {
  try {
    await prisma.user.deleteMany({});
    await prisma.orgUser.deleteMany({});
    await prisma.workspace.deleteMany({});
    await prisma.tag.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.status.deleteMany({});
    await prisma.priority.deleteMany({});
    await prisma.task.deleteMany({});
    return null;
  } catch (error) {
    console.error("Database reset failed:", error);
    throw error;
  }
}
