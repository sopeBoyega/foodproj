import journalModel from "../models/journalModel.js";

const addJournalEntry = async (req, res) => {
  try {
    // Extract milestone fields like milestones[0], milestones[1], etc.
    const milestones = [];
    for (let key in req.body) {
      if (key.startsWith("milestones[")) {
        milestones.push(req.body[key]);
      }
    }

    // Save image filenames (assuming you're using `diskStorage` in Multer)
    const imageFilenames = req.files.map(file => file.filename); // just the name

    const entry = new journalModel({
      id: req.body.id,
      schoolName: req.body.schoolName,
      date: req.body.date,
      wasteReduction: req.body.wasteReduction,
      wasteAmount: req.body.wasteAmount,
      actions: req.body.actions,
      challenges: req.body.challenges,
      nextSteps: req.body.nextSteps,
      milestones: milestones,
      images: imageFilenames, // make sure your schema supports this
    });

    await entry.save();
    res.json({ success: true, message: "Journal Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


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