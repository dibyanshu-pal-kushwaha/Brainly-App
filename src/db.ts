import mongoose from "mongoose";
mongoose.connect("mongodb+srv://dibyanshupkushwaha:dibyanshupkushwaha@cluster0.drqfagc.mongodb.net/second-brain-app")
const {Schema ,model} = mongoose;


const User = new  mongoose.Schema({
    username : {type : String,unique : true},
    password : String
})

const Contents = new  mongoose.Schema({
    link :String,
    title :String,
    tags : [{ type: Schema.Types.ObjectId, ref: "tags" }],
    userId: { type: Schema.Types.ObjectId, ref: "users",required : true },
    type : String
})

const Tags = new  mongoose.Schema({
    title:String,
})

const link = new  mongoose.Schema({
    hash : String,
    userId : { type: Schema.Types.ObjectId, ref: "users",required : true, unique : true },
})

// first argument => collection name , next one => schema defined above;
export const UserModel = model("users",User);
export const ContentModel = model("contents",Contents);
export const LinkModel = model("links",link);
export const TagsModel = model("tags",Tags);

// module.exports={
//     UserModel,
//     ContentModel,
//     LinkModel,
//     TagsModel
// } 