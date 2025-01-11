import { Schema, model } from "mongoose";

const specialitySchema = new Schema({
    speciality: {
        type: String,
        required: [ true, "Missing speciality" ],
        unique: true,
    },
    active: {
        type: Boolean,
        required: [ true, "Missing active" ]
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [ true, "Missing user" ]
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    update_at: {
        type: Date,
        default: new Date()
    }
});

specialitySchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret, options ) => {
        delete ret._id
    }
});

export const SpecialityModel = model( "Speciality", specialitySchema );