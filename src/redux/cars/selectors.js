

// import {selectFilterValue} from "../filters/selectors";


export default (state) => state.cars.items;

export const selectCarsLoading = (state) => state.cars.loading;

export const selectCarsError = (state) => state.cars.error;

export const selectCurrentCarLoading = (state) =>
    state.cars.currentCarLoading;

export const selectAllCars = (state) => state.cars.items.allItems?.items || [];
export const selectCurrentCar = (state) => state.cars.currentCar;
export const selectPagination = (state) => {
  const { page, totalPages } = state.cars.items.allItems;
  return { page, totalPages };
};
export const selectHasCars = (state) =>
    (state.cars.items.allItems?.items || []).length > 0;

export const selectFavourites = (state) => state.favorites.items;
// // створюємо мемоізований селектор- селектор, який викликається тільки при зміні його залежностей([selectContacts, selectNameFilter]-масив, які повертають частину стану), другий аргумент функціяБ яка отримає те шо поверне selectContacts та selectNameFilter
// export const selectVisibleContacts = createSelector([selectContacts, selectFilterValue], (contacts, filterValue) => {
//     // функція буде викликана тільки тоді, коли зміниться масив контактів чи коли змінюється фільтр
//     return contacts.filter((contact) => contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
//     contact.number.includes(filterValue)
//     );
// });