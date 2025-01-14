import { regular_exp, Validators } from "../../../config";

export class CreateDoctorDTO {

    private constructor(
        public name: string,
        public last_name: string,
        public phone: string,
        public type_document: string,
        public document: string,
        public speciality: string,
        public user: string,
    ){}


    public static create( object: {[ key: string]: any} ): [ string?, CreateDoctorDTO? ]{

        const { name, last_name, phone, type_document, document, speciality, user } = object;

        if( !name ) return [ "Missing name" ];

        if( !last_name ) return [ "Missing last_name" ];
        
        if( !phone ) return [ "Missing phone" ];

        if( !regular_exp.phone.test( phone ) ) return [ "Number phone invalid" ];

        if( !type_document ) return [ "Missing type_document" ];

        if( !document ) return [ "Missing document" ];

        if( document.length < 7 ) return ["Document to short, contain less 7 characters"];
        
        if( document.length > 10) return [ "Document to long, contain less 10 characters" ];

        if( !speciality ) return [ "Missing speciality" ];

        if( !Validators.isMongoID( speciality ) ) return [ "Invalid id of speciality" ];

        if( !user ) return [ "Missing user" ];

        if ( !Validators.isMongoID( user.id ) ) return [ "Invalid id of user" ];

        return [ undefined, new CreateDoctorDTO( name, last_name, phone, type_document, document, speciality, user.id ) ];
    }

}