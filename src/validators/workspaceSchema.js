import {z} from 'zod'

export const createWorkspaceSchema =  z.object({
    name: z.string().min(3).max(20)
})