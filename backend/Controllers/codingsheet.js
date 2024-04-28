import codingSheet from "../db/codingSheet.js";


const addCodingQuestion=async(req,res)=>{
    try {
        const {email,completed,marked}=req.body
        const id=req.params.id
        const question =new codingSheet({id,email,completed,marked})
        await question.save()
        res.status(202).json({message:'Question Added successfully'})
        
    } catch (error) {
        console.log(error)
    }
}

const updateAddedQuestion=async(req,res)=>{
    try {
        const { completed, marked } = req.body;
        const id=req.params.id;
        const question = await codingSheet.findOne({id});
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
        console.log(error)
    }
}

export  {addCodingQuestion,updateAddedQuestion}