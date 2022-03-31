import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productStorageReducer from './ProductSlice';

export const store = configureStore({
  reducer: {
    product: productStorageReducer,
  },
});
