import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchById } from './operations.js';


const handlePending = state => {
    state.loading = true;
    state.error = null;
};
const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};
const slice = createSlice({
    name: "cars",
    initialState: {
        items: [],
        page: 1,
        totalCars: 0,
        totalPages: 1,
    favorites: [],
    loading: false,
    error: null,
    currentCar: null,
    currentCarLoading: false,
},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, handlePending)
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const { cars, page, totalCars, totalPages } = action.payload;
                if (page === 1) {
                    state.items = cars;
                } else {
                    const existingIds = new Set(state.items.map(car => car.id));
                    const newUniqueCars = cars.filter(car => !existingIds.has(car.id));
                    state.items.push(...newUniqueCars);
                }
                state.page = page;
                state.totalCars = totalCars;
                state.totalPages = totalPages;
            })
            .addCase(fetchCars.rejected, handleRejected)
        
        
            .addCase(fetchById.pending, (state) => {
                state.currentCarLoading = true;
                state.error = null;
                state.currentCar = null;
            })
            .addCase(fetchById.fulfilled, (state, action) => {
                state.currentCarLoading = false;
                state.error = null;
                state.currentCar = action.payload;
            })
            .addCase(fetchById.rejected, (state, action) => {
                state.currentCar = null;
                state.currentCarLoading = false;
                state.error = action.payload;
            });
},
});

export default slice.reducer;