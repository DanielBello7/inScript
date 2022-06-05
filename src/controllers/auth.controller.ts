


// imports
import { Response, Request } from 'express';
import Log from "../config/bunyan.config";


// login controller
function LoginUser(req: Request, res: Response) {}


// logout controller
function LogoutUser(req: Request, res: Response) {}


// current user controller
function CurrentUser(req: Request, res: Response) {}


// exports
export {
     LoginUser, 
     LogoutUser,
     CurrentUser
}