import { StatusCodes } from "http-status-codes";
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js";
import { getChannelById } from "../services/channelService";

export const getChannelByIdController = async ( req, res) =>{
    try {
       const response = await getChannelById(req.params.channelId);

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