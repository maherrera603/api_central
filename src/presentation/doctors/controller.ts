import { Request, Response } from "express";

export class DoctorController {

    constructor(){}


    public allDoctors = ( req: Request, res: Response ) => {
        res.json("allDoctors");
    }


    public createDoctor = ( req: Request, res: Response ) => {
        res.json("createDoctor");
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