import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./reducers/user";
import walletReducer from "./reducers/wallet";
import swapReducer from "./reducers/swap";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  swap: swapReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["user"],
};

// AsyncStorage.clear();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
