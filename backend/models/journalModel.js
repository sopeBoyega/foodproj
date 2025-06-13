import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  wasteReduction: {
    type: String, // could also be Number if you want "25" to be treated as a number
    required: true,
  },
  wasteAmount: {
    type: String, // same as above
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  actions: {
    type: String,
    required: true,
  },
  challenges: {
    type: String,
    required: true,
  },
  nextSteps: {
    type: String,
    required: true,
  },
  milestones: {
    type: [String],
    default: [],
  },
});

const journalModel = mongoose.models.journal || mongoose.model("journal",journalSchema)

export default journalModel;
