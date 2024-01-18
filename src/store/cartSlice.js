// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  savedForLaterItems: [], // Initialize as an empty array
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };
      state.items.push(newItem);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    saveForLater: (state, action) => {
      // Ensure savedForLaterItems is initialized as an array
      state.savedForLaterItems = state.savedForLaterItems || [];
      state.savedForLaterItems.push(action.payload);
    },
    moveItemToCart: (state, action) => {
      // Move an item from savedForLaterItems to items
      const movedItem = action.payload;
      state.savedForLaterItems = state.savedForLaterItems.filter(
        (item) => item._id !== movedItem._id
      );
      state.items.push(movedItem);
    },
    removeFromSavedForLater: (state, action) => {
      state.savedForLaterItems = state.savedForLaterItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  saveForLater,
  moveItemToCart,
  removeFromSavedForLater,
} = cartSlice.actions;

export default cartSlice.reducer;
