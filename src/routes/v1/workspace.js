 import express from "express";

import { addMemberToWorkspaceController, createWorkspaceController, deleteWorkspaceController, getWorkspaceController, getWorkspaceUserIsMemberOfController } from "../../controllers/workspaceController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { createWorkspaceSchema } from "../../validators/workspaceSchema.js";
import { validate } from "../../validators/zodValidator.js";

 
 const router = express.Router()
 

router.post('/',isAuthenticated, validate(createWorkspaceSchema),createWorkspaceController)

router.get('/',isAuthenticated, getWorkspaceUserIsMemberOfController)

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController)

router.get('/:workspaceId', isAuthenticated, getWorkspaceController)

router.put('/:workspaceId/members', isAuthenticated, addMemberToWorkspaceController)


export default router  