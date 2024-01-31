import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer : persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleWare)=>
        getDefaultMiddleWare({serializableCheck:false}),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;