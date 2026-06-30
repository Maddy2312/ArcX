import { createSlice } from "@reduxjs/toolkit";


const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setUser, setLoading, setError } = authReducer.actions;

export default authReducer.reducer;
