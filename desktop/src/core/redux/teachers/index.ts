import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface teacher {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	teachers: string[];
}

const initialState: teacher[] = [];

const teachersSlice = createSlice({
	initialState,
	name: "teachersSlice",
	reducers: {
		setTeachers: (state, action: PayloadAction<teacher[]>) => {
			return action.payload;
		},
	},
});

export const { setTeachers } = teachersSlice.actions;
export const teachersSliceName = teachersSlice.name;
export default teachersSlice.reducer;
