import { configureStore } from '@reduxjs/toolkit';
import { employeeApi } from "@/api";
import filtersReducer from "./reducers/employeesSlice"


export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer,
        filters: filtersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;