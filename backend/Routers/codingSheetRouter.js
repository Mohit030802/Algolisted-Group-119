import express from 'express'
import { addCodingQuestion, updateAddedQuestion } from '../Controllers/codingsheet.js'

const codingSheetRouter=express.Router()



codingSheetRouter.post('/addCodingQuestion/:id',addCodingQuestion)
codingSheetRouter.patch('/updateCodingQuestion/:id',updateAddedQuestion)

export default codingSheetRouter