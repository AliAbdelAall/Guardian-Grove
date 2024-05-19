import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface teacher {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	speciality: string;
	school: string;
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
		deleteTeacher: (state, action: PayloadAction<number>) => {
			state.teachers = state.teachers.filter(
				(teacher) => teacher.id !== action.payload
			);
			state.count -= 1;
		},
	},
});

export const { setTeachers, deleteTeacher } = teachersSlice.actions;
export const teachersSliceName = teachersSlice.name;
export default teachersSlice.reducer;
