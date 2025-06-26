import express from "express";
import { addJournalEntry, getJournalEntries } from "../controllers/journalController.js";
import { upload } from "./foodRoute.js";



const journalRouter  = express.Router();
journalRouter.post("/add",upload.array("images"),addJournalEntry)
journalRouter.get("/getJournals",getJournalEntries)


export default journalRouter;
