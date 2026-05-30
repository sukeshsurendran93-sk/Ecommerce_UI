import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

const getOrders = createAsyncThunk(
    "orders/orders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/orders");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

const myOrders = createAsyncThunk(
    "orders/myOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/orders/myorders");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

const allorders = createAsyncThunk(
    "orders/allorders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/orders/allorders");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
)

export { getOrders, myOrders, allorders };