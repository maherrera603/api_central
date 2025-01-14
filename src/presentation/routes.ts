import { Router } from "express";
import { AuthRoutes } from "./auth";
import { SpecialityRoutes } from "./speclalities";
import { DoctorRoutes } from "./doctors";
import { EpsRoutes } from "./eps";

export class AppRouter {

    static get routes(): Router {
        const routes = Router();

        const apiEndPoint = "/api/v1";

        routes.use( apiEndPoint, AuthRoutes.routes );
        routes.use( apiEndPoint, SpecialityRoutes.routes );
        routes.use( apiEndPoint, DoctorRoutes.routes );
        routes.use( apiEndPoint, EpsRoutes.routes );
 
        return routes;
    }
}