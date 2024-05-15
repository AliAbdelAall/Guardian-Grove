import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface message {
	id: number;
	text: string;
	senderId: number;
	conversationId: number;
	createdAt: string;
}

const initialState: message[] = [];

const messagesSlice = createSlice({
	initialState,
	name: "messagesSlice",
	reducers: {
		setMessages: (state, action: PayloadAction<message[]>) => {
			return [...action.payload];
		},
		addMessage: (state, action: PayloadAction<message>) => {
			return [action.payload, ...state];
		},
	},
});

export const { setMessages, addMessage } = messagesSlice.actions;
export const messagesSliceName = messagesSlice.name;
export default messagesSlice.reducer;
