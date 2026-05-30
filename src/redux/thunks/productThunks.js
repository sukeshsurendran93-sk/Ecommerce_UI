import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

const getProducts = createAsyncThunk(
    "products/products",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch product"
            );
        }
    }
);

const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    }
);

const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product, { rejectWithValue }) => {
        try {
            const response = await api.post('/products', product, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create product"
            );
        }
    }
);

const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, product }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/products/${id}`, product, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update product"
            );
        }
    }
);



export { getProducts, getProduct, deleteProduct, createProduct, updateProduct };
