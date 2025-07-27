import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations";

const slice = createSlice({
    name: "brands",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },

});
export default slice.reducer;