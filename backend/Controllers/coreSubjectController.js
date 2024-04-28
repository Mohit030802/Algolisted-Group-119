import mongoose from "mongoose";
import coreSubject from "../db/coreSubjectModal.js";
import User from "../db/users.js";
const getAllQuestions=async(req,res)=>{
    try {
        const username=req.user
        const user=await User.findOne({username})
        const email=user.email
        const questions=await coreSubject.find({email})       
        res.json(questions)
    } catch (error) {
        console.log(error)
    }
}
const addQuestion=async(req,res)=>{
    try {
        const {email,completed,marked} =req.body
        const id=req.params.id
        const question =new coreSubject({id,email,completed,marked})
        await question.save()
        res.status(202).json({message:'Question Added successfully'})
    } catch (error) {
        console.log(error)
    }
}
const updateQuestion = async (req, res) => {
    try {
        const { completed, marked } = req.body;
        const id=req.params.id;
        const question = await coreSubject.findOne({id});
        console.log(question)
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (completed !== undefined) {
            question.completed = completed;
        }
        if (marked !== undefined) {
            question.marked = marked;
        }

        
        await question.save();

        res.status(200).json({ message: 'Question updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { updateQuestion,addQuestion,getAllQuestions };
