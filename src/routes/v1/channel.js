import express from 'express'
import { isAuthenticated } from '../../middleware/authMiddleware';
import { getChannelByIdController } from '../../controllers/channelController';

const router =  express.Router();

router.get('/:channelId', isAuthenticated, getChannelByIdController)

export default router;