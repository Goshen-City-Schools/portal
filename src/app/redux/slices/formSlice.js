// src/redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: 'GSHN/',
  password: '',
  errorMessages: '', // Error message for login details
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

    logout: (state) => {
      state.userID = 'GSHN/';
      state.password = '';
      localStorage.removeItem('user'); // Clear the token
    },
  },
});

export const { logout, updateField, setLoginError } = formSlice.actions;
export default formSlice.reducer;
