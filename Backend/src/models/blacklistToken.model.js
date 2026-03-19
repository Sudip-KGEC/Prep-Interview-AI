import { model, Schema } from "mongoose";

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: [true , "token is required to be added in blacklist"]
    }
},
{
    timestamps: true
});

const blacklistTokenModel = model("blacklistTokens" , blacklistTokenSchema);

export default blacklistTokenModel;