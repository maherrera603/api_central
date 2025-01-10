import { NextFunction, Request, Response } from "express";
import { envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain/entities";

export class AdminMiddleware {

    static async validateJWT ( req: Request, res: Response, next: NextFunction ) {
        const authorization = req.header("Authorization");

        if( !authorization ) {
            res.status( 403 ).json( "No token provided" );
            return;
        }

        if( !authorization.startsWith("Bearer ")) {
            res.status( 403 ).json( "token invalid");
            return;
        }
        
        const token = authorization.split(" ").at(1) || "";

        try {
            
            const {role, user } = await JWTAdapter.validateToken( token, envs.JWT_SEED ) as { role: string, user: string};
            if( role !== "ADMIN_ROLE") {
                res.status( 403 ).json( "token invalid");
                return;
            }

            const existsUser = await UserModel.findById({ _id: user });
            if( !existsUser ) {
                res.status( 403 ).json( "token invalid");
                return;
            }

            const userValid = UserEntity.fromObject( existsUser );
            req.body.user = userValid;

            next();
        
        } catch (error) {
            res.status( 500 ).json({ error: "Internal Server Error"})
        }

    }
}