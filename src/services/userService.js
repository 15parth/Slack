import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes"

import userRepository from "../respositories/userRepositories.js"
import { createJWT } from "../utils/common/authUtils.js"
import clientError from "../utils/Errors/clientErrors.js"
import ValidationErrors from "../utils/Errors/validationError.js"

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.create(data)
        return newUser
    } catch (error) {
        if ( error.name === 'ValidatorError:') {
            throw new ValidationErrors({
                error: error.errors
            }, error.message)
        }
        
        if (error.name === 'MongooseError' && error.cause && error.cause.code === 11000) {
            throw new ValidationErrors({
                error: ['A user with same email or username already exists']
            }, 'A user with same email or username already exists')
        }
        
        console.log('user service error', error)
        // throw error; 
    }
}


export const signInService = async (data)=>{
      try{
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new clientError({
                explanation: 'Invalid data sent from client',
                message:'No registered user found with this email',
                stautsCode : StatusCodes.NOT_FOUND
            })
        }

        //matching the incoming password
        const isMatched=  bcrypt.compareSync(data.password, user.password)

        if(!isMatched){
            throw new clientError({
                explanation: 'Invalid data sent from the client',
                message :'Invalid password, please try again',
                StatusCodes : StatusCodes.BAD_REQUEST
            })
        }

        return {
            userName: user.userName,
            avatar: user.avatar,
            email : user.email,
            token : createJWT({id:user.id, email:user.email })
        }

      }catch(error){
        console.log('Sign in service error ',error)
        throw error
      }
}