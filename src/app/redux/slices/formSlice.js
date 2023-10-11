// src/redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: 'GSHN/',
  password: '',
  errorMessages: '', // Error message for login details
  userData: null, // User data object
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.fieldName] = action.payload.fieldValue;
    },
    setLoginError: (state, action) => {
      state.errorMessages = action.payload.errorMessage;
    },
    setUserData: (state, action) => {
      state.userData = action.payload.userData;
    },
  },
});

export const { updateField, setLoginError, setUserData } = formSlice.actions;
export default formSlice.reducer;
