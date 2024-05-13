import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  convesations: []
}

const convesationsSlice = createSlice({
  initialState,
  name: "convesationsSlice",
  reducers: {
    setConvesations: (state, action) => {
      return {
        ...state, convesations: [...action.payload]
      }
    },
    addConvesation: (state, action) => {
      return {
        ...state, convesations: [...state.convesations, action.payload]
      }
    },
  }
})

export const { setConvesations, addConvesations } = convesationsSlice.actions

export const convesationsSliceName = convesationsSlice.name

export default convesationsSlice.reducer