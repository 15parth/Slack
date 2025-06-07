import Queue from 'bull'
import { REDIS_HOST, REDIS_PORT } from '../config/serverConfig'

export default new Queue('mailQueue',{
    host:REDIS_HOST,
    port:REDIS_PORT
})