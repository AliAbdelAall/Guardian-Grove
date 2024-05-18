import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface psycologist {
	id: number;
	name: string;
	email: string;
	speciality: string;
	rating: number;
}

const initialState: psycologist[] = [];

const psycologistsSlice = createSlice({
	initialState,
	name: "psycologistsSlice",
	reducers: {
		setPsycologists: (state, action: PayloadAction<psycologist[]>) => {
			return action.payload;
		},
	},
});

export const { setPsycologists } = psycologistsSlice.actions;
export const psycologistsSliceName = psycologistsSlice.name;
export default psycologistsSlice.reducer;
