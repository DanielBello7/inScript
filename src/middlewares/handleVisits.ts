


// imports 
import { Request, Response, NextFunction } from "express";
import { UserSession } from "../types/UserType.type";



function HandleVisits(req: Request, res: Response, next: NextFunction) {
     const userVisits: UserSession = req.session;
     if (userVisits.visits) userVisits.visits++;
     else userVisits.visits = 1;
     return next();
}

export { HandleVisits }