import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const  StoreContext = createContext(null)
const StoreContextProvider = (props) => {
// Here useState function is used to manage the cartState
 const [cartItems,setCartItems] = useState({});
 const [loading,setLoading] = useState(false)
 const url = "https://foodproj-backend-4y4z.onrender.com"
 const [token,setToken] = useState("");
 const [food_list,setFoodlist] = useState([])
//This addToCart function below checks if an item does not exist in the cart using the itemId
// 
 const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    // When the product is added in the cart in would be updated in the usert cartData in datbase also
if (token) {
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
}
 }

 const  removeFromCart = async (itemId) => {
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
 }

// This function  intializes totalAmount variable which would be used to display the total amount
// So the for in loop is used to iterate over each key in cartItems object 
// An If condition checks whether the cartItem quantity is greater than zero 
// If the condition is true ,Using the item key it searches the food_list object looking for similar product id
// If it finds a simlilar product id ,it copies the object into the iteminfo giving in access to its keys and values
// Then multiplies the price with the quantity in the cart and then adds it to totalAmount


const getTotalCartAmount = () =>{
    let totalAmount = 0
    for(const item in cartItems) {
        if (cartItems[item]>0) {
            let iteminfo = food_list.find((product)=>product._id === item);
    totalAmount += iteminfo.price* cartItems[item]
    }
        }
     return totalAmount;
    }


    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
       
        setFoodlist(response.data.data)
        console.log(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }
     
    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])
    

    useEffect(
        () => {
            
            async function loadData(params) {
               await fetchFoodList()
                console.log(food_list)
                if (localStorage.getItem("token")) {
                    setToken(localStorage.getItem("token"))
                }
                await loadCartData(localStorage.getItem("token"))
            }
            loadData();
            console.log("Hello")
        }
    ,[])


//The context holds the value that would be accessible to any component
const contextValue ={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
url,
token,
setToken,
loading,setLoading
}
return (
    // Everything inside this component should have access to the value I provide
    // In this case which is context value below (addtoCart function,food_list and so on)
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>

)

}


export default StoreContextProvider;




