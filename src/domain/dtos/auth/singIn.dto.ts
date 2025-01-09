import { regular_exp } from "../../../config";


export class SingInDTO {
    
    private constructor(
        public email: string,
        public password: string,
    ){}

    static singIn( object: {[key: string]: any} ): [string?, SingInDTO?]{

        const { email, password } = object;

        if( !email ) return ["Missing email"];

        if( !regular_exp.email.test( email) ) return [ "Format email invalid" ];

        if( !password ) return [ "Missing password" ];

        if( password.length < 7 ) return [ "Password to short, contain less 8 characters" ];

        if( password.length > 12 ) return [ "Password to long, contain less 12 characters" ];

        if( !regular_exp.password.test( password) ) return [ "Incorrect password, password must have 1 uppercase character, 1 lowercase character and 1 special character" ]

        return [ undefined, new SingInDTO( email, password ) ]
    }
}