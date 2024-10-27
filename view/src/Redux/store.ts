import { configureStore } from "@reduxjs/toolkit";
import { config } from "process";
import PersonSlice from "./features/personSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        Person: PersonSlice
    }
})
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;