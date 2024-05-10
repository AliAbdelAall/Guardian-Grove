import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface child {
	id: number;
	parentId: number;
	teacherId: number | null;
	profilePic: String;
	name: string;
	schoolId: number;
	dob: string | null;
}

const initialState: child[] = [];

const childrenSlice = createSlice({
	initialState,
	name: "childrenSlice",
	reducers: {
		setChildren: (state, action: PayloadAction<child[]>) => {
			return action.payload;
		},
		addChild: (state, action: PayloadAction<child>) => {
			return [...state, action.payload];
		},
	},
});

export const { setChildren, addChild } = childrenSlice.actions;
export const childrenSliceName = childrenSlice.name;
export default childrenSlice.reducer;
