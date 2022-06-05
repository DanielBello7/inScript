


import { Response, Request } from 'express';




function Handle404(req: Request, res: Response) {

     res.statusCode = 404;

     return res.send('page not found');
}



function HandleGeneralError(req: Request, res: Response) {


     const msg = req.params.info;
     
     return res.send(400).json({msg: msg});
}





export { Handle404, HandleGeneralError }