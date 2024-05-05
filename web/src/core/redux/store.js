import { configureStore } from "@reduxjs/toolkit"

// Slices
import parentsReducer, { parentsSliceName } from "./parents"
import childrenReducer, { childrenSliceName } from "./children"
import userProfileReducer, { userProfileSliceName } from "./userProfile"
import shcoolsReducer, { schoolsSliceName } from "./shcools"
import reviewsReducer, { reviewsSliceName } from "./reviews"

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    [parentsSliceName]: parentsReducer,
    [childrenSliceName]: childrenReducer,
    [userProfileSliceName]: userProfileReducer,
    [schoolsSliceName]: shcoolsReducer,
    [reviewsSliceName]: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})