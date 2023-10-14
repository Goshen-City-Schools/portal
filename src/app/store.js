// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./redux/slices/formSlice";
import menuReducer from "./redux/slices/menuSlice";
// import userReducer from './redux/slices/userSlice'; // Import your user slice

const store = configureStore({
  reducer: {
    form: formReducer,
    menu: menuReducer,
    // user: userReducer,
  },
});

export default store;
