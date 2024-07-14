import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const root = createRoot(document.body);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </SnackbarProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
