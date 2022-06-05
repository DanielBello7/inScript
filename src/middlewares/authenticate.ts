


// imports
import { Response, NextFunction } from "express";
import { RequestInterface } from "../types/UserType.type";
import jwt from 'jsonwebtoken';



// authenticats a user with jswt
function __verifyUser(req: RequestInterface, res: Response, next: NextFunction) {
     const authorizationHeader = req.headers['authorization'];
     const token = authorizationHeader && authorizationHeader.split(' ')[1];
     if (token == null) 
          return res.status(401).json({msg: 'invalid credentials'});

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
          if (error) return res.status(400).json({msg: 'invalid token'});
          req.user = user;
          return next();
     });
}

// function to generate token
function generateToken(user: any) {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
}


// exports
export { 
     __verifyUser,
     generateToken
}