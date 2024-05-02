import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface child {
  id: number
  parentId: number
  name: string,
  school: string,
  dob: String | null
}

const initialState: child[] = []

const childrenSlice = createSlice({
  initialState,
  name: "childrenSlice",
  reducers:{
    setChildren: (state, action: PayloadAction<child[]>) => {
      return action.payload
    }
  }
})


export const { setChildren } = childrenSlice.actions
export const childrenSliceName = childrenSlice.name
export default childrenSlice.reducer