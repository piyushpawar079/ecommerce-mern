import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import productSlice from './productSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productSlice
    }
})

export default store