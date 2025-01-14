import mongoose from "mongoose";

export class Validators {

    public static isMongoID( id: string ){
        return mongoose.isValidObjectId( id );
    }
}