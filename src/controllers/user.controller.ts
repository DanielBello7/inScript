


// imports
import { Response, Request } from 'express';
import Log from "../config/bunyan.config";


// new user controller
function CreateUser(req: Request, res: Response) {}


// delete user controller
function DeleteUser(req: Request, res: Response) {}


// get single user controller
function GetUser(req: Request, res: Response) {}


// get all users controller
function GetUsers(req: Request, res: Response) {}


// modify user controller
function ModifyUser(req: Request, res: Response) {}


// get all user connections
function GetUserConnections(req: Request, res: Response) {}


// add a new connection
function AddConnection(req: Request, res: Response) {}


// removes a connection
function RemoveConnection(req: Request, res: Response) {}



// main exports
export {
     CreateUser,
     DeleteUser,
     GetUser,
     GetUsers,
     ModifyUser,
     GetUserConnections,
     AddConnection,
     RemoveConnection
}