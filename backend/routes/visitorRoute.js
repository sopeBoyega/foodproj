import express from "express";
import {addVisitor,getTotalVisitors} from "../controllers/visitorController.js"


const visitorRouter = express.Router();

visitorRouter.post("/add",addVisitor)
visitorRouter.get("/list",getTotalVisitors);

export default visitorRouter;