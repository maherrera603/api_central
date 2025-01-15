import { model, Schema } from "mongoose";

const epsSchema = new Schema({
    eps: {
        type: String,
        unique: true,
    },
    active: {
        type: Boolean,
        default: false,
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

epsSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
    }
});


export const EpsModel = model( "Eps", epsSchema );