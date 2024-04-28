import opportunities from "../db/opportunitiesModal.js";

const getOpportunities = async (req, res) => {
    try {
        // Query the database to get all opportunities
        const allOpportunities = await opportunities.find({});
        
        // If no opportunities found, return a 404 status with a message
        if (!allOpportunities || allOpportunities.length === 0) {
            return res.status(404).json({ message: 'No opportunities found' });
        }
        
        // Return the opportunities
        res.status(200).json(allOpportunities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addOpportunity=async(req,res)=>{
    try {
        const {title,email,apply_link,marked}=req.body;
        const newOpportunity=new opportunities({
            title,
            email,
            apply_link,
            marked
        })
        await newOpportunity.save();
        res.status(202).json({message:'Opportunity added Successful'})
    } catch (error) {
        console.log(error)
    }
}
const declineOpportunity=async(req,res)=>{
    try {
        const {title,email,apply_link,decline}=req.body;
        const newOpportunity=new opportunities({
            title,
            email,
            apply_link,
            decline
        })
        await newOpportunity.save();
        res.status(202).json({message:'Opportunity added Successful'})
    } catch (error) {
        console.log(error)
    }
}
const likeOpportunity=async(req,res)=>{
    try {
        const {title,email,apply_link,liked}=req.body;
        const newOpportunity=new opportunities({
            title,
            email,
            apply_link,
            liked
        })
        await newOpportunity.save();
        res.status(202).json({message:'Opportunity added Successful'})
    } catch (error) {
        console.log(error)
    }
}
const deleteOpportunity = async (req, res) => {
    try {
        let condition = {};

        // Check if marked, decline, or liked is true in the request body
        if (req.body.marked) {
            condition.marked = true;
        }
        if (req.body.decline) {
            condition.decline = true;
        }
        if (req.body.liked) {
            condition.liked = true;
        }

        // Find and delete documents that meet the condition
        const result = await opportunities.deleteOne(condition);
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No matching opportunities found' });
        }
        
        res.status(200).json({ message: 'Opportunity deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {addOpportunity,declineOpportunity,likeOpportunity,deleteOpportunity,getOpportunities}