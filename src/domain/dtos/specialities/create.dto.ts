export class SpecialityCreateDTO {

    private constructor(
        public speciality: string,
        public active: boolean,
        public user: string,
    ){}


    static create( object: {[ key: string]: any }): [ string?, SpecialityCreateDTO? ] {

        const { speciality, active, user: { id } } = object;

        if( !speciality ) return [ "Missing speciality" ];

        if( !(active !== undefined) ) return [ "Missing active" ];

        const special = speciality.toLowerCase().trim();

        return [ undefined, new SpecialityCreateDTO( special, active, id ) ]
    }
}