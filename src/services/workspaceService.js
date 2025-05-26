import {v4 as uuidv4} from 'uuid'

import workspaceRepository from '../respositories/workspaceRepository.js'

export const createWorkspaceService = async (workspaceData)=>{
    const joinCode = uuidv4().substring(0,6);
   
    console.log('this is workspaceData', workspaceData)


    const response = await workspaceRepository.create({
        name:workspaceData.name,
        description: workspaceData.description,
        joinCode,

    });

    //  console.log('workspace data ---->',workspaceData, '& this is the response -->', response)


   const addMemberReponse =  await workspaceRepository.addmemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
     );

    //  console.log('workspace data ---->',workspaceData,' &  this is response ---> ',addMemberReponse)

     await workspaceRepository.addChannelsToWorkspace(response._id,'general')

     return response;
};

