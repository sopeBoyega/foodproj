import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sopeMosopee:Adegboyega006@cluster0.hdacr.mongodb.net/?retryWrites=true&w=majority&appName=food-del').then(()=>console.log("DB connected"))
} 