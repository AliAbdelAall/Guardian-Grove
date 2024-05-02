import { createSlice } from "@reduxjs/toolkit";

interface psychologist {
  id: number
  firstName: string,
  lastName: string,
  email: string
  profilePic: string
  dob: String | null
  speciality: string | null
  yearsOfExperience: number | null
  rating: number | null
}

const initialState: psychologist[] = []

const psychologistsSlice = createSlice({
  initialState,
  name: "psychologistsSlice",
  reducers:{
    setpsychologists: (state, action) => {
      return {
        ...action.payload
      }
    }
  }
})


export const { setpsychologists } = psychologistsSlice.actions
export const psychologistsSliceName = psychologistsSlice.name
export default psychologistsSlice.reducer