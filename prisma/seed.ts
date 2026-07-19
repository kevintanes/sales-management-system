import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/lib/auth/hash";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const superadminPassword = process.env.SEED_SUPERADMIN_PASSWORD;

  if (!superadminPassword) {
    throw new Error(
      "SEED_SUPERADMIN_PASSWORD belum di-set di .env — tambahkan dulu sebelum seed",
    );
  }

  const hashedPassword = await hashPassword(superadminPassword);

  const superadmin = await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {
      password: hashedPassword,
    },
    create: {
      username: "superadmin",
      name: "Super Admin",
      email: "superadmin@advancedigitals.com",
      password: hashedPassword,
      role: "SUPERADMIN",
    },
  });

  console.log("Superadmin created:", superadmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
