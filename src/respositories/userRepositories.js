import User from "../schema/user"
import crudRepository from "./crudRepositories";


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