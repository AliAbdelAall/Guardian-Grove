import { configureStore } from "@reduxjs/toolkit"
import userReducer, { userSliceName } from "./user/index."

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    [userSliceName]: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch