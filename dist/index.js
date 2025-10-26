"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// zod Validation Schema (along with regex functionality): 
const Schema = zod_1.z.object({
    username: zod_1.z.string().min(6),
    password: zod_1.z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}.+$/)
});
app.post("/api/v1/signup", async function (req, res) {
    const parsedData = Schema.safeParse(req.body);
    if (parsedData.success) {
        const hashed_password = await bcrypt_1.default.hash(parsedData.data.password, 5);
        const already_user = await db_1.UserModel.findOne({ username: parsedData.data.username });
        if (already_user) {
            return;
            res.status(403).json({
                msg: "Already Exist with this Username"
            });
        }
        await db_1.UserModel.create({
            username: parsedData.data.username,
            password: hashed_password
        });
        res.status(200).json({
            msg: "SignedUp Successfully!"
        });
    }
    else {
        res.status(411).json({
            msg: "Error In Inputs",
            error: parsedData.error
        });
    }
});
app.post("/api/v1/signin", async function (req, res) {
    const { username, password } = req.body;
    try {
        const user_username = await db_1.UserModel.findOne({ username });
        if (!user_username) {
            res.status(401).json({
                msg: "Wrong User Name",
            });
            return;
        }
        const unhashed_password = await bcrypt_1.default.compare(password, user_username?.password || "");
        if (!unhashed_password) {
            res.status(401).json({
                msg: "Incorrect Password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user_username._id }, config_1.jwt_secret);
        res.json({
            msg: "SignedIn Successfully!",
            token: token
        });
    }
    catch (e) {
        res.status(500).json({
            msg: " Server Error!"
        });
    }
});
app.post("/api/v1/content", middlewares_1.middlewares, async function (req, res) {
    const { type, link, title } = req.body;
    try {
        await db_1.ContentModel.create({
            type,
            link,
            title,
            tags: [],
            //@ts-ignore
            userId: req.userId,
        });
        res.status(201).json({
            msg: "Content Added Successfully"
        });
    }
    catch (e) {
        res.status(400).json({
            msg: "Error In Inputs",
        });
    }
});
app.delete("/api/v1/content", middlewares_1.middlewares, async function (req, res) {
    const contentId = req.body.contentId;
    try {
        await db_1.ContentModel.deleteMany({
            contentId: contentId,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            msg: "Content Delelted Successfully!"
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Server Error"
        });
    }
});
app.get("/api/v1/content", middlewares_1.middlewares, async function (req, res) {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await db_1.ContentModel.find({
            //@ts-ignore
            userId: userId
        }).populate("userId", "username");
        res.json({
            content
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Server Error"
        });
    }
});
app.post("/api/v1/brain/share", middlewares_1.middlewares, async function (req, res) {
    const share = req.body.share;
    if (share) {
        const existingLink = await db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        await db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        await db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            msg: "Link Removed"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async function (req, res) {
    const hash = req.params.shareLink;
    const link = await db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            msg: "Invalid Hash!"
        });
        return;
    }
    // yaani ab hash se link ka pta chal chuka hain 
    const content = await db_1.ContentModel.findOne({
        userId: link.userId
    });
    console.log(link);
    const user = await db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.status(200).json({
        msg: "Successfuly Delivered",
        content: content,
        username: user?.username
    });
});
app.get("/api/v1/content/youtube", middlewares_1.middlewares, async (req, res) => {
    const content = await db_1.ContentModel.find({
        userId: req.userId,
        link: { $regex: /^https?:\/\/(www\.)?youtube\.com|youtu\.be/ }
    }).select("link");
    res.json(content.map(c => c.link));
});
app.get("/api/v1/content/twitter", middlewares_1.middlewares, async (req, res) => {
    const content = await db_1.ContentModel.find({
        userId: req.userId,
        link: { $regex: /^https?:\/\/(www\.)?twitter\.com/ }
    }).select("link");
    res.json(content.map(c => c.link));
});
app.listen(3000);
//# sourceMappingURL=index.js.map