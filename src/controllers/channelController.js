import { StatusCodes } from "http-status-codes";

import { getChannelById } from "../services/channelService.js";
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js";

export const getChannelByIdController = async ( req, res) =>{
    try {
       const response = await getChannelById(req.params.channelId,req.user);

       return res
              .status(StatusCodes.OK)
              .json(successResponse(response,'Channel fetched successfully'))
    }catch (error){
        console.log('get Channel By Id Controller error', error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return  res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(internalServerError(error));
    }
}