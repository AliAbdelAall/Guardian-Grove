import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  userId: 0,
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  dob: null,
  teacher: {
    id: 0,
    profileId: 0,
    speciality: null,
    school: null,
  },
  psychologist: {
    id: 0,
    profileId: 0,
    speciality: null,
    yearsOfExperience: null,
    schedules: []
  }
}

const userProfileSlice = createSlice({
  initialState,
  name: "userProfileSlice",
  reducers: {
    setProfile: (state, action) => {
      const { id,
        userId,
        firstName,
        lastName,
        email,
        profilePic,
        dob, ...rest } = action.payload
      return {
        ...state, id,
        userId,
        firstName,
        lastName,
        email,
        profilePic,
        dob, ...rest
      }
    },
    editProfilPic: (state, action) => {
      return {
        ...state, profilePic: action.payload
      }
    },
    editDob: (state, action) => {
      return {
        ...state, dob: action.payload
      }
    },
    updateSpeciality: (state, action) => {
      const { user, speciality } = action.payload
      return {
        ...state,
        [user]: { ...[user], speciality: speciality }
      };
    },
  }
})

export const { setProfile, editProfilPic, editDob, updateSpeciality } = userProfileSlice.actions

export const userProfileSliceName = userProfileSlice.name

export default userProfileSlice.reducer