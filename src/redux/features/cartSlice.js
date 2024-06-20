import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      const itemIndex = current(state.items).findIndex(
        (item) => item._id === action.payload._id
      );
      state.items.splice(itemIndex, 1);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
