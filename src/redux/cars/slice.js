import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchById, fetchByFilters } from './operations.js';


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
                totalCars: 0,
                totalPages: 1,
            },
            filteredItems: {
                page: 1,
                items: [],
                totalCars: 0,
                totalPages: 1,
                lastFilters: {
                    brand: "",
                    rentalPrice: "",
                    minMileage: "",
                    maxMileage: "",
                },
            },
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
            })
            .addCase(fetchByFilters.pending, handlePending)
            .addCase(fetchByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
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
                // чи фільтри змінились
                const filtersChanged = Object.keys(currentFilters).some(
                    key =>
                        currentFilters[key] !==
                        state.items.filteredItems.lastFilters[key]
                );
                if (page === 1 || filtersChanged) {
                    state.items.filteredItems.items = newItems;
                } else {
                    const existingIds = new Set(
                        state.items.filteredItems.items.map(car => car.id)
                    );
                    const uniqueNewItems = newItems.filter(
                        car => !existingIds.has(car.id)
                    );
                    state.items.filteredItems.items.push(...uniqueNewItems);
                }

                state.items.filteredItems.page = page;
                state.items.filteredItems.totalCars = totalCars;
                state.items.filteredItems.totalPages = totalPages;
                state.items.filteredItems.lastFilters = currentFilters;
            })
            .addCase(fetchByFilters.rejected, (state, action) => {
            state.loading = false;
            state.error =
            action.payload?.message ||
            action.error?.message ||
            'Failed to fetch filtered cars';
            state.items.filteredItems.items = [];
            });
        },
    });

export default slice.reducer;