import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface parent {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	children: string[];
}
type sliceState = {
	parents: parent[];
	count: number;
};

const initialState: sliceState = {
	parents: [],
	count: 0,
};

const parentsSlice = createSlice({
	initialState,
	name: "parentsSlice",
	reducers: {
		setParents: (state, action: PayloadAction<parent[]>) => {
			let count = 0;

			action.payload.forEach((_) => {
				count += 1;
			});

			return { ...state, parents: [...action.payload], count };
		},
	},
});

export const { setParents } = parentsSlice.actions;
export const parentsSliceName = parentsSlice.name;
export default parentsSlice.reducer;
