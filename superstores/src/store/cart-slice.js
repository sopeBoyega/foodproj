import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {

    },

    reducers: {
        addToCart : async (state,action,{itemId}) => {
         const isItemInCart = state && cart[itemId]

        if (!isItemInCart) {
            
        }
        }
    }
})