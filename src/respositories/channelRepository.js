import User from '../schema/user.js'
import crudRepository from './crudRepositories.js'

const channelRepository = {
    ...crudRepository(User),

}

export default channelRepository; 