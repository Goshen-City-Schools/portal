// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./redux/slices/formSlice";
import menuReducer from "./redux/slices/menuSlice";
// import portalReducer from "./redux/slices/portalSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    menu: menuReducer,
    // portal: portalReducer,
  },
});

export default store;
