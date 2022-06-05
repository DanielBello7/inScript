


// imports
import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';





// verifies the login credentials of the user
const authenticate = (req: Request, res: Response, next: NextFunction) => {
     if (req.isAuthenticated()) return next();

     return res.send('unauthorized');
}






// authenticats a user with jswt
function authenticateToken(req: Request, res: Response, next: NextFunction) {
     
     
     const authorizationHeader = req.headers['authorization'];
     const token = authorizationHeader && authorizationHeader.split(' ')[1];
     if (token == null) return res.sendStatus(401);



     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
          if (error) return res.send('invalid credentials');
          req.user = user;
          return next();
     });
}




function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'});
}


function generateRefreshToken(user: any) {
     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
}

// exports
export { authenticate, authenticateToken, generateAccessToken, generateRefreshToken }