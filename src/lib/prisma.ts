import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

// On Vercel Serverless environment, copy seed database to /tmp so it is both readable & writable
if (process.env.VERCEL) {
  const tmpDb = path.join("/tmp", "dev.db");
  const seedDb = path.join(process.cwd(), "prisma", "dev.db");
  if (!fs.existsSync(tmpDb) && fs.existsSync(seedDb)) {
    try {
      fs.copyFileSync(seedDb, tmpDb);
    } catch (err) {
      console.error("Failed to copy dev.db to /tmp:", err);
    }
  }
  process.env.DATABASE_URL = `file:${tmpDb}`;
} else if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
