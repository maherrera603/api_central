export class UserEntity {

    private constructor (
        public name: string,
        public last_name: string,
        public type_document: string,
        public document: string,
        public phone: string,
        public email: string,
        public id?: string,
    ){}


    public static fromObject ( object: {[key: string]: any} ) {
        const { _id, id, name, last_name, type_document, document, phone, email,} = object;

        return new UserEntity( name, last_name, type_document, document, phone, email, id || _id)
    }


}