import { Request, Response } from "express";
import { DoctorService } from "../services";
import { CreateDoctorDTO } from "../../domain/dtos";
import { CustomError } from "../../domain";



export class DoctorController {

    constructor( private readonly doctorService: DoctorService ){}

    private handleError( error: unknown, res: Response ) {
        if( error instanceof CustomError) return res.status( error.statusCode ).json({ error: error.message });
        return res.status( 500 ).json({ error: "Internal Server Error" });
    }


    public allDoctors = ( req: Request, res: Response ) => {

        const { speciality = "" } = req.query;
        
        

        this.doctorService.allDoctors( String( speciality ) )
            .then( doctors => res.json( doctors ) )
            .catch( error => this.handleError( error, res ));
        
    }


    public createDoctor = ( req: Request, res: Response ) => {

        const [ error, createDoctorDto ] = CreateDoctorDTO.create( req.body );
        if( error ) {
            res.status( 400 ).json({ error });
            return;
        }

        this.doctorService.createDoctor( createDoctorDto! )
            .then( doctor => res.json( doctor ) )
            .catch( error => this.handleError( error, res ));

    }

    public getDoctor = ( req: Request, res: Response ) => {
        res.json("getDoctor");
    }

    public updateDoctor = ( req: Request, res: Response ) => {
        res.json("updateDoctor");
    }

    public deleteDoctor = ( req: Request, res: Response ) => {
        res.json("deleteDoctor");
    }


}