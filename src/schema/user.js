import bcrypt from 'bcrypt'
import mongoose from "mongoose";
const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'], 
        unique: [true,'Email already exists'],
        /* eslint-disable */
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'],
        
    },
    password:{
        type: String,
        required:[true, 'Password is required']
    },
    userName:{
        type:String,
        required:[true,'Username is required'],
        unique:[true,'Username already exists'],
        minLength:[3,'Username must be atleast of 3 characters'],
        match:[/^[a-zA-Z0-9_.-]*$/ , 'Username must contain only letters and numbers']
    },
    avatar:{
        type: String,

    }
}, {timestamps:true})

userSchema.pre('save', function saveUser(next){
    const user= this;
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword= bcrypt.hashSync(user.password, SALT)
    user.password= hashedPassword 
    user.avatar= `https://robohash.org/${user.userName}`;
    next();
})


const User= mongoose.model('User', userSchema)

export default User;  