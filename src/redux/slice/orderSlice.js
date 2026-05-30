import { createSlice } from "@reduxjs/toolkit";
import { allorders, getOrders, myOrders } from "../thunks/orderThunks";

const initialState = {
    orders: [],
    loading: false,
    error: null,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(myOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(allorders.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(allorders.fulfilled,(state, action)=>{
                state.orders = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(allorders.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default orderSlice.reducer