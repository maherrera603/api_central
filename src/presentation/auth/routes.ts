import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";

export class AuthRoutes {


    static get routes (): Router {
        const routes = Router();
        
        const authService = new AuthService();
        const controller = new AuthController( authService );

        routes.post( "/auth/register", controller.register );
        routes.post( "/auth/singIn", controller.singIn );
        routes.get( "/auth/accountActive/:verifyAccount", controller.verifyAccount );

        return routes;
    }
}