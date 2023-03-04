import path from 'path'

// Database Connection
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

// Database Tables
export const DATABASE_MODELS = {
  USER: 'User',
  USERS: 'users',
  BILL: 'Bill',
  BILLS: 'bills'
}

// Api Responses
export const API_RESPONSES = {
  successRetrieve: (model: string, data: any) => ({ message: `${model} retrieve successfully!`, data }),
  successCreate: (model: string) => ({ message: `${model} created successfully!` }),
  successUpdate: (model: string) => ({ message: `${model} updated successfully!` }),
  successDelete: (model: string) => ({ message: `${model} deleted successfully!` }),
  successAuthToken: (token: string) => ({ message: 'Authentication successfully created!', token })
}

// Hash Provider
export const HASH_SALT = parseInt(process.env.HASH_SALT ?? '8')

// JSON Web Token
export const JWT_SECRET = process.env.JWT_SECRET ?? 'default'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1d'
