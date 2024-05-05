import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schools: []
}

const schoolsSlice = createSlice({
  initialState,
  name: "schoolsSlice",
  reducers: {
    setSchools: (state, action) => {
      return {
        ...state, schools: [...action.payload]
      }
    }
  }
})

export const { setSchools } = schoolsSlice.actions

export const schoolsSliceName = schoolsSlice.name

export default schoolsSlice.reducer