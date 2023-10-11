import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import store from './app/store';

const colors = {
  brand: {
    900: '#10296E',
    800: '#0845BE',
    700: '#2f6fed',
    200: '#97c4fb',
    100: '#dcecff',
  },
  accent: {
    900: '#5221B5',
    800: '#6D35DE',
    700: '#8b54f7',
    200: '#e0a1fc',
    100: '#f5ddff',
  },
  neutral: {
    900: '#0A0D14',
    800: '#1B1F27',
    600: '#3F444D',
    300: '#a5b2c9',
    200: '#c3cbda',
    100: '#f1f3f9',
  },
  success: {
    900: '#066042',
    800: '#04724D',
    700: '#08875D',
    200: '#4AB392',
    100: '#DFFFF5',
  },
  warning: {
    900: '#80460D',
    800: '#96530F',
    700: '#B25E09',
    200: '#CCA762',
    100: '#FFF2DB',
  },
  error: {
    900: '#981B25',
    800: '#BA2532',
    700: '#E02D3C',
    200: '#E0747C',
    100: '#FCD8DB',
  },
};

const fonts = {
  body: 'Open Sans, sans-serif',
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
