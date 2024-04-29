import { configureStore } from "@reduxjs/toolkit"

// Slices
import parentsReducer, { parentsSliceName } from "./parents"
import childrenReducer, { childrenSliceName } from "./children"
import userProfleReducer, { userProfileSliceName } from "./userProfle"

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    [parentsSliceName]: parentsReducer,
    [childrenSliceName]: childrenReducer,
    [userProfileSliceName]: userProfleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})