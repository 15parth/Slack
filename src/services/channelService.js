import { StatusCodes } from "http-status-codes";

import channelRepository from "../respositories/channelRepository";
import clientError from "../utils/Errors/clientErrors";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getChannelById= async (channelId,userId)=>{
    try{
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
        if(!channel){
            throw new clientError({
                message : 'Channel not found for the provided ID',
                explanation:'Invalid data sent from client',
                statusCode: StatusCodes.NOT_FOUND
            })
        } 
    
        const isUserPartOfWorkspace= isUserMemberOfWorkspace(
            channel.workspaceId,
            userId
        )

        if(!isUserPartOfWorkspace){
            throw new clientError({
                message:'User is not a part of the workspace',
                explanation:'User is not a member of the workspace',
                statusCode : StatusCodes.UNAUTHORIZED
            })
        }
        return channel;
    }catch (error){
        console.log('get channel by Id service error', error);

        throw error;
    }
}