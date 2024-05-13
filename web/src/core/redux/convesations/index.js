import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: []
}

const conversationsSlice = createSlice({
  initialState,
  name: "conversationsSlice",
  reducers: {
    setConversations: (state, action) => {
      return {
        ...state, conversations: [...action.payload]
      }
    },
    addConversation: (state, action) => {
      return {
        ...state, conversations: [...state.conversations, action.payload]
      }
    },
  }
})

export const { setConversations, addConversations } = conversationsSlice.actions

export const conversationsSliceName = conversationsSlice.name

export default conversationsSlice.reducer