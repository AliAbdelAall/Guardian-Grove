import { configureStore } from "@reduxjs/toolkit";

// Slices
import parentsReducer, { parentsSliceName } from "./parents";
import psychologistsReducer, { psycologistsSliceName } from "./psychologists";
import teachersReducer, { teachersSliceName } from "./teachers";
import reviewsReducer, { reviewsSliceName } from "./reviews";
import childrenCountReducer, { childrenCountSliceName } from "./childrenCount";

// Logger
import logger from "redux-logger";

export const store = configureStore({
	reducer: {
		[parentsSliceName]: parentsReducer,
		[psycologistsSliceName]: psychologistsReducer,
		[teachersSliceName]: teachersReducer,
		[reviewsSliceName]: reviewsReducer,
		[childrenCountSliceName]: childrenCountReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
