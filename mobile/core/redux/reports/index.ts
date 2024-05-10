import { createSlice } from "@reduxjs/toolkit";

interface report {
	id: number;
	childId: number;
	teacherId: number;
	report: string;
	createdAt: string;
}

const initialState: report[] = [];

const reportsSlice = createSlice({
	initialState,
	name: "reportsSlice",
	reducers: {
		setReports: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setReports } = reportsSlice.actions;
export const reportsSliceName = reportsSlice.name;
export default reportsSlice.reducer;
