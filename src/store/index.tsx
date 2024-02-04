import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import userListReducer from "./userListSlice"
import enterUserReducer from "./enterUserSlice"
import selectedUserReducer from './selectedUserSlice'
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    user: userReducer,
    userList : userListReducer,
    enterUser : enterUserReducer,
    selectedUser : selectedUserReducer
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

export const useChatDispatch = () => useDispatch();
export const useChatSelector = useSelector;