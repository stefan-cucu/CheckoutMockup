/*
 * Module for handling product state management
 */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";
const { REACT_APP_API_URL } = process.env;

// Product array wrapper type
export interface ProductStorage {
  products: Product[];
  loaded: boolean;
  error: string;
}

// Initial state of the product storage slice
const initialState: ProductStorage = {
  products: [],
  loaded: false,
  error: "",
};

// Function to fetch products from the API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch(`${REACT_APP_API_URL}`);
  const data = await response.json();
  console.log(data);
  return data;
});

// Configure product storage slice
const productStorageSlice = createSlice({
  name: "productStorage",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loaded = false;
      state.error = "";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loaded = true;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loaded = false;
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export const { setProducts } = productStorageSlice.actions;

export const getProducts = (state: ProductStorage) => state.products;

export default productStorageSlice.reducer;