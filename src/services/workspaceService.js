import { StatusCodes } from 'http-status-codes';
import {v4 as uuidv4} from 'uuid'

import { addEmailtoMailQueue } from '../producers/mailQueueProducers.js';
import channelRepository from '../respositories/channelRepository.js';
import userRepository from '../respositories/userRepositories.js';
import workspaceRepository from '../respositories/workspaceRepository.js';
import { workspaceJoinMail } from '../utils/common/mailObject.js';
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

export const isUserMemberOfWorkspace = (workspace, userId)=>{
   return workspace.member.find(
      (member)=> member.memberId.toString()=== userId
   )
}

const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
  return workspace.channels.find(
    (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
  );
};

// const isMemberOfWorkspace = (workspace, channelName)=>{
//    return workspace.channels.find(
//       (channel)=> channel.name.toLowercase() === channelName.toLowercase()
//    )
// }

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

export const addMemberToWorkspaceService = async (workspaceId, memberId, role)=>{
    try{
          const workspace = await workspaceRepository.getById(workspaceId);
          if(!workspace){
            throw new clientError({
               explanation: 'Invalid data sent from client',
               message : 'Workspace not found',
               statusCode : StatusCodes.NOT_FOUND
            })
          }
      
          const isValidUser = await userRepository.getById(memberId) 
          if(!isValidUser){
            throw new clientError({
               explanation: 'Invalid data sent from client',
               message : 'user not found',
               statusCode : StatusCodes.NOT_FOUND
            })
          }
          const isMember = isUserMemberOfWorkspace(workspace,memberId);
           if(isMember){
         throw new clientError({
            explanation: 'User is already a member of the workspace',
            message:'User is already a member of the workspace',
            statusCode: StatusCodes.UNAUTHORIZED
         });
      }

      const response = await workspaceRepository.addmemberToWorkspace(workspaceId,memberId, role);

      addEmailtoMailQueue({...workspaceJoinMail(workspace),
         to:isValidUser.email
      })

      return response;

    }catch(error){
      console.log('error from add member to workspace service',error);
      throw error;
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


export const addMemberToWorkpsaceService = async (workspaceID, memberId, role, joinCode) =>{
   try{
       const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode)
       if(!workspace){
        throw new clientError({
            explanation: 'invalid data sent from the client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        })
       }
      
       const isValidUser= await userRepository.getById(memberId);
         if(!isValidUser){
            throw new clientError({
               explanation: 'Invalid data sent from client',
               message : 'user not found',
               statusCode : StatusCodes.NOT_FOUND
            })
          }

       const isMember = isUserMemberOfWorkspace(workspace, memberId);
         if(!isMember){
         throw new clientError({
         explanation: 'User is already a member of the workspace',
         message : 'User is already a member of the worspace',
         statusCode: StatusCodes.UNAUTHORIZED
         })
      }

      const response = await workspaceRepository.addmemberToWorkspace(workspaceID, memberId, role)

      return response
       
   }catch(error){
      console.log('addMemberToWorkpsaceService error',error)
      throw error;
   }
   

}

export const addChannelToWorkspace = async (workspaceId, channelName,userId)=>{
   try{
      const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);
      if(!workspace){
         throw new clientError({
            explanation:'Invalid data sent from client',
            message :'Workspace not found',
            statusCode : StatusCodes.NOT_FOUND
         })

      }
      const isAdmin = isAdminOfWorkspace(workspaceId,userId);
      if(!isAdmin){
         throw new clientError({
            explanation: 'User is not an admin of the workspace',
            message :'User is not an admin of the workspace',
            statusCode : StatusCodes.UNAUTHORIZED
         })
      }
      
      const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(workspace, channelName);
     
      if(isChannelPartOfWorkspace){
           throw new clientError({
            explanation: 'Invalid data sent from client',
            message :'Channel already a part of workspace',
            statusCode : StatusCodes.UNAUTHORIZED
         })
      }

      const response = await workspaceRepository.addChannelsToWorkspace(
         workspaceId,
         channelName
      );

      return response;

   }catch(error){
      console.log('addChannelToWorkspace error', error)
      throw error
   }
}