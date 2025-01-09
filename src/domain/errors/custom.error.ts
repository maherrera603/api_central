export class CustomError {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string
    ){}

    public static badRequest = ( message: string ) => new CustomError( 400, message);

    public static intenalServer = (message: string ) => new CustomError( 400, message );

    public static unathorized = ( message: string) => new CustomError( 403, message );

    public static notFount = ( message: string ) => new CustomError( 404, message );
    
}