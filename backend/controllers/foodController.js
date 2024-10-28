import foodModel from "../models/foodModel.js"
import fs from 'fs'

//add food item

const addFood = async (req,res) =>{
 
    let image_filename =`${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        descripition:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// Function to list all the foods in the database
const listfood = async (req,res) =>{
try {

    // The await keyword waits for the promise to be resolved before execution
    // Like now it waits for the foodModel.find function to finish executing before intializing it to the foods variable
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

//Remove food item 
const removeFood = async (req,res) => {
try {
    // Find the food model using the Id
    const food = await foodModel.findById(req.body.id);
    // Delete the image from the upload folder on the server
    fs.unlink(`uploads/${foodModel.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

export  {addFood,listfood,removeFood}