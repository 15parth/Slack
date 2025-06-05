import express from 'express'

import { getChannelByIdController } from '../../controllers/channelController';
import { isAuthenticated } from '../../middleware/authMiddleware';

const router =  express.Router();

router.get('/:channelId', isAuthenticated, getChannelByIdController)

export default router;