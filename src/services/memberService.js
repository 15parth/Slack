import { StatusCodes } from "http-status-codes";
import workspaceRepository from "../respositories/workspaceRepository.js"
import clientError from "../utils/Errors/clientErrors.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";
import userRepository from "../respositories/userRepositories.js";

export const isMemberPartOfWorkspaceService = async ( 
    workspaceId, 
    memberId
)=> {

  const workspace= await workspaceRepository.getById(workspaceId);

  if(!workspace){
    throw new clientError({
      explanation:'Workspace does not exist',
      message:'Workspace does not exists , invalid data sent from client',
      statusCode: StatusCodes.NOT_FOUND
    })
  }

  const isUserMember = isUserMemberOfWorkspace(workspace, memberId)

  if(!isUserMember){
    throw new clientError({
        explanation: 'User is not a member of the workspace',
        message:'User is not a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
    })
  }

  const user = await userRepository.getById(memberId);
  return user;

}