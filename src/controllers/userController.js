import { StatusCodes } from "http-status-codes"

import { signInService, signUpService } from "../services/userService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObjects.js"

export const signUp = async (req, res)=>{
    try{
       const user = await signUpService(req.body)
    //    console.log('this is working')
       return res.status(StatusCodes.CREATED).json(successResponse(user , 'User created successfully'))
    }
    catch(error){
        console.log("Sign up controller error", error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(error))
    }
}


export const signIn = async (req, res)=>{
    try{
        const response = await signInService(req.body);
        console.log('this is response-->',response);
        return res.status(StatusCodes.OK).json(successResponse(response,'User signed in successfully'))
    }
    catch(error){
        console.log("Sign In controller error", error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(error))
    }
}

 