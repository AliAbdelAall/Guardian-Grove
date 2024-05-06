import { createSlice } from "@reduxjs/toolkit";

interface school {
	id: number;
	name: string;
}

const initialState: school[] = [];

const schoolSlice = createSlice({
	initialState,
	name: "schoolSlice",
	reducers: {
		setSchools: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setSchools } = schoolSlice.actions;
export const schoolSliceName = schoolSlice.name;
export default schoolSlice.reducer;
