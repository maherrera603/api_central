import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class EpsController {
    
    constructor(){}

    private handleError = ( error: unknown, res: Response ) => {
        if( error instanceof CustomError ) return res.status( error.statusCode ).json({ error: error.message});
        return res.status( 500 ).json({ error: "Internal Server Error" });
    }

    public createEps = ( req: Request, res: Response ) => {
        res.json( "createEps" );
    }

    public allEps = ( req: Request,  res: Response ) => {
        res.json( "allEps" );
    }

    public getEps = ( req:Request, res: Response ) => {
        res.json( "getEps" );
    }

    public updateEps = ( req: Request, res: Response ) => {
        res.json( "updateEps" );
    }

    public deleteEps = ( req: Request, res: Response ) => {
        res.json( "deleteEps" );
    }
}