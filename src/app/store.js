// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './redux/slices/formSlice';
// import userReducer from './redux/slices/userSlice'; // Import your user slice

const store = configureStore({
  reducer: {
    form: formReducer,
    // user: userReducer,
  },
});

export default store;
