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
      if (action.payload.Psychologist) {
        const { Psychologist, ...rest } = action.payload
        return {
          ...state,
          ...rest,
          psychologist: { ...state.psychologist, ...Psychologist }
        }
      } else {
        const { Teacher, ...rest } = action.payload
        return {
          ...state,
          ...rest,
          teacher: { ...state.teacher, ...Teacher }
        }
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

        [user]: { ...state[user], speciality: speciality }
      };
    },
    updateYoe: (state, action) => {
      return {
        ...state, psychologist: { ...state.psychologist, yearsOfExperience: action.payload }

      };
    },
  }
})

export const { setProfile, editProfilPic, editDob, updateSpeciality, updateYoe } = userProfileSlice.actions

export const userProfileSliceName = userProfileSlice.name

export default userProfileSlice.reducer