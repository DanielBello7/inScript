


//imports
import { Response, Request, NextFunction } from "express";
import { validationResult } from 'express-validator';

// main function to catch icon error
function HandleIconError(req: Request, res: Response, next: NextFunction) {
     if (req.url === '/favicon.ico') return res.end();
     return next();
}


// 404 page not found error
function HandlePageNotFound(req: Request, res: Response) {
     return res.status(404).json({msg: 'page not found'});
}


// function to get all errors and send a message along
function HandleGeneralError(req: Request, res: Response) {
     const errMsg = req.params.errorMsg;
     return res.status(400).json({msg: errMsg ? errMsg : 'error'});
}


// function that checks for the completion of the validation result
function ValidateRequest(req: Request, res: Response, next: NextFunction) {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({msg: errors.array()});
     return next();
}


// main exports
export { 
     HandleIconError,
     HandlePageNotFound,
     HandleGeneralError,
     ValidateRequest
}