import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface psycologist {
	id: number;
	name: string;
	email: string;
	profilePic: string;
	speciality: string;
	rating: number;
}

type sliceState = {
	psycologists: psycologist[];
	count: number;
};

const initialState: sliceState = {
	psycologists: [],
	count: 0,
};

const psycologistsSlice = createSlice({
	initialState,
	name: "psycologistsSlice",
	reducers: {
		setPsycologists: (state, action: PayloadAction<psycologist[]>) => {
			let count = 0;

			action.payload.forEach((_) => {
				count += 1;
			});

			return { ...state, psycologists: [...action.payload], count };
		},
	},
});

export const { setPsycologists } = psycologistsSlice.actions;
export const psycologistsSliceName = psycologistsSlice.name;
export default psycologistsSlice.reducer;
