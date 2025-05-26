import express from "express";

import userRouter from './users.js'
import workspaceRouter from './workspace.js'
const router = express.Router()

router.use('/user', userRouter)
router.use('/workspaces', workspaceRouter)

export default router