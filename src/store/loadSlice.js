import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const loadSlice = createSlice({
    name: 'load',
    initialState,
    reducers: {
        yesLoad: (state) => {
            state.isLoading = !state.isLoading;
        },
        noLoad: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { yesLoad, noLoad } = loadSlice.actions;
export default loadSlice.reducer;
