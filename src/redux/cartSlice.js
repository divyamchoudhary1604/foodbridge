import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (orderData, { rejectWithValue }) => {
    try {
      // Simulate network request delay (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!orderData.items || orderData.items.length === 0) {
        return rejectWithValue("Cannot checkout: Your cart is empty.");
      }

      return {
        orderId: "RESCUE-" + Math.floor(100000 + Math.random() * 900000),
        claimedAt: new Date().toLocaleTimeString(),
        totalItems: orderData.items.length,
        items: orderData.items,
        user: orderData.user
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to process rescue checkout");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of food items in cart
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' (Async state)
    error: null, // Error message if checkout fails
    lastOrder: null // Stores confirmed order details
  },
  reducers: {
    // 1. Add item to cart
    addToCart: (state, action) => {
      const food = action.payload;
      const existingItem = state.items.find((item) => item.id === food.id);

      if (existingItem) {
        // If item already in cart, increment portions by requested amount or 1
        existingItem.portions += food.portions || 1;
      } else {
        // Add new item with default portion count of 1
        state.items.push({
          ...food,
          portions: food.portions || 1
        });
      }
    },

    // 2. Remove item from cart
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },

    // 3. Update quantity/portions (+ or -)
    updateQuantity: (state, action) => {
      const { id, portions } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && portions > 0) {
        item.portions = portions;
      }
    },

    // 4. Clear all items
    clearCart: (state) => {
      state.items = [];
    },

    // 5. Reset order status after viewing receipt
    resetOrderStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.lastOrder = null;
    }
  },
  // Handles async lifecycle states: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      // Pending: Async request has started
      .addCase(checkoutCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Fulfilled: Async request succeeded
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload;
        state.items = []; // Empty cart after successful checkout
      })
      // Rejected: Async request failed
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong during checkout.";
      });
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  resetOrderStatus
} = cartSlice.actions;

export default cartSlice.reducer;
