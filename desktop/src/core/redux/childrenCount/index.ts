import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface childrenCount {
	age1_3: number;
	age3_6: number;
	age6_12: number;
	age12_18: number;
}

const initialState: childrenCount = {
	age1_3: 0,
	age3_6: 0,
	age6_12: 0,
	age12_18: 0,
};

const childrenCountSlice = createSlice({
	initialState,
	name: "childrenCountSlice",
	reducers: {
		setChildrenCount: (state, action: PayloadAction<childrenCount>) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
});

export const { setChildrenCount } = childrenCountSlice.actions;
export const childrenCountSliceName = childrenCountSlice.name;
export default childrenCountSlice.reducer;
