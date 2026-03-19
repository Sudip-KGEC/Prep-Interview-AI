import  { Schema , model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: [true , "username already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true ,  "Account already exists with this email address" ],
        required: true
    },

    password: {
        type : String,
        required : true
    }
},
 {
    timestamps : true
});


const userModel = model("users" , userSchema);

export default userModel;