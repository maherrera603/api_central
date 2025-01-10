import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService, EmailService } from "../services";
import { envs } from "../../config";

export class AuthRoutes {


    static get routes (): Router {
        const routes = Router();
        
        const emailService = new EmailService( envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY );
        const authService = new AuthService( emailService );
        const controller = new AuthController( authService );

        routes.post( "/auth/register", controller.register );
        routes.post( "/auth/singIn", controller.singIn );
        routes.get( "/auth/accountActive/:token", controller.verifyAccount );

        return routes;
    }
}