import mongoose from "mongoose";

const visitorCountSchema = new mongoose.Schema({
   location:{type:String,required:false},
    count:{type:Number,required:true},
})

const visitorCount = mongoose.models.visitorCount || mongoose.model("visitorCount",visitorCountSchema)

export default visitorCount;