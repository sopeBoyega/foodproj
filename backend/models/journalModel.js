import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const journalSchema = new mongoose.Schema({
  id: {
    type: Number,
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
    type: String,
    required: true,
  },
  wasteAmount: {
    type: String,
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

// Add auto-increment plugin for 'id'
journalSchema.plugin(AutoIncrement, { inc_field: 'id' });

const journalModel = mongoose.models.journal || mongoose.model("journal",journalSchema)

export default journalModel;
