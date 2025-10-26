"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModel = exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://dibyanshupkushwaha:dibyanshupkushwaha@cluster0.drqfagc.mongodb.net/second-brain-app");
const { Schema, model } = mongoose_1.default;
const User = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: String
});
const Contents = new mongoose_1.default.Schema({
    link: String,
    title: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    type: String
});
const Tags = new mongoose_1.default.Schema({
    title: String,
});
const link = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true, unique: true },
});
// first argument => collection name , next one => schema defined above;
exports.UserModel = model("users", User);
exports.ContentModel = model("contents", Contents);
exports.LinkModel = model("links", link);
exports.TagsModel = model("tags", Tags);
// module.exports={
//     UserModel,
//     ContentModel,
//     LinkModel,
//     TagsModel
// } 
//# sourceMappingURL=db.js.map