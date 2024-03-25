import express from 'express';
import { addQuestion } from '../Controllers/coreSubjectController.js';

const coreSubjectRouter=express.Router();

coreSubjectRouter.post('/addCoreSubject',addQuestion)

export default coreSubjectRouter;