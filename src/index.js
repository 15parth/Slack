import express from 'express'
import {createServer} from 'http'
import { StatusCodes } from 'http-status-codes'
import { Server } from 'socket.io'

import connectDB from './config/dbConfig.js'
// import mailer from './config/mailConfig.js'
import { PORT } from './config/serverConfig.js'
import messageHandler from './controllers/messageSocketController.js'
import apiRouter from './routes/apiRoutes.js'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', apiRouter)

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' })
})

// console.log(PORT)
io.on('connection', (socket)=>{
  messageHandler(io, socket)
})

server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
  connectDB();

  // const mailResponse = mailer.sendMail({
  //   from :'bhardwajparth069@gmail.com',
  // to:'parthbhardwaj278@gmail.com',
  // subject:'Welcome to the mail',
  // text:'Welcome to the slack application'
  // });

  // console.log(mailResponse)
  
})

