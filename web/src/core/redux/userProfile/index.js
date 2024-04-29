import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {

  }
}

const userProfileSlice = createSlice({
  initialState,
  name: "userProfileSlice",
  reducers: {
    setProfile: (state, action) => {
      return {
        ...state, profile: { ...action.payload }
      }
    }
  }
})

export const { setProfile } = userProfileSlice.actions

export const userProfileSliceName = userProfileSlice.name

export default userProfileSlice.reducer