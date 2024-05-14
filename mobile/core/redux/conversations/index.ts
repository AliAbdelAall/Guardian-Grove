import { createSlice } from "@reduxjs/toolkit";

interface conversation {
	id: number;
	parentId: number;
	psychologistId: number | null;
	teacherId: number | null;
}

const initialState: conversation[] = [];

const conversationsSlice = createSlice({
	initialState,
	name: "conversationsSlice",
	reducers: {
		setConversations: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setConversations } = conversationsSlice.actions;
export const conversationsSliceName = conversationsSlice.name;
export default conversationsSlice.reducer;
