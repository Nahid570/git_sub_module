import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./slices";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "combinedReducers",
  storage: storage,
  whitelist: [
    "authReducer",
    "orgReducer",
    "specialtyReducer",
    "patientSettingReducer",
    "prescriptionSettingReducer",
    "prescriptionItemReducer",
    "doctorsOfAssistantReducer",
    "prescriptionReducer",
  ]
};
const persistedReducer = persistReducer(persistConfig, combinedReducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
const persistor = persistStore(store);
export { persistor, store };
