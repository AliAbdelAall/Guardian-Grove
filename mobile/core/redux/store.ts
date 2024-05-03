import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user/index.";
import childrenReducer, { childrenSliceName } from "./children";
import psychologistsReducer, { psychologistsSliceName } from "./Psychologists";
import teachersReducer, { teachersSliceName } from "./teachers";

// Logger
import logger from "redux-logger";

export const store = configureStore({
	reducer: {
		[userSliceName]: userReducer,
		[childrenSliceName]: childrenReducer,
		[psychologistsSliceName]: psychologistsReducer,
		[teachersSliceName]: teachersReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
