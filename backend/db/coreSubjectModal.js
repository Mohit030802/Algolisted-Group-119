import mongoose from "mongoose";


const coreSubjectSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
    
})


const coreSubject=mongoose.model('coreSubject',coreSubjectSchema)

export default coreSubject;