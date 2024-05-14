import { createSlice } from "@reduxjs/toolkit";

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
		setMessages: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setMessages } = messagesSlice.actions;
export const messagesSliceName = messagesSlice.name;
export default messagesSlice.reducer;
