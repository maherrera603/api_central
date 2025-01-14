import { Router } from "express";
import { DoctorController } from "./controller";
import { AdminMiddleware } from "../middlewares/Admin.middleware";
import { DoctorService } from "../services";

export class DoctorRoutes {


    static get routes(): Router {

        const routes = Router();

        const doctorService = new DoctorService();
        
        const doctorController = new DoctorController( doctorService );

        routes.get( "/doctors", [ AdminMiddleware.validateJWT ], doctorController.allDoctors );
        routes.post( "/doctors", [ AdminMiddleware.validateJWT ], doctorController.createDoctor );
        routes.get( "/doctor/:id", [ AdminMiddleware.validateJWT ], doctorController.getDoctor );
        routes.put( "/doctor/:id", [ AdminMiddleware.validateJWT ], doctorController.updateDoctor );
        routes.delete( "/doctor/:id", [ AdminMiddleware.validateJWT ], doctorController.deleteDoctor );


        return routes;
    }

}