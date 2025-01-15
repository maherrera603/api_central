import { Router } from "express";
import { DoctorController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { DoctorService } from "../services";

export class DoctorRoutes {


    static get routes(): Router {

        const routes = Router();

        const doctorService = new DoctorService();
        
        const doctorController = new DoctorController( doctorService );

        routes.get( "/doctors", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ], doctorController.allDoctors );
        routes.post( "/doctors", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], doctorController.createDoctor );
        routes.get( "/doctor/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ], doctorController.getDoctor );
        routes.put( "/doctor/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], doctorController.updateDoctor );
        routes.delete( "/doctor/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], doctorController.deleteDoctor );


        return routes;
    }

}