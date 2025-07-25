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
        items: {
            allItems: {
                items: [],
                page: 1,
                totalItems: 0,
                totalPages: 1,
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
    state.items.allItems.items = cars;
  } else {
    const existingIds = new Set(state.items.allItems.items.map(car => car.id));
    const newUniqueCars = cars.filter(car => !existingIds.has(car.id));
    state.items.allItems.items.push(...newUniqueCars);
  }

  state.items.allItems.page = page;
  state.items.allItems.totalItems = totalCars;
  state.items.allItems.totalPages = totalPages;
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