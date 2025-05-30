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
        ref:'Channel',
        required:[true,'Channel Id is required']
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Sender Id is required']
    },
    workspaceId:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'Workspace',
         required:[true,'Workspace ID is required']
    }
}); 

const Message= mongoose.model('Message',messageSchema)

export default Message;