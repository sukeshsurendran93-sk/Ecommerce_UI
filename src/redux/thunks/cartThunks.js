import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart items",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/cart`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart",
      );
    }
  },
);
