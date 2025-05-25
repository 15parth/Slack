import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body:{
           type:String,
    required:[true,'Message body is requried']
    },
    image:{
        type:String
    },
    channelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Channel
    }
})