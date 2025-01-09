import mongoose from "mongoose";


interface Options {
    mongoUrl: string;
    dbName: string;
}


export class MongoConnect {


    static async connect( options: Options ){
        const {mongoUrl, dbName} = options;

        try {
            await mongoose.connect( mongoUrl, { dbName });
            return true;
        } catch ( error ) {
            throw `Mongo connection error - ${error}`
        }

    }

}