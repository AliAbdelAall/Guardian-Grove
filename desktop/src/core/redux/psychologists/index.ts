import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface psychologist {
	id: number;
	psychologistId: number;
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
		deletePsychologist: (state, action: PayloadAction<number>) => {
			const filteredPsychologists = state.psychologists.filter(
				(psychologist) => psychologist.id !== action.payload
			);
			return {
				...state,
				psychologists: [...filteredPsychologists],
				count: state.count - 1,
			};
		},
	},
});

export const { setPsychologists, deletePsychologist } =
	psychologistsSlice.actions;
export const psychologistsSliceName = psychologistsSlice.name;
export default psychologistsSlice.reducer;
