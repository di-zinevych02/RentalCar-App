

export default (state) => state.cars;

export const selectCarsLoading = (state) => state.cars.loading;

export const selectCarsError = (state) => state.cars.error;

export const selectCurrentCarLoading = (state) =>
    state.cars.currentCarLoading;

export const selectAllCars = (state) => state.cars.items;
export const selectCurrentCar = (state) => state.cars.currentCar;

export const selectFavourites = (state) => state.favorites.items;

