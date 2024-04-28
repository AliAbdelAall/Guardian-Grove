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
    }
  }
})

export const { setchildren } = childrenSlice.actions

export const childrenSliceName = childrenSlice.name

export default childrenSlice.reducer