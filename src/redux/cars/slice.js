import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchById } from './operations.js';


const handlePending = state => {
    state.loading = true;
    state.error = false;
};
const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};
const slice = createSlice({
    name: "cars",
    initialState: {
        items: {
            allItems: {
        page: 1,
        items: [],
            },
        //     filteredItems: {
        // page: 1,
        // items: [],
        // hasNextPage: false,
        // hasPreviousPage: false,
        // totalItems: 0,
        // lastFilters: {
        //   category: "",
        //   ingredient: "",
        //   title: "",
        // },
      },
        loading: false,
        error: false,
        currentCar: null,
        currentCarLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, handlePending)
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.items.allItems = action.payload;
            })
            .addCase(fetchCars.rejected, handleRejected)
        
        
      .addCase(fetchById.pending, (state) => {
        state.currentCarLoading = true;
        state.error = false;
        state.currentCar = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.currentCarLoading = false;
        state.error = false;
        state.currentCar = action.payload.data;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.currentCar= null;
        state.currentCarLoading = false;
        state.error = action.payload.message;
      })
    }
});
export default slice.reducer;