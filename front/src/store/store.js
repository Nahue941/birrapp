import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import carritoReducer from "./carrito";
import categoriesReducer from "./categories";
import itemsReducer from "./items";
import productsReducer from "./products";
import usersReducer from "./users";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    carrito: carritoReducer,
    items: itemsReducer,
  },
});
export default store;
