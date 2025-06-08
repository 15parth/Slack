import Message from '../schema/message'
import crudRepository from './crudRepositories.js'


const messageRepository = {
    ...crudRepository(Message),
    getPaginatedMessaged: async (messageParams, page ,limit)=>{
          const message= await Message.find(messageParams)
                .sort({createdAt : -1})
                .skip((page -1 ) * limit)
                .limit(limit)
                .populate('senderId', 'username email avatar')
                // .populate('channelId')
                // .populate('workspaceid');

                
          return message  
    }
}

export default messageRepository