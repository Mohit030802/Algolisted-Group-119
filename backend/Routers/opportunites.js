import express from 'express';
import { addOpportunity, declineOpportunity, deleteOpportunity, getOpportunities, likeOpportunity } from '../Controllers/oppurtunitiesController.js';

const opportunityRouter=express.Router();

opportunityRouter.post('/added',addOpportunity)
opportunityRouter.post('/declined',declineOpportunity)
opportunityRouter.post('/liked',likeOpportunity)
opportunityRouter.delete('/delete',deleteOpportunity)
opportunityRouter.get('/getopportunities',getOpportunities)


export default opportunityRouter;