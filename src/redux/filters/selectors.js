
import { createSelector } from "@reduxjs/toolkit";
export const selectFiltersValue = createSelector(
  (state) => state.filters,
  ({ brand, rentalPrice, minMileage, maxMileage }) =>
  ({ brand, rentalPrice, minMileage, maxMileage })
);
export const selectFilteredCars = (state) => state.filters.filteredItems.items;

export const selectFilteredPagination = createSelector(
  (state) => state.filters.filteredItems,
  ({ page, totalPages }) => ({ page, totalPages })
);

export const selectActiveFilters = (state) => state.filters.filteredItems.lastFilters;

export const selectNoResults = (state) => state.filters.filteredItems.noResults;

export const selectFiltersLoading = (state) => state.filters.filteredItems.loading;
export const selectFiltersError = (state) => state.filters.filteredItems.error;