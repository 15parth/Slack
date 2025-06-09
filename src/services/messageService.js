import { StatusCodes } from "http-status-codes";

import channelRepository from "../respositories/channelRepository.js"
import messageRepository from "../respositories/messageRepository.js"
import clientError from "../utils/Errors/clientErrors.js";
import { isUserMemberOfWorkspace } from "./memberService.js";

export const getMessagesService = async (messageParams, page, limit,user) =>{

    const channelDetails= await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

    const workspace = channelDetails.workspaceId;


    const isMember =  isUserMemberOfWorkspace(workspace, user)

    if(!isMember){
        throw new clientError({
           explanation: 'user is not a memberr of the workspace',
           message:'user is not a memberr of the workspace',
           statusCode: StatusCodes.UNAUTHORIZED 
        })
    }

    const message= await messageRepository.getPaginatedMessaged(
        messageParams,
        page,
        limit
    );

    return message;

} 