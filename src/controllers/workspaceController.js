import { StatusCodes } from "http-status-codes"

import { createWorkspaceService, deleteWorkspaceServide, getWorkspaceUserIsMemberOfService } from "../services/workspaceService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js"

export const createWorkspaceController = async (req, res)=>{
     try{
         const response = createWorkspaceService({
             ...req.body
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

export const getWorkspaceUserIsMemberOfController = async (req, res)=>{
    try{
        const response = await getWorkspaceUserIsMemberOfService(req.user)
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response,'Workspace fetched successfully'))
    } catch (error){
        console.log(error);
        return res
               .stauts(StatusCodes.INTERNAL_SERVER_ERROR)
               .json(internalServerError(error)) 
    }
}


export const deleteWorkspaceController = async (req,res)=>{
    try{
         const response = await deleteWorkspaceServide(
            req.params.workspaceId,
            req.userId
         )

         return res
                .status(StatusCodes.OK)
                .json(successResponse(response, 'Workspace deleted successfully'));
    } catch(error){
         console.log(error);
         if(error.statusCode){
            return res.status(error.statusCode).json(internalServerError(error))
         }
    }
}