import { Router } from "express";
import { SpecialityController } from "./controller";
import { SpecialityService } from "../services";
import { AdminMiddleware } from "../middlewares/Admin.middleware";

export class SpecialityRoutes {


    static get routes(): Router {

        const routes = Router();
        const specialityService = new SpecialityService();
        const specialityController = new SpecialityController( specialityService );

        routes.get( "/specialities", [ AdminMiddleware.validateJWT ], specialityController.allSpecialities );
        routes.post( "/speciality", [ AdminMiddleware.validateJWT ], specialityController.createSpeciality );
        routes.get( "/speciality/:id", [ AdminMiddleware.validateJWT ], specialityController.getSpeciality );
        routes.put( "/speciality/:id",  [ AdminMiddleware.validateJWT ],specialityController.updateSpeciality );
        routes.delete( "/speciality/:id", [ AdminMiddleware.validateJWT ], specialityController.deleteSpeciality );

        return routes;
    }

}