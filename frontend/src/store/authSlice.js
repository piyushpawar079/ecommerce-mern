import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuth: false,
    userId: null,
    adminAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.userAuth = true
            state.userId = action.payload
        },

        userLogout: (state) => {
            state.userAuth = false
            state.userId = null
        },

        adminLogin: (state) => {
            state.adminAuth = true
        },

        adminLogout: (state) => {
            state.adminAuth = false
        }
    }
})

export const { userLogin, userLogout, adminLogin, adminLogout, addProduct, removeProduct } = authSlice.actions

export default authSlice.reducer