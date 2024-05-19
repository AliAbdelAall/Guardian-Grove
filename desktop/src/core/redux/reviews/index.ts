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
		setReviews: (_state, action: PayloadAction<review[]>) => {
			return action.payload;
		},
		deleteReview: (state, action: PayloadAction<number>) => {
			const index = state.findIndex(
				(review) => review.id === action.payload
			);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const { setReviews, deleteReview } = reviewsSlice.actions;
export const reviewsSliceName = reviewsSlice.name;
export default reviewsSlice.reducer;
