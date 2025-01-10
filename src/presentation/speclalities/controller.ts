import { Request, Response } from "express";

export class SpecialityController {

    constructor(){}

    public createSpeciality = ( req: Request, res: Response ) => {
        res.json( "create" );
    }

    public allSpecialities = ( req: Request, res: Response ) => {
        res.json( " all specialities" );
    }

    public getSpeciality = ( req: Request, res: Response ) => {
        res.json( "getSpecialities" );
    }


    public updateSpeciality = ( req: Request, res: Response ) => {
        res.json( "updateSpeciality" );
    }


    public deleteSpeciality = ( req: Request, res: Response ) => {
        res.json( "deleteSpeciality" );
    }

}