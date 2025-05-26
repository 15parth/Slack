import {v4 as uuidv4} from 'uuid'

import workspaceRepository from '../respositories/workspaceRepository.js'

export const createWorkspaceService = async (workspaceData)=>{
    const joinCode = uuidv4().substring(0,6);


    const response = await workspaceRepository.create({
        ...workspaceData,
        description: workspaceData.description,
        joinCode,

    });

    await workspaceRepository.addmemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
     );

     await workspaceRepository.addChannelsToWorkspace(response._id,'general')

     return response;
};

