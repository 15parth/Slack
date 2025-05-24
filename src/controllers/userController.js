import { StatusCodes } from "http-status-codes"

import { signUpService } from "../services/userService"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects"

export const signUp = async (req, res)=>{
    try{
       const user = await signUpService(req.body)
       return res.status(StatusCodes.CREATED).json(successResponse(user , 'User created successfully'))
    }
    catch(error){
        console.log("user controller error", error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(error))
    }
}