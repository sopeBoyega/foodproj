import express from "express";
import { addFood,listfood,removeFood } from "../controllers/foodController.js";
import multer from "multer";



//This line below allows me to create the POST ,GET and any other method
const foodRouter = express.Router();

//Image Storage Engine
// Whenever we file upload a file ,our timestamp wll be added to the filename to create a unique name
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


//We use the post method to send  the data on the server 
foodRouter.post("/add",upload.single("image"),addFood)
// We use  this get method to retrive all the food items on the database
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removeFood)



export default foodRouter;