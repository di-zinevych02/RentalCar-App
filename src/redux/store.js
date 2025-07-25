import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import carsReducer from "./cars/slice.js";
import favoritesReducer from './favourites/slice.js';
const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        favorites: persistedFavoritesReducer,
        // filters: filtersReducer,

    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);