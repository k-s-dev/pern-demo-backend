import { clearTestDb } from "../clearTestDb.js";
import { seedTestDb } from "../seedTestDb.js";

export async function setup() {
  await clearTestDb();
  await seedTestDb();
}

export async function teardown() {
  await clearTestDb();
}
