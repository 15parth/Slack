import express from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from './config/dbConfig.js'
import { PORT } from './config/serverConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' })
})

console.log(PORT)

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
  connectDB()
})

