import { pernDemoAuth } from "../modules/pernDemo/lib/auth/auth.js";
import { prisma } from "../modules/pernDemo/lib/db/service.js";
import { testUsers } from "./data.js";

export async function seedTestDb() {
  await seedUsers();
  return null; // Return null for tasks that don't return data to Cypress
}

export async function seedUsers() {
  const { user: user01 } = await pernDemoAuth.api.signUpEmail({
    body: {
      email: testUsers.user01.email,
      name: testUsers.user01.name,
      password: testUsers.user01.password,
    },
  });
  await prisma.user.update({
    where: { id: user01.id },
    data: {
      emailVerified: testUsers.user01.emailVerified,
      role: testUsers.user01.role,
    },
  });
  await prisma.orgUser.create({ data: { userId: user01.id } });

  const { user: user02 } = await pernDemoAuth.api.signUpEmail({
    body: {
      email: testUsers.user02.email,
      name: testUsers.user02.name,
      password: testUsers.user02.password,
    },
  });
  await prisma.user.update({
    where: { id: user02.id },
    data: {
      emailVerified: testUsers.user02.emailVerified,
      role: testUsers.user02.role,
    },
  });
  await prisma.orgUser.create({ data: { userId: user02.id } });

  const { user: user03 } = await pernDemoAuth.api.signUpEmail({
    body: {
      email: testUsers.user03.email,
      name: testUsers.user03.name,
      password: testUsers.user03.password,
    },
  });
  await prisma.user.update({
    where: { id: user03.id },
    data: {
      emailVerified: testUsers.user03.emailVerified,
      role: testUsers.user03.role,
    },
  });
  await prisma.orgUser.create({ data: { userId: user03.id } });
}
