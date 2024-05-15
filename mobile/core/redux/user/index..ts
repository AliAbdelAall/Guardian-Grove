import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface user {
	id: number;
	profileId: number;
	firstName: string;
	lastName: string;
	email: string;
	profilePic: String;
	dob: String | null;
}

const initialState: user = {
	id: 0,
	profileId: 0,
	firstName: "",
	lastName: "",
	email: "",
	profilePic: "",
	dob: null,
};

const userSlice = createSlice({
	initialState,
	name: "userSlice",
	reducers: {
		setUser: (state, action: PayloadAction<user>) => {
			return {
				...action.payload,
			};
		},
		updateDob: (state, action: PayloadAction<String>) => {
			return {
				...state,
				dob: action.payload,
			};
		},
		updateProfilePic: (state, action: PayloadAction<String>) => {
			return {
				...state,
				profilePic: action.payload,
			};
		},
	},
});

export const { setUser, updateDob, updateProfilePic } = userSlice.actions;
export const userSliceName = userSlice.name;
export default userSlice.reducer;
