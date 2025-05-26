import { StatusCodes } from "http-status-codes"

import { createWorkspaceService } from "../services/workspaceService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js"

export const createWorkspaceController = async (req, res)=>{
     try{
         const response = createWorkspaceService({
             ...req.body,
             owner:req.id
         });

         return res.status(StatusCodes.CREATED).json(successResponse(response,'Workspace created successfuly'))
     }catch(error){
        console.log('error from workspace conroller', error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }

        return res
            .stauts(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerError(error));
     }
}