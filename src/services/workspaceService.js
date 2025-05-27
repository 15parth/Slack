import {v4 as uuidv4} from 'uuid'

import workspaceRepository from '../respositories/workspaceRepository.js'

export const createWorkspaceService = async (workspaceData)=>{
   try{
     const joinCode = uuidv4().substring(0,6);
   
    // console.log('this is workspaceData', workspaceData)


    const response = await workspaceRepository.create({
        name:workspaceData.name,
        description: workspaceData.description,
        joinCode,

    });



      await workspaceRepository.addmemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
     );


    const updatedWorkspace=  await workspaceRepository.addChannelsToWorkspace(response._id,'general')

     return updatedWorkspace;
   }
   catch(error){
      console.log(error)
      throw error;
   }
   
};

