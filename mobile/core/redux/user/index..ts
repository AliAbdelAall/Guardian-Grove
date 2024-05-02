import { createSlice } from "@reduxjs/toolkit";

interface user {
  firstName: string,
  lastName: string,
  email: string
  profilePic: string
  dob: String | null
}

const initialState: user = {
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  dob: null
}

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers:{
    setUser: (state, action) => {
      return {
        ...action.payload
      }
    }
  }
})


export const { setUser } = userSlice.actions
export const userSliceName = userSlice.name
export default userSlice.reducer