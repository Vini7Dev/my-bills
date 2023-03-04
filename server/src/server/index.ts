import 'dotenv/config'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'

import { AppError } from '../errors/AppError'
import appRoutes from './routes/index.routes'

const SERVER_PORT = 3333

const server = express()

server.use(express.json())

server.use(appRoutes)

server.use((
  error: Error | AppError,
  _: Request,
  response: Response,
  __: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.code).json({ error: error.message });
  }

  return response.status(500).json({ error: `Internal server error: ${error.message}` });
})

server.listen(3333, () => {
  console.log(`===> Server running on PORT ${SERVER_PORT}`)
})
