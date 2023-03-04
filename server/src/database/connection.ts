import knex from 'knex'

import {
  DATABASE_CLIENT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} from '../utils/constants'

export const connection = knex({
  client: DATABASE_CLIENT,
  connection: {
    host : DATABASE_HOST,
    port : DATABASE_PORT,
    user : DATABASE_USER,
    password : DATABASE_PASSWORD,
    database : DATABASE_NAME,
  }
})
