import { createSlice } from "@reduxjs/toolkit";

interface teacher {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	profilePic: string;
	dob: String | null;
	speciality: string | null;
	school: string | null;
}

const initialState: teacher[] = [];

const teachersSlice = createSlice({
	initialState,
	name: "teachersSlice",
	reducers: {
		setTeachers: (state, action) => {
			return {
				...action.payload,
			};
		},
	},
});

export const { setTeachers } = teachersSlice.actions;
export const teachersSliceName = teachersSlice.name;
export default teachersSlice.reducer;
