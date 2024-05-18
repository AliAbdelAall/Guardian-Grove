import { configureStore } from "@reduxjs/toolkit";
// Logger
import logger from "redux-logger";
import parentsReducer, { parentsSliceName } from "./parents";
import psychologistsReducer, { psycologistsSliceName } from "./psychologists";
export const store = configureStore({
	reducer: {
		[parentsSliceName]: parentsReducer,
		[psycologistsSliceName]: psychologistsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
