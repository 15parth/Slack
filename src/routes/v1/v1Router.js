import express from "express";

import channelRouter from './channel.js'
import memberRouter from './member.js'
import userRouter from './users.js'
import workspaceRouter from './workspace.js'
const router = express.Router()

router.use('/user', userRouter)
router.use('/workspaces', workspaceRouter)
router.use('/channels',channelRouter)
router.use('/member', memberRouter)

export default router