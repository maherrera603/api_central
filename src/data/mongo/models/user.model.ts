import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "Missing Name" ]
    },
    last_name: {
        type: String,
        required: [ true, "Missing Last Name" ]
    },
    type_document: {
        type: String,
        required: [ true, "Missing Type Document"]
    },
    document: {
        type: String,
        required: [ true, "Missing Document"]
    },
    phone: {
        type: String,
        required: [ true , "Missing Number Phone" ],
    },
    email: {
        type: String,
        required: [ true, "Missing Email" ],
    },
    password: {
        type: String,
        required: [ true, "Missing Password" ]
    },
    active: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: [ "ADMIN_ROLE", "EMPLOYEE_ROLE", "USER_ROLE" ],
        default: "USER_ROLE",
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    update_at: {
        type: Date,
        default: new Date()
    }
});

userSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret, options ) => {
        delete ret._id,
        delete ret.password
    }
})



export const UserModel = model("User", userSchema);