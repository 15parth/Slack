import { StatusCodes } from "http-status-codes"

import { signUpService } from "../services/userService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js"

export const signUp = async (req, res)=>{
    try{
       const user = await signUpService(req.body)
    //    console.log('this is working')
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