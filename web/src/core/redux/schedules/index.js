import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: []
}

const schedulesSlice = createSlice({
  initialState,
  name: "schedulesSlice",
  reducers: {
    setSchedules: (state, action) => {
      return {
        ...state, schedules: [...action.payload]
      }
    },
    addSchedules: (state, action) => {
      return {
        ...state, schedules: [...state.schedules, ...action.payload]
      }
    },
  }
})

export const { setSchedules, schedules } = schedulesSlice.actions

export const schedulesSliceName = schedulesSlice.name

export default schedulesSlice.reducer