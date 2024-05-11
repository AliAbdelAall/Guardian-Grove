import { createSlice } from "@reduxjs/toolkit";

interface Slot {
	id: number;
	parentId: number | null;
	psychologistId: number;
	start: string;
	end: string;
}

const initialState: Slot[] = [];

const availableSlotsSlice = createSlice({
	initialState,
	name: "availableSlotsSlice",
	reducers: {
		setAvailableSlots: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { setAvailableSlots } = availableSlotsSlice.actions;
export const availableSlotsSliceName = availableSlotsSlice.name;
export default availableSlotsSlice.reducer;
