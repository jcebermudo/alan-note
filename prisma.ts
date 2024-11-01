import { PrismaClient } from "@prisma/client";
import { migrate } from "./prisma/where/you/want/your/migrations";
import { fieldEncryptionExtension } from 'prisma-field-encryption'

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaRaw =
    globalForPrisma.prisma || new PrismaClient({log: ['query']});

export const prisma = prismaRaw.$extends(fieldEncryptionExtension(
    {encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,}
)) as PrismaClient;
  
await migrate(prisma as PrismaClient)

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}