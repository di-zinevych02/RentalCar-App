
import { createSelector } from "@reduxjs/toolkit";


export default (state) => state.cars.items;

export const selectCarsLoading = (state) => state.cars.loading;

export const selectCarsError = (state) => state.cars.error;

export const selectCurrentCarLoading = (state) =>
    state.cars.currentCarLoading;

export const selectAllCars = (state) => state.cars.items.allItems?.items || [];
export const selectCurrentCar = (state) => state.cars.currentCar;

export const selectFavourites = (state) => state.favorites.items;

export const selectFilteredCars = (state) => state.cars.items.filteredItems.items;


export const selectFilteredPagination = createSelector(
    (state) => state.cars.items.filteredItems,
    ({ page, totalPages }) => ({ page, totalPages })
);

export const selectActiveFilters = (state) => state.cars.items.filteredItems.lastFilters;
export const selectNoResults = (state) => state.cars.noResults;