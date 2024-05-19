import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface teacher {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	teachers: string[];
}

type sliceState = {
	teachers: teacher[];
	count: number;
};

const initialState: sliceState = {
	teachers: [],
	count: 0,
};

const teachersSlice = createSlice({
	initialState,
	name: "teachersSlice",
	reducers: {
		setTeachers: (state, action: PayloadAction<teacher[]>) => {
			let count = 0;

			action.payload.forEach((_) => {
				count += 1;
			});

			return { ...state, teachers: [...action.payload], count };
		},
	},
});

export const { setTeachers } = teachersSlice.actions;
export const teachersSliceName = teachersSlice.name;
export default teachersSlice.reducer;
