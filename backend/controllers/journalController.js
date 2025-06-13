import journalModel from "../models/journalModel.js";

const addJournalEntry = async (req,res) => {
    const entry  =  new journalModel({
        id : req.body.id,
        schoolName: req.body.schoolName,
        date: req.body.date,
        wasteReduction : req.body.wasteReduction,
        wasteAmount : req.body.wasteAmount,
        progress : req.body.progress,
        actions : req.body.actions,
        challenges : req.body.challenges,
        nextSteps : req.body.nextSteps,
        milestones : req.body.milestones,
    })

    try {
        await entry.save();
        res.json({success:true,message:"Journal Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error})
    }

}

const getJournalEntries = async  (req,res) => {
   try {
     const entries = await journalModel.find({})
     res.json({success : true , data : entries});
   } catch (error) {
    console.error(error);
    res.json({success : false , message : "Error"})
   }
}
export {addJournalEntry,getJournalEntries}