import { configureStore } from "@reduxjs/toolkit"

// Logger
import logger from "redux-logger"

export const store = configureStore({
  reducer: {

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})