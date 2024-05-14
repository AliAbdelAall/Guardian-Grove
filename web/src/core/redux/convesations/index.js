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
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      return {
        ...state,
        conversations: state.conversations.map(conversation =>
          conversation.id === conversationId
            ? {
              ...conversation,
              message: [...conversation.message, message]
            }
            : conversation
        )
      };
    }
  }
})

export const { setConversations, addConversation, addMessage } = conversationsSlice.actions

export const conversationsSliceName = conversationsSlice.name

export default conversationsSlice.reducer