import { createSlice } from "@reduxjs/toolkit";

export const userDirectorySlice = createSlice({
  name: "header",
  initialState: {
    allUsers: [],
    allPosts: [],
    allUserPosts: [],
    userSelected: {},
    allCountries: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setAllUserPosts: (state, action) => {
      state.allUserPosts = action.payload;
    },
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
    setAllCountries: (state, action) => {
      state.allCountries = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setAllPosts,
  setAllUserPosts,
  setUserSelected,
  setAllCountries,
} = userDirectorySlice.actions;

export default userDirectorySlice.reducer;
