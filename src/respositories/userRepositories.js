import User from "../schema/user.js"
import crudRepository from "./crudRepositories.js";


 const userRepository ={
    ...crudRepository(User),
    getUserByEmail : async(email) => {
    const user = await User.findOne((email))
    return user;
},
 getUserByName : async(name) => {
    const user= await User.findOne({name}).select('-password')
    return user
}

} 

export default userRepository