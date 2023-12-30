import mongoose from "mongoose";
const connectDb=async ()=>{
    try{
        await mongoose.connect('mongodb+srv://mohit030802:b6dOi8Rt0WIPZy26@cluster0.gcg4ory.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to DB')
    }
    catch(error){
        console.log(error)
    }
}

export default connectDb;