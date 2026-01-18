/** @type {import('@prisma/cli').PrismaConfig} */
const config = {
  schema: './schema.prisma',
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
}

module.exports = config
