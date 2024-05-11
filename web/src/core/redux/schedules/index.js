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
    deleteSchedule: (state, action) => {
      return {
        ...state, schedules: state.schedules.filter((schedule) => schedule.id !== JSON.parse(action.payload))
      }
    },
  }
})

export const { setSchedules, addSchedules, deleteSchedule } = schedulesSlice.actions

export const schedulesSliceName = schedulesSlice.name

export default schedulesSlice.reducer