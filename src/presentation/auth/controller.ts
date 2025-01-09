import { Request, Response } from "express";
import { RegisterDTO } from "../../domain/dtos";
import { AuthService } from "../services";
import { CustomError } from "../../domain";

export class AuthController {

    constructor( private authService: AuthService ){}

    private handleError( error: unknown, res: Response ) {
        if( error instanceof CustomError ) return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json({ error: "Internal server error" });
    }

    public register = ( req: Request, res: Response) => {
        const [ error, registerDto ] = RegisterDTO.create( req.body );
        if( error ) {
            res.status(400).json({ error })
            return;
        }


        this.authService.register( registerDto! )
            .then( user => res.status(201).json( user ) )
            .catch( error => this.handleError( error, res ) );
        
    }


    public singIn = ( req: Request, res: Response ) => {
        res.json("singIn");
    }


    public verifyAccount = ( req: Request, res:Response ) => {
        res.json("VerifyAccount");
    }


}