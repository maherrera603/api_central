import { NextFunction, Request, Response } from "express";
import { envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain/entities";

export class AuthMiddleware {


    public static validateJWT ( roles: string[] ) {
        return async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
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
                
                const payload = await JWTAdapter.validateToken( token, envs.JWT_SEED );
                if( !payload ) {
                    res.status( 403 ).json({ error: "Token has expired" });
                    return;
                }

                const { role, user } = payload as { role: string, user: string};
                
                if( !(roles.includes( role )) ) {
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
}