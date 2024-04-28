import mongoose from 'mongoose';


const opportunitiesSchema=mongoose.Schema({
    title:{type:String,required:true},
    email:{type:String,required:true},
    apply_link:{type:String,required:true},
    marked:{type:Boolean,default:false},
    decline:{type:Boolean,default:false},
    liked:{type:Boolean,default:false},
})

const opportunities=mongoose.model('opportunities',opportunitiesSchema)

export default opportunities;