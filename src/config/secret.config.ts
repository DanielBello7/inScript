


// imports
import { Response, NextFunction } from "express";
import { RequestInterface } from '../types/UserType.type';

// main secret function
function ExpressSecret(req: RequestInterface, res: Response, next: NextFunction) {
     req.secret = process.env.SECRET
     return next();
}

export default ExpressSecret;