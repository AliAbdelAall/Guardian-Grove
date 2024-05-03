import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface child {
	id: number;
	parentId: number;
	teacherId: string | null;
	profilePic: String;
	name: string;
	school: string;
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
	},
});

export const { setChildren } = childrenSlice.actions;
export const childrenSliceName = childrenSlice.name;
export default childrenSlice.reducer;
