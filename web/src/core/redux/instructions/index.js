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
        ...state, instructions: [...state.instructions, action.payload]
      }
    },
  }
})

export const { setInstructions, addInstruction } = instructionsSlice.actions

export const instructionsSliceName = instructionsSlice.name

export default instructionsSlice.reducer