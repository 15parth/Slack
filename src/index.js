import express from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from './config/dbConfig.js'
import mailer from './config/mailConfig.js'
import { PORT } from './config/serverConfig.js'
import apiRouter from './routes/apiRoutes.js'
import './producers/mailQueueProducers.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', apiRouter)

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' })
})

console.log(PORT)

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
  connectDB();

  const mailResponse = mailer.sendMail({
    from :'bhardwajparth069@gmail.com',
  to:'parthbhardwaj278@gmail.com',
  subject:'Welcome to the mail',
  text:'Welcome to the slack application'
  });

  console.log(mailResponse)
  
})

