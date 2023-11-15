import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import { Provider } from "react-redux";

import store from "./app/store";
import { AnimatePresence } from "framer-motion";
import defaultConfigValues from "./data/defaultConfigValues";
import { ModalProvider } from "./app/contexts/ModalContext";
import { UserProvider } from "./app/contexts/UserContext";
// import { AuthProvider } from "./app/contexts/AuthContext";

const colors = defaultConfigValues.colors;
const fonts = defaultConfigValues.fonts;
const components = defaultConfigValues.components;

const theme = extendTheme({ colors, fonts, components });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <AnimatePresence>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AnimatePresence>
        </ChakraProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
