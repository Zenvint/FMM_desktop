import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(),
    devTools: true
})

setupListeners(store.dispatch)