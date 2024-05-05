import { configureStore } from "@reduxjs/toolkit"

// Slices
import parentsReducer, { parentsSliceName } from "./parents"
import childrenReducer, { childrenSliceName } from "./children"
import userProfileReducer, { userProfileSliceName } from "./userProfile"
import shcoolsReducer, { schoolsSliceName } from "./shcools"

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    [parentsSliceName]: parentsReducer,
    [childrenSliceName]: childrenReducer,
    [userProfileSliceName]: userProfileReducer,
    [schoolsSliceName]: shcoolsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})