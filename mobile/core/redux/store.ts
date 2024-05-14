import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userSliceName } from "./user/index.";
import childrenReducer, { childrenSliceName } from "./children";
import psychologistsReducer, { psychologistsSliceName } from "./Psychologists";
import teachersReducer, { teachersSliceName } from "./teachers";
import schooldReducer, { schoolSliceName } from "./schools";
import reportsReducer, { reportsSliceName } from "./reports";
import instructionsReducer, { instructionsSliceName } from "./instructions";
import availableSlotsReducer, {
	availableSlotsSliceName,
} from "./availableSlots";
import conversationsReducer, { conversationsSliceName } from "./conversations";
import messagesReducer, { messagesSliceName } from "./messages";

// Logger
import logger from "redux-logger";

export const store = configureStore({
	reducer: {
		[userSliceName]: userReducer,
		[childrenSliceName]: childrenReducer,
		[psychologistsSliceName]: psychologistsReducer,
		[teachersSliceName]: teachersReducer,
		[schoolSliceName]: schooldReducer,
		[reportsSliceName]: reportsReducer,
		[instructionsSliceName]: instructionsReducer,
		[availableSlotsSliceName]: availableSlotsReducer,
		[conversationsSliceName]: conversationsReducer,
		[messagesSliceName]: messagesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
