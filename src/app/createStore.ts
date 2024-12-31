import { configureStore } from "@reduxjs/toolkit";

import { initialRootState, rootReducer } from "./rootReducer";
import { pryboliviangirobackendApi } from "src/apis/pryboliviangirobackendApi";

export const createStore = () => configureStore({
    reducer: rootReducer,
    preloadedState: initialRootState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat([
        pryboliviangirobackendApi.middleware
    ])
})

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<AppStore['dispatch']>