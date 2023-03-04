import path from 'path'

// Database
export const DATABASE_CLIENT = process.env.DATABASE_CLIENT ?? 'pg'
export const DATABASE_HOST = process.env.DATABASE_HOST ?? 'localhost'
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT ?? '5432')
export const DATABASE_USER = process.env.DATABASE_USER ?? 'postgres'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? 'postgres'
export const DATABASE_NAME = process.env.DATABASE_NAME ?? 'my-bills'
export const DATABASE_MIGRATIONS_PATH = path.resolve(
  __dirname,
  '..',
  'database',
  'migrations'
)
