import mailQueue from "../queues/mailQueue.js";

export const addEmailtoMailQueue = async (emailData)=>{
     console.log('initaiting email sending process')
    try{
       await mailQueue.add(emailData)
    }
    catch(error){
        console.log('add email to mail queue error', error)
    }
}