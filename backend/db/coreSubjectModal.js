import mongoose from "mongoose";


const coreSubjectSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
   
    },
    email:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean
    },
    marked:{
        type:Boolean
    }
    
})


const coreSubject=mongoose.model('coreSubject',coreSubjectSchema)

export default coreSubject;