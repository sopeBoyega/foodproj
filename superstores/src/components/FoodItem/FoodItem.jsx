import React, { useContext, } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  // Received a problem here a while ago which was difficult it said something was 
  // undefined in my code I found out that in the Context API I hadnt exported my image variable
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
  console.log(cartItems[id])
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        {/* These images are coming fromthe backend */}
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
     
        {!cartItems[id] ? 
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
         : 
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
