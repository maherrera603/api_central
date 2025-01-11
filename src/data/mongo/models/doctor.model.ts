import { Schema, model } from "mongoose";


const doctorSchema = new Schema({
    name: {
        type: String,
        required: [ true, "Missing name" ],
    },
    last_name: {
        type: String,
        required: [ true, "Missing last_name" ],
    },

    phone: {
        type: String,
        required: [ true, "Missing number phone" ],
    },
    type_document: {
        type: String,
        required: [ true, "Missing type_document"],
    },
    document: {
        type: String,
        required: [ true, "Missing document" ],
        unique: true,
    },
    speciality: {
        type: Schema.Types.ObjectId,
        required: [ true, "Missing specility" ],
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [ true, "Missing user" ],
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    }
});

doctorSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ){
        delete ret._id;
    }
});

export const DoctorModel = model( "Doctor", doctorSchema );