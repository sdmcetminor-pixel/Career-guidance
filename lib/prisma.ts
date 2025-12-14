// Prisma Client Singleton
// Prevents multiple instances in development
// Enhanced with connection error handling

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with better error handling
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })

// Handle connection errors gracefully
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  
  // Test connection on startup
  prisma.$connect().catch((error) => {
    console.error('❌ Database connection error:', error.message)
    console.log('💡 Make sure DATABASE_URL is set in .env file')
    console.log('💡 For SQLite, use: DATABASE_URL="file:./dev.db"')
    console.log('💡 For PostgreSQL, use: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"')
  })
}

