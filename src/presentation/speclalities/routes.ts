import { Router } from "express";
import { SpecialityController } from "./controller";
import { SpecialityService } from "../services";

export class SpecialityRoutes {


    static get routes(): Router {

        const routes = Router();
        const specialityService = new SpecialityService();
        const specialityController = new SpecialityController( specialityService );

        routes.get( "/specialities", specialityController.allSpecialities );
        routes.post( "/speciality", specialityController.createSpeciality );
        routes.get( "/speciality/:id", specialityController.getSpeciality );
        routes.put( "/speciality/:id", specialityController.updateSpeciality );
        routes.delete( "/speciality/:id", specialityController.deleteSpeciality );


        return routes;
    }

}