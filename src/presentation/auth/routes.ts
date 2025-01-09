import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {


    static get routes (): Router {
        const routes = Router();
        
        const controller = new AuthController();

        routes.post( "/auth/register", controller.register );
        routes.post( "/auth/singIn", controller.singIn );
        routes.get( "/auth/accountActive/:verifyAccount", controller.verifyAccount );

        return routes;
    }
}