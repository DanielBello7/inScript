



// imports
import { Session } from "express-session";





export type UserType = {
     _id: string,
     firstName: string,
     lastNme: string,
     email: string,
     password: string,
     createdAt: string,
     updatedAt: string
}




export interface UserSession extends Session { 
     visits?: number 
}