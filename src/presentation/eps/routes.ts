import { Router } from "express";
import { EpsController } from "./controller";
import { AuthMiddleware } from "../middlewares";

export class EpsRoutes {

    static get routes(): Router {

        const routes = Router();

        const epsController = new EpsController();

        routes.get( "/eps", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ], epsController.allEps );
        routes.get( "/eps/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE", "EMPLOYEE_ROLE" ]) ], epsController.getEps );
        routes.post( "/eps", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], epsController.createEps );
        routes.put( "/eps/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], epsController.updateEps );
        routes.delete( "/eps/:id", [ AuthMiddleware.validateJWT([ "ADMIN_ROLE" ]) ], epsController.deleteEps );

        return routes
    }
}