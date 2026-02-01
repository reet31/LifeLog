import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }   
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},
            process.env.JWT_SECRET,{
            expiresIn:"1h"
        });
        console.log("Token generated:", token);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
        }
        )
        
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};
export const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        console.log(req.body);
        if(!username || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
    
    const existinguser=await User.findOne({
        email:email
    })
    if(existinguser){
        return res.status(400).json({message:"User already exists"});
    }
    //match password strength
    const hashedpassword=await bcrypt.hash(password,10);

    const newuser=new User({
        username,
        email,
        password:hashedpassword
    });
    await newuser.save();
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};

