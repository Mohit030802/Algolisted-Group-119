import express from 'express'
import User from '../db/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET='authsecret'
const signUp=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,12);
        const user=new User({username,password:hashedPassword})
        await user.save();
        res.status(202).json({message:'Registration Successful'})
    } catch (error) {
        res.status(500).json({message:'Regsitration Unsuccessful'})
    }
}
const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            res.status(500).json({message:'Username or Password is incorrect'})
        }
        const macthedPassword=await bcrypt.compare(password,user.password)
        const token=jwt.sign({username:user.username},JWT_SECRET)
        console.log(token)
        if(!macthedPassword){
            res.status(500).json({message:'Username or Password is incorrect'})
        }
        res.status(200).json({message:'Login Successful'})
    } catch (error) {
        res.status(500).json({message:'Login Unsuccessful'})
    }
}
const tokenValid=async(req,res)=>{
    try {
        const token=req.headers.authorization;
        if(!token){
            res.status(401).json({message:'Token not provided'})
        }
        const verified=jwt.verify(token,JWT_SECRET)
      
        if(!verified){
            res.status(401).json({message:'Token not verified'})
        }
        const user=await User.find({username:verified.username})
        res.json({user:user.username})

    } catch (error) {
        res.status(500).json({message:"Invalid token"})
    }
}
const userInfo=async(req,res)=>{
    try {
        const user=await User.find({username:req.user})
        console.log(user)
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message:'Token not provided'})
    }
}


export {signUp,login,userInfo,tokenValid}