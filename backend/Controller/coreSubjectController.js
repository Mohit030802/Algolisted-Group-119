import coreSubject from "../db/coreSubjectModal.js";

const addQuestion=async(req,res)=>{
    try {
        const {id,email,category}=req.body;
        const question=new coreSubject({id,email,category})
        await question.save();
        res.status(202).json({message:'Question added Successful'})
    } catch (error) {
        console.log(error)
    }
}

export {addQuestion}