import { createSlice } from '@reduxjs/toolkit';
import { fetchByFilters  } from './operations.js';

const handlePending = (state) => {
  state.filteredItems.loading = true;
  state.filteredItems.error = null;
};


const slice = createSlice({
    name: "filters",
    initialState: {
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
        filteredItems: {
            items: [],
            totalCars: 0,
            page: 1,
            totalPages: 1,
            lastFilters: {
                brand: '',
                rentalPrice: '',
                minMileage: '',
                maxMileage: '',
            },
            loading: false,
            error: null,
            noResults: false,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchByFilters.pending, handlePending)
            .addCase(fetchByFilters.fulfilled, (state, action) => {
                state.filteredItems.loading = false;
                state.filteredItems.error = null;
                const payload = action.payload;
                const newItems = Array.isArray(payload.cars) ? payload.cars : [];
                const page = Number(payload.page) || 1;
                const totalCars = payload.totalCars || 0;
                const totalPages = payload.totalPages || 1;
                
                const currentFilters = {
                    brand: action.meta.arg.brand || '',
                    rentalPrice: action.meta.arg.rentalPrice || '',
                    minMileage: action.meta.arg.minMileage || '',
                    maxMileage: action.meta.arg.maxMileage || '',
                };
                const filtersChanged = Object.keys(currentFilters).some(
                    key =>
                        currentFilters[key] !==
                        state.filteredItems.lastFilters[key]
                );
                if (page === 1 || filtersChanged) {
                    state.filteredItems.items = newItems;
                    state.filteredItems.noResults = newItems.length === 0;
                } else {
                    const existingIds = new Set(
                        state.filteredItems.items.map(car => car.id)
                    );
                    const uniqueNewItems = newItems.filter(
                        car => !existingIds.has(car.id)
                    );
                    state.filteredItems.items.push(...uniqueNewItems);
                }

                state.filteredItems.page = page;
                state.filteredItems.totalCars = totalCars;
                state.filteredItems.totalPages = totalPages;
                state.filteredItems.lastFilters = currentFilters;
            })
            .addCase(fetchByFilters.rejected, (state, action) => {
                state.filteredItems.loading = false;
                state.filteredItems.error =
                    action.payload?.message ||
                    action.error?.message ||
                    'Failed to fetch filtered cars';
                state.filteredItems.items = [];
                state.filteredItems.noResults = true; 
            });
        },
    });

export default slice.reducer;