import { regular_exp } from "../../../config/regular_exp";

export class RegisterDTO {

    private constructor(
        public name: string,
        public last_name: string,
        public type_document: string,
        public document: string,
        public phone: string,
        public email: string,
        public password: string,
        public active?: boolean,
        public role?: string[],

    ){}


    static create(object: {[key: string]: any}): [ string?, RegisterDTO? ]{

        const { name, last_name, type_document, document, phone, email, password } = object;

        if( !name ) return [ "Missing name" ];

        if( !last_name ) return [ "Missing last_name" ];

        if( !type_document ) return [ "Missing type_document" ];

        if( !document ) return [ "Missing document" ];

        if( document.length < 7 ) return ["Document to short, contain less 7 characters"];
        
        if( document.length > 10) return [ "Document to long, contain less 10 characters" ];

        if( !phone ) return [ "Missing phone"];

        if( !regular_exp.phone.test( phone ) ) return [ "Phone Number invalid" ];

        if( !email ) return [ "Missing email" ];

        if( !regular_exp.email.test( email ) ) return [ "Format email invalid" ];

        if( !password ) return [ "Missing password" ];

        if( password.length < 7 ) return [ "Password to short, contain less 8 characters"];

        if( password.length > 12 ) return [ "Password to long, contain less 12 characters" ];

        if( !regular_exp.password.test( password ) ) return [ "Incorrect password, password must have 1 uppercase character, 1 lowercase character and 1 special character" ];

        return [ undefined, new RegisterDTO( name, last_name, type_document, document, phone, email, password ) ];
    }
}