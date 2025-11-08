
import express from "express";
import { z } from "zod";
import  jwt  from "jsonwebtoken";
import bcrypt  from "bcrypt";
import {UserModel,ContentModel,LinkModel,TagsModel} from "./db";
import { jwt_secret } from "./config";
import { middlewares} from "./middlewares";
import { random} from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


// zod Validation Schema (along with regex functionality): 
const Schema = z.object({
     username : z.string().min(6),
     password : z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}.+$/)
})

app.post("/api/v1/signup",async function (req,res){
     const parsedData = Schema.safeParse(req.body);
     if(parsedData.success){
            const hashed_password = await bcrypt.hash(parsedData.data.password,5);
            
            const already_user = await UserModel.findOne( {username :parsedData.data.username});
            
            if(already_user){
                return
                res.status(403).json({
                    msg : "Already Exist with this Username"
                })
            }


            await UserModel.create({
                username : parsedData.data.username,
                password : hashed_password
            })

            res.status(200).json({
                msg : "SignedUp Successfully!"
            })
     }else{
        res.status(411).json({
            msg :"Error In Inputs",
            error : parsedData.error
        })
     }
})

app.post("/api/v1/signin",async function (req,res){
     const { username ,password } = req.body;

     try{
        const user_username = await UserModel.findOne({username});
            if(!user_username){
                res.status(401).json({
                    msg : "Wrong User Name",
                })
                return;
            }

                const unhashed_password = await bcrypt.compare(password,user_username?.password || "");
                if(!unhashed_password){
                    res.status(401).json({
                        msg : "Incorrect Password"
                    })
                    return;
                }
                const token = jwt.sign({ id :user_username._id},jwt_secret);
                 res.json({
                    msg : "SignedIn Successfully!",
                    token  : token
                 })

     }
    catch(e){
        res.status(500).json({
            msg : " Server Error!"
        })
     }


})

app.post("/api/v1/content",middlewares,async function (req,res){
    const { type, link, title } = req.body;
     try{
        await ContentModel.create({        
            type,
            link,
            title,
            tags: [],
            //@ts-ignore
            userId: req.userId,
        });
        res.status(201).json({
            msg: "Content Added Successfully"
        })

     }catch(e){
        res.status(400).json({
            msg : "Error In Inputs",
        })
     }


})
 
app.delete("/api/v1/content",middlewares,async function (req,res){
     const  contentId = req.body.contentId;

     try{
        await ContentModel.deleteMany({
            contentId :contentId,
            //@ts-ignore
            userId : req.userId
        })

        res.json({
            msg : "Content Delelted Successfully!"
        })

     }catch(e){
        res.status(500).json({
            msg : "Server Error"
        })
     }


})

app.get("/api/v1/content",middlewares,async function (req,res){
    //@ts-ignore
     const userId =req.userId;
     try{
        const content = await ContentModel.find({
        //@ts-ignore
        userId : userId
     }).populate("userId","username");

     res.json({
        content
     })

     }catch(e){
        res.status(500).json({
            msg : "Server Error"
        })
     }
     

     




})

app.post("/api/v1/brain/share",middlewares,async function (req,res){
     const share = req.body.share;
     if (share){
       const existingLink = await LinkModel.findOne({
        userId : req.userId
       });

       if(existingLink){
        res.json({
            hash : existingLink.hash
        })
        return;
       }

       const hash = random(10);

        await LinkModel.create({
            userId : req.userId,
            hash : hash
        })

        res.json({
            hash
        })


     }else{
        await LinkModel.deleteOne({
            userId :req.userId
        })

        res.json({
        msg : "Link Removed"
     })

     }

})

app.get("/api/v1/brain/:shareLink",async function (req,res){
        const hash = req.params.shareLink;
        
        const link = await LinkModel.findOne({
            hash
        })

        if(!link){
            res.status(411).json({
                msg : "Invalid Hash!"
            })

            return;
        }

        // yaani ab hash se link ka pta chal chuka hain 

        const content = await ContentModel.findOne({
            userId : link.userId
        })

        console.log(link);
        const user = await UserModel.findOne({
            _id : link.userId
        })


        if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

        
        res.status(200).json({
            msg : "Successfuly Delivered",
            content: content,
            username : user?.username
        })


})

app.get("/api/v1/content/youtube",middlewares,async (req,res)=>{
    const content = await ContentModel.find({
        userId : req.userId,
        link : { $regex: /^https?:\/\/(www\.)?youtube\.com|youtu\.be/}
    }).select("link");

    res.json (content.map(c=> c.link));

});



app.get("/api/v1/content/twitter",middlewares,async (req,res)=>{
    const content = await ContentModel.find({
        userId : req.userId,
        link : { $regex: /^https?:\/\/(www\.)?twitter\.com/}
    }).select("link");

    res.json (content.map(c=> c.link));

});



app.listen(3000);

