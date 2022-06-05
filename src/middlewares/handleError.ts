


//imports
import { Response, Request, NextFunction } from "express";




function HandleError(req: Request, res: Response, next: NextFunction) {
     if (req.url === '/favicon.ico') return res.end();
     return next();
}


export { HandleError }