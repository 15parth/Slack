import mongoose from "mongoose";

const workSpaceSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Workspace name is required'],
        unique: true
    },
    descrription: {
        type:String
    },
    members:[
        {
            memberId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            role:{
                type:String,
                enum:['admin', 'member'],
                deafault:'member'
            }
        }
    ],
    joinCode:{
        type:String,
        required:[true,'Join code is required']
    },
    channel:[
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Channel'
        }
    ]
})

const Workspace = mongoose.model('Workspace', workSpaceSchema);


export default Workspace