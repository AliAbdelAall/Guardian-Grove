import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
}

const messagesSlice = createSlice({
  initialState,
  name: "messagesSlice",
  reducers: {
    setMessages: (state, action) => {
      return {
        ...state, messages: [...action.payload]
      }
    },
    addMessages: (state, action) => {
      return {
        ...state, messages: [...state.messages, action.payload]
      }
    },
  }
})

export const { setMessages, addMessages } = messagesSlice.actions

export const messagesSliceName = messagesSlice.name

export default messagesSlice.reducer