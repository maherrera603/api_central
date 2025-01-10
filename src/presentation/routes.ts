import { Router } from "express";
import { AuthRoutes } from "./auth";
import { SpecialityRoutes } from "./speclalities";
import { AdminMiddleware } from "./middlewares/Admin.middleware";

export class AppRouter {

    static get routes(): Router {
        const routes = Router();

        const apiEndPoint = "/api/v1";

        routes.use( apiEndPoint, AuthRoutes.routes );
        routes.use( apiEndPoint, [ AdminMiddleware.validateJWT ], SpecialityRoutes.routes );
 
        return routes;
    }
}