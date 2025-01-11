import { Request, Response } from "express";
import { SpecialityCreateDTO } from "../../domain/dtos";
import { SpecialityService } from "../services";
import { CustomError } from "../../domain";
import { error } from "console";
import { json } from "stream/consumers";


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
            .then( speciality => res.status( 201 ).json( speciality ) )
            .catch( error => this.handleError( error, res ) );

        
    }

    public allSpecialities = ( req: Request, res: Response ) => {

        const { active } = req.query;
        
        const isActive = (active === "false") 
            ? false
            : (active === "true") ? true
            : undefined;
        
        
        this.specialityService.allSpecialities( isActive )
            .then( specialities => res.json( specialities ) )
            .catch( error => this.handleError( error, res ) );

    }

    public getSpeciality = ( req: Request, res: Response ) => {

        const { id } = req.params;

        this.specialityService.getSpeciality( id )
            .then( speciality => res.json( speciality ))
            .catch( error => this.handleError( error, res ) );
    }

    public updateSpeciality = ( req: Request, res: Response ) => {
        const { id } = req.params;

        const [ error, specialityCreateDto ] = SpecialityCreateDTO.create( req.body );
        if( error ) {
            res.status( 404 ).json({ error });
            return;
        }

        this.specialityService.updateSpeciality( id, specialityCreateDto! )
            .then( speciality => res.json( speciality ) )
            .catch( error => this.handleError( error, res ) );
    }


    public deleteSpeciality = ( req: Request, res: Response ) => {

        const { id } = req.params;

        this.specialityService.deleteSpeciality( id )
            .then( speciality => res.json( speciality ))
            .catch( error  => this.handleError( error, res ) );

    }

}