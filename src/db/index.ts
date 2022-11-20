import { Prisma, PrismaClient } from "@prisma/client";

import { hashPasswordMiddleware } from "../middlewares/prisma";

const prisma = new PrismaClient();

async function main() {
  prisma.$use(hashPasswordMiddleware);
}

main();

export default prisma;
