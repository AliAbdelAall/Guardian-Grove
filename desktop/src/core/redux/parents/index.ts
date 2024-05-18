import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface parent {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	children: string[];
}

const initialState: parent[] = [];

const parentsSlice = createSlice({
	initialState,
	name: "parentsSlice",
	reducers: {
		setParents: (state, action: PayloadAction<parent[]>) => {
			return action.payload;
		},
	},
});

export const { setParents } = parentsSlice.actions;
export const parentsSliceName = parentsSlice.name;
export default parentsSlice.reducer;
