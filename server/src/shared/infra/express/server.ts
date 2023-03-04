import express from 'express'

const SERVER_PORT = 3333

const server = express()

server.get('/', (_, res) => {
  res.json({ message: 'Hello World!' })
})

server.listen(3333, () => {
  console.log(`===> Server running on PORT ${SERVER_PORT}`)
})
