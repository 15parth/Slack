import Channel from '../schema/channel.js';
import crudRepository from './crudRepositories.js'

const channelRepository = {
    ...crudRepository(Channel),
  getChannelWithWorkspaceDetails : async function (channelId){
    const channel = await Channel.findById(channelId).populate('workspaceId');
    return channel;
  }
}

export default channelRepository; 