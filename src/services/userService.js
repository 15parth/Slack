import userRepository from "../respositories/userRepositories"
import ValidationErrors from "../utils/Errors/validationError"

export const signUpService = async (data)=>{
    try{
        const newUser = await userRepository.create(data)
        return newUser
    } catch(error){
        if(error.name ===  'ValidationErrors'){
            throw new ValidationErrors({
                error: error.errors
            },
        error.message)
        }
        if(error.name==='MongoServerError' && error.code === 11000){
            throw new ValidationErrors({
                error : ['A user with same email or username already exists']
            },
        'A user with same email or username already exists')
        }
        console.log('user service error', error)
    }
}