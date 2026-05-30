import { createSlice } from "@reduxjs/toolkit";
import { 
    getProducts, 
    getProduct, 
    deleteProduct, 
    createProduct, 
    updateProduct 
} from "../thunks/productThunks";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product:{},
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.meta.arg);
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.unshift(action.payload); 
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;