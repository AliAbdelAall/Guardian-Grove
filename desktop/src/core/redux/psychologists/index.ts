import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface psychologist {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	speciality: string;
	rating: number;
}

type sliceState = {
	psychologists: psychologist[];
	count: number;
};

const initialState: sliceState = {
	psychologists: [],
	count: 0,
};

const psychologistsSlice = createSlice({
	initialState,
	name: "psychologistsSlice",
	reducers: {
		setPsychologists: (state, action: PayloadAction<psychologist[]>) => {
			let count = 0;

			action.payload.forEach((_) => {
				count += 1;
			});

			return { ...state, psychologists: [...action.payload], count };
		},
	},
});

export const { setPsychologists } = psychologistsSlice.actions;
export const psychologistsSliceName = psychologistsSlice.name;
export default psychologistsSlice.reducer;
