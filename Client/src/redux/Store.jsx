import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import themeReducer from "./theme/ThemeSlice";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
//import persistStore from "redux-persist/es/persistStore";

const rootReducer=combineReducers({
    user:userReducer,
    theme:themeReducer,
});

const persistConfig ={
    key:"root",
    storage,
    version:1,
};

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})

});

export const persistor=persistStore(store);