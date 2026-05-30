import { createSlice } from "@reduxjs/toolkit";
import {
    getCartItems,
    addToCart,
    removeFromCart,
} from "../thunks/cartThunks";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get cart items
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.loading = false;
                state.error = null;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.productID !== action.meta.arg);
                state.loading = false;
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;