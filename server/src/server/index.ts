import 'dotenv/config'

import express from 'express'

import appRoutes from './routes/index.routes'

const SERVER_PORT = 3333

const server = express()

server.use(express.json())

server.use(appRoutes)

server.listen(3333, () => {
  console.log(`===> Server running on PORT ${SERVER_PORT}`)
})
