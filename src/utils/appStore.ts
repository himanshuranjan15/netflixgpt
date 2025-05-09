import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMovieReducer = persistReducer(persistConfig, moviesReducer);
const persistedGPTReducer = persistReducer(persistConfig, gptReducer);
const persistedConfigReducer = persistReducer(persistConfig, configReducer);
export const appStore = configureStore({
  reducer: {
    user: persistedUserReducer,
    movies: persistedMovieReducer,
    gpt: persistedGPTReducer,
    config: persistedConfigReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;

// export const persistor = persistStore(store);

export const persistorAppStore = persistStore(appStore);
