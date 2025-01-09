import { Request, Response } from "express";

export class AuthController {

    constructor(){}


    public register = ( req: Request, res: Response) => {
        res.json("register");
    }


    public singIn = ( req: Request, res: Response ) => {
        res.json("singIn");
    }


    public verifyAccount = ( req: Request, res:Response ) => {
        res.json("VerifyAccount");
    }


}