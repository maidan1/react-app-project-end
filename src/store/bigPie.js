import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";
import cartReducer, { setItems } from './cartSlice';

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const preloadedState = {
  cart: {
    items: cartItems,
  },
};

const store = configureStore({
  reducer: {
    counterSlice,
    authSlice,
    darkThemeSlice,
    cart: cartReducer,
    
  },
  preloadedState,
});
store.dispatch(setItems(cartItems));

export default store;
