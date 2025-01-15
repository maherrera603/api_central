import { Router } from "express";
import { SpecialityController } from "./controller";
import { SpecialityService } from "../services";
import { AuthMiddleware } from "../middlewares";

export class SpecialityRoutes {


    static get routes(): Router {

        const routes = Router();
        const specialityService = new SpecialityService();
        const specialityController = new SpecialityController( specialityService );
        

        routes.get( "/specialities", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ] , specialityController.allSpecialities );
        routes.post( "/speciality", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], specialityController.createSpeciality );
        routes.get( "/speciality/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ], specialityController.getSpeciality );
        routes.put( "/speciality/:id",  [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ],specialityController.updateSpeciality );
        routes.delete( "/speciality/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], specialityController.deleteSpeciality );

        return routes;
    }

}