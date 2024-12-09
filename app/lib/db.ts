import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

//this code is related to Prisma, an ORM tool that helps developers work with databases in an object-oriented way. It is used in a node.js environment, and specifically for managing a Prisma client instance.
//In development, we store the Prisma Client instance globally (on globalThis) so that it is reused across the app, even after restarts. This avoids creating new instances of Prisma Client every time the app restarts, preventing excessive database connections.
//In production, we don't need this setup because the app doesn't restart frequently, and a single instance of Prisma Client works fine. Thus, we don’t store the Prisma Client instance globally in production.