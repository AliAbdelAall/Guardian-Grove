import { configureStore } from "@reduxjs/toolkit";
// Logger
import logger from "redux-logger";
import parentsReducer, { parentsSliceName } from "./parents";
export const store = configureStore({
	reducer: {
		[parentsSliceName]: parentsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
