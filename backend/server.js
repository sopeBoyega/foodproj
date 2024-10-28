import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app = express()
const port = 4000

//middleware 
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoints
app.use("/api/food/",foodRouter)
//Mounting the folder to the the "/images " endpoint 
//If any upload is made to the uploads folder the image can be accessed using this url 'http://localhost:4000/images/imageName'
app.use ("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);


//Used to request data from the server
app.get("/",(req,res)=>{
 res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// 