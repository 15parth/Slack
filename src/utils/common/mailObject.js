import { MAIL_ID } from "../../config/serverConfig";

export const workspaceJoinMail= function(workspace) {
    return {
         from : MAIL_ID,
    subject:'You have been added to a workspace',
    text:`Congratulations,You have been added to the workspace ${workspace.name}`
    }
}