import express from 'express'

import messageController from '../../controllers/messageController.js'
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router =  express.Router();

router.get('/messages/:channelId',
     isAuthenticated, 
     messageController
    )

export default router;