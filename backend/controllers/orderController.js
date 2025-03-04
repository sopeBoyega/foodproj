import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing User order for frontend
 export const placeOrder = async (req,res) => {

    const frontend_url  = "https://supestores.onrender.com"
try {
    const newOrder = new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    const line_item = req.body.items.map((item)=>({
        price_data:{
           currency:"gbp",
           product_data:{
            name:item.name
           },
           unit_amount:item.price*100*1
        },
        quantity:item.quantity || 1
    }))

    line_item.push({
        price_data:{
            currency:"gbp",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100
        },
        quantity:1
    })

    const session =await stripe.checkout.sessions.create({
        line_items:line_item,
        mode:'payment',
        success_url:`${frontend_url}/#/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/#/verify?success=false&orderId=${newOrder._id}`,
    })
    res.json({success:true,session_url:session.url})
} catch (error) {
    console.log({success:false,message:error.message})
}
}

 export const verifyOrder = async  (req,res) => {
const {orderId,success} = req.body
try {
    if (success=="true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true})
        res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findById(orderId);
        res.json({success:false,message:"Not Paid"})
    }
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

// User Orders for Front End 
export const userOrders = async (req,res) =>{
try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

// Listing Orders for admin Panel 
export  const listOrders = async (req,res)  => {
try {
     const orders = await orderModel.find({});
     res.json({success:true,data:orders})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

// api for Updating order Status
 export const updateStatus = async (req,res) => {
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
} catch (error) {
    res.json({success:false,message:"Error"})
    
}
}

// export default {placeOrder,verifyOrder};
