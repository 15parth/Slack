import { StatusCodes } from "http-status-codes"

import { addMemberToWorkpsaceService, createWorkspaceService, deleteWorkspaceServide, getWorkspaceUserIsMemberOfService, getWorspaceService, isUserMemberOfWorkspace } from "../services/workspaceService.js"
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


export const addMemberToWorkspaceController = async (req, res) => {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Member added to workspace successfully')
      );
  } catch (error) {
    console.log('add member to workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

