import { StatusCodes } from "http-status-codes";
import channelRepository from "../respositories/channelRepository";
import clientError from "../utils/Errors/clientErrors";

export const getChannelById= async (channelId)=>{
    try{
        const channel = await channelRepository.getById(channelId);
        if(!channel){
            throw new clientError({
                message : 'Channel not found for the provided ID',
                explanation:'Invalid data sent from client',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        return channel;
    }catch (error){
        console.log('get channel by Id service error', error);

        throw error;
    }
}