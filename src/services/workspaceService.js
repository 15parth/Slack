import { StatusCodes } from 'http-status-codes';
import {v4 as uuidv4} from 'uuid'

import channelRepository from '../respositories/channelRepository.js';
import workspaceRepository from '../respositories/workspaceRepository.js'
import clientError from '../utils/Errors/clientErrors.js';
import ValidationErrors from '../utils/Errors/validationError.js';

export const createWorkspaceService = async (workspaceData)=>{
   try{
     const joinCode = uuidv4().substring(0,6);
   
    // console.log('this is workspaceData', workspaceData)


    const response = await workspaceRepository.create({
        name:workspaceData.name,
        description: workspaceData.description,
        joinCode,

    });

    console.log('this is response from worspace repo--->',response)

      await workspaceRepository.addmemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
     );


    const updatedWorkspace=  await workspaceRepository.addChannelsToWorkspace(response._id,'general')

     return updatedWorkspace;
   }
   catch(error){
      console.log('create workspace service error ---> ',error)

      if(error.name === 'ValidationError'){
         throw new ValidationErrors(
            {
               error: error.error
            },
            error.message
         );
      }

      if(error.name === 'MongoServerError' && error.code === 11000){
         throw new ValidationErrors({
            error : ['A workspace with same detail already exists']
         },
       'A workspace with same detail already exists')
      }

      throw error;

   }
   
};

const isAdminOfWorkspace = (workspace , userId) =>{
   return workspace.members.find(
      (member)=> member.memberId.toString() === userId && member.role === 'admin'
   );
}

const isUserMemberOfWorkspace = (workspace, userId)=>{
   return workspace.member.find(
      (member)=> member.memberId.toString()=== userId
   )
}

export const getWorkspaceUserIsMemberOfService = async (userId) =>{
   try {
    const response =
      await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
    return response;
  } catch (error) {
    console.log('Get workspaces user is member of service error', error);
    throw error;
  }
}

export const deleteWorkspaceServide= async (workspaceId,userId) =>{
   try{
   const workspace = await workspaceRepository.getById(workspaceId)

   if(!workspace){
      throw new clientError({
         explanation : 'no workspace found to delete',
         error : 'Workspace not found',
         StatusCode : StatusCodes.NOT_FOUND
      })
   }

   const isAllowed= isAdminOfWorkspace(workspace, userId)
   
   if(isAllowed){
      await channelRepository.deleteMany(workspace.channels);

      const response = await workspaceRepository.delete(workspaceId)

      return response;

   }
    throw new clientError({
         explanation : 'user is either not a member or an admin for the workspace',
         message : 'user is not allowed to delete a workspace',
         StatusCode : StatusCodes.UNAUTHORIZED
      })

   }catch(error){
      console.log(error)
      throw error;
   }


}

export const getWorspaceService = async (workspaceId , userId) =>{
       try{
        const workspace= await workspaceRepository.getById(workspaceId);
        if(!workspace){
         throw new clientError({
            explanation : 'Invalid data sent from the client',
            message : 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
         });
      }
      const isMember = isUserMemberOfWorkspace(workspace, userId);
      if(!isMember){
         throw new clientError({
            explanation: 'User it not a member of the workspace',
            message:'User is not a member of the workspace',
            statusCode: StatusCodes.UNAUTHORIZED
         });
      }

      return workspace;
       }catch(error){
           console.log('Get workspace service error', error);
           throw error;
       }
}