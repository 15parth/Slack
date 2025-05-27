import { StatusCodes } from "http-status-codes"

import { createWorkspaceService, deleteWorkspaceServide, getWorkspaceUserIsMemberOfService, getWorspaceService, isUserMemberOfWorkspace } from "../services/workspaceService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js"
import clientError from "../utils/Errors/clientErrors.js"
import workspaceRepository from "../respositories/workspaceRepository.js"

export const createWorkspaceController = async (req, res)=>{
     try{
         const response = createWorkspaceService({
             ...req.body
         });

         return res.status(StatusCodes.CREATED).json(successResponse(response,'Workspace created successfuly'))
     }catch(error){
        console.log('error from create workspace conroller', error)
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
        console.log('error from get workspace user is member controller',error);
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
         console.log('error from delete workspace controller',error);
         if(error.statusCode){
            return res.status(error.statusCode).json(internalServerError(error))
         }
    }
}

export const getWorkspaceController = async (req , res)=>{
    try {
            const response = await getWorspaceService(
            req.params.workspaceId,
            req.userId
         )

         return res
                .status(StatusCodes.OK)
                .json(successResponse(response, 'Workspace deleted successfully'));
    }
    catch (error){
        console.log('error from get workspace controller', error);
         if(error.statusCode){
            return res.status(error.statusCode).json(internalServerError(error))
         }
    }
}  


export const getWorkspaceByJoinCodeService = async(joinCode, userId)=>{
    try{
       const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode)
       if(!workspace){
        throw new clientError({
            explanation: 'invalid data sent from the client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        })
       }
       
       const isMember = isUserMemberOfWorkspace(workspace, userId);
       if(!isMember){
          throw new clientError({
            explanation: 'User is not a member of the workspace',
            message : 'User is not a member of the worspace',
            statusCode: StatusCodes.UNAUTHORIZED
          })
       }

    }catch(error){
        console.log('get workspace by join code service error', error);
        throw error;
    }
}