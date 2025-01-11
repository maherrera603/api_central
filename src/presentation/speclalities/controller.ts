import { Request, Response } from "express";
import { SpecialityCreateDTO } from "../../domain/dtos";
import { SpecialityService } from "../services";
import { CustomError } from "../../domain";

export class SpecialityController {

    constructor( private readonly specialityService: SpecialityService){}


    private handleError( error: unknown, res: Response ){

        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status( 500 ).json( "Internal Server Error" );
    }

    public createSpeciality = ( req: Request, res: Response ) => {
        const [ error , specialityCreateDto ] = SpecialityCreateDTO.create( req.body );
        if( error ) {
            res.status( 400 ).json({ error });
            return;
        }

        this.specialityService.create( specialityCreateDto! )
            .then( speciality => res.status( 201 ).json({ speciality }))
            .catch( error => this.handleError( error, res ) );

        
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