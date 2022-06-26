import { configureStore } from "@reduxjs/toolkit"
import { useSafeAreaFrame } from "react-native-safe-area-context"
import navReducer from "./slices/navSlice"
import userAuth from "./slices/userAuth"


export const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: userAuth
  },
})


