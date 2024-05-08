import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  userId: 0,
  firstName: "",
  lastName: "",
  email: "",
  profilePic: "",
  dob: null,
  roleId: 0,
  teacher: {
    id: 0,
    profileId: 0,
    speciality: null,
    schoolId: 0,
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
        const { School, ...restTeacher } = Teacher
        return {
          ...state,
          ...rest,
          teacher: { ...state.teacher, ...restTeacher, school: School?.name ? School.name : null }
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
    updateSchool: (state, action) => {
      const { id, name } = action.payload
      return {
        ...state, teacher: { ...state.teacher, school: name, schoolId: id }
      };
    },

  }
})

export const { setProfile, editProfilPic, editDob, updateSpeciality, updateYoe, updateSchool } = userProfileSlice.actions

export const userProfileSliceName = userProfileSlice.name

export default userProfileSlice.reducer