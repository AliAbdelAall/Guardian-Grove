import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  avgRating: 0
}

const reviewsSlice = createSlice({
  initialState,
  name: "reviewsSlice",
  reducers: {
    setReviews: (state, action) => {
      const reviews = action.payload
      let sum = 0
      let count = 0
      reviews.forEach(review => {
        sum += review.rating
        count += 1
      });

      const avgRating = sum / count

      return {
        ...state, reviews: [...reviews], avgRating
      }
    }
  }
})

export const { setReviews } = reviewsSlice.actions

export const reviewsSliceName = reviewsSlice.name

export default reviewsSlice.reducer