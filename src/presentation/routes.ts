import { Router } from "express";
import { AuthRoutes } from "./auth";

export class AppRouter {

    static get routes(): Router {
        const routes = Router();

        const apiEndPoint = "/api/v1";

        routes.use( apiEndPoint, AuthRoutes.routes );

        return routes;
    }
}