import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface review {
	id: number;
	rating: number;
	review: string;
	status: string;
	psychologistId: number;
	parentId: number;
}

const initialState: review[] = [];

const reviewsSlice = createSlice({
	initialState,
	name: "reviewsSlice",
	reducers: {
		setReviews: (state, action: PayloadAction<review[]>) => {
			return action.payload;
		},
	},
});

export const { setReviews } = reviewsSlice.actions;
export const reviewsSliceName = reviewsSlice.name;
export default reviewsSlice.reducer;
