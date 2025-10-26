"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middlewares = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "No Token Provided"
        });
    }
    try {
        const verify = jsonwebtoken_1.default.verify(token, config_1.jwt_secret);
        if (verify) {
            // @ts-ignore
            req.userId = verify.id;
            next();
        }
        else {
            return res.status(403).json({
                msg: "You are not logged .."
            });
        }
    }
    catch (e) {
        return res.status(401).json({
            msg: "Incorrect Token added"
        });
    }
};
exports.middlewares = middlewares;
//# sourceMappingURL=middlewares.js.map