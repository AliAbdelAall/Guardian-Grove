import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: []
}

const reportsSlice = createSlice({
  initialState,
  name: "reportsSlice",
  reducers: {
    setReports: (state, action) => {
      return {
        ...state, reports: [...action.payload]
      }
    },
    addReport: (state, action) => {
      return {
        ...state, reports: [...state.reports, action.payload]
      }
    },
  }
})

export const { setReports } = reportsSlice.actions

export const reportsSliceName = reportsSlice.name

export default reportsSlice.reducer