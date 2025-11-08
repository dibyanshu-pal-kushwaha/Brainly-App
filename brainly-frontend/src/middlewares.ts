import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import {jwt_secret} from "./config"; 
export const middlewares =(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            msg : "No Token Provided"
        })
    }
    try{
        const verify = jwt.verify (token,jwt_secret)as { id: string };
        if(verify){
            // @ts-ignore
            req.userId = verify.id;
            next();
        }else{
            return res.status(403).json({
                msg : "You are not logged .."
            })
        }
        

    }catch(e){
        return res.status(401).json({
            msg : "Incorrect Token added"
        })
    }
}