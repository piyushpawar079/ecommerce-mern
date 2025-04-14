import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productCount : 0,
    products : [],
    quantity: {},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            if (product && product.title && product.selectedImage) {
                state.productCount += 1;
                state.products.push(product);
            } else {
                console.error("Invalid product data:", product);
            }
        },

        removeProduct: (state, action) => {
            const productTitle = action.payload.title; // Identifier to remove product
            state.products = state.products.filter(
                (product) => product.title !== productTitle
            ); // Remove product
            state.productCount = state.products.length; 
        },

        resetQuantity: (state) => {
            state.productCount = 0
            state.products = []
            state.quantity = {}
        },

        updateQuantity: (state, action) => {
            state.quantity = action.payload
        },

        reduceProductCount: (state, action) => {
            state.productCount -= 1;
        }
    }
})

export const { addProduct, removeProduct, updateQuantity, reduceProductCount, resetQuantity } = productSlice.actions

export default productSlice.reducer;