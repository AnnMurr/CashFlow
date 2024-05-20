import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "../reducers/userReducer/userReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userDataReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type StoreType = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;