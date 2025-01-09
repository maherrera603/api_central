import jwt from "jsonwebtoken";

interface Options {
    payload: any,
    duration: string,
    jwtSeed: string,
}


export class JWTAdapter {


    static async generateToken( options: Options ) {
        
        const { payload, duration, jwtSeed } = options;

        return new Promise( resolve => {

            jwt.sign( payload, jwtSeed, { expiresIn: duration }, ( error, token) => {
                if( error) resolve( null );

                resolve( token );
            })
        })
    }

    static async validateToken<T>( token: string, jwtSeed: string ): Promise<T | null>{

        return new Promise( resolve => {
            jwt.verify( token, jwtSeed, ( error, decoded ) => {
                if( error ) resolve( null );
                resolve( decoded as T );
            })
        })
    } 

}