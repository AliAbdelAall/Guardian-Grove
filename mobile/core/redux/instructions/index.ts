import { createSlice } from "@reduxjs/toolkit";

interface instruction {
	id: number;
	childId: number;
	psychologistId: number;
	instruction: string;
	createdAt: string;
}

const initialState: instruction[] = [];

const instructionsSlice = createSlice({
	initialState,
	name: "instructionsSlice",
	reducers: {
		setInstructions: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setInstructions } = instructionsSlice.actions;
export const instructionsSliceName = instructionsSlice.name;
export default instructionsSlice.reducer;
