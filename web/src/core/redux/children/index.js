import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: []
}

const childrenSlice = createSlice({
  initialState,
  name: "childrenSlice",
  reducers: {
    setchildren: (state, action) => {
      return {
        ...state, children: [...action.payload]
      }
    },
    updateTeacherId: (state, action) => {
      state.children.forEach((child) => {
        if (child.id === action.payload.id) {
          child.teacherId = action.payload.teacherId
        }
      })
    },
  }
})

export const { setchildren, updateTeacherId } = childrenSlice.actions

export const childrenSliceName = childrenSlice.name

export default childrenSlice.reducer