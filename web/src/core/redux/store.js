import { configureStore } from "@reduxjs/toolkit"

// Slices
import parentsReducer, { parentsSliceName } from "./parents"
import childrenReducer, { childrenSliceName } from "./children"
import userProfileReducer, { userProfileSliceName } from "./userProfile"
import shcoolsReducer, { schoolsSliceName } from "./shcools"
import reviewsReducer, { reviewsSliceName } from "./reviews"
import reportsReducer, { reportsSliceName } from "./reports"
import instructionsReducer, { instructionsSliceName } from "./instructions"

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    [parentsSliceName]: parentsReducer,
    [childrenSliceName]: childrenReducer,
    [userProfileSliceName]: userProfileReducer,
    [schoolsSliceName]: shcoolsReducer,
    [reviewsSliceName]: reviewsReducer,
    [reportsSliceName]: reportsReducer,
    [instructionsSliceName]: instructionsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})