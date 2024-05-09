import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructions: []
}

const instructionsSlice = createSlice({
  initialState,
  name: "instructionsSlice",
  reducers: {
    setInstructions: (state, action) => {
      return {
        ...state, instructions: [...action.payload]
      }
    },
    addInstruction: (state, action) => {
      return {
        ...state, reports: [...state.instructions, action.payload]
      }
    },
  }
})

export const { setInstructions } = instructionsSlice.actions

export const instructionsSliceName = instructionsSlice.name

export default instructionsSlice.reducer