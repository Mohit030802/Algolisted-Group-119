import express from 'express';
import { addQuestion, getAllQuestions, updateQuestion } from '../Controllers/coreSubjectController.js';
import authmiddleware from '../Middleware/auth.js';

const coreSubjectRouter=express.Router();
coreSubjectRouter.get('/getQuestion',authmiddleware,getAllQuestions)
coreSubjectRouter.post('/addQuestion/:id',addQuestion)
coreSubjectRouter.patch('/addCoreSubject/:id',updateQuestion)

export default coreSubjectRouter;