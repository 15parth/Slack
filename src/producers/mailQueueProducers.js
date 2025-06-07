import mailQueue from "../queues/mailQueue.js";

export const addEmailtoMailQueue = async (emailData)=>{
    try{
       await mailQueue.add(emailData)
    }
    catch(error){
        console.log('add email to mail queue error', error)
    }
}