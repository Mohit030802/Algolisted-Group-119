import mongoose from "mongoose";


const codingSheetSchema=new mongoose.Schema({
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

const codingSheet=mongoose.model('codingSheet',codingSheetSchema)

export default codingSheet