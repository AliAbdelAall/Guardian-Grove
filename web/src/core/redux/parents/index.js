import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parents: []
}

const parentsSlice = createSlice({
  initialState,
  name: "parentsSlice",
  reducers: {
    setParents: (state, action) => {
      return {
        ...state, parents: [...action.payload]
      }
    }
  }
})

export const { setParents } = parentsSlice.actions

export const parentsSliceName = parentsSlice.name

export default parentsSlice.reducer