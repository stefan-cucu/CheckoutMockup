/*
 * Module for handling cart state management
 */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

// Cart product interface
export interface ICart {
    product: Product;
    quantity: number;
}

// Cart wrapper type
export interface Cart {
    products: {[productId: number]: number};
}

// Initial state of the cart slice
const initialState: Cart = {
    products: {},
};

// Configure cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ICart>) => {
            const { product, quantity } = action.payload;
            console.log(product, quantity);
            state.products = {...state.products, [product.id]: quantity};
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.products = {...state.products, [product.id]: 0};
        },
    },
});

export const { setProduct, removeProduct } = cartSlice.actions;

export const getCartProducts = (state: any) => {
    let asArray = Object.entries(state.cart.products);
    return asArray as unknown as [number, number][];
};

export default cartSlice.reducer;