import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
// The useSearchParams hook allows you to access and modify the current url query parameters withinh the component
const [serachParams,setSearchParams] = useSearchParams();
// After making payment using the stripe gateway we are redirected to url
// So basically we are checking the url with the code below to verify the Payment Status 
// And Get the Payment ID
const success = serachParams.get("success")  
const orderId = serachParams.get("orderId")  
const {url} = useContext(StoreContext);
const navigate = useNavigate()

const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if (response.data.success){
navigate("/myorders");
    }
    else{
        navigate("/")
    }
}

useEffect(()=>{
    verifyPayment();
},[])

console.log(success,orderId)
  return (
    <div className="verify">
        <div className="spinner"></div>
    </div>
  )
}

export default Verify