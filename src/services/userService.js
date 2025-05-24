import userRepository from "../respositories/userRepositories.js"
import ValidationErrors from "../utils/Errors/validationError.js"

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.create(data)
        return newUser
    } catch (error) {
        if (error.name === 'ValidationErrors') {
            throw new ValidationErrors({
                error: error.errors
            }, error.message)
        }
        
        if (error.name === 'MongooseError' && error.cause && error.cause.code === 11000) {
            throw new ValidationErrors({
                error: ['A user with same email or username already exists']
            }, 'A user with same email or username already exists')
        }
        
        // console.log('user service error', error.cause.code)
        // throw error; 
    }
}