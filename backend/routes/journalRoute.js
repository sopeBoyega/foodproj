import express from "express";
import { addJournalEntry, getJournalEntries } from "../controllers/journalController.js";


const journalRouter  = express.Router();


journalRouter.post("/add",addJournalEntry)
journalRouter.get("/getJournals",getJournalEntries)


export default journalRouter;
