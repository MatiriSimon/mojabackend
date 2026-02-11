import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Test the connection
prisma.$connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.warn("⚠️ Database connection failed:", error.message);
    } else {
      console.warn("⚠️ Database connection failed:", error);
    }
  });

