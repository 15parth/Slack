import express from "express";

import channelRouter from './channel.js'
import userRouter from './users.js'
import workspaceRouter from './workspace.js'
const router = express.Router()

router.use('/user', userRouter)
router.use('/workspaces', workspaceRouter)
router.use('/channels',channelRouter)

export default router