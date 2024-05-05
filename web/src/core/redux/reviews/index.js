import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: []
}

const reviewsSlice = createSlice({
  initialState,
  name: "reviewsSlice",
  reducers: {
    setReviews: (state, action) => {
      return {
        ...state, reviews: [...action.payload]
      }
    }
  }
})

export const { setReviews } = reviewsSlice.actions

export const reviewsSliceName = reviewsSlice.name

export default reviewsSlice.reducer